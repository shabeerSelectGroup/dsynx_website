/**
 * DSYNZ — Services hero hypercube (4D tesseract wireframe)
 */
import * as THREE from 'https://esm.sh/three@0.170.0';

const BRAND = 0x7c3aed;
const GLOW = 0xb794f6;
const MIN_WIDTH = 1024;
const ROT_LERP = 0.068;
const CUBE_SCALE = 0.92;
const PROJECT_DIST = 3.2;
const FIT_PADDING = 1.22;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function buildTesseractData() {
  const vertices = [];
  for (let i = 0; i < 16; i += 1) {
    vertices.push([
      (i & 1 ? 1 : -1) * CUBE_SCALE,
      (i & 2 ? 1 : -1) * CUBE_SCALE,
      (i & 4 ? 1 : -1) * CUBE_SCALE,
      (i & 8 ? 1 : -1) * CUBE_SCALE,
    ]);
  }

  const edges = [];
  for (let i = 0; i < 16; i += 1) {
    for (let j = i + 1; j < 16; j += 1) {
      let diff = 0;
      for (let bit = 0; bit < 4; bit += 1) {
        if (((i >> bit) & 1) !== ((j >> bit) & 1)) diff += 1;
      }
      if (diff === 1) edges.push(i, j);
    }
  }

  return { vertices, edges };
}

function rotatePlane(point, i, j, angle) {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  const next = [...point];
  const vi = point[i];
  const vj = point[j];
  next[i] = vi * c - vj * s;
  next[j] = vi * s + vj * c;
  return next;
}

function rotate4D(point, angles) {
  let v = point;
  v = rotatePlane(v, 0, 1, angles.xy);
  v = rotatePlane(v, 0, 2, angles.xz);
  v = rotatePlane(v, 0, 3, angles.xw);
  v = rotatePlane(v, 1, 2, angles.yz);
  v = rotatePlane(v, 1, 3, angles.yw);
  v = rotatePlane(v, 2, 3, angles.zw);
  return v;
}

function project4D(point) {
  const denom = Math.max(PROJECT_DIST - point[3], 0.45);
  const factor = 1 / denom;
  return [point[0] * factor, point[1] * factor, point[2] * factor];
}

function fitCameraDistance(camera, projected, width, height, padding = FIT_PADDING) {
  let maxExtent = 0;
  projected.forEach(([x, y, z]) => {
    maxExtent = Math.max(maxExtent, Math.abs(x), Math.abs(y), Math.abs(z));
  });

  if (!maxExtent) return 4;

  const fovRad = (camera.fov * Math.PI) / 180;
  const fitHeight = maxExtent / Math.tan(fovRad / 2);
  const fitWidth = fitHeight / (width / height);
  return padding * Math.max(fitHeight, fitWidth);
}

function createHypercube(mount) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const { vertices, edges } = buildTesseractData();

  let renderer;
  let scene;
  let camera;
  let lines;
  let glowLines;
  let frameId = 0;
  let running = false;
  let resizeObserver;
  let built = false;
  let baseCameraZ = 4.2;
  let viewWidth = 1;
  let viewHeight = 1;

  const pointer = { x: 0, y: 0 };
  const angles = {
    xy: 0.35,
    xz: 0.22,
    xw: 0.18,
    yz: 0.12,
    yw: 0.08,
    zw: 0.05,
  };
  const spin = { xy: 0, xz: 0, xw: 0 };
  const tilt = { xz: 0, yz: 0, targetXz: 0, targetYz: 0 };

  const meetsWidth = () => window.innerWidth >= MIN_WIDTH;

  const getSize = () => {
    const { width, height } = mount.getBoundingClientRect();
    return {
      width: Math.max(1, Math.floor(width)),
      height: Math.max(1, Math.floor(height)),
    };
  };

  const onPointerMove = (e) => {
    const wrap = mount.closest('[data-services-hypercube-wrap]') || mount;
    const rect = wrap.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
    pointer.y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
  };

  const onPointerLeave = () => {
    pointer.x = 0;
    pointer.y = 0;
  };

  const updateLines = () => {
    if (!lines || !glowLines) return null;

    const activeAngles = {
      xy: angles.xy + spin.xy,
      xz: angles.xz + spin.xz + tilt.xz,
      xw: angles.xw + spin.xw,
      yz: angles.yz + tilt.yz,
      yw: angles.yw,
      zw: angles.zw,
    };

    const projected = vertices.map((v) => project4D(rotate4D(v, activeAngles)));
    const pos = lines.geometry.attributes.position.array;
    const glowPos = glowLines.geometry.attributes.position.array;

    for (let i = 0; i < edges.length; i += 2) {
      const a = projected[edges[i]];
      const b = projected[edges[i + 1]];
      const offset = (i / 2) * 6;
      pos[offset] = a[0];
      pos[offset + 1] = a[1];
      pos[offset + 2] = a[2];
      pos[offset + 3] = b[0];
      pos[offset + 4] = b[1];
      pos[offset + 5] = b[2];
      glowPos[offset] = a[0];
      glowPos[offset + 1] = a[1];
      glowPos[offset + 2] = a[2];
      glowPos[offset + 3] = b[0];
      glowPos[offset + 4] = b[1];
      glowPos[offset + 5] = b[2];
    }

    lines.geometry.attributes.position.needsUpdate = true;
    glowLines.geometry.attributes.position.needsUpdate = true;

    return projected;
  };

  const disposeGL = () => {
    running = false;
    cancelAnimationFrame(frameId);
    frameId = 0;
    lines?.geometry?.dispose();
    lines?.material?.dispose();
    glowLines?.geometry?.dispose();
    glowLines?.material?.dispose();
    renderer?.dispose();
    mount.replaceChildren();
    renderer = null;
    scene = null;
    camera = null;
    lines = null;
    glowLines = null;
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
    if (!running || !renderer) return;

    if (!reducedMotion) {
      spin.xy += 0.0032;
      spin.xz += 0.0024;
      spin.xw += 0.0018;
    }

    tilt.targetXz = pointer.y * 0.28;
    tilt.targetYz = pointer.x * 0.22;
    tilt.xz = lerp(tilt.xz, tilt.targetXz, ROT_LERP);
    tilt.yz = lerp(tilt.yz, tilt.targetYz, ROT_LERP);

    const projected = updateLines();
    if (projected?.length) {
      baseCameraZ = fitCameraDistance(camera, projected, viewWidth, viewHeight);
    }

    const pulse = Math.min(1, Math.hypot(pointer.x, pointer.y));
    camera.position.z = lerp(camera.position.z, baseCameraZ - pulse * baseCameraZ * 0.035, 0.08);
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(tick);
  };

  const build = () => {
    if (!meetsWidth()) {
      disposeGL();
      return;
    }

    const { width, height } = getSize();
    viewWidth = width;
    viewHeight = height;
    if (width < 48 || height < 48) return;

    disposeGL();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(34, width / height, 0.05, 100);
    camera.position.z = baseCameraZ;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const lineMaterial = {
      color: BRAND,
      transparent: true,
      opacity: 0.94,
      depthWrite: false,
      depthTest: false,
    };

    const segmentCount = edges.length / 2;
    const positions = new Float32Array(segmentCount * 6);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    lines = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial(lineMaterial));

    const glowGeometry = geometry.clone();
    glowLines = new THREE.LineSegments(
      glowGeometry,
      new THREE.LineBasicMaterial({
        color: GLOW,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        depthTest: false,
      })
    );

    scene.add(glowLines);
    scene.add(lines);
    const projected = updateLines();
    if (projected?.length) {
      baseCameraZ = fitCameraDistance(camera, projected, width, height);
      camera.position.z = baseCameraZ;
    }

    built = true;
    start();
  };

  const resize = () => {
    if (!meetsWidth()) {
      stop();
      disposeGL();
      return;
    }

    if (!renderer || !camera) {
      build();
      return;
    }

    const { width, height } = getSize();
    viewWidth = width;
    viewHeight = height;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const wrap = mount.closest('[data-services-hypercube-wrap]') || mount;
  wrap.addEventListener('mousemove', onPointerMove, { passive: true });
  wrap.addEventListener('mouseleave', onPointerLeave);

  resizeObserver = new ResizeObserver(() => requestAnimationFrame(resize));
  resizeObserver.observe(mount);
  window.addEventListener('resize', resize, { passive: true });

  requestAnimationFrame(build);

  return {
    start,
    stop,
    dispose: () => {
      window.removeEventListener('resize', resize);
      wrap.removeEventListener('mousemove', onPointerMove);
      wrap.removeEventListener('mouseleave', onPointerLeave);
      resizeObserver?.disconnect();
      disposeGL();
    },
  };
}

export function initServicesHypercube() {
  const apis = [];

  document.querySelectorAll('[data-services-hypercube]').forEach((mount) => {
    const api = createHypercube(mount);
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
