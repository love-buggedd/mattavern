import { gfx } from '../data/gfx'
import { mapData } from '../data/map'
import { gff, ROM, RAM, ADDR } from './memory'

function parseSections(p8text: string): Record<string, string[]> {
    const sections: Record<string, string[]> = {}
    let section = ''
    let lines: string[] = []
    for (const raw of p8text.split('\n')) {
        const line = raw.trimEnd()
        if (line.startsWith('__') && line.endsWith('__')) {
            if (section) sections[section] = lines
            section = line.slice(2, -2)
            lines = []
        } else if (section) {
            lines.push(line)
        }
    }
    if (section) sections[section] = lines
    return sections
}

export function loadCart(p8text: string): void {
    const sections = parseSections(p8text)

    if (sections.gfx) {
        let i = 0
        for (const line of sections.gfx) {
            for (const ch of line) {
                if (i >= gfx.length) break
                const v = parseInt(ch, 16)
                gfx[i++] = isNaN(v) ? 0 : v
            }
        }
        for (let j = 0; j < gfx.length; j += 2)
            ROM[ADDR.GFX + (j >> 1)] = gfx[j] | (gfx[j + 1] << 4)
    }

    if (sections.gff) {
        const flat = sections.gff.join('')
        for (let i = 0; i < 256 && i * 2 + 1 < flat.length; i++) {
            const hi = parseInt(flat[i * 2], 16)
            const lo = parseInt(flat[i * 2 + 1], 16)
            gff[i] = ((isNaN(hi) ? 0 : hi) << 4) | (isNaN(lo) ? 0 : lo)
        }
    }

    if (sections.map) {
        for (let row = 0; row < 32 && row < sections.map.length; row++) {
            const line = sections.map[row]
            for (let col = 0; col < 128; col++) {
                const j = col * 2
                if (j + 1 >= line.length) break
                const hi = parseInt(line[j], 16)
                const lo = parseInt(line[j + 1], 16)
                const val = ((isNaN(hi) ? 0 : hi) << 4) | (isNaN(lo) ? 0 : lo)
                mapData[row * 128 + col] = val
                RAM[ADDR.MAP + row * 128 + col] = val
            }
        }
    }
}
