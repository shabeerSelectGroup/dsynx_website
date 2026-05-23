/**
 * DSYNX — Hero dot globe + 3D orbital icons (extruded SVG strokes)
 */
import * as THREE from 'https://esm.sh/three@0.170.0';
import { SVGLoader } from 'https://esm.sh/three@0.170.0/examples/jsm/loaders/SVGLoader.js';
import { GROWTH_LOOP_STEPS } from './brand.js';
import { ICONS } from './components.js';

const BRAND_PURPLE = 0x7c3aed;
const BRAND_PURPLE_LIGHT = 0x9f67ff;
const DOT_COUNT = 2800;
const GLOBE_RADIUS = 1.92;
const ORBIT_RADIUS = GLOBE_RADIUS * 1.3;
const ICON_SIZE = 0.42;
const TUBE_RADIUS = ICON_SIZE * 0.075;
const ICON_HALF_DIAG = (ICON_SIZE * Math.SQRT2) / 2;
const CONTENT_RADIUS = ORBIT_RADIUS + ICON_HALF_DIAG + TUBE_RADIUS * 2;
const FIT_PAD = 1.11;
const ICON_VIEW = 24;

const svgLoader = new SVGLoader();
const iconPrototypeCache = new Map();
let sharedIconMaterial;

const _orbitUp = new THREE.Vector3(0, 1, 0);
const _axisX = new THREE.Vector3(1, 0, 0);
const _normal = new THREE.Vector3();
const _quat = new THREE.Quaternion();
const _worldPos = new THREE.Vector3();
const _radial = new THREE.Vector3();
const _box = new THREE.Box3();
const _center = new THREE.Vector3();

function pathDataFromIcon(iconHtml) {
  const match = iconHtml.match(/\sd="([^"]+)"/);
  return match ? match[1] : '';
}

function iconSvgMarkup(iconKey) {
  const pathD = pathDataFromIcon(ICONS[iconKey] || ICONS.code);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ICON_VIEW} ${ICON_VIEW}"><path d="${pathD}"/></svg>`;
}

function getIconMaterial() {
  if (!sharedIconMaterial) {
    sharedIconMaterial = new THREE.MeshStandardMaterial({
      color: BRAND_PURPLE,
      emissive: BRAND_PURPLE_LIGHT,
      emissiveIntensity: 0.42,
      metalness: 0.22,
      roughness: 0.38,
      depthTest: true,
      depthWrite: true,
    });
  }
  return sharedIconMaterial;
}

function points2DToCurve3D(points2D) {
  const scale = ICON_SIZE / ICON_VIEW;
  const pts3d = points2D.map(
    (p) => new THREE.Vector3((p.x - ICON_VIEW / 2) * scale, -(p.y - ICON_VIEW / 2) * scale, 0)
  );

  if (pts3d.length < 2) return null;
  if (pts3d.length === 2) {
    return new THREE.LineCurve3(pts3d[0], pts3d[1]);
  }
  return new THREE.CatmullRomCurve3(pts3d, false, 'catmullrom', 0.35);
}

function addTubeAlongCurve(group, curve) {
  const length = curve.getLength();
  const segments = Math.max(6, Math.ceil(length / (TUBE_RADIUS * 1.6)));
  const geometry = new THREE.TubeGeometry(curve, segments, TUBE_RADIUS, 7, false);
  const mesh = new THREE.Mesh(geometry, getIconMaterial());
  mesh.renderOrder = 2;
  group.add(mesh);
}

function buildIcon3DGroup(iconKey) {
  const group = new THREE.Group();
  const { paths } = svgLoader.parse(iconSvgMarkup(iconKey));

  paths.forEach((path) => {
    const subPaths = path.subPaths?.length ? path.subPaths : [path];
    subPaths.forEach((subPath) => {
      const points2D = subPath.getPoints(36);
      const curve = points2DToCurve3D(points2D);
      if (curve) addTubeAlongCurve(group, curve);
    });
  });

  if (group.children.length === 0) return group;

  _box.setFromObject(group);
  _box.getCenter(_center);
  group.children.forEach((child) => {
    child.position.sub(_center);
  });

  return group;
}

function disposeObject3D(root, { disposeGeometry = true } = {}) {
  root.traverse((child) => {
    if (child.isMesh && disposeGeometry && child.geometry) {
      child.geometry.dispose();
    }
  });
}

function getIconPrototype(iconKey) {
  if (!iconPrototypeCache.has(iconKey)) {
    iconPrototypeCache.set(iconKey, buildIcon3DGroup(iconKey));
  }
  return iconPrototypeCache.get(iconKey);
}

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

function createOrbitRing(radius) {
  const curve = new THREE.EllipseCurve(0, 0, radius, radius, 0, Math.PI * 2, false, 0);
  const points = curve.getPoints(128).map((p) => new THREE.Vector3(p.x, 0, p.y));
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: BRAND_PURPLE_LIGHT,
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
    depthTest: true,
  });
  return new THREE.Line(geometry, material);
}

function createIcon3D(iconKey) {
  return getIconPrototype(iconKey).clone(true);
}

function iconSpinSpeed(index) {
  return (index % 2 === 0 ? 1 : -1) * (0.022 + (index % 4) * 0.003);
}

/** Evenly distributed orbital planes around the globe (golden-sphere normals). */
function applyOrbitOrientation(pivot, index, total) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const inclination = Math.acos(1 - (2 * (index + 0.5)) / total);
  const azimuth = golden * index;

  _normal.set(
    Math.sin(inclination) * Math.cos(azimuth),
    Math.cos(inclination),
    Math.sin(inclination) * Math.sin(azimuth)
  );

  _quat.setFromUnitVectors(_orbitUp, _normal);
  pivot.quaternion.copy(_quat);
  pivot.rotateY((index / total) * Math.PI * 2);
}

function orbitalSpeed(index) {
  const base = 0.0042;
  const direction = index % 2 === 0 ? 1 : -1;
  return direction * (base + (index % 3) * 0.00035);
}

/** Frame the full globe + orbits + icons inside the canvas (object-fit: contain). */
function fitCameraToContent(camera, width, height) {
  const vFov = (camera.fov * Math.PI) / 180;
  const aspect = Math.max(width / height, 0.01);
  const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
  const r = CONTENT_RADIUS * FIT_PAD;
  const z = Math.max(r / Math.tan(vFov / 2), r / Math.tan(hFov / 2));
  camera.position.set(0, 0, z);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();
}

export function initHeroGlobe() {
  const mount = document.querySelector('[data-hero-globe]');
  if (!mount) return null;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = () => window.matchMedia('(min-width: 1024px)').matches;

  let renderer;
  let scene;
  let camera;
  let globe;
  let glow;
  let depthShell;
  let worldGroup;
  let satellites = [];
  let frameId = 0;
  let running = false;
  let resizeObserver;

  const getSize = () => {
    const { width, height } = mount.getBoundingClientRect();
    return {
      width: Math.max(1, Math.floor(width)),
      height: Math.max(1, Math.floor(height)),
    };
  };

  const animate = () => {
    if (!running || !globe || !renderer || !camera) return;

    if (!reducedMotion) {
      globe.rotation.y += 0.0018;
      globe.rotation.x += 0.00035;
      glow.rotation.y = globe.rotation.y * 1.02;
      glow.rotation.x = globe.rotation.x;
      depthShell.rotation.copy(globe.rotation);

      satellites.forEach(({ pivot, speed, axisRoll, spinSpeed, rollAngle }) => {
        pivot.rotation.y += speed;
        rollAngle.value += spinSpeed;

        axisRoll.getWorldPosition(_worldPos);
        _radial.copy(_worldPos).normalize();
        axisRoll.quaternion.setFromUnitVectors(_axisX, _radial);
        axisRoll.rotateX(rollAngle.value);
      });
    }

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

  const dispose = () => {
    stop();
    resizeObserver?.disconnect();
    resizeObserver = null;

    if (scene && worldGroup) {
      satellites.forEach(({ plane, ring }) => {
        ring.geometry?.dispose();
        ring.material?.dispose();
        worldGroup.remove(plane);
      });
    }
    satellites = [];
    worldGroup = null;

    if (globe) {
      globe.geometry?.dispose();
      globe.material?.dispose();
    }
    if (glow) {
      glow.geometry?.dispose();
      glow.material?.dispose();
    }
    if (depthShell) {
      depthShell.geometry?.dispose();
      depthShell.material?.dispose();
    }

    renderer?.dispose();
    mount.replaceChildren();

    iconPrototypeCache.forEach((group) => disposeObject3D(group));
    iconPrototypeCache.clear();
    sharedIconMaterial?.dispose();
    sharedIconMaterial = null;

    renderer = null;
    scene = null;
    camera = null;
    globe = null;
    glow = null;
    depthShell = null;
  };

  const resize = () => {
    if (!renderer || !camera) return;
    const { width, height } = getSize();
    camera.aspect = width / height;
    fitCameraToContent(camera, width, height);
    renderer.setSize(width, height, false);
  };

  const buildSatellites = (parent) => {
    const total = GROWTH_LOOP_STEPS.length;

    satellites = GROWTH_LOOP_STEPS.map((step, index) => {
      const plane = new THREE.Object3D();
      applyOrbitOrientation(plane, index, total);

      const spin = new THREE.Object3D();
      spin.rotation.y = (index / total) * Math.PI * 2;
      plane.add(spin);

      const ring = createOrbitRing(ORBIT_RADIUS);
      spin.add(ring);

      const body = new THREE.Object3D();
      body.position.set(ORBIT_RADIUS, 0, 0);

      const axisRoll = new THREE.Object3D();
      body.add(axisRoll);

      const iconOrient = new THREE.Object3D();
      iconOrient.rotation.y = Math.PI / 2;
      axisRoll.add(iconOrient);

      const iconRoot = createIcon3D(step.icon);
      iconOrient.add(iconRoot);
      spin.add(body);

      parent.add(plane);
      return {
        plane,
        pivot: spin,
        speed: orbitalSpeed(index),
        ring,
        axisRoll,
        iconRoot,
        spinSpeed: iconSpinSpeed(index),
        rollAngle: { value: (index / total) * Math.PI * 2 },
      };
    });
  };

  const build = () => {
    dispose();

    if (!isDesktop()) return;

    const { width, height } = getSize();
    if (width < 2 || height < 2) return;

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);

    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(0x000000, 0);
    renderer.sortObjects = true;
    mount.appendChild(renderer.domElement);

    depthShell = new THREE.Mesh(
      new THREE.SphereGeometry(GLOBE_RADIUS * 0.94, 56, 56),
      new THREE.MeshBasicMaterial({
        colorWrite: false,
        depthWrite: true,
        depthTest: true,
      })
    );
    worldGroup = new THREE.Group();
    scene.add(worldGroup);

    depthShell.renderOrder = 0;
    worldGroup.add(depthShell);

    const coreGeometry = new THREE.BufferGeometry();
    coreGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(fibonacciSpherePoints(DOT_COUNT, GLOBE_RADIUS), 3)
    );

    globe = new THREE.Points(
      coreGeometry,
      new THREE.PointsMaterial({
        color: BRAND_PURPLE,
        size: 0.045,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.92,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: true,
      })
    );
    globe.renderOrder = 1;
    worldGroup.add(globe);

    const glowGeometry = new THREE.BufferGeometry();
    glowGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(fibonacciSpherePoints(420, GLOBE_RADIUS * 1.03), 3)
    );

    glow = new THREE.Points(
      glowGeometry,
      new THREE.PointsMaterial({
        color: BRAND_PURPLE_LIGHT,
        size: 0.07,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: true,
      })
    );
    glow.renderOrder = 1;
    worldGroup.add(glow);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.9);
    keyLight.position.set(5, 8, 10);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(BRAND_PURPLE_LIGHT, 0.28);
    fillLight.position.set(-6, -4, 8);
    scene.add(fillLight);

    buildSatellites(worldGroup);
    fitCameraToContent(camera, width, height);
    start();
  };

  requestAnimationFrame(build);

  resizeObserver = new ResizeObserver(() => {
    if (!isDesktop()) {
      dispose();
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
    if (isDesktop()) build();
    else dispose();
  };

  window.addEventListener('resize', onBreakpoint, { passive: true });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else start();
  });

  return () => {
    window.removeEventListener('resize', onBreakpoint);
    dispose();
  };
}
