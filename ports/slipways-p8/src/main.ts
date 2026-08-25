import "./style.css"
import { startLoop } from "./runtime/loop"
import { initRuntime } from "./runtime/state"
import { initInput, updateInput } from "./runtime/input"
import * as draw from "./runtime/draw"

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

function _init(): void {
}

function _update(): void {
    updateInput()
}

function _draw(): void {
    draw.cls()
}

startLoop(_update, _draw)
_init()
