import { ctx, cam } from "./state"
import { gfx } from "../data/gfx"
import { PALETTE } from "../palette"
import { transparen } from "./sprites"
import { mapData } from "../data/map"

export function mset(x: number, y: number, tile: number): void {
    mapData[y * 128 + x] = tile
}

export function mget(x: number, y: number): number {
    return mapData[y * 128 + x]
}

export function map(
    cellX: number = 0,
    cellY: number = 0,
    screenX: number = 0,
    screenY: number = 0,
    cellW: number = 128,
    cellH: number = 64,
): void {
    for (let cy = 0; cy < cellH; cy++) {
        for (let cx = 0; cx < cellW; cx++) {
            const tile = mapData[(cellY + cy) * 128 + (cellX + cx)]
            if (tile == 0) continue

            const sheetX = (tile % 16) * 8
            const sheetY = Math.floor(tile / 16) * 8
            const destX = screenX + cx * 8 - cam.x
            const destY = screenY + cy * 8 - cam.y

            for (let dy = 0; dy < 8; dy++) {
                for (let dx = 0; dx < 8; dx++) {
                    const colorIdx = gfx[(sheetY + dy) * 128 + (sheetX + dx)]
                    if (!transparen[colorIdx]) {
                        ctx.fillStyle = PALETTE[colorIdx]
                        ctx.fillRect(destX + dx, destY + dy, 1, 1)
                    }
                }
            }
        }
    }
}