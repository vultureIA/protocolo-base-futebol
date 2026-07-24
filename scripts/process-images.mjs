import sharp from "sharp";
import fs from "fs";
import path from "path";

const outDir = path.resolve("public/images/hq");
fs.mkdirSync(outDir, { recursive: true });

async function info(p) {
  const m = await sharp(p).metadata();
  return `${path.basename(p)} ${m.width}x${m.height} ${Math.round(fs.statSync(p).size / 1024)}kb`;
}

function walk(d, acc = []) {
  for (const ent of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, ent.name);
    if (ent.isDirectory()) walk(p, acc);
    else if (/\.(jpe?g|png)$/i.test(ent.name)) acc.push(p);
  }
  return acc;
}

const fotoRoot = path.resolve("..", "FOTOS ANTES E DEPIS - BERO");
const sources = walk(fotoRoot);
console.log("SOURCES");
for (const f of sources) console.log(await info(f));

const map = {
  "bero-antes": sources.find((f) => f.includes("ANTES") && !f.includes("JUNTO")),
  "bero-depois-frente": sources.find((f) => f.includes("13.53.29 (3)")),
  "bero-depois-perfil": sources.find((f) => f.includes("13.53.29 (2)")),
  "bero-depois-costas": sources.find((f) => f.includes("13.53.29 (4)")),
  "bero-depois-lado": sources.find((f) => f.includes("13.53.30")),
  "bero-antes-depois": sources.find((f) => f.includes("JUNTO") && f.includes("(1)")),
  "bero-antes-depois-perfil": sources.find(
    (f) => f.includes("JUNTO") && !f.includes("(")
  ),
};

const banner = path.resolve("public/images/checkout-banner.png");

async function exportHq(name, src, width = 1800) {
  if (!src || !fs.existsSync(src)) {
    console.log("SKIP", name, src);
    return null;
  }
  const dest = path.join(outDir, `${name}.webp`);
  await sharp(src)
    .rotate()
    .resize({ width, withoutEnlargement: false, fit: "inside" })
    .webp({ quality: 92, effort: 4 })
    .toFile(dest);
  console.log("OUT", await info(dest));
  return dest;
}

for (const [name, src] of Object.entries(map)) {
  await exportHq(name, src, 2000);
}

// Upscale action crop from banner to usable hero width via lanczos
const actionSrc = path.resolve("public/images/bero-acao.png");
const actionMeta = await sharp(actionSrc).metadata();
console.log("action src", actionMeta.width, actionMeta.height);
await sharp(actionSrc)
  .resize({ width: 1600, kernel: sharp.kernel.lanczos3 })
  .sharpen({ sigma: 0.8 })
  .webp({ quality: 90 })
  .toFile(path.join(outDir, "bero-acao.webp"));
console.log("OUT", await info(path.join(outDir, "bero-acao.webp")));

// Full banner as wide asset
await sharp(banner)
  .resize({ width: 2000, withoutEnlargement: false })
  .webp({ quality: 92 })
  .toFile(path.join(outDir, "checkout-banner.webp"));
console.log("OUT", await info(path.join(outDir, "checkout-banner.webp")));

// Build a clean before/after composite from best singles if needed
const antes = map["bero-antes"];
const depois = map["bero-depois-frente"];
if (antes && depois) {
  const w = 1000;
  const h = 1400;
  const left = await sharp(antes)
    .rotate()
    .resize(w, h, { fit: "cover", position: "centre" })
    .toBuffer();
  const right = await sharp(depois)
    .rotate()
    .resize(w, h, { fit: "cover", position: "centre" })
    .toBuffer();
  await sharp({
    create: {
      width: w * 2 + 8,
      height: h,
      channels: 3,
      background: { r: 10, g: 17, b: 40 },
    },
  })
    .composite([
      { input: left, left: 0, top: 0 },
      { input: right, left: w + 8, top: 0 },
    ])
    .webp({ quality: 92 })
    .toFile(path.join(outDir, "bero-transformacao.webp"));
  console.log("OUT", await info(path.join(outDir, "bero-transformacao.webp")));
}

console.log("DONE");
