// format.js — semua cara angka ditampilkan di Statistik Indonesia.

export function angka(n) {
  return Number(n).toLocaleString("id-ID");
}

export function juta(n) {
  return (n / 1000000).toLocaleString("id-ID", { maximumFractionDigits: 1 }) + " jt";
}

export function koma(n, digit = 2) {
  return Number(n).toLocaleString("id-ID", {
    minimumFractionDigits: digit,
    maximumFractionDigits: digit,
  });
}

export function persen(n) {
  return koma(n, 2) + "%";
}

export function sumber(tahun) {
  return "Sumber: BPS, " + tahun;
}
