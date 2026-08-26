const { readdirSync, writeFileSync, existsSync } = require("fs");
const path = require("path");

const cartsDir = path.join(__dirname, "../../../web/public/pico8/carts");

if (!existsSync(cartsDir)) {
  console.log("carts/ not found, skipping manifest");
  process.exit(0);
}

const files = readdirSync(cartsDir)
  .filter((f) => f.endsWith(".p8.png"))
  .sort();

writeFileSync(
  path.join(cartsDir, "manifest.json"),
  JSON.stringify(files, null, 2)
);

console.log(`manifest.json: ${files.length} cart(s)`);
