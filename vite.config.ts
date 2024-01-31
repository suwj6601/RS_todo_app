import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import viteCompression from 'vite-plugin-compression';
import eslint from 'vite-plugin-eslint';
import vitePluginRequire from 'vite-plugin-require';
import tsconfigPaths from 'vite-tsconfig-paths';
import ViteEslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    eslint(),
    //@ts-ignore
    vitePluginRequire.default({ fileRegex: /(config.js)$/ }),
    viteCompression(),
    ViteEslintPlugin(),
  ],
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
  server: {
    host: true, // Here
    port: 3000,
  },
  preview: {
    port: 4173,
  },
});
