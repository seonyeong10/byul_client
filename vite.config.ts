import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsConfigPath from 'vite-tsconfig-paths'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPath()],
  resolve: {
    alias: [
      { find: '@components', replacement: resolve(__dirname, "src/components") },
      { find: '@config', replacement: resolve(__dirname, "src/config") },
      { find: '@containers', replacement: resolve(__dirname, "src/containers") },
      { find: '@pages', replacement: resolve(__dirname, "src/pages") },
      { find: '@assets', replacement: resolve(__dirname, "src/assets") },
      { find: '@redux-modules', replacement: resolve(__dirname, "src/redux/modules") },
    ]
  }
})
