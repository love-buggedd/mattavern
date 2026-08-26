import { sqrt, cos, sin, mid } from './math'
import { pi } from './ob'

export interface Vec {
    x: number
    y: number
    add(b: Vec): Vec
    sub(b: Vec): Vec
    mul(m: number): Vec
    div(d: number): Vec
    neg(): Vec
    rg(b: Vec): number
    nn(): Vec
    pa(): Vec
    qx(): number
    len2(): number
}

const km = {
    add(this: Vec, b: Vec): Vec { return v(this.x + b.x, this.y + b.y) },
    sub(this: Vec, b: Vec): Vec { return v(this.x - b.x, this.y - b.y) },
    mul(this: Vec, m: number): Vec { return v(this.x * m, this.y * m) },
    div(this: Vec, d: number): Vec { return v(this.x / d, this.y / d) },
    neg(this: Vec): Vec          { return v(-this.x, -this.y) },
    rg(this: Vec, b: Vec): number { return this.x * b.x + this.y * b.y },
    nn(this: Vec): Vec           { return this.div(this.qx()) },
    pa(this: Vec): Vec           { return v(-this.y, this.x) },
    qx(this: Vec): number        { return sqrt(this.len2()) },
    len2(this: Vec): number      { return this.rg(this) },
}

export function v(x: number, y: number): Vec {
    return Object.assign(Object.create(km) as Vec, { x, y })
}

// polar vector: radius fy at angle lx (PICO-8 turns, same convention as math.ts)
export function qm(fy: number, lx: number): Vec {
    return v(cos(lx), sin(lx)).mul(fy)
}

// returns a bounds-check predicate (xl,yt)-(xr,yb)
export function qz(xl: number, yt: number, xr: number, yb: number): (p: Vec) => boolean {
    return (p) => mid(xl, xr, p.x) === p.x && mid(yt, yb, p.y) === p.y
}

pi['v'] = (x: number, y: number) => v(x, y)
pi['b'] = (xl: number, yt: number, xr: number, yb: number) => qz(xl, yt, xr, yb)
