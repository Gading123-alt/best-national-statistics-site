// chart.js — grafik batang dan garis, digambar langsung di <canvas>
// tanpa pustaka apa pun, supaya muat awal tetap ringan.

const NAVY = "#123a5c";
const TEAL = "#0e7490";
const TEAL_LIGHT = "#22a3b8";
const INK = "#16283a";
const MUTED = "#5a6b7c";
const GRID = "#dde5ec";
const RED = "#b42318";

function setup(canvas, cssH) {
  const ctx = canvas.getContext("2d");
  const dpr = window.devicePixelRatio || 1;
  const cssW = canvas.clientWidth || 640;
  canvas.width = cssW * dpr;
  canvas.height = cssH * dpr;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, cssW, cssH);
  ctx.font = "12px 'Segoe UI', system-ui, sans-serif";
  return { ctx, cssW, cssH };
}

function axes(ctx, cssW, cssH, padL, padR, padT, padB, yTicks) {
  ctx.strokeStyle = GRID;
  ctx.fillStyle = MUTED;
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  for (const t of yTicks) {
    ctx.beginPath();
    ctx.moveTo(padL, t.y);
    ctx.lineTo(cssW - padR, t.y);
    ctx.stroke();
    ctx.fillText(t.label, padL - 8, t.y);
  }
  ctx.strokeStyle = "#b8c4d0";
  ctx.beginPath();
  ctx.moveTo(padL, padT);
  ctx.lineTo(padL, cssH - padB);
  ctx.lineTo(cssW - padR, cssH - padB);
  ctx.stroke();
}

export function drawBarChart(canvas, data, opts = {}) {
  const cssH = opts.height || 280;
  const { ctx, cssW, cssH: h } = setup(canvas, cssH);
  const padL = 56, padR = 16, padT = 12, padB = 28;
  const max = Math.max(...data.map((d) => d.nilai)) * 1.15;
  const min = Math.min(0, ...data.map((d) => d.nilai));
  const range = max - min;
  const y = (v) => padT + ((max - v) / range) * (h - padT - padB);
  const ticks = [0, 0.5, 1].map((f) => {
    const v = min + f * range;
    return { y: y(v), label: Math.round(v).toLocaleString("id-ID") };
  });
  axes(ctx, cssW, h, padL, padR, padT, padB, ticks);
  const slot = (cssW - padL - padR) / data.length;
  const barW = Math.min(52, slot * 0.6);
  data.forEach((d, i) => {
    const x = padL + i * slot + (slot - barW) / 2;
    const top = y(Math.max(0, d.nilai));
    const bottom = y(0);
    ctx.fillStyle = d.nilai < 0 ? RED : i === data.length - 1 ? NAVY : TEAL;
    ctx.fillRect(x, top, barW, Math.max(1, bottom - top));
    ctx.fillStyle = INK;
    ctx.textAlign = "center";
    ctx.textBaseline = "bottom";
    ctx.fillText(String(d.nilai), x + barW / 2, top - 4);
    ctx.fillStyle = MUTED;
    ctx.textBaseline = "top";
    ctx.fillText(String(d.tahun), x + barW / 2, h - padB + 6);
  });
}

export function drawLineChart(canvas, series, opts = {}) {
  // series: [{label, warna, data:[{tahun,nilai}]}]
  const cssH = opts.height || 280;
  const { ctx, cssW, cssH: h } = setup(canvas, cssH);
  const padL = 56, padR = 16, padT = 14, padB = 28;
  const all = series.flatMap((s) => s.data.map((d) => d.nilai));
  let min = Math.min(...all);
  let max = Math.max(...all);
  const pad = (max - min) * 0.15 || 1;
  min -= pad;
  max += pad;
  const years = series[0].data.map((d) => d.tahun);
  const x = (i) => padL + (i / (years.length - 1)) * (cssW - padL - padR);
  const y = (v) => padT + ((max - v) / (max - min)) * (h - padT - padB);
  const ticks = [0, 0.5, 1].map((f) => {
    const v = min + f * (max - min);
    return { y: y(v), label: v.toLocaleString("id-ID", { maximumFractionDigits: 1 }) };
  });
  axes(ctx, cssW, h, padL, padR, padT, padB, ticks);
  ctx.fillStyle = MUTED;
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  years.forEach((t, i) => ctx.fillText(String(t), x(i), h - padB + 6));
  for (const s of series) {
    ctx.strokeStyle = s.warna;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    s.data.forEach((d, i) => (i === 0 ? ctx.moveTo(x(i), y(d.nilai)) : ctx.lineTo(x(i), y(d.nilai))));
    ctx.stroke();
    ctx.fillStyle = s.warna;
    s.data.forEach((d, i) => {
      ctx.beginPath();
      ctx.arc(x(i), y(d.nilai), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = INK;
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillText(String(d.nilai).replace(".", ","), x(i), y(d.nilai) - 8);
      ctx.fillStyle = s.warna;
    });
  }
}

export function drawHorizontalBars(canvas, rows, opts = {}) {
  // rows: [{label, nilai}] — batang horizontal untuk perbandingan provinsi.
  const cssH = opts.height || Math.max(220, rows.length * 34 + 20);
  const { ctx, cssW, cssH: h } = setup(canvas, cssH);
  const padL = 150, padR = 90, padT = 8, padB = 8;
  const max = Math.max(...rows.map((r) => r.nilai)) * 1.08;
  const rowH = (h - padT - padB) / rows.length;
  const barH = 16;
  rows.forEach((r, i) => {
    const midY = padT + i * rowH + rowH / 2;
    ctx.fillStyle = INK;
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    ctx.fillText(r.label, padL - 8, midY);
    const w = (r.nilai / max) * (cssW - padL - padR);
    ctx.fillStyle = i === 0 ? NAVY : TEAL;
    ctx.fillRect(padL, midY - barH / 2, w, barH);
    ctx.fillStyle = MUTED;
    ctx.textAlign = "left";
    ctx.fillText(r.nilai.toLocaleString("id-ID", { maximumFractionDigits: 1 }), padL + w + 6, midY);
  });
}
