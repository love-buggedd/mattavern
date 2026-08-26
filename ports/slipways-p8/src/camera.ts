import { ke } from './ke'
import { btn } from './runtime/input'
import { camera } from './runtime/draw'
import { v, type Vec } from './runtime/vector'
import { mid } from './runtime/math'
import { ma } from './util'
import { setMo } from './world'

// qb — camera entity with momentum-based panning and optional shake
// self.p  = world position (smoothed)
// self.v  = velocity
// self.ra = rendered position (p + shake)
// self.ma = shake amount (decays 0.1/frame)
// self.pc = direction vectors for btn(0-3)
export const qb = ke.jr('v=v(0,0),\nma=0,\np=v(192,192),\nra=v(192,192),\npc=o(v(-1,0),v(1,0),v(0,-1),v(0,1)),\n')

qb.ph = function(this: any): void {
    let ip = v(0, 0)
    for (let b = 0; b <= 3; b++) {
        if (btn(b)) ip = ip.add((this.pc[b + 1] as Vec).mul(3))
    }
    this.p = (this.p as Vec).add(this.v as Vec)
    this.v = (this.v as Vec).add((ip.sub(this.v as Vec)).mul(0.2))
    this.p.x = mid(-64, 320, this.p.x)
    this.p.y = mid(-64, 320, this.p.y)
    this.ra = ma(this.p as Vec, this)
}

// set canvas camera to ra * fy (fy=0 → HUD/fixed, fy=0.5 → parallax bg, fy=1 → world)
qb.md = function(this: any, fy: number = 1): void {
    const cp = (this.ra as Vec).mul(fy)
    camera(cp.x, cp.y)
}

export function makeMo(): any {
    const mo = qb()
    setMo(mo)
    return mo
}
