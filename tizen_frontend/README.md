# React + Vite

**Critical Node.js Requirement:**  
> 🚨 This project requires **Node.js version 20.19.0 or newer** for Vite to work.  
> If you see errors such as  
> `TypeError: crypto.hash is not a function`  
> or  
> `vite requires Node.js >=20.19.0`  
> **You MUST upgrade Node.js to version 20.19.0 or higher before running `npm run dev`.**
>  
> The dev, build, and preview scripts have an automatic version check (`predev`) and will exit with a clear error if your Node version is too old.

---

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
