import "./style.css"
import { startLoop } from "./runtime/loop"
import { initRuntime } from "./runtime/state"
import { initInput, updateInput, stat } from "./runtime/input"
import * as draw from "./runtime/draw"
import { print } from "./runtime/font"

const canvas = document.getElementById('screen') as HTMLCanvasElement
const ctx = canvas.getContext('2d')!

function resize(): void {
    const scale = Math.floor(Math.min(window.innerWidth, window.innerHeight) / 128)
    canvas.style.width = `${scale * 128}px`
    canvas.style.height = `${scale * 128}px`
}

window.addEventListener('resize', resize)
resize()

initRuntime(ctx)
initInput(canvas)

startLoop(
    () => { updateInput() },
    () => {
        draw.cls()
        print("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 4, 4, 7)
        print("0123456789", 4, 12, 9)
        print("abcdefghijklmnopqrstuvwxyz", 4, 20, 11)
        print("The quick brown fox...", 4, 28, 10)
        print("!@#$%^&*()-_=+`~,<.>/?;:[{]}", 4, 36, 8)
        draw.pset(stat(32), stat(33), 8)
    }
)