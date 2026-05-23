/**
 * DSYNZ — Shared wireframe 3D icons (single WebGL context per section)
 */
import * as THREE from 'https://esm.sh/three@0.170.0';

const PURPLE = 0x7c3aed;

const SHAPE_SETS = {
  bridge: {
    kinds: ['product', 'strategy', 'growth'],
    shapes: {
      product: () => new THREE.BoxGeometry(1.05, 1.05, 1.05),
      strategy: () => new THREE.OctahedronGeometry(0.92, 0),
      growth: () => new THREE.ConeGeometry(0.72, 1.15, 8),
    },
    viewHeight: 4.2,
    spin: 0.014,
    scale: 0.82,
  },
};

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function createWireMesh(kind, shapes, scale) {
  const geometry = (shapes[kind] || shapes[Object.keys(shapes)[0]])();
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      color: PURPLE,
      wireframe: true,
      transparent: true,
      opacity: 0.95,
    })
  );
  const glowGeometry = geometry.clone();
  const glow = new THREE.Mesh(
    glowGeometry,
    new THREE.MeshBasicMaterial({
      color: 0xb794f6,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    })
  );
  glow.scale.setScalar(1.1);

  const group = new THREE.Group();
  group.add(glow);
  group.add(mesh);
  group.scale.setScalar(scale);
  return { group, geometry, glowGeometry };
}

function createIconStage(stage, config) {
  const { kinds, shapes, viewHeight, spin: spinSpeed, scale } = config;
  const anchors = [...stage.querySelectorAll('[data-wire-icon-anchor]')];
  if (anchors.length !== kinds.length) return null;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canvasHost = document.createElement('div');
  canvasHost.className = 'wire-icons-canvas-host';
  stage.prepend(canvasHost);

  let renderer;
  let scene;
  let camera;
  let icons = [];
  let frameId = 0;
  let running = false;
  let resizeObserver;
  let pointerX = 0;
  let pointerY = 0;
  let mouseX = 0;
  let mouseY = 0;

  const dispose = () => {
    running = false;
    cancelAnimationFrame(frameId);
    resizeObserver?.disconnect();
    document.removeEventListener('mousemove', onMouseMove);

    icons.forEach(({ group, geometry, glowGeometry }) => {
      group.traverse((child) => child.material?.dispose());
      geometry?.dispose();
      glowGeometry?.dispose();
    });
    icons = [];

    renderer?.dispose();
    canvasHost.replaceChildren();
    renderer = null;
    scene = null;
    camera = null;
  };

  const getCanvasSize = () => {
    const rect = canvasHost.getBoundingClientRect();
    return {
      width: Math.max(1, Math.floor(rect.width)),
      height: Math.max(1, Math.floor(rect.height)),
    };
  };

  const layoutIcons = () => {
    if (!icons.length || !camera || !renderer) return;

    const canvasRect = canvasHost.getBoundingClientRect();
    const w = canvasRect.width || 1;
    const h = canvasRect.height || 1;
    const viewWidth = (w / h) * viewHeight;

    anchors.forEach((anchor, i) => {
      const anchorRect = anchor.getBoundingClientRect();
      const cx = anchorRect.left + anchorRect.width / 2 - canvasRect.left;
      const cy = anchorRect.top + anchorRect.height / 2 - canvasRect.top;
      icons[i].group.position.set(
        (cx / w - 0.5) * viewWidth,
        -(cy / h - 0.5) * viewHeight,
        0
      );
    });

    camera.left = -viewWidth / 2;
    camera.right = viewWidth / 2;
    camera.top = viewHeight / 2;
    camera.bottom = -viewHeight / 2;
    camera.updateProjectionMatrix();
  };

  const onMouseMove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
    pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
  };

  const tick = () => {
    if (!running || !renderer) return;

    layoutIcons();

    icons.forEach((icon, i) => {
      const kind = kinds[i];
      const speed = reducedMotion ? 0 : spinSpeed * (kind === 'complex' || kind === 'growth' ? 1.08 : 1);

      if (speed) icon.spinY += speed;

      const anchor = anchors[i];
      const rect = anchor.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(mouseX - cx, mouseY - cy);
      const influence = dist < 160 ? 1 - dist / 160 : 0;

      icon.tiltX = lerp(icon.tiltX, pointerY * 0.26 * influence, 0.1);
      icon.tiltZ = lerp(icon.tiltZ, -pointerX * 0.14 * influence, 0.1);
      icon.group.rotation.set(icon.tiltX, icon.spinY, icon.tiltZ);
    });

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(tick);
  };

  const build = () => {
    dispose();

    const { width, height } = getCanvasSize();
    if (width < 10 || height < 10) return;

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 50);
    camera.position.z = 10;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    canvasHost.appendChild(renderer.domElement);

    kinds.forEach((kind) => {
      const built = createWireMesh(kind, shapes, scale);
      icons.push({
        group: built.group,
        geometry: built.geometry,
        glowGeometry: built.glowGeometry,
        spinY: 0,
        tiltX: 0,
        tiltZ: 0,
      });
      scene.add(built.group);
    });

    layoutIcons();
    document.addEventListener('mousemove', onMouseMove, { passive: true });
    running = true;
    tick();
  };

  const onResize = () => requestAnimationFrame(layoutIcons);

  resizeObserver = new ResizeObserver(() => {
    if (!renderer) {
      build();
      return;
    }
    const { width, height } = getCanvasSize();
    renderer.setSize(width, height, false);
    layoutIcons();
  });

  resizeObserver.observe(stage);
  window.addEventListener('resize', onResize, { passive: true });
  requestAnimationFrame(build);

  return () => {
    window.removeEventListener('resize', onResize);
    dispose();
    canvasHost.remove();
  };
}

export function initWireframeIcons() {
  const cleanups = [];

  document.querySelectorAll('[data-wire-icons-stage]').forEach((stage) => {
    const setName = stage.dataset.wireIconsStage;
    const config = SHAPE_SETS[setName];
    if (!config) return;
    const cleanup = createIconStage(stage, config);
    if (cleanup) cleanups.push(cleanup);
  });

  return () => cleanups.forEach((fn) => fn());
}

/** @deprecated Use initWireframeIcons */
export function initBridgeIcons() {
  return initWireframeIcons();
}
