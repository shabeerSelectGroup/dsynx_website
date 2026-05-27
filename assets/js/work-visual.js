/**
 * DSYNZ — Work section orbital wireframe sculpture (Three.js)
 */
import * as THREE from '../vendor/three/three.module.js';

const BRAND = 0x7c3aed;
const GLOW = 0xb794f6;
const MIN_WIDTH = 768;
const ROT_LERP = 0.072;
const FIT_PADDING = 1.04;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function fitObjectToView(root, camera, width, height, padding = FIT_PADDING) {
  root.position.set(0, 0, 0);
  root.updateMatrixWorld(true);

  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  root.position.copy(center.multiplyScalar(-1));

  const maxSize = Math.max(size.x, size.y, size.z);
  const fovRad = (camera.fov * Math.PI) / 180;
  const fitHeight = maxSize / 2 / Math.tan(fovRad / 2);
  const fitWidth = fitHeight / (width / height);

  return padding * Math.max(fitHeight, fitWidth);
}

function createWorkVisual(mount) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvasHost = document.createElement('div');
  canvasHost.className = 'work-visual-canvas-host';
  canvasHost.setAttribute('aria-hidden', 'true');
  mount.prepend(canvasHost);

  let renderer;
  let scene;
  let camera;
  let root;
  let sculpture;
  let ringA;
  let ringB;
  let frameId = 0;
  let running = false;
  let resizeObserver;
  let built = false;
  let baseCameraZ = 4;

  const pointer = { x: 0, y: 0 };
  const rotation = { spinY: 0, tiltX: 0, tiltZ: 0, targetTiltX: 0, targetTiltZ: 0 };

  const getSize = () => {
    const { width, height } = mount.getBoundingClientRect();
    return {
      width: Math.max(1, Math.floor(width)),
      height: Math.max(1, Math.floor(height)),
    };
  };

  const meetsWidth = () => window.innerWidth >= MIN_WIDTH;

  const onPointerMove = (e) => {
    const rect = mount.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
    pointer.y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
  };

  const onPointerLeave = () => {
    pointer.x = 0;
    pointer.y = 0;
  };

  const disposeGL = () => {
    running = false;
    cancelAnimationFrame(frameId);
    frameId = 0;

    if (root) {
      root.traverse((child) => {
        if (child.geometry) child.geometry.dispose();
        if (child.material) child.material.dispose();
      });
    }

    renderer?.dispose();
    canvasHost.replaceChildren();
    renderer = null;
    scene = null;
    camera = null;
    root = null;
    sculpture = null;
    ringA = null;
    ringB = null;
    built = false;
  };

  const stop = () => {
    running = false;
    cancelAnimationFrame(frameId);
    frameId = 0;
  };

  const start = () => {
    if (!built || !renderer) return;
    running = true;
    cancelAnimationFrame(frameId);
    tick();
  };

  const tick = () => {
    if (!running || !renderer || !root) return;

    if (!reducedMotion) {
      rotation.spinY += 0.009;
      if (ringA) ringA.rotation.z += 0.005;
      if (ringB) ringB.rotation.x -= 0.0035;
    }

    rotation.targetTiltX = -pointer.y * 0.38;
    rotation.targetTiltZ = pointer.x * 0.24;
    rotation.tiltX = lerp(rotation.tiltX, rotation.targetTiltX, ROT_LERP);
    rotation.tiltZ = lerp(rotation.tiltZ, rotation.targetTiltZ, ROT_LERP);

    sculpture.rotation.set(rotation.tiltX, rotation.spinY, rotation.tiltZ);

    const pulse = Math.min(1, Math.hypot(pointer.x, pointer.y));
    camera.position.z = lerp(camera.position.z, baseCameraZ - pulse * baseCameraZ * 0.04, 0.08);

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(tick);
  };

  const build = () => {
    if (!meetsWidth()) {
      mount.classList.add('work-visual--fallback');
      disposeGL();
      return;
    }

    mount.classList.remove('work-visual--fallback');

    const { width, height } = getSize();
    if (width < 48 || height < 48) return;

    disposeGL();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
    camera.position.z = 4;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    canvasHost.appendChild(renderer.domElement);

    root = new THREE.Group();
    sculpture = new THREE.Group();

    const coreGeo = new THREE.IcosahedronGeometry(1.12, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: BRAND,
      wireframe: true,
      transparent: true,
      opacity: 0.92,
    });
    const glowMat = new THREE.MeshBasicMaterial({
      color: GLOW,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });

    const core = new THREE.Mesh(coreGeo, coreMat);
    const glow = new THREE.Mesh(coreGeo, glowMat);
    glow.scale.setScalar(1.1);
    sculpture.add(glow, core);

    const ringMat = new THREE.MeshBasicMaterial({
      color: BRAND,
      transparent: true,
      opacity: 0.5,
    });
    ringA = new THREE.Mesh(new THREE.TorusGeometry(1.62, 0.028, 10, 72), ringMat);
    ringB = new THREE.Mesh(new THREE.TorusGeometry(1.88, 0.022, 10, 72), ringMat.clone());
    ringA.rotation.x = Math.PI / 2.35;
    ringB.rotation.y = Math.PI / 2.05;
    ringB.rotation.x = 0.42;

    root.add(ringA, ringB, sculpture);
    scene.add(root);

    baseCameraZ = fitObjectToView(root, camera, width, height);
    camera.position.set(0, 0, baseCameraZ);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    built = true;
    start();
  };

  const resize = () => {
    if (!meetsWidth()) {
      stop();
      mount.classList.add('work-visual--fallback');
      disposeGL();
      return;
    }

    if (!renderer || !camera) {
      build();
      return;
    }

    const { width, height } = getSize();
    camera.aspect = width / height;
    baseCameraZ = fitObjectToView(root, camera, width, height);
    camera.position.set(0, 0, baseCameraZ);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  mount.addEventListener('mousemove', onPointerMove, { passive: true });
  mount.addEventListener('mouseleave', onPointerLeave);

  resizeObserver = new ResizeObserver(() => requestAnimationFrame(resize));
  resizeObserver.observe(mount);
  window.addEventListener('resize', resize, { passive: true });

  requestAnimationFrame(build);

  return {
    start,
    stop,
    dispose: () => {
      window.removeEventListener('resize', resize);
      mount.removeEventListener('mousemove', onPointerMove);
      mount.removeEventListener('mouseleave', onPointerLeave);
      resizeObserver?.disconnect();
      disposeGL();
      canvasHost.remove();
    },
  };
}

export function initWorkVisual() {
  const apis = [];

  document.querySelectorAll('[data-work-visual]').forEach((mount) => {
    const api = createWorkVisual(mount);
    if (api) apis.push(api);
  });

  const onVisibility = () => {
    apis.forEach((api) => {
      if (document.hidden) api.stop();
      else api.start();
    });
  };

  document.addEventListener('visibilitychange', onVisibility);

  return () => {
    document.removeEventListener('visibilitychange', onVisibility);
    apis.forEach((api) => api.dispose());
  };
}
