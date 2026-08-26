import { ke } from './ke'
import { rnd, flr } from './runtime/math'
import { rectfill, rect } from './runtime/draw'
import { mset, map } from './runtime/map'
import { jf } from './util'

// bg — background entity (fa=1, parallax at 0.5×)
// Generates a 32×32 tile star field in bg:pq(), renders map + grid in bg:kj()
// pl: sprite indices for different "depth" levels of space
export const bg = ke.jr('fa=1,hd=1,pl=o(0,0,0,72,73,74,75,88,89,90,91,88,91,89,91),\n')

bg.pq = function(this: any): void {
    const vs: number[] = []
    let vh = 0
    const oh = jf(0.1, 0)
    const pl = this.pl as Record<number, number>
    for (let y = 0; y < 32; y++) {
        for (let x = 0; x < 32; x++) {
            vh = oh() * 8 - 4 + (vh + (vs[x] ?? 1)) * 0.5
            vs[x] = vh
            const idx = flr(vh + rnd(4))
            const sprite = (idx >= 1 && idx <= 15) ? (pl[idx] ?? 0) : 0
            mset(x, y, rnd() < 0.004 ? 122 + flr(rnd(5)) : sprite)
        }
    }
}

bg.kj = function(): void {
    map(0, 0, 0, 0, 32, 32)
    // grid lines every 32px across 262×262 world area (dithered in original, solid here)
    for (let xy = 3; xy < 263; xy += 32) {
        rectfill(xy, 0, xy, 262, 1)
        rectfill(0, xy, 262, xy, 1)
    }
    rect(0, 0, 262, 262, 5)
}
