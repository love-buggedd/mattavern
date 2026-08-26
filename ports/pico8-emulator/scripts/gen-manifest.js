const { readdirSync, writeFileSync, existsSync } = require("fs");
const path = require("path");

const cartsDir = path.join(__dirname, "../../../web/public/pico8/carts");

if (!existsSync(cartsDir)) {
  console.log("carts/ not found, skipping manifest");
  process.exit(0);
}

const files = readdirSync(cartsDir)
  .filter((f) => f !== "manifest.json" && (f.endsWith(".p8.png") || f.endsWith(".p8")))
  .sort((a, b) => {
    // .p8.png entries before plain .p8 entries (they have cart art thumbnails)
    const aPng = a.endsWith(".p8.png"), bPng = b.endsWith(".p8.png");
    if (aPng !== bPng) return aPng ? -1 : 1;
    return a.localeCompare(b);
  });

writeFileSync(
  path.join(cartsDir, "manifest.json"),
  JSON.stringify(files, null, 2)
);

console.log(`manifest.json: ${files.length} cart(s)`);
