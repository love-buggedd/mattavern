import { rnd, max, mid } from './runtime/math'
import { v, qm, type Vec } from './runtime/vector'
import { rectfill } from './runtime/draw'

// jittered-bias random generator — returns values biased near b, with n_ controlling memory
export function jf(n_: number, b: number): () => number {
    return () => {
        const val = rnd(1 - Math.abs(b)) + max(b, 0)
        b = b + (0.5 - val) * n_
        return val
    }
}

// full-width horizontal band
export function rk(y1: number, y2: number = y1, color: number = 0): void {
    rectfill(0, y1, 127, y2, color)
}

// camera shake + drift applied to world position p
export function ma(p: Vec, e: { ma: number; t: number }): Vec {
    e.ma = max(0, e.ma - 0.1)
    return p.add(qm(e.ma, e.t * 0.2))
}

// returns v(cos(lx), sin(lx)) * fy  (PICO-8 turn convention from math.ts)
export { qm, v, mid }
