import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'public/js/lib',
    copyPublicDir: false,
    lib: {
      entry: path.resolve(__dirname, 'src/exports.ts'),
      formats: ['es'],
    },
  },
})
