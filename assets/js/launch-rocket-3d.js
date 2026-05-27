/**
 * DSYNZ — Dot-outline 3D launch rocket (matches hero globe style)
 */
import * as THREE from '../vendor/three/three.module.js';
import gsap from '../vendor/gsap/index.js';
import { ScrollTrigger } from '../vendor/gsap/ScrollTrigger.js';

gsap.registerPlugin(ScrollTrigger);

const BRAND = 0x7c3aed;
const GLOW = 0xb794f6;
const GLOW_SOFT = 0xa78bfa;

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function appendGeometryDots(geometry, matrix, target, step = 1) {
  const pos = geometry.attributes.position;
  const v = new THREE.Vector3();

  for (let i = 0; i < pos.count; i += step) {
    v.fromBufferAttribute(pos, i);
    v.applyMatrix4(matrix);
    target.push(v.x, v.y, v.z);
  }
}

function buildDotRocket() {
  const core = [];
  const matrix = new THREE.Matrix4();
  const pivot = new THREE.Vector3(0, 0.15, 0);

  // Shuttle blueprint silhouette (vertical), colored via PointsMaterial (BRAND/GLOW).
  // Fuselage
  const fuselageGeo = new THREE.CylinderGeometry(0.28, 0.34, 1.55, 22, 10);
  matrix.identity();
  matrix.makeTranslation(0, 0.1, 0);
  appendGeometryDots(fuselageGeo, matrix, core, 1);
  fuselageGeo.dispose();

  // Nose cone
  const noseGeo = new THREE.ConeGeometry(0.28, 0.62, 22, 6);
  matrix.identity();
  matrix.makeTranslation(0, 1.0, 0);
  appendGeometryDots(noseGeo, matrix, core, 1);
  noseGeo.dispose();

  // Engine bell cluster
  const bellGeo = new THREE.CylinderGeometry(0.22, 0.3, 0.28, 18, 3);
  matrix.identity();
  matrix.makeTranslation(0, -0.78, 0);
  appendGeometryDots(bellGeo, matrix, core, 1);
  bellGeo.dispose();

  // Cockpit ring cue
  const cockpitGeo = new THREE.TorusGeometry(0.14, 0.028, 10, 26);
  matrix.identity();
  matrix.makeRotationX(Math.PI / 2);
  matrix.setPosition(0, 0.72, 0.26);
  appendGeometryDots(cockpitGeo, matrix, core, 1);
  cockpitGeo.dispose();

  // Delta wings (thin extrude)
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0);
  wingShape.lineTo(0.85, -0.22);
  wingShape.lineTo(0.28, -0.9);
  wingShape.lineTo(0, -0.74);
  wingShape.closePath();

  const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.06, bevelEnabled: false, steps: 1 });
  // Right wing
  matrix.identity();
  matrix.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
  matrix.multiply(new THREE.Matrix4().makeRotationY(Math.PI));
  matrix.setPosition(0.02, -0.05, 0.03);
  appendGeometryDots(wingGeo, matrix, core, 1);
  // Left wing
  matrix.identity();
  matrix.multiply(new THREE.Matrix4().makeScale(-1, 1, 1));
  matrix.multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2));
  matrix.multiply(new THREE.Matrix4().makeRotationY(Math.PI));
  matrix.setPosition(-0.02, -0.05, 0.03);
  appendGeometryDots(wingGeo, matrix, core, 1);
  wingGeo.dispose();

  // Tail fin
  const tailShape = new THREE.Shape();
  tailShape.moveTo(0, 0);
  tailShape.lineTo(0.22, 0);
  tailShape.lineTo(0.16, 0.45);
  tailShape.lineTo(0, 0.36);
  tailShape.closePath();
  const tailGeo = new THREE.ExtrudeGeometry(tailShape, { depth: 0.05, bevelEnabled: false, steps: 1 });
  matrix.identity();
  matrix.multiply(new THREE.Matrix4().makeRotationY(Math.PI / 2));
  matrix.setPosition(0, 0.35, -0.02);
  appendGeometryDots(tailGeo, matrix, core, 1);
  tailGeo.dispose();

  const glow = [];
  const v = new THREE.Vector3();
  for (let i = 0; i < core.length; i += 3) {
    v.set(core[i], core[i + 1], core[i + 2]);
    v.sub(pivot).multiplyScalar(1.045).add(pivot);
    glow.push(v.x, v.y, v.z);
  }

  const coreGeometry = new THREE.BufferGeometry();
  coreGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(core), 3));

  const glowGeometry = new THREE.BufferGeometry();
  glowGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(glow), 3));

  const coreMaterial = new THREE.PointsMaterial({
    color: BRAND,
    size: 0.042,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const glowMaterial = new THREE.PointsMaterial({
    color: GLOW,
    size: 0.065,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.32,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const group = new THREE.Group();
  group.add(new THREE.Points(glowGeometry, glowMaterial));
  group.add(new THREE.Points(coreGeometry, coreMaterial));
  group.rotation.x = 0.02;

  return { group, coreGeometry, glowGeometry, coreMaterial, glowMaterial };
}

function createSmokeSystem() {
  const count = 48;
  const positions = new Float32Array(count * 3);
  const velocities = [];

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 0.12;
    positions[i * 3 + 1] = -0.78 - Math.random() * 0.25;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.12;
    velocities.push({
      x: (Math.random() - 0.5) * 0.012,
      y: -0.018 - Math.random() * 0.02,
      z: (Math.random() - 0.5) * 0.012,
      life: Math.random(),
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color: GLOW_SOFT,
    size: 0.055,
    transparent: true,
    opacity: 0.55,
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

function updateSmoke(smoke, dt, intensity) {
  const { positions, velocities, material } = smoke;
  const speed = lerp(0.85, 2.4, intensity);

  for (let i = 0; i < velocities.length; i += 1) {
    const v = velocities[i];
    v.life += dt * speed;

    positions[i * 3] += v.x * speed;
    positions[i * 3 + 1] += v.y * speed;
    positions[i * 3 + 2] += v.z * speed;

    if (v.life > 1) {
      v.life = 0;
      positions[i * 3] = (Math.random() - 0.5) * 0.1;
      positions[i * 3 + 1] = -0.78 - Math.random() * 0.08;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
      v.x = (Math.random() - 0.5) * 0.012;
      v.y = -0.018 - Math.random() * 0.02;
      v.z = (Math.random() - 0.5) * 0.012;
    }
  }

  material.opacity = lerp(0.35, 0.75, intensity);
  material.size = lerp(0.05, 0.09, intensity);
  smoke.geometry.attributes.position.needsUpdate = true;
}

export function setupLaunchRocket({ root, section, prefersReducedMotion = false }) {
  const canvasHost = root.querySelector('[data-launch-rocket-canvas]');
  const stack = root.querySelector('.launch-rocket-stack');
  const pad = root.querySelector('.launch-rocket-pad');
  if (!canvasHost || !stack || !section) return null;

  root.classList.add('is-ready');

  let renderer;
  let scene;
  let camera;
  let rocketGroup;
  let rocketParts;
  let smoke;
  let frameId = 0;
  let running = false;
  let resizeObserver;
  let launchIntensity = 0;
  let clock = new THREE.Clock();

  const disposeGL = () => {
    running = false;
    cancelAnimationFrame(frameId);

    rocketParts?.coreGeometry?.dispose();
    rocketParts?.glowGeometry?.dispose();
    rocketParts?.coreMaterial?.dispose();
    rocketParts?.glowMaterial?.dispose();
    smoke?.geometry?.dispose();
    smoke?.material?.dispose();

    renderer?.dispose();
    canvasHost.replaceChildren();
    renderer = null;
    scene = null;
    camera = null;
    rocketGroup = null;
    rocketParts = null;
    smoke = null;
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
    camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 40);
    camera.position.set(0.55, 0.2, 3.95);
    camera.lookAt(0, 0.15, 0);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    canvasHost.appendChild(renderer.domElement);

    rocketParts = buildDotRocket();
    rocketGroup = rocketParts.group;
    rocketGroup.scale.setScalar(0.92);
    scene.add(rocketGroup);

    const smokeSystem = createSmokeSystem();
    smoke = smokeSystem;
    scene.add(smokeSystem.points);

    running = true;
    clock.start();
    tick();
  };

  const tick = () => {
    if (!running || !renderer) return;

    const elapsed = clock.getElapsedTime();
    const dt = clock.getDelta();

    if (rocketGroup && !prefersReducedMotion) {
      const bob = Math.sin(elapsed * 2.4) * 0.035;
      const sway = Math.sin(elapsed * 1.6) * 0.035;
      rocketGroup.position.y = bob - launchIntensity * 0.08;
      rocketGroup.rotation.z = sway;
      rocketGroup.rotation.y = Math.sin(elapsed * 0.9) * 0.08;
    }

    if (smoke) updateSmoke(smoke, dt, launchIntensity);

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

    const tl = gsap.timeline({ scrollTrigger: launchScroll });
    tl.to(stack, { y: () => launchY, opacity: 0, ease: 'power2.in' }, 0);
    if (pad) tl.to(pad, { opacity: 0.25, scaleX: 1.15 }, 0);
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
