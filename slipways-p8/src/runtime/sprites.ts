import { ctx, cam } from "./state"
import { PALETTE } from "../palette"
import { gfx } from "../data/gfx"

export const transparen = new Array<boolean>(16).fill(false)
transparen[0] = true

export function palt(c?: number, t?: boolean): void {
    if (c == undefined) {
        transparen.fill(false)
        transparen[0] = true
        return
    }
    transparen[c] = t ?? false
}

export function spr(
    n: number,
    x: number,
    y: number,
    w: number = 1,
    h: number = 1,
    flipX: boolean = false,
    flipY: boolean = false
): void {
    const ox = -cam.x
    const oy = -cam.y

    const sheetX = (n % 16) * 8
    const sheetY = Math.floor(n / 16) * 8

    const pw = w * 8
    const ph = h * 8

    for (let dy = 0; dy < ph; dy++) {
        for (let dx = 0; dx < pw; dx++) {
            const sx = flipX ? (pw - 1 - dx) : dx
            const sy = flipY ? (ph - 1 - dy) : dy

            const colorIdx = gfx[(sheetY + sy) * 128 + (sheetX + sx)]

            if (!transparen[colorIdx]) {
                ctx.fillStyle = PALETTE[colorIdx]
                ctx.fillRect(x + dx + ox, y + dy + oy, 1, 1)
            }
        }
    }
}