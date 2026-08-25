const FRAME_DURATION = 1000 / 60

export function startLoop(update: () => void, draw: () => void): void {
    let lastTime = 0

    function tick(timestamp: number): void {
        requestAnimationFrame(tick)

        const elapsed = timestamp - lastTime
        if (elapsed < FRAME_DURATION) return

        lastTime = timestamp - (elapsed % FRAME_DURATION)

        update()
        draw()
    }

    requestAnimationFrame(tick)
}