/**
 * DSYNZ — Process hero 3D growth-loop word cloud
 */
import * as THREE from '../vendor/three/three.module.js';

const MIN_WIDTH = 1024;

function isDarkTheme() {
  return document.documentElement.classList.contains('dark');
}

function getThemePalette() {
  if (isDarkTheme()) {
    return {
      word: '#7c3aed',
      arrow: '#a78bfa',
      fill: null,
      lineBoost: 0,
    };
  }

  return {
    word: '#4c1d95',
    arrow: '#5b21b6',
    fill: 'rgba(76, 29, 149, 0.22)',
    lineBoost: 1.4,
  };
}
const ROT_LERP = 0.068;
const FIT_PADDING = 1.1;
const CAMERA_FILL = 0.58;
const RING_TILT = 0.58;
const RADIUS_X = 4.75;
const RADIUS_Z = 3.95;
const WORD_HALO = 3.05;

const WORDS = ['Assess', 'Blueprint', 'Create', 'Deploy', 'Evaluate', 'Fix', 'Grow'];

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function makeTextSprite(text, { fontSize, color, scale, lineWidth, fillColor }) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const font = `700 ${fontSize}px "IBM Plex Sans", system-ui, sans-serif`;
  ctx.font = font;
  const metrics = ctx.measureText(text);
  const stroke = lineWidth ?? Math.max(2.5, fontSize * 0.065);
  const padX = fontSize * 0.55 + stroke + (fillColor ? 2 : 0);
  const padY = fontSize * 0.42 + stroke + (fillColor ? 2 : 0);
  canvas.width = Math.ceil(metrics.width + padX * 2);
  canvas.height = Math.ceil(fontSize + padY * 2);

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.miterLimit = 2;

  if (fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fillText(text, cx, cy);
  }

  ctx.lineWidth = stroke;
  ctx.strokeStyle = color;
  if (fillColor) {
    ctx.shadowColor = 'rgba(76, 29, 149, 0.35)';
    ctx.shadowBlur = Math.max(4, fontSize * 0.06);
  }
  ctx.strokeText(text, cx, cy);
  ctx.shadowBlur = 0;

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });

  const sprite = new THREE.Sprite(material);
  const aspect = canvas.width / canvas.height;
  sprite.scale.set(scale * aspect, scale, 1);

  return { sprite, texture, material, canvas };
}

function fitCameraDistance(camera, width, height, padding = FIT_PADDING) {
  const ringReach = Math.max(RADIUS_X, RADIUS_Z) + WORD_HALO;
  const fovRad = (camera.fov * Math.PI) / 180;
  const fitHeight = ringReach / Math.tan(fovRad / 2);
  const fitWidth = fitHeight / (width / height);
  return CAMERA_FILL * padding * Math.max(fitHeight, fitWidth);
}

function createWordCloud(mount) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const disposables = [];

  let renderer;
  let scene;
  let camera;
  let cloud;
  let frameId = 0;
  let running = false;
  let resizeObserver;
  let themeObserver;
  let built = false;
  let baseCameraZ = 5;

  const pointer = { x: 0, y: 0 };
  const rotation = { spinY: 0, tiltX: 0, tiltZ: 0, targetTiltX: 0, targetTiltZ: 0 };

  const meetsWidth = () => window.innerWidth >= MIN_WIDTH;

  const getSize = () => {
    const { width, height } = mount.getBoundingClientRect();
    return {
      width: Math.max(1, Math.floor(width)),
      height: Math.max(1, Math.floor(height)),
    };
  };

  const onPointerMove = (e) => {
    const wrap = mount.closest('[data-process-word-cloud-wrap]') || mount;
    const rect = wrap.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.x = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width - 0.5) * 2));
    pointer.y = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height - 0.5) * 2));
  };

  const onPointerLeave = () => {
    pointer.x = 0;
    pointer.y = 0;
  };

  const positionOnRing = (angle, radiusScale = 1) => {
    const x = Math.cos(angle) * RADIUS_X * radiusScale;
    const z = Math.sin(angle) * RADIUS_Z * radiusScale;
    const y = Math.sin(angle * 2) * 0.14;
    return { x, y, z };
  };

  const tangentRotation = (angle) =>
    Math.atan2(RADIUS_Z * Math.cos(angle), -RADIUS_X * Math.sin(angle));

  const buildCloud = () => {
    const palette = getThemePalette();
    const group = new THREE.Group();
    const count = WORDS.length;
    const step = (Math.PI * 2) / count;
    const startAngle = -Math.PI / 2;

    for (let i = 0; i < count; i += 1) {
      // Clockwise ring (viewed from above): Assess → Blueprint → … → Grow
      const angle = startAngle - i * step;
      const { x, y, z } = positionOnRing(angle);

      const isAccent = i === 0 || i === count - 1;
      const wordScale = isAccent ? 1.38 : 1.24;
      const word = makeTextSprite(WORDS[i], {
        fontSize: isAccent ? 124 : 112,
        color: palette.word,
        fillColor: palette.fill,
        scale: wordScale,
        lineWidth: (isAccent ? 5 : 4.25) + palette.lineBoost,
      });
      word.sprite.position.set(x, y, z);
      group.add(word.sprite);
      disposables.push(word);

      const arrowAngle = angle - step / 2;
      const mid = positionOnRing(arrowAngle, 0.88);
      const arrow = makeTextSprite('→', {
        fontSize: 62,
        color: palette.arrow,
        fillColor: palette.fill ? 'rgba(76, 29, 149, 0.14)' : null,
        scale: 0.58,
        lineWidth: 3 + palette.lineBoost * 0.45,
      });
      arrow.sprite.position.set(mid.x, mid.y, mid.z);
      arrow.sprite.rotation.z = tangentRotation(arrowAngle);
      group.add(arrow.sprite);
      disposables.push(arrow);
    }

    group.rotation.x = RING_TILT;
    return group;
  };

  const disposeGL = () => {
    running = false;
    cancelAnimationFrame(frameId);
    frameId = 0;

    disposables.forEach(({ texture, material, canvas }) => {
      texture?.dispose();
      material?.dispose();
      canvas.width = 0;
      canvas.height = 0;
    });
    disposables.length = 0;

    renderer?.dispose();
    mount.replaceChildren();
    renderer = null;
    scene = null;
    camera = null;
    cloud = null;
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
    if (!running || !renderer || !cloud) return;

    if (!reducedMotion) rotation.spinY -= 0.004;

    rotation.targetTiltX = -pointer.y * 0.32;
    rotation.targetTiltZ = pointer.x * 0.22;
    rotation.tiltX = lerp(rotation.tiltX, rotation.targetTiltX, ROT_LERP);
    rotation.tiltZ = lerp(rotation.tiltZ, rotation.targetTiltZ, ROT_LERP);

    cloud.rotation.y = rotation.spinY + rotation.tiltZ;
    cloud.rotation.x = RING_TILT + rotation.tiltX;

    const pulse = Math.min(1, Math.hypot(pointer.x, pointer.y));
    camera.position.z = lerp(camera.position.z, baseCameraZ - pulse * baseCameraZ * 0.04, 0.08);
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
    if (width < 48 || height < 48) return;

    disposeGL();

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(34, width / height, 0.05, 100);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    cloud = buildCloud();
    scene.add(cloud);

    baseCameraZ = fitCameraDistance(camera, width, height);
    camera.position.set(0, 0, baseCameraZ);
    camera.lookAt(0, 0, 0);

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
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);

    if (cloud) {
      baseCameraZ = fitCameraDistance(camera, width, height);
      camera.position.z = baseCameraZ;
    }
  };

  const wrap = mount.closest('[data-process-word-cloud-wrap]') || mount;
  wrap.addEventListener('mousemove', onPointerMove, { passive: true });
  wrap.addEventListener('mouseleave', onPointerLeave);

  resizeObserver = new ResizeObserver(() => requestAnimationFrame(resize));
  resizeObserver.observe(mount);
  window.addEventListener('resize', resize, { passive: true });

  themeObserver = new MutationObserver(() => {
    if (!meetsWidth()) return;
    requestAnimationFrame(build);
  });
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  });

  requestAnimationFrame(build);

  return {
    start,
    stop,
    dispose: () => {
      window.removeEventListener('resize', resize);
      wrap.removeEventListener('mousemove', onPointerMove);
      wrap.removeEventListener('mouseleave', onPointerLeave);
      resizeObserver?.disconnect();
      themeObserver?.disconnect();
      disposeGL();
    },
  };
}

export function initProcessWordCloud() {
  const apis = [];

  document.querySelectorAll('[data-process-word-cloud]').forEach((mount) => {
    const api = createWordCloud(mount);
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
