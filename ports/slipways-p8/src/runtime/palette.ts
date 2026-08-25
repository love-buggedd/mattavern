import { PALETTE } from '../palette'
export const drawPal = new Uint8Array([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
export const screenPal = new Uint8Array([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15])
export const transparen = new Uint8Array(16)
transparen[0] = 1
export const effectivePalette = PALETTE.slice()
function rebuildPalette(): void {
    for (let i = 0; i < 16; i++) effectivePalette[i] = PALETTE[screenPal[i]]
}
export function getDrawColor(c: number): string {
    return effectivePalette[drawPal[c & 15]]
}
export function isTrans(c: number): boolean {
    return transparen[c & 15] !== 0
}
export function pal(c0?: number, c1?: number, type = 0): void {
    if (c0 == null) {
        for (let i = 0; i < 16; i++) { drawPal[i] = i; screenPal[i] = i }
        transparen.fill(0); transparen[0] = 1
        rebuildPalette()
        return
    }
    const src = c0 & 15
    const dst = (c1 ?? src) & 15
    if (type === 1) { screenPal[src] = dst; rebuildPalette() }
    else              drawPal[src] = dst
}
export function palt(c?: number, t?: boolean): void {
    if (c == null) { transparen.fill(0); transparen[0] = 1; return }
    transparen[c & 15] = t !== false ? 1 : 0
}
