const TAU = Math.PI * 2
export const flr  = Math.floor
export const ceil = Math.ceil
export const abs  = Math.abs
export const sqrt = Math.sqrt
export function min(...args: number[]): number  { return Math.min(...args) }
export function max(...args: number[]): number  { return Math.max(...args) }
export function mid(a: number, b: number, c: number): number {
    return a + b + c - Math.min(a, b, c) - Math.max(a, b, c)
}
export function sin(t: number): number { return -Math.sin(t * TAU) }
export function cos(t: number): number { return  Math.cos(t * TAU) }
export function atan2(dy: number, dx: number): number {
    return ((-Math.atan2(dy, dx) / TAU) + 1) % 1
}
export function rnd(n: number): number { return Math.random() * n }
export function sgn(x: number): number { return x < 0 ? -1 : 1 }
export function tonum(s: string): number { return parseFloat(s) }
export function tostr(n: number): string { return String(n) }
export function band(a: number, b: number): number { return (a & b) }
export function bor (a: number, b: number): number { return (a | b) }
export function bxor(a: number, b: number): number { return (a ^ b) }
export function bnot(a: number):            number { return (~a) }
export function shl (a: number, n: number): number { return (a << n) }
export function shr (a: number, n: number): number { return (a >> n) }
