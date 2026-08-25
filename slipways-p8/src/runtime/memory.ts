export const ADDR = Object.freeze({
    GFX:      0x0000,
    GFX_MAP:  0x1000,
    MAP:      0x2000,
    GFF:      0x3000,
    SONG:     0x3100,
    SFX:      0x3200,
    USER:     0x4300,
    CART:     0x5E00,
    PAL0:     0x5F00,
    PAL1:     0x5F10,
    CLIP_X:   0x5F20,
    CLIP_Y:   0x5F21,
    CLIP_W:   0x5F22,
    CLIP_H:   0x5F23,
    COLOR:    0x5F25,
    CURSOR_X: 0x5F26,
    CURSOR_Y: 0x5F27,
    CAMERA_X: 0x5F28,
    CAMERA_Y: 0x5F2A,
    FILL_PAT: 0x5F31,
    SCREEN:   0x6000,
})
export const RAM = new Uint8Array(0x8000)
export const gff = new Uint8Array(256)
export const ROM = new Uint8Array(0x4300)
export function peek(addr: number): number  { return RAM[addr & 0x7FFF] }
export function poke(addr: number, val: number): void { RAM[addr & 0x7FFF] = val & 0xFF }
export function peek2(addr: number): number {
    const a = addr & 0x7FFF
    return RAM[a] | (RAM[a + 1] << 8)
}
export function poke2(addr: number, val: number): void {
    const a = addr & 0x7FFF
    RAM[a] = val & 0xFF; RAM[a + 1] = (val >> 8) & 0xFF
}
export function peek4(addr: number): number {
    const a = addr & 0x7FFF
    return (RAM[a] | (RAM[a+1]<<8) | (RAM[a+2]<<16) | (RAM[a+3]<<24)) >>> 0
}
export function poke4(addr: number, val: number): void {
    const a = addr & 0x7FFF
    RAM[a]=(val)&0xFF; RAM[a+1]=(val>>8)&0xFF; RAM[a+2]=(val>>16)&0xFF; RAM[a+3]=(val>>24)&0xFF
}
export function memcpy(dest: number, src: number, n: number): void {
    RAM.copyWithin(dest & 0x7FFF, src & 0x7FFF, (src + n) & 0x7FFF)
}
export function memset(dest: number, val: number, n: number): void {
    RAM.fill(val & 0xFF, dest & 0x7FFF, (dest + n) & 0x7FFF)
}
export function reload(dest: number, src: number, n: number): void {
    for (let i = 0; i < n; i++) RAM[(dest + i) & 0x7FFF] = ROM[src + i] ?? 0
}
export function fget(n: number, b?: number): number | boolean {
    const f = gff[n & 255]
    return b == null ? f : !!(f & (1 << (b & 7)))
}
export function fset(n: number, b: number, v?: boolean): void {
    if (v === undefined) {
        gff[n & 255] = b & 0xFF
    } else {
        const bit = 1 << (b & 7)
        if (v) gff[n & 255] |= bit
        else   gff[n & 255] &= (~bit) & 0xFF
    }
}
