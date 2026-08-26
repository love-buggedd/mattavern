import type { Vec } from './vector'

export type Entity = {
    me: string
    t: number
    fa: number
    ra?: Vec
    nu?: string[]
    p_?: boolean | number
    [key: string]: any
}

export const hv: Entity[] = []
export const cv: Record<string, Entity[]> = {}
export const cg: Record<string, Entity[]> = {}

// group keys: entities with these keys are bucketed into cv for draw/event dispatch
export const bm = ['kj', 'ev', 'hd', 'hk', 'hb']

// camera weight per fa layer (1-indexed). fa 1 = 0.5× parallax, fa 2-9 = full, fa 10+ = HUD (fixed)
export const ci = [0, 0.5, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]

export function ft(rc: Record<string, Entity[]>, nt: string, pu: Entity): void {
    ;(rc[nt] ??= []).push(pu)
}

export function lt(e: Entity): void {
    hv.push(e)
    for (const p of bm) {
        if (e[p] != null) ft(cv, p, e)
    }
    for (const t of (e.nu ?? [])) ft(cg, t, e)
}

export function he(e: Entity): void {
    const i = hv.indexOf(e)
    if (i >= 0) hv.splice(i, 1)
    for (const p of bm) {
        if (e[p] != null) {
            const arr = cv[p]
            if (arr) { const j = arr.indexOf(e); if (j >= 0) arr.splice(j, 1) }
        }
    }
    for (const t of (e.nu ?? [])) {
        const arr = cg[t]
        if (arr) { const j = arr.indexOf(e); if (j >= 0) arr.splice(j, 1) }
    }
}

export function dg(): void {
    for (const e of [...hv]) {
        const fn = e[e.me]
        if (typeof fn === 'function') fn.call(e, e.t)
        if (e.p_) he(e)
        e.t++
    }
}

// applyCamera is called once per fa layer: lets the caller set camera parallax per layer
export function dc(nt: string, applyCamera?: (fa: number) => void): void {
    const byFa = new Map<number, Entity[]>()
    for (const e of (cv[nt] ?? [])) {
        const fa = e.fa ?? 1
        ;(byFa.get(fa) ?? (byFa.set(fa, []), byFa.get(fa)!)).push(e)
    }
    for (let fa = 1; fa <= 15; fa++) {
        const group = byFa.get(fa)
        if (!group) continue
        applyCamera?.(fa)
        for (const e of group) e[nt].call(e, e.ra)
    }
}

export function resetRegistry(): void {
    hv.length = 0
    for (const k of Object.keys(cv)) delete cv[k]
    for (const k of Object.keys(cg)) delete cg[k]
}
