export let ctx!: CanvasRenderingContext2D
export let cam = { x: 0, y: 0 }
export let cursor = { x: 0, y: 0 }
export let fgColor = { value: 6 }

export function initRuntime(context: CanvasRenderingContext2D): void {
    ctx = context
}