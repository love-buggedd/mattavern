export type LuaTable = { [key: string | number]: any }
export function qj(o: LuaTable, mr?: LuaTable): LuaTable {
    if (mr) for (const k in mr) o[k] = mr[k]
    return o
}
export function mw(o: LuaTable): LuaTable {
    return qj({}, o)
}
export const pi: Record<string, ((...args: any[]) => any) | undefined> = {}
function oo(fn: ((...args: any[]) => any) | undefined, a: LuaTable): any {
    return fn ? fn(a[1], a[2], a[3], a[4], a[5]) : a
}
export function ob(qs: string, mr?: LuaTable): LuaTable {
    const kn: LuaTable = {}
    let s = 0
    let n: string | number = 1 
    let lm = 0
    for (let i = 0; i < qs.length; i++) {
        const c = qs[i]
        const sc = qs[s]
        const rq = i + 1
        if (c === '(') {
            lm++
        } else if (c === ')') {
            lm--
        } else if (lm === 0) {
            if (c === '=') {
                n = qs.slice(s, i).trim()
                s = rq
            } else if (c === ',' && s < i) {
                if (sc === '"') {
                    kn[n] = qs.slice(s + 1, i - 1)
                } else if (qs[s + 1] === '(') {
                    kn[n] = oo(pi[sc], ob(qs.slice(s + 2, i - 1) + ','))
                } else if (sc !== 'f') {
                    kn[n] = parseFloat(qs.slice(s, i))
                } else {
                    kn[n] = false
                }
                s = rq
                if (typeof n === 'number') n++
            } else if ((sc !== '"' && c === ' ') || c === '\n') {
                s = rq
            }
        }
    }
    return qj(kn, mr)
}
