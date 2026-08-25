const KEY_MAP: Record<string, number> = {
    'ArrowLeft': 0,
    'ArrowRight': 1,
    'ArrowUp': 2,
    'ArrowDown': 3,
    'z': 4, 'Z': 4,
    'x': 5, 'X': 5,
    'Enter': 6,
    'Escape': 6,
}
const held = new Uint8Array(8)
const prevHeld = new Uint8Array(8)
let mouseX = 0
let mouseY = 0
let mouseButtons = 0
export function initInput(canvas: HTMLCanvasElement): void {
    window.addEventListener('keydown', (e) => {
        const b = KEY_MAP[e.key]
        if (b !== undefined) {
            held[b] = 1
            e.preventDefault()
        }
    })
    window.addEventListener('keyup', (e) => {
        const b = KEY_MAP[e.key]
        if (b !== undefined) held[b] = 0
    })
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect()
        mouseX = Math.floor((e.clientX - rect.left) * (128 / rect.width))
        mouseY = Math.floor((e.clientY - rect.top) * (128 / rect.height))
    })
    canvas.addEventListener('mousedown', (e) => {
        mouseButtons |= (1 << e.button)
    })
    canvas.addEventListener('mouseup', (e) => {
        mouseButtons &= ~(1 << e.button)
    })
}
export function updateInput(): void {
    for (let i = 0; i < 8; i++) {
        prevHeld[i] = held[i]
    }
}
export function btn(b: number): boolean {
    return held[b] == 1
}
export function btnp(b: number): boolean {
    return held[b] == 1 && prevHeld[b] == 0
}
export function stat(n: number): number {
    if (n == 32) return mouseX
    if (n == 33) return mouseY
    if (n == 34) return mouseButtons
    return 0
}