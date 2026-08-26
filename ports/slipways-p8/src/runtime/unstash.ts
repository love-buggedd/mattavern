import { peek } from './memory'

// character set used to encode strings in map memory (1-indexed in Lua → 0-indexed here)
const gt = "abcdefghijklmnopqrstuvwxyz0123456789 ().,=-+_/\"'?%\n"

// reads a null-terminated encoded string from cart map memory starting at byte address addr
export function unstash(addr: number): string {
    let s = ''
    let i: number
    do {
        i = peek(addr++)
        if (i > 0) s += gt[i - 1]
    } while (i !== 0)
    return s
}
