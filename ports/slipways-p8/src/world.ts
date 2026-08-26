// mutable references to the core singleton entities, set during jl()
export let mo: any = null   // camera (qb)
export let je: any = null   // cursor (nf)
export let ok: any = null   // UI handler (ui)

export function setMo(v: any) { mo = v }
export function setJe(v: any) { je = v }
export function setOk(v: any) { ok = v }
