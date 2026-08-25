import { ob, qj } from './ob'
import type { LuaTable } from './ob'
export type KvClass = {
    (config?: LuaTable): LuaTable
    iq?: KvClass
    pq?: (obj: LuaTable) => void
    fz?: string
    jr(this: KvClass, config?: string): KvClass
    [key: string]: any
}
function makeClass(parent: KvClass, defaults: LuaTable): KvClass {
    const cls = function(config?: LuaTable): LuaTable {
        const inst: LuaTable = Object.create(cls)
        if (config) qj(inst, config)
        let ko: KvClass | undefined = cls
        let iy: ((obj: LuaTable) => void) | undefined
        while (ko) {
            if (ko.pq && ko.pq !== iy) {
                iy = ko.pq
                iy(inst)
            }
            ko = ko.iq
        }
        return inst
    } as unknown as KvClass
    Object.assign(cls, defaults)
    cls.iq = parent
    if (typeof defaults.fz === 'string') (kv as any)[defaults.fz] = cls
    Object.setPrototypeOf(cls, parent)
    return cls
}
export const kv: KvClass = Object.assign(
    function(_config?: LuaTable): LuaTable { return _config ?? {} },
    {
        jr(this: KvClass, config?: string): KvClass {
            return makeClass(this, ob(config ?? ''))
        }
    }
) as unknown as KvClass
