// app.js — pengendali Statistik Indonesia: pindah halaman, menggambar
// grafik, tabel provinsi (cari + urutkan), banding dua provinsi, dan
// kalkulator kepadatan. Semua angka berasal dari data.js.

import {
  NATIONAL,
  TREND_PENDUDUK,
  TREND_PDB,
  TREND_PENGANGGURAN,
  TREND_KEMISKINAN,
  TREND_IPM,
  PROVINSI,
  kepadatan,
} from "./data.js";
import { angka, juta, koma } from "./format.js";
import { drawBarChart, drawLineChart, drawHorizontalBars } from "./chart.js";

const $ = (id) => document.getElementById(id);
let sortKey = "penduduk";
let sortDir = -1; // -1 = menurun, 1 = menaik

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function drawCharts(view) {
  if (view === "ringkasan") {
    drawBarChart($("chartPenduduk"), TREND_PENDUDUK);
    drawLineChart($("chartPdb"), [{ label: "Pertumbuhan PDB", warna: "#0e7490", data: TREND_PDB }]);
    const top5 = [...PROVINSI].sort((a, b) => b.penduduk - a.penduduk).slice(0, 5);
    drawHorizontalBars(
      $("chartTopProv"),
      top5.map((p) => ({ label: p.nama, nilai: p.penduduk / 1000000 })),
      { height: 200 }
    );
  }
  if (view === "penduduk") {
    drawBarChart($("chartPenduduk2"), TREND_PENDUDUK);
  }
  if (view === "ekonomi") {
    drawLineChart($("chartPdb2"), [{ label: "Pertumbuhan PDB", warna: "#0e7490", data: TREND_PDB }]);
    drawLineChart($("chartKerja"), [
      { label: "Pengangguran", warna: "#b42318", data: TREND_PENGANGGURAN },
      { label: "Kemiskinan", warna: "#123a5c", data: TREND_KEMISKINAN },
    ]);
  }
  if (view === "pendidikan") {
    drawLineChart($("chartIpm"), [{ label: "IPM", warna: "#0e7490", data: TREND_IPM }]);
  }
}

function filteredProvinces() {
  const q = $("qProv").value.trim().toLowerCase();
  const list = PROVINSI.filter((p) => !q || p.nama.toLowerCase().includes(q));
  const dir = sortDir;
  const key = sortKey;
  list.sort((a, b) => {
    if (key === "nama") return dir * a.nama.localeCompare(b.nama, "id");
    if (key === "luas") return dir * (a.luas - b.luas);
    if (key === "padat") return dir * (kepadatan(a) - kepadatan(b));
    return dir * (a.penduduk - b.penduduk);
  });
  return list;
}

function renderProvinces() {
  const list = filteredProvinces();
  $("provTable").querySelector("tbody").innerHTML =
    list
      .map(
        (p) =>
          `<tr><td>${escapeHtml(p.nama)}</td><td class="num">${angka(p.penduduk)}</td><td class="num">${angka(p.luas)}</td><td class="num">${angka(Math.round(kepadatan(p)))}</td></tr>`
      )
      .join("") || `<tr><td colspan="4">Tidak ada provinsi yang cocok dengan pencarian.</td></tr>`;
  $("provCount").textContent =
    list.length + " dari " + PROVINSI.length + " provinsi ditampilkan · total penduduk " + juta(PROVINSI.reduce((s, p) => s + p.penduduk, 0)) + " jiwa (BPS, 2024).";
}

function cmpHtml(p, other) {
  const dens = Math.round(kepadatan(p));
  const otherDens = Math.round(kepadatan(other));
  return `<div class="cmp">
    <h3>${escapeHtml(p.nama)}</h3>
    <dl>
      <dt>Penduduk</dt><dd>${angka(p.penduduk)} jiwa</dd>
      <dt>Luas</dt><dd>${angka(p.luas)} km²</dd>
      <dt>Kepadatan</dt><dd>${angka(dens)} jiwa/km²</dd>
    </dl>
    <p>${p.penduduk > other.penduduk ? "Penduduk lebih banyak" : "Penduduk lebih sedikit"} daripada ${escapeHtml(other.nama)} · ${dens > otherDens ? "lebih padat" : "lebih renggang"}.</p>
    <p class="src">Sumber: BPS, 2024</p>
  </div>`;
}

function renderCompare() {
  const a = PROVINSI.find((p) => p.nama === $("cmpA").value) || PROVINSI[0];
  const b = PROVINSI.find((p) => p.nama === $("cmpB").value) || PROVINSI[1];
  $("compareBox").innerHTML = cmpHtml(a, b) + cmpHtml(b, a);
}

function fillCompareSelects() {
  const opts = PROVINSI.map((p) => `<option value="${escapeHtml(p.nama)}">${escapeHtml(p.nama)}</option>`).join("");
  $("cmpA").innerHTML = opts;
  $("cmpB").innerHTML = opts;
  $("cmpA").value = "Jawa Barat";
  $("cmpB").value = "DKI Jakarta";
}

function route() {
  const hash = window.location.hash.replace(/^#\/?/, "") || "ringkasan";
  const name = ["ringkasan", "penduduk", "ekonomi", "pendidikan", "provinsi"].includes(hash) ? hash : "ringkasan";
  document.querySelectorAll(".view").forEach((v) => v.classList.add("hidden"));
  $("view-" + name).classList.remove("hidden");
  document.querySelectorAll(".mainnav a").forEach((a) => a.classList.toggle("active", a.dataset.route === name));
  // Gambar ulang grafik saat tampilannya terlihat, agar lebar kanvas benar.
  requestAnimationFrame(() => drawCharts(name));
  if (name === "provinsi") renderProvinces();
}

$("qProv").addEventListener("input", renderProvinces);
$("sortProv").addEventListener("change", (e) => {
  const [key, dir] = e.target.value.split("-");
  sortKey = key === "nama" || key === "penduduk" || key === "luas" || key === "padat" ? key : "penduduk";
  sortDir = dir === "asc" ? 1 : -1;
  renderProvinces();
});

document.querySelectorAll(".thbtn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.sort;
    if (sortKey === key) sortDir = -sortDir;
    else {
      sortKey = key;
      sortDir = key === "nama" ? 1 : -1;
    }
    renderProvinces();
  });
});

$("cmpA").addEventListener("change", renderCompare);
$("cmpB").addEventListener("change", renderCompare);

$("densityForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const pop = Number($("dPop").value);
  const area = Number($("dArea").value);
  if (!pop || !area || pop <= 0 || area <= 0) {
    $("densityResult").textContent = "Isi jumlah penduduk dan luas dengan angka lebih dari 0.";
    return;
  }
  const d = pop / area;
  $("densityResult").textContent =
    angka(pop) + " jiwa di " + angka(area) + " km² = ±" + angka(Math.round(d)) + " jiwa/km².";
});

window.addEventListener("hashchange", route);
window.addEventListener("resize", () => route());
fillCompareSelects();
renderProvinces();
renderCompare();
route();
