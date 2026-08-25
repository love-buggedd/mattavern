import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main:     resolve(__dirname, 'index.html'),
                games:    resolve(__dirname, 'games.html'),
                wheel:    resolve(__dirname, 'wheel.html'),
                chatroom: resolve(__dirname, 'chatroom.html'),
            }
        }
    }
})
