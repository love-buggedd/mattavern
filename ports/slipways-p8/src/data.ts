import { ob } from './runtime/ob'
import { unstash } from './runtime/unstash'

// resource types: {f, o, b, p, g, ...} — keys from unstash(8192)
export let r: Record<string, any> = {}
// resource display names — from unstash(8259)
export let iz: Record<string, any> = {}
// planet type definitions
export let df: Record<string, any> = {}
// blueprint cost tables
export let hc: Record<string, any> = {}
// blueprint definitions (raw parsed)
export let fd: Record<string, any> = {}
// tech tree category labels
export let dr: Record<string, any> = {}
// tech items
export let nb: Record<string, any> = {}

export function loadGameData(): void {
    r  = ob(unstash(8192))
    iz = ob(unstash(8259))
    df = ob(
        'o("ll",45,0,me="ll"),\n' +
        'o("e",160,4.5,"earth-like"),\n' +
        'o("f",128,6,"forgeworld"),\n' +
        'o("m",134,4,"mineral"),\n' +
        'o("o",130,3,"ocean"),\n' +
        'o("r",140,2.5,"remnant"),\n' +
        'o("x",162,3,"xeno"),\n' +
        'o("j",136,2,"jungle"),\n' +
        'o("i",138,2,"iceball"),\n' +
        'o("s",142,2,"barren"),\n' +
        'o("g",96,4,"gas giant"),\n'
    )
    hc = ob(unstash(8383))
    fd = ob(unstash(8494))
    dr = ob(unstash(9807))
    nb = ob(unstash(10457))
}
