/**
 * Copy pinned enhancement libraries into assets/vendor for self-hosted ESM imports.
 */
import { cpSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const nm = join(root, 'node_modules');

mkdirSync(join(root, 'assets/vendor/gsap'), { recursive: true });
mkdirSync(join(root, 'assets/vendor/lenis'), { recursive: true });
mkdirSync(join(root, 'assets/vendor/three'), { recursive: true });

for (const file of readdirSync(join(nm, 'gsap'))) {
  if (file.endsWith('.js')) {
    cpSync(join(nm, 'gsap', file), join(root, 'assets/vendor/gsap', file));
  }
}

cpSync(join(nm, 'lenis/dist/lenis.mjs'), join(root, 'assets/vendor/lenis/lenis.mjs'));
// three.module.js re-exports from ./three.core.js — both files are required.
for (const file of ['three.module.js', 'three.core.js']) {
  cpSync(join(nm, 'three/build', file), join(root, 'assets/vendor/three', file));
}

console.log('Vendor libraries copied to assets/vendor/');
