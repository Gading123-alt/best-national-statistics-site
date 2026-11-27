// main.ts — menyerahkan situs Statistik Indonesia ke make.fun.
// Menyalin app/ dan screenshots/ dari repositori ke /output, lalu menulis
// /output/dossier.json dengan buildDossier dari vendor/makefun-frontend.ts.
// Di luar grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// Validasi input sebelum membangun: kedua direktori sumber wajib ada.
for (const dir of ["app", "screenshots"]) {
  if (!existsSync(join(here, dir))) {
    throw new Error(`Direktori sumber tidak ditemukan: ${join(here, dir)}`);
  }
}

mkdirSync(out, { recursive: true });
cpSync(join(here, "app"), join(out, "app"), { recursive: true });
mkdirSync(join(out, "screenshots"), { recursive: true });
if (existsSync(join(here, "screenshots"))) {
  cpSync(join(here, "screenshots"), join(out, "screenshots"), { recursive: true });
}

writeFileSync(
  join(out, "dossier.json"),
  buildDossier(out, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);

// Verifikasi: baca kembali dossier.json dan pastikan isinya JSON yang valid.
JSON.parse(readFileSync(join(out, "dossier.json"), "utf8"));
