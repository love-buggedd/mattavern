import { extractPico8Bytes, extractGFX, extractMap, extractGFF, extractLua } from "./cartridge";
import LuaVM from "./luaVM";
import transpileLua from "./transpileLua.js";
import * as picoAPI from "./pico8api.js";

const PICO8_FPS = 30;
const FRAME_TIME = 1000 / PICO8_FPS;

const keyMap = {
  ArrowLeft: 0, ArrowRight: 1, ArrowUp: 2, ArrowDown: 3,
  z: 4, Z: 4, x: 5, X: 5,
  Shift: 6, Enter: 7,
};

let animId = null;
let cartVersion = 0;
let loading = false;
let paused = false;
let lastFrame = 0;
let accumulated = 0;
let vm = null;
const keyState = new Array(8).fill(false);

// --- canvas ---

const canvas = document.getElementById("screen");
const noCart = document.getElementById("no-cart");
const cartTitle = document.getElementById("cart-title");

function resize() {
  const fs = !!document.fullscreenElement;
  // In fullscreen: fill the screen. Normal: subtract header (~44px) + controls (~18px) + gaps/padding (~50px)
  const availW = window.innerWidth  - (fs ? 0 : 32);
  const availH = window.innerHeight - (fs ? 0 : 112);
  const scale = Math.max(1, Math.floor(Math.min(availW, availH) / 128));
  canvas.style.width  = `${scale * 128}px`;
  canvas.style.height = `${scale * 128}px`;
}
window.addEventListener("resize", resize);
document.addEventListener("fullscreenchange", () => {
  document.body.classList.toggle("is-fullscreen", !!document.fullscreenElement);
  resize();
});
resize();

const ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// --- input ---

document.addEventListener("keydown", (e) => {
  const btn = keyMap[e.key];
  if (btn !== undefined) { keyState[btn] = true; e.preventDefault(); }
});
document.addEventListener("keyup", (e) => {
  const btn = keyMap[e.key];
  if (btn !== undefined) keyState[btn] = false;
});

canvas.addEventListener("blur",  () => { paused = true; });
canvas.addEventListener("focus", () => {
  if (!paused) return;
  paused = false;
  lastFrame = performance.now();
  gameLoop(lastFrame);
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden) { paused = true; }
  else if (vm) { paused = false; lastFrame = performance.now(); gameLoop(lastFrame); }
});

// --- cart loading from URL or PNG bytes ---

async function loadFromUrl(url) {
  const data = await extractPico8Bytes(url);
  await startCart(data, url.split("/").pop().replace(/\.p8\.png$/i, "").replace(/\.png$/i, ""));
}

async function loadFromFile(file) {
  const url = URL.createObjectURL(file);
  try {
    const data = await extractPico8Bytes(url);
    await startCart(data, file.name.replace(/\.p8\.png$/i, "").replace(/\.png$/i, ""));
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function startCart(data, name) {
  loading = true;
  lastFrame = 0;
  accumulated = 0;

  const lua   = extractLua(data);
  const gfx   = extractGFX(data);
  const map   = extractMap(data);
  const gff   = extractGFF(data);

  keyState.fill(false);
  picoAPI.bindAPIResources(ctx, keyState, { gfx, map, gff });

  vm = new LuaVM();
  Object.entries(picoAPI).forEach(([n, fn]) => {
    if (typeof fn === "function" && n !== "bindAPIResources") vm.addFunction(n, fn);
  });

  const transpiled = transpileLua(lua);
  vm.executeCode(transpiled);
  vm.callFunction("_init");

  noCart.classList.add("hidden");
  cartTitle.textContent = name || "PICO-8";
  document.title = `${name || "PICO-8"} | Mät Tavern`;

  loading = false;
  if (animId) { cancelAnimationFrame(animId); animId = null; }
  cartVersion++;
  gameLoop(performance.now());
  canvas.focus();
}

// --- game loop ---

function gameLoop(ts) {
  if (!vm || loading || paused) return;
  lastFrame = ts;
  accumulated = 0;
  const ver = cartVersion;

  const loop = (time) => {
    if (ver !== cartVersion || paused || !vm) return;
    const dt = time - lastFrame;
    lastFrame = time;
    accumulated += dt;
    while (accumulated >= FRAME_TIME) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, 128, 128);
      vm.callFunction("_update");
      vm.callFunction("_draw");
      accumulated -= FRAME_TIME;
    }
    animId = requestAnimationFrame(loop);
  };
  animId = requestAnimationFrame(loop);
}

// --- file input ---

const loadBtn      = document.getElementById("load-btn");
const fileInput    = document.getElementById("file-input");
const fsBtn        = document.getElementById("fullscreen-btn");
const catBtn       = document.getElementById("catalogue-btn");
const catOverlay   = document.getElementById("catalogue-overlay");
const catGrid      = document.getElementById("catalogue-grid");
const catCloseBtn  = document.getElementById("catalogue-close");

loadBtn.addEventListener("click", () => fileInput.click());

fsBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
});

catBtn.addEventListener("click", async () => {
  catGrid.innerHTML = "";
  try {
    const res = await fetch("/pico8/carts/manifest.json");
    const carts = await res.json();
    if (!carts.length) {
      catGrid.innerHTML = '<p class="cat-empty">No cartridges in the catalogue yet.</p>';
    } else {
      for (const name of carts) {
        const card = document.createElement("div");
        card.className = "cat-card";

        const img = document.createElement("img");
        img.src = `/pico8/carts/${name}`;
        img.alt = name;

        const label = document.createElement("p");
        label.textContent = name.replace(/\.p8\.png$/i, "").replace(/-/g, " ");

        card.appendChild(img);
        card.appendChild(label);
        card.addEventListener("click", () => {
          catOverlay.classList.add("hidden");
          loadFromUrl(`/pico8/carts/${name}`);
        });
        catGrid.appendChild(card);
      }
    }
  } catch {
    catGrid.innerHTML = '<p class="cat-empty">Could not load catalogue.</p>';
  }
  catOverlay.classList.remove("hidden");
});

catCloseBtn.addEventListener("click", () => catOverlay.classList.add("hidden"));
catOverlay.addEventListener("click", (e) => {
  if (e.target === catOverlay) catOverlay.classList.add("hidden");
});
fileInput.addEventListener("change", () => {
  if (fileInput.files[0]) loadFromFile(fileInput.files[0]);
  fileInput.value = "";
});

// --- drag and drop onto the canvas ---

document.addEventListener("dragover", (e) => e.preventDefault());
document.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer?.files[0];
  if (file) loadFromFile(file);
});

// --- auto-load from ?cart= URL param ---

const params = new URLSearchParams(location.search);
const cartParam = params.get("cart");
if (cartParam) loadFromUrl(cartParam);
