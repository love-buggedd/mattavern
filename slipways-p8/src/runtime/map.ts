import { ctx, cam } from "./state"
import { gfx } from "../data/gfx"
import { isTrans, getDrawColor } from "./palette"
import { mapData } from "../data/map"
import { gff } from "./memory"
export function mset(x: number, y: number, tile: number): void {
    mapData[y * 128 + x] = tile
}
export function mget(x: number, y: number): number {
    return mapData[y * 128 + x]
}
export function map(
    cellX = 0, cellY = 0,
    screenX = 0, screenY = 0,
    cellW = 128, cellH = 64,
    layer = 0
): void {
    for (let cy = 0; cy < cellH; cy++) {
        for (let cx = 0; cx < cellW; cx++) {
            const tile = mapData[(cellY + cy) * 128 + (cellX + cx)]
            if (tile === 0) continue
            if (layer !== 0 && !(gff[tile] & layer)) continue

            const sheetX = (tile % 16) * 8
            const sheetY = Math.floor(tile / 16) * 8
            const destX = screenX + cx * 8 - cam.x
            const destY = screenY + cy * 8 - cam.y

            for (let dy = 0; dy < 8; dy++) {
                for (let dx = 0; dx < 8; dx++) {
                    const ci = gfx[(sheetY + dy) * 128 + (sheetX + dx)]
                    if (!isTrans(ci)) {
                        ctx.fillStyle = getDrawColor(ci)
                        ctx.fillRect(destX + dx, destY + dy, 1, 1)
                    }
                }
            }
        }
    }
}