import Fuse from "fuse.js"

;(function initParticles() {
    const container = document.getElementById('featured')
    if (!container) return

    const canvas = document.createElement('canvas')
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;'
    container.prepend(canvas)

    const ctx = canvas.getContext('2d')
    let W, H, particles
    const mouse = { x: null, y: null }

    function resize() {
        const r = container.getBoundingClientRect()
        W = canvas.width  = r.width
        H = canvas.height = r.height
    }

    function rand(a, b) { return Math.random() * (b - a) + a }

    function spawn() {
        particles = Array.from({ length: 80 }, () => ({
            x: rand(0, W), y: rand(0, H),
            vx: rand(-1.8, 1.8), vy: rand(-1.8, 1.8),
        }))
    }

    function tick() {
        ctx.clearRect(0, 0, W, H)
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i]
            p.x += p.vx; p.y += p.vy
            if (p.x < 0 || p.x > W) p.vx *= -1
            if (p.y < 0 || p.y > H) p.vy *= -1

            ctx.beginPath()
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
            ctx.fillStyle = 'rgba(157,125,255,0.6)'
            ctx.fill()

            for (let j = i + 1; j < particles.length; j++) {
                const q = particles[j]
                const dx = p.x - q.x, dy = p.y - q.y
                const d = Math.sqrt(dx*dx + dy*dy)
                if (d < 200) {
                    ctx.beginPath()
                    ctx.moveTo(p.x, p.y)
                    ctx.lineTo(q.x, q.y)
                    ctx.strokeStyle = `rgba(123,108,246,${0.25*(1-d/200)})`
                    ctx.lineWidth = 1.2
                    ctx.stroke()
                }
            }

            if (mouse.x !== null) {
                const dx = p.x - mouse.x, dy = p.y - mouse.y
                const d = Math.sqrt(dx*dx + dy*dy)
                if (d < 250) {
                    ctx.beginPath()
                    ctx.moveTo(p.x, p.y)
                    ctx.lineTo(mouse.x, mouse.y)
                    ctx.strokeStyle = `rgba(123,108,246,${0.4*(1-d/250)})`
                    ctx.lineWidth = 1
                    ctx.stroke()
                }
            }
        }
        requestAnimationFrame(tick)
    }

    container.addEventListener('mousemove', e => {
        const r = container.getBoundingClientRect()
        mouse.x = e.clientX - r.left
        mouse.y = e.clientY - r.top
    })
    container.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null })
    window.addEventListener('resize', () => { resize(); spawn() })

    resize(); spawn(); tick()
})()

// --- Search ---
const searchBar   = document.getElementById('search-bar')
const searchInput = searchBar.querySelector('input')
const searchBtn   = document.getElementById('search-button')

const games = Array.from(document.querySelectorAll('.game-card')).map(card => ({
    el:   card,
    name: card.querySelector('.game-name').textContent,
    desc: card.querySelector('.game-desc').textContent,
}))

const fuse = new Fuse(games, {
    keys: ['name', 'desc'],
    threshold: 0.4,
})

function hideCard(el) {
    el.classList.add('card-out')
    el.addEventListener('transitionend', () => {
        if (el.classList.contains('card-out')) el.style.display = 'none'
    }, { once: true })
}

function showCard(el) {
    el.style.display = ''
    el.offsetHeight // force reflow so transition fires
    el.classList.remove('card-out')
}

function showAll() {
    games.forEach(g => showCard(g.el))
}

function filter(query) {
    if (!query) { showAll(); return }
    const hits = new Set(fuse.search(query).map(r => r.item.el))
    games.forEach(g => hits.has(g.el) ? showCard(g.el) : hideCard(g.el))
}

function openSearch() {
    searchBar.classList.add('open')
    searchInput.focus()
}

function closeSearch() {
    searchBar.classList.remove('open')
    searchInput.value = ''
    showAll()
}

searchBtn.addEventListener('click', () => {
    searchBar.classList.contains('open') ? closeSearch() : openSearch()
})

searchInput.addEventListener('input', e => filter(e.target.value.trim()))

searchInput.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeSearch()
})