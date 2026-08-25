import { ctx, cam } from "./state"
import { PALETTE } from "../palette"

export function cls(color: number = 0): void {
    ctx.fillStyle = PALETTE[color]
    ctx.fillRect(0,0,128,128)
}

export function pset(x: number, y: number, color: number): void {
    ctx.fillStyle = PALETTE[color]
    ctx.fillRect(x - cam.x, y - cam.y, 1, 1)
}

export function rectfill(x0: number, y0: number, x1: number, y1: number, color: number): void {
    ctx.fillStyle = PALETTE[color]
    ctx.fillRect(x0 - cam.x, y0 - cam.y, x1 - x0 + 1, y1 - y0 + 1)
}

export function rect(x0: number, y0: number, x1: number, y1: number, color: number): void {
    ctx.fillStyle = PALETTE[color]
    const cx = -cam.x
    const cy = -cam.y
    ctx.fillRect(x0 + cx, y0 + cy, x1 - x0 + 1, 1) // top
    ctx.fillRect(x0 + cx, y1 + cy, x1 - x0 + 1, 1) // bottom
    ctx.fillRect(x0 + cx, y0 + 1 + cy, 1, y1 - y0 - 1) // left
    ctx.fillRect(x1 + cx, y0 + 1 + cy, 1, y1 - y0 - 1) // right
}

export function circfill(cx: number, cy: number, r: number, color: number): void {
    ctx.fillStyle = PALETTE[color]
    const ox = -cam.x
    const oy = -cam.y
    for (let dy = -r; dy <= r; dy++) {
        const dx = Math.floor(Math.sqrt(r * r - dy * dy))
        ctx.fillRect(cx - dx + ox, cy + dy + oy, dx * 2 + 1, 1)
    }
}

export function circ(cx: number, cy: number, r: number, color: number): void {
    ctx.fillStyle = PALETTE[color]
    const ox = -cam.x
    const oy = -cam.y
    const r2 = r * r

    for (let dx = -r; dx <= r; dx++) {
        const dy = Math.floor(Math.sqrt(Math.max(0, r2 - dx * dx)))
        ctx.fillRect(cx + dx + ox, cy + dy + oy, 1, 1)
        ctx.fillRect(cx + dx + ox, cy - dy + oy, 1, 1)
    }

    for (let dy = -r + 1; dy < r; dy++) {
        const dx = Math.floor(Math.sqrt(Math.max(0, r2 - dy * dy)))
        ctx.fillRect(cx + dx + ox, cy + dy + oy, 1, 1)
        ctx.fillRect(cx - dx + ox, cy + dy + oy, 1, 1)
    }
}

export function line(x0: number, y0: number, x1: number, y1: number, color: number): void {
    ctx.fillStyle = PALETTE[color]
    const ox = -cam.x
    const oy = -cam.y

    x0 = Math.floor(x0);  y0 = Math.floor(y0)
    x1 = Math.floor(x1);  y1 = Math.floor(y1)

    const dx = Math.abs(x1 - x0)
    const dy = Math.abs(y1 - y0)
    const sx = x0 < x1 ? 1 : -1 // step direction on x axis
    const sy = y0 < y1 ? 1 : -1 // step direction on y axis
    let err = dx - dy // error starts as the axis imbalance

    while (true) {
        ctx.fillRect(x0 + ox, y0 + oy, 1, 1)
        if (x0 === x1 && y0 === y1) break
        const e2 = 2 * err
        if (e2 > -dy) { err -= dy;  x0 += sx } // step horizontally
        if (e2 <  dx) { err += dx;  y0 += sy } // step vertically
    }
}

export function camera(x: number = 0, y: number = 0): void {
    cam.x = x
    cam.y = y
}