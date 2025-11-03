# React + Vite

---

## 🚨 CRITICAL: NODE.JS REQUIREMENT 🚨

**Vite and this project _require_ Node.js version >= 20.19.0.**  
Build and dev WILL FAIL on Node < 20.19.0 due to Vite engine requirements.

**Symptoms of Failure (with older Node.js):**
- `TypeError: crypto.hash is not a function`
- `vite requires Node.js >=20.19.0`
- Immediate exit from `predev` with a clear error

**How to Fix: Upgrade your Node.js version**

1. **Check Node version:**
   ```bash
   node --version
   # Output must be >= 20.19.0
   ```
2. **Upgrade Node.js (recommended: nvm):**
   ```bash
   nvm install 20.19.0
   nvm use 20.19.0
   ```
3. **Verify & Start Dev Server:**
   ```bash
   node --version         # Should show >= 20.19.0
   npm run dev            # Should start on port 3000, NO version error
   ```

**Fail-fast checks:**
- The scripts (`dev`, `build`, `preview`) call `npm run predev`, which runs **scripts/check-node-version.cjs**.
- If Node < 20.19.0, startup fails with a loud, clear error before Vite runs.

---

If you see a version warning:
- **No code fix is possible. You MUST upgrade your environment and restart.**

**Verification steps:**
1. Run `node --version`. Confirm you have **v20.19.0** or newer.
2. Run `npm run dev` from this folder. The server should start and render a local preview URL (http://localhost:3000).
3. If you see a Node version error on start, **repeat upgrade steps above.**

**No workaround exists for old Node versions.**  
Once upgraded, normal build/dev flows resume.

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## ⚠️ Instructions for Future Agents/Users ⚠️

The build/server will **fail immediately** if Node.js version is less than 20.19.0. This is by design due to Vite's engine requirements.  
**No code changes to this repo can resolve the issue. Only an environment upgrade (Node.js >= 20.19.0) will unblock the project.**

**How to Fix Build Failure:**  
1. Check your Node version:
   ```bash
   node --version
   ```
   If it’s lower than 20.19.0, upgrade using Node Version Manager (`nvm`):
   ```bash
   nvm install 20.19.0
   nvm use 20.19.0
   ```
2. After upgrading Node.js, try running:
   ```bash
   npm run dev
   ```
   The dev server should start successfully with Node 20.19.0 or newer, and your local preview should show up on port 3000.

**Verification for Future Agents/Users:**  
- If you attempt to start the dev server with Node < 20.19.0, the process will exit with an error from `scripts/check-node-version.cjs` before Vite runs.
- Build, preview, and other critical scripts also use this version check (`predev`).
- To verify correct setup:
  1. Run `node --version`, confirm output is `v20.19.0` or higher.
  2. Run `npm run dev` from the project root (`tizen_frontend`).  
      - The server should start without Node version errors and output should show a local preview URL (usually http://localhost:3000).
  3. If startup fails with a Node version error, repeat the upgrade steps above.

**No code workaround exists for Node < 20.19.0**—upgrade is required.  
Once Node is upgraded, the blocking issue is resolved and the dev server launches normally.

---

---

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
