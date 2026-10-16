// Copia las fuentes de @fontsource a www/fonts y genera fonts.css para que la app funcione sin internet.
const fs = require("fs"), path = require("path");
const out = path.join(__dirname, "..", "www", "fonts");
fs.mkdirSync(out, { recursive: true });
const want = [
  ["ibm-plex-sans", "IBM Plex Sans", [400, 500, 600]],
  ["ibm-plex-mono", "IBM Plex Mono", [400, 500]],
  ["source-serif-4", "Source Serif 4", [500, 600]],
];
const ranges = {
  latin: "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD",
  "latin-ext": "U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1EFF,U+2020,U+20A0-20AB,U+20AD-20CF,U+2113,U+2C60-2C7F,U+A720-A7FF",
};
let css = "";
for (const [pkg, family, weights] of want) {
  const dir = path.join(__dirname, "..", "node_modules", "@fontsource", pkg, "files");
  for (const w of weights) for (const sub of ["latin", "latin-ext"]) {
    const f = `${pkg}-${sub}-${w}-normal.woff2`;
    const src = path.join(dir, f);
    if (!fs.existsSync(src)) { console.warn("Falta", f, "(se usará la fuente del sistema)"); continue; }
    fs.copyFileSync(src, path.join(out, f));
    css += `@font-face{font-family:"${family}";font-style:normal;font-weight:${w};font-display:swap;src:url("${f}") format("woff2");unicode-range:${ranges[sub]}}\n`;
  }
}
fs.writeFileSync(path.join(out, "fonts.css"), css || "/* sin fuentes locales */\n");
console.log("Fuentes listas:", css.split("\n").filter(Boolean).length, "archivos");
