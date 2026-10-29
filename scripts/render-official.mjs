// Reproduce Official Logo.svg rendering: mask = luma(embedded layer 0),
// color = embedded layer 1. Output = color with alpha from mask (transparent bg).
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

function extractLayers(svgPath) {
  const s = fs.readFileSync(svgPath, "utf8");
  const marker = "data:image/png;base64,";
  const out = [];
  let idx = 0;
  while (true) {
    idx = s.indexOf(marker, idx);
    if (idx < 0) break;
    const st = idx + marker.length;
    const en = s.indexOf('"', st);
    out.push(Buffer.from(s.slice(st, en), "base64"));
    idx = en;
  }
  return out;
}

const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();
function crc32(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ -1) >>> 0;
}
function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

function decodePNG(buf) {
  let pos = 8;
  let width, height, bitDepth, colorType;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      const interlace = data[12];
      if (interlace !== 0) throw new Error("interlaced PNG not supported");
      if (bitDepth !== 8) throw new Error("only 8-bit supported, got " + bitDepth);
    } else if (type === "IDAT") idat.push(data);
    else if (type === "IEND") break;
    pos += 12 + len;
  }
  const ch = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType];
  if (!ch) throw new Error("unsupported color type " + colorType);
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * ch;
  const px = Buffer.alloc(width * height * ch);
  let p = 0;
  for (let y = 0; y < height; y++) {
    const f = raw[p++];
    const row = px.subarray(y * stride, (y + 1) * stride);
    for (let x = 0; x < stride; x++) {
      const a = x >= ch ? row[x - ch] : 0;
      const b = y > 0 ? px[(y - 1) * stride + x] : 0;
      const c = x >= ch && y > 0 ? px[(y - 1) * stride + x - ch] : 0;
      let v = raw[p + x];
      if (f === 1) v = (v + a) & 255;
      else if (f === 2) v = (v + b) & 255;
      else if (f === 3) v = (v + ((a + b) >> 1)) & 255;
      else if (f === 4) {
        const pa = Math.abs(b - c),
          pb = Math.abs(a - c),
          pc = Math.abs(a + b - 2 * c);
        const pr = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
        v = (v + pr) & 255;
      }
      row[x] = v;
    }
    p += stride;
  }
  // normalize to RGBA
  const rgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    if (colorType === 6) {
      rgba.set(px.subarray(i * 4, i * 4 + 4), i * 4);
    } else if (colorType === 2) {
      rgba[i * 4] = px[i * 3];
      rgba[i * 4 + 1] = px[i * 3 + 1];
      rgba[i * 4 + 2] = px[i * 3 + 2];
      rgba[i * 4 + 3] = 255;
    } else if (colorType === 0) {
      rgba[i * 4] = rgba[i * 4 + 1] = rgba[i * 4 + 2] = px[i];
      rgba[i * 4 + 3] = 255;
    } else if (colorType === 4) {
      const g = px[i * 2];
      rgba[i * 4] = rgba[i * 4 + 1] = rgba[i * 4 + 2] = g;
      rgba[i * 4 + 3] = px[i * 2 + 1];
    }
  }
  return { width, height, rgba };
}

function encodePNG(w, h, rgba) {
  const stride = w * 4;
  const raw = Buffer.alloc(h * (stride + 1));
  for (let y = 0; y < h; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, (y + 1) * stride);
  }
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", zlib.deflateSync(raw)),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const input = process.argv[2] || path.join("LOGO", "Official Logo.svg");
const output = process.argv[3] || path.join("LOGO", "official-true.png");
const layers = extractLayers(input);
console.log(
  "layers:",
  layers.length,
  layers.map((b) => b.length)
);
if (layers.length < 2) throw new Error("expected 2 layers");
const mask = decodePNG(layers[0]);
const color = decodePNG(layers[1]);
console.log("mask:", mask.width, mask.height, "color:", color.width, color.height);
if (mask.width !== color.width || mask.height !== color.height) throw new Error("size mismatch");
const { width: w, height: h } = color;
const out = Buffer.alloc(w * h * 4);
for (let i = 0; i < w * h; i++) {
  // mask alpha = luminance (matches feColorMatrix 0.2126/0.7152/0.0722 row)
  const a = Math.round(
    0.2126 * mask.rgba[i * 4] + 0.7152 * mask.rgba[i * 4 + 1] + 0.0722 * mask.rgba[i * 4 + 2]
  );
  out[i * 4] = color.rgba[i * 4];
  out[i * 4 + 1] = color.rgba[i * 4 + 1];
  out[i * 4 + 2] = color.rgba[i * 4 + 2];
  out[i * 4 + 3] = color.rgba[i * 4 + 3] === 0 ? 0 : a;
}
fs.writeFileSync(output, encodePNG(w, h, out));
console.log("wrote", output, w, h);
