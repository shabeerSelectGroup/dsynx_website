/**
 * DSYNZ — Brand wireframe growth-loop knot (growth-loop section visual)
 */
import * as THREE from '../vendor/three/three.module.js';
import gsap from '../vendor/gsap/index.js';
import { ScrollTrigger } from '../vendor/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

const BRAND = 0x7c3aed;
const GLOW_SOFT = 0xa78bfa;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function buildGrowthLoopKnot() {
  const disposables = [];
  const knotRoot = new THREE.Group();

  const geometry = new THREE.TorusKnotGeometry(0.86, 0.24, 14, 3, 2, 3);
  const edges = new THREE.EdgesGeometry(geometry, 32);

  const lineMat = new THREE.LineBasicMaterial({
    color: BRAND,
    transparent: true,
    opacity: 0.9,
  });
  const lines = new THREE.LineSegments(edges, lineMat);
  knotRoot.add(lines);

  disposables.push({
    geometry,
    edges,
    materials: [lineMat],
  });

  const group = new THREE.Group();
  group.add(knotRoot);
  group.scale.setScalar(1.12);

  return { group, mesh: knotRoot, disposables };
}

function frameVisual(camera, object, padding = 1.12) {
  const box = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  box.getCenter(center);
  box.getSize(size);

  const maxDim = Math.max(size.x, size.y, size.z);
  const fovRad = (camera.fov * Math.PI) / 180;
  const distance = (maxDim / 2 / Math.tan(fovRad / 2)) * padding;

  camera.position.set(
    center.x + distance * 0.42,
    center.y + distance * 0.22,
    center.z + distance * 0.78,
  );
  camera.lookAt(center);
  camera.updateProjectionMatrix();
}

function createSparkSystem() {
  const count = 10;
  const positions = new Float32Array(count * 3);
  const velocities = [];

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    velocities.push({
      x: (Math.random() - 0.5) * 0.014,
      y: (Math.random() - 0.5) * 0.014,
      z: (Math.random() - 0.5) * 0.014,
      life: Math.random(),
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: GLOW_SOFT,
    size: 0.035,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });

  return {
    points: new THREE.Points(geometry, material),
    positions,
    velocities,
    geometry,
    material,
  };
}

function updateSparks(sparks, dt, intensity) {
  const { positions, velocities, material } = sparks;
  const speed = lerp(0.6, 1.8, intensity);

  for (let i = 0; i < velocities.length; i += 1) {
    const v = velocities[i];
    v.life += dt * speed;

    positions[i * 3] += v.x * speed;
    positions[i * 3 + 1] += v.y * speed;
    positions[i * 3 + 2] += v.z * speed;

    if (v.life > 1) {
      v.life = 0;
      positions[i * 3] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      v.x = (Math.random() - 0.5) * 0.014;
      v.y = (Math.random() - 0.5) * 0.014;
      v.z = (Math.random() - 0.5) * 0.014;
    }
  }

  material.opacity = lerp(0, 0.38, intensity);
  material.size = lerp(0.03, 0.05, intensity);
  sparks.geometry.attributes.position.needsUpdate = true;
}

function disposeVisualParts(parts) {
  parts?.disposables?.forEach(({ geometry, edges, materials }) => {
    geometry?.dispose();
    edges?.dispose();
    materials?.forEach((m) => m.dispose());
  });
}

export function setupLaunchRocket({ root, section, prefersReducedMotion = false }) {
  const canvasHost = root.querySelector('[data-launch-rocket-canvas]');
  const stack = root.querySelector('.launch-rocket-stack');
  if (!canvasHost || !stack || !section) return null;

  root.classList.add('is-ready');

  let renderer;
  let scene;
  let camera;
  let visualGroup;
  let visualParts;
  let sparks;
  let frameId = 0;
  let running = false;
  let resizeObserver;
  let launchIntensity = 0;
  let clock = new THREE.Clock();

  const disposeGL = () => {
    running = false;
    cancelAnimationFrame(frameId);

    disposeVisualParts(visualParts);
    sparks?.geometry?.dispose();
    sparks?.material?.dispose();

    renderer?.dispose();
    canvasHost.replaceChildren();
    renderer = null;
    scene = null;
    camera = null;
    visualGroup = null;
    visualParts = null;
    sparks = null;
  };

  const dispose = () => {
    disposeGL();
    resizeObserver?.disconnect();
  };

  const getSize = () => {
    const rect = canvasHost.getBoundingClientRect();
    return {
      width: Math.max(1, Math.floor(rect.width)),
      height: Math.max(1, Math.floor(rect.height)),
    };
  };

  const build = () => {
    disposeGL();

    const { width, height } = getSize();
    if (width < 24 || height < 24) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 40);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    canvasHost.appendChild(renderer.domElement);

    visualParts = buildGrowthLoopKnot();
    visualGroup = visualParts.group;
    scene.add(visualGroup);
    frameVisual(camera, visualGroup);

    const sparkSystem = createSparkSystem();
    sparks = sparkSystem;
    scene.add(sparkSystem.points);

    running = true;
    clock.start();
    tick();
  };

  const tick = () => {
    if (!running || !renderer) return;

    const elapsed = clock.getElapsedTime();
    const dt = clock.getDelta();

    if (visualGroup && !prefersReducedMotion) {
      const bob = Math.sin(elapsed * 2.4) * 0.03;
      const sway = Math.sin(elapsed * 1.5) * 0.025;
      visualGroup.position.y = bob - launchIntensity * 0.08;
      visualGroup.rotation.y = elapsed * 0.35;
      visualGroup.rotation.x = Math.sin(elapsed * 0.7) * 0.08;
      visualGroup.rotation.z = sway;
    }

    if (sparks) updateSparks(sparks, dt, launchIntensity);

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(tick);
  };

  const bindScrollLaunch = () => {
    if (prefersReducedMotion) return;

    let launchY = -420;

    const calcLaunchY = () => {
      gsap.set(stack, { y: 0, opacity: 1 });
      const { top } = stack.getBoundingClientRect();
      launchY = -(top + 32);
    };

    calcLaunchY();
    ScrollTrigger.addEventListener('refreshInit', calcLaunchY);

    const launchScroll = {
      trigger: section,
      start: 'top 58%',
      end: 'bottom 15%',
      scrub: 0.85,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        launchIntensity = self.progress;
        root.classList.toggle('is-launching', self.progress > 0.04);
      },
    };

    gsap.timeline({ scrollTrigger: launchScroll }).to(
      stack,
      { y: () => launchY, opacity: 0, ease: 'power2.in' },
      0,
    );
  };

  resizeObserver = new ResizeObserver(() => {
    if (!renderer) {
      build();
      return;
    }
    const { width, height } = getSize();
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    if (visualGroup) frameVisual(camera, visualGroup);
  });

  resizeObserver.observe(canvasHost);
  build();
  bindScrollLaunch();

  return dispose;
}

export function initLaunchRocket3D() {
  const root = document.querySelector('[data-launch-rocket]');
  const section = document.querySelector('#growth-loop');
  if (!root || !section) return null;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return setupLaunchRocket({ root, section, prefersReducedMotion });
}
