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

// Resolve carts/ relative to wherever player.html is served, not a hardcoded path.
const CART_BASE = new URL("carts/", window.location.href).href;

// --- canvas ---

const canvas = document.getElementById("screen");
const noCart = document.getElementById("no-cart");
const noCartHint = document.getElementById("no-cart-hint");
const noCartError = document.getElementById("no-cart-error");
const cartTitle = document.getElementById("cart-title");

function resize() {
  const fs = !!document.fullscreenElement;
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

// --- error display ---

function showError(msg) {
  noCart.classList.remove("hidden");
  noCartError.textContent = msg;
  noCartError.classList.remove("hidden");
  noCartHint.classList.add("hidden");
}

function clearError() {
  noCartError.textContent = "";
  noCartError.classList.add("hidden");
  noCartHint.classList.remove("hidden");
}

// --- .p8 text format parser ---
// Turns a standard PICO-8 text cartridge into a fake binary block
// that extractGFX/extractMap/extractGFF can slice into normally.
//
// Binary layout we build:
//   0x0000-0x1FFF  sprite sheet (128×128 px, 2px/byte as lo|hi nibbles)
//   0x2000-0x2FFF  map upper 32 rows (tile indices, 1 byte each)
//   0x3000-0x30FF  sprite flags (1 byte per sprite, 256 total)

function parseP8Text(text) {
  const sections = {};
  let current = null;
  for (const line of text.split("\n")) {
    const m = line.match(/^__([\w]+)__\s*$/);
    if (m) {
      current = m[1];
      sections[current] = [];
    } else if (current !== null) {
      sections[current].push(line);
    }
  }

  // Standard PICO-8 uses __lua__; PEMSA injected __code__. Try both.
  const luaLines = sections.lua || sections.code || [];
  const lua = luaLines.join("\n").trimEnd();

  // GFX: 128 rows × 128 hex chars.
  // Each pair of chars (lo, hi) → byte = lo | (hi << 4).
  const gfxLines = (sections.gfx || []).filter(l => l.trim().length > 0);
  const gfxBytes = new Uint8Array(0x2000);
  for (let row = 0; row < Math.min(gfxLines.length, 128); row++) {
    const line = gfxLines[row].padEnd(128, "0");
    for (let col = 0; col < 128; col += 2) {
      const lo = parseInt(line[col], 16) || 0;
      const hi = parseInt(line[col + 1], 16) || 0;
      gfxBytes[row * 64 + col / 2] = lo | (hi << 4);
    }
  }

  // Map upper rows 0-31: 32 rows × 256 hex chars → 4096 bytes of tile indices.
  const mapLines = (sections.map || []).filter(l => l.trim().length > 0);
  const mapUpperBytes = new Uint8Array(0x1000);
  for (let row = 0; row < Math.min(mapLines.length, 32); row++) {
    const line = mapLines[row].padEnd(256, "0");
    for (let col = 0; col < 256; col += 2) {
      mapUpperBytes[row * 128 + col / 2] = parseInt(line.slice(col, col + 2), 16) || 0;
    }
  }

  // GFF: 2 rows × 256 hex chars → 256 bytes.
  const gffLines = (sections.gff || []).filter(l => l.trim().length > 0);
  const gffText = gffLines.join("").padEnd(512, "0");
  const gffBytes = new Uint8Array(0x100);
  for (let i = 0; i < 256; i++) {
    gffBytes[i] = parseInt(gffText.slice(i * 2, i * 2 + 2), 16) || 0;
  }

  const binary = new Uint8Array(0x3100);
  binary.set(gfxBytes, 0x0000);
  binary.set(mapUpperBytes, 0x2000);
  binary.set(gffBytes, 0x3000);

  return { binary, lua };
}

// --- cart loading ---

async function loadFromUrl(url) {
  clearError();
  try {
    let cartData, name;
    const baseName = url.split("/").pop();
    if (/\.p8$/i.test(url)) {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      cartData = parseP8Text(await res.text());
      name = baseName.replace(/\.p8$/i, "");
    } else {
      cartData = await extractPico8Bytes(url);
      name = baseName.replace(/\.p8\.png$/i, "").replace(/\.png$/i, "");
    }
    await startCart(cartData, name);
  } catch (err) {
    console.error("Failed to load cart:", err);
    showError(String(err.message || err));
  }
}

async function loadFromFile(file) {
  clearError();
  try {
    let cartData, name;
    if (/\.p8$/i.test(file.name)) {
      cartData = parseP8Text(await file.text());
      name = file.name.replace(/\.p8$/i, "");
    } else {
      const url = URL.createObjectURL(file);
      try {
        cartData = await extractPico8Bytes(url);
      } finally {
        URL.revokeObjectURL(url);
      }
      name = file.name.replace(/\.p8\.png$/i, "").replace(/\.png$/i, "");
    }
    await startCart(cartData, name);
  } catch (err) {
    console.error("Failed to load cart:", err);
    showError(String(err.message || err));
  }
}

async function startCart(cartData, name) {
  loading = true;
  lastFrame = 0;
  accumulated = 0;

  try {
    let lua, gfx, map, gff;

    if (cartData instanceof Uint8Array) {
      lua = extractLua(cartData);
      gfx = extractGFX(cartData);
      map = extractMap(cartData);
      gff = extractGFF(cartData);
    } else {
      const { binary, lua: rawLua } = cartData;
      lua  = rawLua;
      gfx  = extractGFX(binary);
      map  = extractMap(binary);
      gff  = extractGFF(binary);
    }

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

    if (animId) { cancelAnimationFrame(animId); animId = null; }
    cartVersion++;
    gameLoop(performance.now());
    canvas.focus();
  } finally {
    loading = false;
  }
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

const loadBtn     = document.getElementById("load-btn");
const fileInput   = document.getElementById("file-input");
const fsBtn       = document.getElementById("fullscreen-btn");
const catBtn      = document.getElementById("catalogue-btn");
const catOverlay  = document.getElementById("catalogue-overlay");
const catGrid     = document.getElementById("catalogue-grid");
const catCloseBtn = document.getElementById("catalogue-close");

loadBtn.addEventListener("click", () => fileInput.click());

fsBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen();
  else document.exitFullscreen();
});

catBtn.addEventListener("click", async () => {
  catGrid.innerHTML = "";
  try {
    const res = await fetch(CART_BASE + "manifest.json");
    if (!res.ok) throw new Error(`manifest: HTTP ${res.status}`);
    const carts = await res.json();
    if (!carts.length) {
      catGrid.innerHTML = '<p class="cat-empty">No cartridges in the catalogue yet.</p>';
    } else {
      for (const name of carts) {
        const card = document.createElement("div");
        card.className = "cat-card";

        const isText = /\.p8$/i.test(name) && !/\.p8\.png$/i.test(name);
        const img = document.createElement("img");
        if (!isText) {
          img.src = CART_BASE + name;
          img.alt = name;
        } else {
          img.style.display = "none";
        }

        const label = document.createElement("p");
        label.textContent = name
          .replace(/\.p8\.png$/i, "")
          .replace(/\.p8$/i, "")
          .replace(/-/g, " ");

        card.appendChild(img);
        card.appendChild(label);
        card.addEventListener("click", () => {
          catOverlay.classList.add("hidden");
          loadFromUrl(CART_BASE + name);
        });
        catGrid.appendChild(card);
      }
    }
  } catch (err) {
    catGrid.innerHTML = `<p class="cat-empty">Could not load catalogue: ${err.message}</p>`;
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

// --- drag and drop ---

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
