import { defineConfig } from 'vite'
import path from 'path'
import dts from 'vite-plugin-dts'

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
  plugins: [dts({ rollupTypes: true })]
})
