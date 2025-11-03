/* eslint-disable */
#!/usr/bin/env node

/**
 * Checks if the current Node.js version meets minimum requirements for Vite (>=20.19.0).
 * Exits with a clear error and code 1 if requirements are not met.
 */

const MIN_NODE_VERSION = [20, 19, 0];
const current = process.versions.node.split('.').map(Number);

function versionCompare(a, b) {
    for (let i = 0; i < Math.max(a.length, b.length); ++i) {
        const ai = a[i] || 0;
        const bi = b[i] || 0;
        if (ai > bi) return 1;
        if (ai < bi) return -1;
    }
    return 0;
}

if (versionCompare(current, MIN_NODE_VERSION) < 0) {
    console.error(
        `ERROR: Node.js version ${process.versions.node} detected.\n` +
        `Vite requires Node.js >=${MIN_NODE_VERSION.join('.')}.\n` +
        `Please upgrade your Node.js version (e.g. using nvm) before running the dev server.\n` +
        `See ./README.md for quick upgrade instructions.`
    );
    process.exit(1);
}

// No output on success; allow startup
