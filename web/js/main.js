import { tsParticles } from "@tsparticles/engine"
import { loadSlim } from "@tsparticles/slim"
import Fuse from "fuse.js"

await loadSlim(tsParticles)

await tsParticles.load({
    id: "featured",
    options: {
        fullScreen: { enable: false },
        particles: {
            number: { value: 80 },
            color: { value: "#9d7dff" },
            opacity: { value: 0.6 },
            size: { value: 2 },
            move: { enable: true, speed: 1.8, outModes: { default: "bounce" } },
            links: {
                enable: true,
                distance: 200,
                color: "#7b6cf6",
                opacity: 0.25,
                width: 1.2
            }
        },
        interactivity: {
            events: {
                onHover: { enable: true, mode: ["grab", "bubble"] }
            },
            modes: {
                grab: {
                    distance: 250,
                    links: { opacity: 0.4 }
                },
                bubble: {
                    distance: 200,
                    size: 4,
                    opacity: 0.6
                }
            }
        }
    }
})

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