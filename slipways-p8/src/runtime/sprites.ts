import { ctx, cam, fgColor } from "./state"
import { gfx } from "../data/gfx"
import { isTrans, getDrawColor } from "./palette"
export { palt, pal } from "./palette"
export function sget(x: number, y: number): number {
    return gfx[(Math.floor(y) & 127) * 128 + (Math.floor(x) & 127)]
}
export function sset(x: number, y: number, c?: number): void {
    gfx[(Math.floor(y) & 127) * 128 + (Math.floor(x) & 127)] = (c ?? fgColor.value) & 15
}
export function spr(n: number, x: number, y: number, w = 1, h = 1, flipX = false, flipY = false): void {
    const ox = -cam.x; const oy = -cam.y
    const sheetX = (n % 16) * 8
    const sheetY = Math.floor(n / 16) * 8
    const pw = w * 8; const ph = h * 8
    for (let dy = 0; dy < ph; dy++) {
        for (let dx = 0; dx < pw; dx++) {
            const sx = flipX ? pw - 1 - dx : dx
            const sy = flipY ? ph - 1 - dy : dy
            const ci = gfx[(sheetY + sy) * 128 + (sheetX + sx)]
            if (!isTrans(ci)) {
                ctx.fillStyle = getDrawColor(ci)
                ctx.fillRect(x + dx + ox, y + dy + oy, 1, 1)
            }
        }
    }
}
export function sspr(
    sx: number, sy: number, sw: number, sh: number,
    dx: number, dy: number,
    dw = sw, dh = sh, flipX = false, flipY = false
): void {
    dw = Math.abs(dw); dh = Math.abs(dh)
    const ox = -cam.x; const oy = -cam.y
    for (let ddy = 0; ddy < dh; ddy++) {
        for (let ddx = 0; ddx < dw; ddx++) {
            const srcX = Math.floor((flipX ? dw - 1 - ddx : ddx) * sw / dw)
            const srcY = Math.floor((flipY ? dh - 1 - ddy : ddy) * sh / dh)
            const ci = gfx[(sy + srcY) * 128 + (sx + srcX)]
            if (!isTrans(ci)) {
                ctx.fillStyle = getDrawColor(ci)
                ctx.fillRect(dx + ddx + ox, dy + ddy + oy, 1, 1)
            }
        }
    }
}
