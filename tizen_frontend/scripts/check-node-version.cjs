'use strict';

/**
 * Checks if the current Node.js version meets minimum requirements for Vite (>=20.19.0).
 * Exits with a clear error and code 1 if requirements are not met.
 * This script runs via 'node' explicitly. Using CommonJS to ensure compatibility.
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
        `\nERROR: Node.js version ${process.versions.node} detected.\n` +
        `Vite requires Node.js >=${MIN_NODE_VERSION.join('.')}\n` +
        `\n🚨 CRITICAL: No code workaround exists for Node < ${MIN_NODE_VERSION.join('.')}.\n` +
        `You MUST upgrade your Node.js environment (see instructions below).\n` +
        `\nHow to Fix:\n` +
        `  - Upgrade Node.js (recommended: use nvm).\n` +
        `  - See ./README.md for quick upgrade instructions.\n` +
        `\nOnce you upgrade to Node ${MIN_NODE_VERSION.join('.')} or newer, restart your dev server and the build will succeed.\n` +
        `\nFor support, see project instructions in README.md.\n`
    );
    process.exit(1);
}

// No output on success; allow startup
