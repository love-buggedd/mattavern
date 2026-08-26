import { ctx, cam, clipRect, fillpat } from "./state"
import { getDrawColor } from "./palette"
export function clip(x?: number, y?: number, w?: number, h?: number): void {
    if (x == null) {
        clipRect.x = 0; clipRect.y = 0; clipRect.w = 128; clipRect.h = 128
    } else {
        clipRect.x = x; clipRect.y = y!; clipRect.w = w!; clipRect.h = h!
    }
}
export function fillp(pat = 0): void {
    fillpat.bits = Math.floor(pat) & 0xFFFF
    fillpat.enabled = fillpat.bits !== 0
}
export function cls(color = 0): void {
    ctx.fillStyle = getDrawColor(color)
    ctx.fillRect(0, 0, 128, 128)
}
export function pset(x: number, y: number, color?: number): void {
    const sx = Math.floor(x) - cam.x
    const sy = Math.floor(y) - cam.y
    if (sx < clipRect.x || sy < clipRect.y ||
        sx >= clipRect.x + clipRect.w || sy >= clipRect.y + clipRect.h) return
    ctx.fillStyle = getDrawColor(color ?? 6)
    ctx.fillRect(sx, sy, 1, 1)
}
export function pget(_x: number, _y: number): number { return 0 }
export function rectfill(x0: number, y0: number, x1: number, y1: number, color: number): void {
    const ox = -cam.x; const oy = -cam.y
    const sx = Math.min(x0, x1) + ox;  const ex = Math.max(x0, x1) + ox + 1
    const sy = Math.min(y0, y1) + oy;  const ey = Math.max(y0, y1) + oy + 1
    const cx0 = Math.max(sx, clipRect.x);  const cx1 = Math.min(ex, clipRect.x + clipRect.w)
    const cy0 = Math.max(sy, clipRect.y);  const cy1 = Math.min(ey, clipRect.y + clipRect.h)
    if (cx0 >= cx1 || cy0 >= cy1) return
    ctx.fillStyle = getDrawColor(color)
    ctx.fillRect(cx0, cy0, cx1 - cx0, cy1 - cy0)
}
export function rect(x0: number, y0: number, x1: number, y1: number, color: number): void {
    ctx.fillStyle = getDrawColor(color)
    const ox = -cam.x; const oy = -cam.y
    ctx.fillRect(x0 + ox, y0 + oy, x1 - x0 + 1, 1)
    ctx.fillRect(x0 + ox, y1 + oy, x1 - x0 + 1, 1)
    ctx.fillRect(x0 + ox, y0 + 1 + oy, 1, y1 - y0 - 1)
    ctx.fillRect(x1 + ox, y0 + 1 + oy, 1, y1 - y0 - 1)
}
export function circfill(cx: number, cy: number, r: number, color: number): void {
    ctx.fillStyle = getDrawColor(color)
    const ox = -cam.x; const oy = -cam.y
    for (let dy = -r; dy <= r; dy++) {
        const dx = Math.floor(Math.sqrt(r * r - dy * dy))
        ctx.fillRect(cx - dx + ox, cy + dy + oy, dx * 2 + 1, 1)
    }
}
export function circ(cx: number, cy: number, r: number, color: number): void {
    ctx.fillStyle = getDrawColor(color)
    const ox = -cam.x; const oy = -cam.y
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
    ctx.fillStyle = getDrawColor(color)
    const ox = -cam.x; const oy = -cam.y
    x0 = Math.floor(x0); y0 = Math.floor(y0)
    x1 = Math.floor(x1); y1 = Math.floor(y1)
    const dx = Math.abs(x1 - x0); const dy = Math.abs(y1 - y0)
    const sx = x0 < x1 ? 1 : -1;  const sy = y0 < y1 ? 1 : -1
    let err = dx - dy
    while (true) {
        ctx.fillRect(x0 + ox, y0 + oy, 1, 1)
        if (x0 === x1 && y0 === y1) break
        const e2 = 2 * err
        if (e2 > -dy) { err -= dy; x0 += sx }
        if (e2 <  dx) { err += dx; y0 += sy }
    }
}

export function camera(x = 0, y = 0): void {
    cam.x = Math.floor(x); cam.y = Math.floor(y)
}