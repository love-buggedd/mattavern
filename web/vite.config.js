import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
    publicDir: '../assets',
    plugins: [viteSingleFile()],
    build: {
        target: 'esnext',
    },
})
