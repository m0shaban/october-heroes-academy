# Build, TS Config, and Deployment Analysis

## Executive Summary
The October Heroes Academy application is a single-page React marketing website built using Vite 6, TypeScript 5.8, and Tailwind CSS v4. Since the site utilizes a single-page design with anchor-link navigation and targets a custom domain (`https://octoberheroes.com/`), deploying to GitHub Pages requires carefully configuring Vite's base path depending on the deployment URL and resolving SPA routing redirects via a `404.html` fallback.

---

## 1. Project Configuration Overview

### 1.1 `package.json` Analysis
- **Build Engine**: Vite (`v6.2.3`) is used for compiling and serving the frontend.
- **Key Scripts**:
  - `npm run dev`: Starts the Vite dev server with host/port parameters (`vite --port=3000 --host=0.0.0.0`).
  - `npm run build`: Bundles the application using Vite (`vite build`).
  - `npm run lint`: Performs static type checking using the TypeScript compiler (`tsc --noEmit`).
  - `npm run clean`: Cleans past builds (`rm -rf dist server.js`). Note that this is a Unix-style command and might fail on Windows if run directly in CMD/PowerShell without Git Bash, but is fine in CI environments.
- **Dependencies**:
  - React 19 (`react` and `react-dom` version `^19.0.1`).
  - Tailwind CSS v4 (`@tailwindcss/vite` and `tailwindcss` version `^4.1.14`).
  - Internationalization (`i18next` and `react-i18next`).
  - Document head management (`react-helmet-async`).
  - Animations and icons (`lucide-react`, `motion`).

### 1.2 `tsconfig.json` Analysis
- **Target**: `ES2022` with module format `ESNext` and module resolution `bundler`.
- **Key Configs**:
  - `allowJs: true` and `allowImportingTsExtensions: true` are enabled.
  - `noEmit: true` is enabled because Vite handles transpile/build tasks.
  - **Path Aliases**:
    ```json
    "paths": {
      "@/*": [
        "./*"
      ]
    }
    ```
    This maps imports starting with `@/` to the project root directory.

### 1.3 `vite.config.ts` Analysis
- **Plugins**: React plugin (`@vitejs/plugin-react`) and Tailwind CSS v4 plugin (`@tailwindcss/vite`).
- **Path Resolution**: Configured to match the path alias in `tsconfig.json`:
  ```typescript
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  }
  ```
- **HMR Config**: Conditionally disables HMR based on the `DISABLE_HMR` environment variable.
- **Missing Setting**: There is currently no `base` property configured in the exported config object, meaning it defaults to `/`.

---

## 2. Base Path Configuration for GitHub Pages

GitHub Pages hosting generally follows one of two path configurations:

### Option A: Custom Domain (e.g. `https://octoberheroes.com/`)
- **Behavior**: The site is served from the root of the domain.
- **Vite Base Configuration**: Needs to be `/` (default).
- **App Metadata**: `src/App.tsx` contains metadata already referencing `https://octoberheroes.com/` as the canonical URL (e.g. `<link rel="canonical" href="https://octoberheroes.com/" />`), implying this is the primary target.

### Option B: GitHub Repository Subdirectory (e.g. `https://<username>.github.io/<repo-name>/`)
- **Behavior**: The site is served from a subdirectory named after the GitHub repository.
- **Vite Base Configuration**: Needs to be `/<repo-name>/`. If left as `/`, asset references like `/assets/index-*.js` will look in `https://<username>.github.io/assets/...` instead of `https://<username>.github.io/<repo-name>/assets/...`, resulting in blank pages and 404 errors.

### Proposed Dynamic Base Path Config
To support both seamlessly without manual code edits, `vite.config.ts` should be updated to read the base path from an environment variable:

```typescript
export default defineConfig(() => {
  return {
    base: process.env.VITE_BASE_PATH || '/',
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    // ... rest of config
  };
});
```

During build time, the deployment workflow can set `VITE_BASE_PATH` dynamically.

---

## 3. GitHub Actions CI/CD Workflow (`deploy.yml`)

The following YAML configures a GitHub Actions workflow that compiles the React SPA and deploys the generated `dist/` directory to the `gh-pages` branch.

**Proposed Path**: `.github/workflows/deploy.yml`

```yaml
name: Build and Deploy to GitHub Pages

on:
  push:
    branches:
      - main # Trigger on pushes to the main branch

permissions:
  contents: write # Required for deploying to the gh-pages branch

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linting and type checks
        run: npm run lint

      - name: Build application
        run: npm run build
        env:
          # If hosting on https://<username>.github.io/<repo-name>/, uncomment the line below:
          # VITE_BASE_PATH: /${{ github.event.repository.name }}/
          # If hosting on a custom domain (e.g. https://octoberheroes.com/), use the line below:
          VITE_BASE_PATH: /

      - name: Add 404.html SPA Routing Fallback
        run: |
          # Copy the generated index.html as 404.html in the dist directory so GitHub Pages
          # fallback requests are directed back into the SPA bundle.
          cp dist/index.html dist/404.html

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          folder: dist
          branch: gh-pages # Target branch for Pages deployment
          clean: true
```

---

## 4. SPA Routing & 404.html Redirect Strategy for GitHub Pages

Since GitHub Pages is a static file hosting service, any direct requests to paths other than `/` (e.g., refreshing `https://domain.com/sports`) will trigger a GitHub Pages 404 error page. 

Depending on the future routing complexity of the October Heroes Academy website, two strategies can be implemented:

### Strategy 1: Simple Fallback Copy (Implemented in Workflow)
- **Concept**: Copying `dist/index.html` to `dist/404.html` in the build process.
- **When to use**: If the application remains a single-page landing site with only anchor link navigation (e.g. `#sports`, `#contact`), or uses Hash Routing (`#/sports`).
- **How it works**: Any non-root path request (which triggers a 404) will serve `dist/404.html` (which is a clone of `index.html`). The browser loads the React bundle, and the SPA boots normally.

### Strategy 2: URL Query Redirection Script
- **Concept**: A custom script in `404.html` redirects to `index.html` with the path saved in a query parameter, and a script in `index.html` parses and restores the URL path.
- **When to use**: If a routing library utilizing standard HTML5 History API (e.g. `react-router-dom` with `BrowserRouter`) is introduced.
- **Implementation**:
  1. Create `public/404.html` (Vite copies files in `public/` directly to `dist/`):
     ```html
     <!DOCTYPE html>
     <html>
       <head>
         <meta charset="utf-8">
         <title>October Heroes Academy</title>
         <script type="text/javascript">
           // Single Page Apps for GitHub Pages
           // https://github.com/rafgraph/spa-github-pages
           var pathSegmentsToKeep = 0; // Set to 1 if deploying to a repo subdirectory, 0 for custom domain
           var l = window.location;
           l.replace(
             l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
             l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') +
             '/?/' +
             l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
             (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
             l.hash
           );
         </script>
       </head>
       <body>
       </body>
     </html>
     ```
  2. Add the following redirect handler inside the `<head>` of `index.html`:
     ```html
     <script type="text/javascript">
       (function(l) {
         if (l.search[1] === '/' ) {
           var decoded = l.search.slice(1).split('&').map(function(s) {
             return s.replace(/~and~/g, '&')
           }).join('?');
           window.history.replaceState(null, null,
               l.pathname.slice(0, -1) + decoded + l.hash
           );
         }
       }(window.location));
     </script>
     ```

---

## 5. Summary of Recommended Implementation Steps
1. **Update `vite.config.ts`**: Inject `process.env.VITE_BASE_PATH || '/'` into the `base` configuration option.
2. **Create Workflow File**: Write the drafted `.github/workflows/deploy.yml` config into the codebase.
3. **Set Up GitHub Pages Configuration**:
   - Ensure the repository settings on GitHub are configured to serve from the `gh-pages` branch.
   - Configure the Custom Domain (`octoberheroes.com`) in the repository settings if applicable.
4. **Choose Routing Strategy**:
   - For the current single-page setup, copying `index.html` to `404.html` via the GHA build step is sufficient.
   - If client-side routing is introduced later, implement the custom redirection scripts in `public/404.html` and `index.html`.
