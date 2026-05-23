/**
 * DSYNZ — Dot globe visuals (Three.js) with shared page-wide pointer tracking
 */
import * as THREE from 'https://esm.sh/three@0.170.0';

const BRAND_PURPLE = 0x7c3aed;
const ROT_LERP = 0.065;

const PRESETS = {
  hero: {
    minWidth: 1024,
    dotCount: 2800,
    glowCount: 420,
    radius: 1.92,
    cameraZ: 6.65,
    fov: 34,
    rotYRange: 1.15,
    rotXRange: 0.62,
    dotSize: 0.045,
    glowSize: 0.07,
    autoSpin: 0.0024,
    influence: 1,
  },
};

const pointer = { normX: 0, normY: 0 };
let pointerBound = false;
let pointerCleanup = null;
const instances = new Set();

function fibonacciSpherePoints(count, radius) {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }

  return positions;
}

function lerp(current, target, amount) {
  return current + (target - current) * amount;
}

function ensurePointerTracking() {
  if (pointerBound) return;

  const onMouseMove = (e) => {
    pointer.normX = Math.max(-1, Math.min(1, (e.clientX / window.innerWidth - 0.5) * 2));
    pointer.normY = Math.max(-1, Math.min(1, (e.clientY / window.innerHeight - 0.5) * 2));
  };

  const onMouseLeave = () => {
    pointer.normX = 0;
    pointer.normY = 0;
  };

  document.addEventListener('mousemove', onMouseMove, { passive: true });
  document.documentElement.addEventListener('mouseleave', onMouseLeave);

  pointerBound = true;
  pointerCleanup = () => {
    document.removeEventListener('mousemove', onMouseMove);
    document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    pointerBound = false;
    pointer.normX = 0;
    pointer.normY = 0;
  };
}

function createDotGlobe(mount, presetKey) {
  const config = PRESETS[presetKey] || PRESETS.hero;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const meetsWidth = () => window.innerWidth >= config.minWidth;

  let renderer;
  let scene;
  let camera;
  let globe;
  let glow;
  let coreMaterial;
  let glowMaterial;
  let frameId = 0;
  let running = false;
  let resizeObserver;

  const rotation = {
    spinY: 0,
    offsetX: 0,
    offsetY: 0,
    targetOffsetX: 0,
    targetOffsetY: 0,
  };

  const instance = {
    tick() {},
    dispose() {},
  };

  const getSize = () => {
    const { width, height } = mount.getBoundingClientRect();
    return {
      width: Math.max(1, Math.floor(width)),
      height: Math.max(1, Math.floor(height)),
    };
  };

  const updateTargets = () => {
    const inf = config.influence;
    rotation.targetOffsetY = pointer.normX * config.rotYRange * inf;
    rotation.targetOffsetX = -pointer.normY * config.rotXRange * inf;
  };

  const syncRotation = () => {
    if (!globe || !glow) return;
    const rotY = rotation.spinY + rotation.offsetY;
    globe.rotation.x = rotation.offsetX;
    globe.rotation.y = rotY;
    glow.rotation.x = rotation.offsetX;
    glow.rotation.y = rotY * 1.02;
  };

  const animate = () => {
    if (!running || !globe || !renderer || !camera) return;

    updateTargets();
    const followAmount = reducedMotion ? 0.12 : ROT_LERP;

    if (!reducedMotion) {
      rotation.spinY += config.autoSpin;
    }

    rotation.offsetX = lerp(rotation.offsetX, rotation.targetOffsetX, followAmount);
    rotation.offsetY = lerp(rotation.offsetY, rotation.targetOffsetY, followAmount);

    if (coreMaterial && glowMaterial) {
      const intensity =
        Math.min(1, Math.sqrt(pointer.normX * pointer.normX + pointer.normY * pointer.normY)) *
        config.influence;
      coreMaterial.size = lerp(coreMaterial.size, config.dotSize + intensity * 0.01, 0.1);
      glowMaterial.opacity = lerp(glowMaterial.opacity, 0.32 + intensity * 0.14, 0.1);
    }

    const targetZ =
      config.cameraZ -
      Math.min(0.15, (Math.abs(pointer.normX) + Math.abs(pointer.normY)) * 0.05 * config.influence);
    camera.position.z = lerp(camera.position.z, targetZ, 0.08);

    syncRotation();
    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  };

  const start = () => {
    if (!renderer) return;
    running = true;
    cancelAnimationFrame(frameId);
    animate();
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(frameId);
    frameId = 0;
  };

  const disposeGL = () => {
    stop();
    resizeObserver?.disconnect();
    resizeObserver = null;

    globe?.geometry?.dispose();
    globe?.material?.dispose();
    glow?.geometry?.dispose();
    glow?.material?.dispose();
    renderer?.dispose();
    mount.replaceChildren();

    renderer = null;
    scene = null;
    camera = null;
    globe = null;
    glow = null;
    coreMaterial = null;
    glowMaterial = null;
  };

  const resize = () => {
    if (!renderer || !camera) return;
    const { width, height } = getSize();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const build = () => {
    disposeGL();

    if (!meetsWidth()) return;

    const { width, height } = getSize();
    if (width < 2 || height < 2) return;

    rotation.spinY = 0;
    rotation.offsetX = 0;
    rotation.offsetY = 0;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(config.fov, width / height, 0.1, 100);
    camera.position.set(0, 0, config.cameraZ);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const coreGeometry = new THREE.BufferGeometry();
    coreGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(fibonacciSpherePoints(config.dotCount, config.radius), 3)
    );

    coreMaterial = new THREE.PointsMaterial({
      color: BRAND_PURPLE,
      size: config.dotSize,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    globe = new THREE.Points(coreGeometry, coreMaterial);
    scene.add(globe);

    const glowGeometry = new THREE.BufferGeometry();
    glowGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(fibonacciSpherePoints(config.glowCount, config.radius * 1.04), 3)
    );

    glowMaterial = new THREE.PointsMaterial({
      color: 0xb794f6,
      size: config.glowSize,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.32,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    glow = new THREE.Points(glowGeometry, glowMaterial);
    scene.add(glow);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    start();
  };

  instance.tick = updateTargets;

  instance.dispose = () => {
    instances.delete(instance);
    disposeGL();
    if (instances.size === 0 && pointerCleanup) {
      pointerCleanup();
      pointerCleanup = null;
    }
  };

  resizeObserver = new ResizeObserver(() => {
    if (!meetsWidth()) {
      disposeGL();
      return;
    }
    if (!renderer) {
      build();
      return;
    }
    resize();
  });
  resizeObserver.observe(mount);

  const onBreakpoint = () => {
    if (meetsWidth()) build();
    else instance.dispose();
  };

  window.addEventListener('resize', onBreakpoint, { passive: true });

  requestAnimationFrame(build);
  instances.add(instance);

  return {
    dispose: () => {
      window.removeEventListener('resize', onBreakpoint);
      instance.dispose();
    },
    start,
    stop,
  };
}

export function initHeroGlobe() {
  ensurePointerTracking();

  const cleanups = [];

  document.querySelectorAll('[data-dot-globe]').forEach((mount) => {
    const variant = mount.dataset.dotGlobe || 'hero';
    const api = createDotGlobe(mount, variant);
    if (api) cleanups.push(api);
  });

  const onVisibility = () => {
    cleanups.forEach((api) => {
      if (document.hidden) api.stop();
      else api.start();
    });
  };

  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    document.removeEventListener('visibilitychange', onVisibility);
    cleanups.forEach((api) => api.dispose());
    if (instances.size === 0 && pointerCleanup) {
      pointerCleanup();
    }
  };
}
