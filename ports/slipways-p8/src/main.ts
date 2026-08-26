import "./style.css"
import { startLoop } from "./runtime/loop"
import { initRuntime } from "./runtime/state"
import { initInput, updateInput } from "./runtime/input"
import { loadCart } from "./runtime/cart"
import { cls, camera } from "./runtime/draw"
import { dg, dc, ci, resetRegistry } from "./runtime/entity"
import { loadGameData } from "./data"
import { makeMo } from "./camera"
import { bg } from "./bg"
import { mo } from "./world"

// import side-effects: registers pi['v'] and pi['b']
import "./runtime/vector"

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

function _update(): void {
    updateInput()
    dg()
}

function _draw(): void {
    cls()
    dc('kj', (fa) => mo ? mo.md(ci[fa]) : camera(0, 0))
    camera(0, 0)  // reset after world draw so HUD layers stay fixed
    dc('ev')
}

fetch('/slipways.p8').then(r => r.text()).then(p8text => {
    loadCart(p8text)
    loadGameData()
    resetRegistry()
    makeMo()
    bg()
})

startLoop(_update, _draw)
