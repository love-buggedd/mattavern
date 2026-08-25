import { ctx, cam, cursor, fgColor } from "./state"
import { getDrawColor } from "./palette"

/* eslint-disable */
const FONT = new Uint8Array([
    0,0,0,0,0,0,  2,2,2,0,2,0,  5,5,0,0,0,0,  5,7,5,7,5,0,  2,7,3,6,2,0,  5,4,2,1,5,0,  2,5,2,5,7,0,  2,2,0,0,0,0,
    4,2,2,2,4,0,  1,2,2,2,1,0,  0,5,2,5,0,0,  0,2,7,2,0,0,  0,0,0,2,2,0,  0,0,7,0,0,0,  0,0,0,0,2,0,  4,4,2,1,1,0,
// 0          1          2          3          4          5          6          7
    2,5,5,5,2,0,  2,3,2,2,7,0,  6,5,4,2,7,0,  6,4,6,4,6,0,  5,5,7,4,4,0,  7,1,3,4,6,0,  6,1,7,5,2,0,  7,4,2,2,2,0,
// 8          9          :          ;          <          =          >          ?
    2,5,2,5,2,0,  2,5,6,4,2,0,  0,2,0,2,0,0,  0,2,0,2,2,0,  4,2,1,2,4,0,  0,7,0,7,0,0,  1,2,4,2,1,0,  6,4,2,0,2,0,
// @          A          B          C          D          E          F          G
    6,5,3,5,6,0,  2,5,7,5,5,0,  3,5,3,5,3,0,  6,1,1,1,6,0,  3,5,5,5,3,0,  7,1,7,1,7,0,  7,1,7,1,1,0,  6,1,5,5,6,0,
// H          I          J          K          L          M          N          O
    5,5,7,5,5,0,  7,2,2,2,7,0,  7,4,4,5,2,0,  5,5,3,5,5,0,  1,1,1,1,7,0,  5,7,5,5,5,0,  7,5,5,5,5,0,  2,5,5,5,2,0,
// P          Q          R          S          T          U          V          W
    3,5,3,1,1,0,  2,5,5,5,6,0,  3,5,3,5,5,0,  6,1,2,4,3,0,  7,2,2,2,2,0,  5,5,5,5,2,0,  5,5,5,2,2,0,  5,5,7,7,5,0,
// X          Y          Z          [          \          ]          ^          _
    5,5,2,5,5,0,  5,5,2,2,2,0,  7,4,2,1,7,0,  6,4,4,4,6,0,  1,1,2,4,4,0,  3,1,1,1,3,0,  2,5,0,0,0,0,  0,0,0,0,7,0,
// `          a          b          c          d          e          f          g
    2,4,0,0,0,0,  0,6,5,6,4,0,  1,1,3,5,3,0,  0,6,1,1,6,0,  4,4,6,5,6,0,  0,6,7,1,3,0,  0,6,1,7,1,0,  0,6,5,6,4,3,
// h          i          j          k          l          m          n          o
    1,1,3,5,5,0,  2,0,2,2,2,0,  4,0,4,4,6,3,  1,5,3,5,5,0,  6,2,2,2,3,0,  0,5,7,5,5,0,  0,3,5,5,5,0,  0,2,5,5,2,0,
// p          q          r          s          t          u          v          w
    0,3,5,3,1,1,  0,6,5,6,4,4,  0,3,1,1,1,0,  0,6,1,4,3,0,  2,7,2,2,2,0,  0,5,5,5,6,0,  0,5,5,2,2,0,  0,5,7,7,5,0,
// x          y          z          {          |          }          ~         DEL
    0,5,2,5,0,0,  0,5,6,4,3,0,  0,7,4,1,7,0,  6,2,4,2,6,0,  2,2,0,2,2,0,  3,2,1,2,3,0,  0,6,7,0,0,0,  0,0,0,0,0,0,
])

function drawChar(code: number, x: number, y: number, c: number): void {
    const base = (code - 32) * 6
    ctx.fillStyle = getDrawColor(c)
    const ox = -cam.x
    const oy = -cam.y
    for (let row = 0; row < 6; row++) {
        const bits = FONT[base + row]
        if (bits === 0) continue
        for (let px = 0; px < 3; px++) {
            if (bits & (1 << px)) {
                ctx.fillRect(x + px + ox, y + row + oy, 1, 1)
            }
        }
    }
}
export function print(s: string | number, x?: number, y?: number, c?: number): void {
    const text = String(s)
    const color = c ?? fgColor.value
    let cx = x ?? cursor.x
    let cy = y ?? cursor.y
    const startX = cx
    for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (ch === '\n') {
            cx = startX
            cy += 6
            continue
        }
        const code = text.charCodeAt(i)
        if (code >= 32 && code <= 127) {
            drawChar(code, cx, cy, color)
        }
        cx += 4
        if (cx >= 128) {
            cx = 0
            cy += 6
        }
    }
    cursor.x = cx
    cursor.y = cy
}
export function color(c: number): void {
    fgColor.value = c
}
export function cursor_(x: number = 0, y: number = 0): void {
    cursor.x = x
    cursor.y = y
}
