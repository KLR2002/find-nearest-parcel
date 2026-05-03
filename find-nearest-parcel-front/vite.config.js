import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import deno from "@deno/vite-plugin";

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://0.0.0.0:5174",
        changeOrigin: true,
      },
    },
  },
  plugins: [react(), deno()],
  optimizeDeps: {
    include: ["react/jsx-runtime"],
  },
});