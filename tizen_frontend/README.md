# React + Vite

**Critical Node.js Requirement:**  
This project requires **Node.js version 20.19.0 or newer** for Vite to work.  
If you see errors like  
`TypeError: crypto.hash is not a function`  
or  
`vite requires Node.js >=20.19.0`  
please **upgrade your Node.js version** before running `npm run dev`.

> ℹ️ **Automatic Node version check in dev script:**  
> When you run `npm run dev`, it automatically checks your Node.js version and exits with a clear error if it's below 20.19.0.  
> See below for upgrade instructions.

You can check your Node.js version with:
```bash
node --version
```
Upgrade using Node Version Manager (`nvm`):
```bash
nvm install 20.19.0
nvm use 20.19.0
```

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
