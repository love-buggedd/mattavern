import { kv } from './runtime/kv'
import { lt } from './runtime/entity'

export const ke = kv.jr('me="ph",t=0,\n')
// pq is called by kv constructor chain — registers the instance in the entity registry
ke.pq = function(this: any, _inst: any) { lt(this) }
ke.ks = function(this: any, me: string) { this.me = me; this.t = 0 }
