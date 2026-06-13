import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const surahDir = path.join(root, "src", "data", "surah");
const surahInfoPath = path.join(root, "src", "data", "surah-info.json");
const outPath = path.join(root, "public", "search-index.json");

const surahInfo = JSON.parse(fs.readFileSync(surahInfoPath, "utf8"));

// Map surah index -> latin name.
const latinByIndex = new Map();
for (const info of surahInfo.surah_info) {
  latinByIndex.set(Number(info.index), info.latin);
}

const entries = [];

for (let s = 1; s <= 114; s++) {
  const filePath = path.join(surahDir, `${s}.json`);
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  const surah = data[String(s)];
  const idText = surah?.translations?.id?.text ?? {};
  const name = latinByIndex.get(s) ?? "";

  for (const ayah of Object.keys(idText)) {
    entries.push({
      s,
      a: Number(ayah),
      n: name,
      t: idText[ayah],
    });
  }
}

fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, JSON.stringify(entries));

console.log(`Wrote ${entries.length} entries to ${outPath}`);
