/**
 * DSYNZ — Brand wireframe space shuttle stack (growth-loop hero visual)
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

function buildWireframeRocket() {
  const disposables = [];
  const shuttle = new THREE.Group();
  const SEG_R = 36;
  const SEG_H = 12;

  const addWire = (geometry) => {
    const glowGeo = geometry.clone();
    const auraGeo = geometry.clone();

    const auraMat = new THREE.MeshBasicMaterial({
      color: GLOW_SOFT,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const aura = new THREE.Mesh(auraGeo, auraMat);
    aura.scale.setScalar(1.14);

    const glowMat = new THREE.MeshBasicMaterial({
      color: GLOW,
      wireframe: true,
      transparent: true,
      opacity: 0.48,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.scale.setScalar(1.08);

    const wireMat = new THREE.MeshBasicMaterial({
      color: BRAND,
      wireframe: true,
      transparent: true,
      opacity: 1,
    });
    const wire = new THREE.Mesh(geometry, wireMat);

    const part = new THREE.Group();
    part.add(aura);
    part.add(glow);
    part.add(wire);
    disposables.push({
      geometry,
      glowGeo,
      auraGeo,
      materials: [wireMat, glowMat, auraMat],
    });
    return part;
  };

  const addPart = (geometry, x, y, z, rotX = 0, rotY = 0, rotZ = 0) => {
    const part = addWire(geometry);
    part.position.set(x, y, z);
    part.rotation.set(rotX, rotY, rotZ);
    shuttle.add(part);
    return part;
  };

  const addRing = (radius, y, tube = 0.01) => {
    addPart(new THREE.TorusGeometry(radius, tube, 8, SEG_R), 0, y, 0, Math.PI / 2, 0, 0);
  };

  // External fuel tank — central spine
  addPart(new THREE.CylinderGeometry(0.34, 0.36, 2.05, SEG_R, SEG_H), 0, 0, 0);
  addPart(new THREE.ConeGeometry(0.34, 0.38, SEG_R, 6), 0, 1.22, 0);
  addPart(new THREE.CylinderGeometry(0.36, 0.34, 0.14, SEG_R, 2), 0, -1.1, 0);

  for (let i = 0; i < 6; i += 1) {
    addRing(0.358, -0.75 + i * 0.3, 0.009);
  }

  // Solid rocket boosters
  const srbX = 0.54;
  const srbY = -0.04;
  addPart(new THREE.CylinderGeometry(0.13, 0.14, 1.78, SEG_R, 8), -srbX, srbY, 0);
  addPart(new THREE.CylinderGeometry(0.13, 0.14, 1.78, SEG_R, 8), srbX, srbY, 0);
  addPart(new THREE.ConeGeometry(0.13, 0.3, SEG_R, 5), -srbX, 0.98, 0);
  addPart(new THREE.ConeGeometry(0.13, 0.3, SEG_R, 5), srbX, 0.98, 0);
  addPart(new THREE.CylinderGeometry(0.09, 0.13, 0.22, 24, 3), -srbX, -1.08, 0);
  addPart(new THREE.CylinderGeometry(0.09, 0.13, 0.22, 24, 3), srbX, -1.08, 0);

  for (let i = 0; i < 4; i += 1) {
    addPart(new THREE.TorusGeometry(0.142, 0.008, 6, SEG_R), -srbX, -0.5 + i * 0.38, 0, Math.PI / 2, 0, 0);
    addPart(new THREE.TorusGeometry(0.142, 0.008, 6, SEG_R), srbX, -0.5 + i * 0.38, 0, Math.PI / 2, 0, 0);
  }

  // SRB attach struts
  addPart(new THREE.CylinderGeometry(0.025, 0.025, 0.38, 12, 1), -0.36, 0.35, 0, 0, 0, Math.PI / 2);
  addPart(new THREE.CylinderGeometry(0.025, 0.025, 0.38, 12, 1), 0.36, 0.35, 0, 0, 0, Math.PI / 2);
  addPart(new THREE.CylinderGeometry(0.025, 0.025, 0.38, 12, 1), -0.36, -0.45, 0, 0, 0, Math.PI / 2);
  addPart(new THREE.CylinderGeometry(0.025, 0.025, 0.38, 12, 1), 0.36, -0.45, 0, 0, 0, Math.PI / 2);

  // Orbiter fuselage — mounted on tank
  const orbZ = 0.42;
  addPart(new THREE.CylinderGeometry(0.16, 0.18, 1.05, SEG_R, 7), 0, 0.18, orbZ);
  addPart(new THREE.ConeGeometry(0.16, 0.42, SEG_R, 6), 0, 0.92, orbZ);
  addPart(new THREE.CylinderGeometry(0.18, 0.16, 0.28, SEG_R, 3), 0, -0.38, orbZ);

  addPart(new THREE.TorusGeometry(0.175, 0.012, 8, SEG_R), 0, 0.22, orbZ, Math.PI / 2, 0, 0);
  addPart(new THREE.TorusGeometry(0.175, 0.012, 8, SEG_R), 0, -0.02, orbZ, Math.PI / 2, 0, 0);

  // Delta wings
  const wingShape = new THREE.Shape();
  wingShape.moveTo(0, 0);
  wingShape.lineTo(0.82, -0.1);
  wingShape.lineTo(0.72, -0.52);
  wingShape.lineTo(0.08, -0.32);
  wingShape.closePath();
  const wingGeo = new THREE.ExtrudeGeometry(wingShape, { depth: 0.045, bevelEnabled: false, steps: 1 });

  const leftWing = addWire(wingGeo.clone());
  leftWing.position.set(-0.04, 0.08, orbZ - 0.02);
  shuttle.add(leftWing);

  const rightWing = addWire(wingGeo.clone());
  rightWing.scale.x = -1;
  rightWing.position.set(0.04, 0.08, orbZ - 0.02);
  shuttle.add(rightWing);
  wingGeo.dispose();

  // Vertical stabilizer
  const tailShape = new THREE.Shape();
  tailShape.moveTo(0, 0);
  tailShape.lineTo(0.38, 0.02);
  tailShape.lineTo(0.22, -0.55);
  tailShape.closePath();
  const tailGeo = new THREE.ExtrudeGeometry(tailShape, { depth: 0.035, bevelEnabled: false, steps: 1 });
  const tail = addWire(tailGeo);
  tail.position.set(0, 0.28, orbZ - 0.32);
  tail.rotation.x = Math.PI / 2;
  shuttle.add(tail);
  tailGeo.dispose();

  // Orbiter OMS pods
  addPart(new THREE.CylinderGeometry(0.05, 0.05, 0.22, 16, 2), -0.12, -0.08, orbZ - 0.12, Math.PI / 2, 0, 0);
  addPart(new THREE.CylinderGeometry(0.05, 0.05, 0.22, 16, 2), 0.12, -0.08, orbZ - 0.12, Math.PI / 2, 0, 0);

  // Main engine bells (visible from elevated view)
  addPart(new THREE.CylinderGeometry(0.06, 0.1, 0.16, 20, 2), -0.1, -0.58, orbZ);
  addPart(new THREE.CylinderGeometry(0.06, 0.1, 0.16, 20, 2), 0.1, -0.58, orbZ);
  addPart(new THREE.CylinderGeometry(0.06, 0.1, 0.16, 20, 2), 0, -0.62, orbZ);

  // Blueprint-style silhouette halo (soft outer shell)
  const haloGeo = new THREE.SphereGeometry(1.15, 24, 16);
  const haloMat = new THREE.MeshBasicMaterial({
    color: GLOW_SOFT,
    wireframe: true,
    transparent: true,
    opacity: 0.06,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const halo = new THREE.Mesh(haloGeo, haloMat);
  shuttle.add(halo);
  disposables.push({ geometry: haloGeo, materials: [haloMat] });

  shuttle.rotation.set(0.04, 0.18, 0);

  const group = new THREE.Group();
  group.add(shuttle);
  group.scale.setScalar(1.05);

  return { group, rocket: shuttle, disposables };
}

function frameRocket(camera, object, padding = 1.04) {
  const box = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  const size = new THREE.Vector3();
  box.getCenter(center);
  box.getSize(size);

  const maxDim = Math.max(size.x, size.y, size.z);
  const fovRad = (camera.fov * Math.PI) / 180;
  const distance = (maxDim / 2 / Math.tan(fovRad / 2)) * padding;

  // Elevated top-down blueprint angle (matches reference composition)
  camera.position.set(
    center.x + distance * 0.06,
    center.y + distance * 0.94,
    center.z + distance * 0.32,
  );
  camera.lookAt(center);
  camera.updateProjectionMatrix();
}

function createSmokeSystem() {
  const count = 48;
  const positions = new Float32Array(count * 3);
  const velocities = [];

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * 0.28;
    positions[i * 3 + 1] = -1.15 - Math.random() * 0.15;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.22;
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
    opacity: 0.5,
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
      positions[i * 3] = (Math.random() - 0.5) * 0.28;
      positions[i * 3 + 1] = -1.15 - Math.random() * 0.08;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.22;
      v.x = (Math.random() - 0.5) * 0.012;
      v.y = -0.018 - Math.random() * 0.02;
      v.z = (Math.random() - 0.5) * 0.012;
    }
  }

  material.opacity = lerp(0.3, 0.72, intensity);
  material.size = lerp(0.05, 0.09, intensity);
  smoke.geometry.attributes.position.needsUpdate = true;
}

function disposeRocketParts(parts) {
  parts?.disposables?.forEach(({ geometry, glowGeo, auraGeo, materials }) => {
    geometry?.dispose();
    glowGeo?.dispose();
    auraGeo?.dispose();
    materials?.forEach((m) => m.dispose());
  });
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

    disposeRocketParts(rocketParts);
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

    rocketParts = buildWireframeRocket();
    rocketGroup = rocketParts.group;
    scene.add(rocketGroup);
    frameRocket(camera, rocketGroup);

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
      const bob = Math.sin(elapsed * 2.4) * 0.03;
      const sway = Math.sin(elapsed * 1.5) * 0.025;
      rocketGroup.position.y = bob - launchIntensity * 0.08;
      rocketGroup.rotation.y = Math.sin(elapsed * 0.85) * 0.025;
      rocketGroup.rotation.z = sway;
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
    if (rocketGroup) frameRocket(camera, rocketGroup);
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
