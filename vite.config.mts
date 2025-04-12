/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['@babel/plugin-transform-react-jsx', { runtime: 'automatic' }],
          ['@babel/plugin-transform-runtime', { regenerator: true }],
        ],
        babelrc: false,
        configFile: false,
      },
    }),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
      threshold: 1024,
      compressionOptions: {
        level: 9,
      },
    }),
  ],
  build: {
    lib: {
      entry: 'src/main-server.tsx',
      formats: ['cjs'],
      fileName: () => 'index.cjs',
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        format: 'cjs',
        exports: 'named',
        interop: 'auto',
      },
    },
    minify: false,
    sourcemap: true,
    target: 'node16',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['src/**/__tests__/**/*.test.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
});
