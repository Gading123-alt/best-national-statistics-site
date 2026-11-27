// data.js — satu-satunya tempat data Statistik Indonesia tinggal.
// Semua angka adalah angka BPS yang dibulatkan ke nilai wajar (bukan
// desimal palsu), dan setiap angka di layar selalu disertai "Sumber: BPS,
// <tahun>". Angka provinsi: perkiraan pertengahan tahun 2024, dibulatkan
// ke 10 ribu jiwa terdekat; luas daratan dibulatkan ke km² terdekat.

export const SOURCE = "BPS";

export const NATIONAL = {
  pendudukJuta: 282,
  pendudukTahun: 2024,
  pertumbuhanPenduduk: 0.8, // % per tahun, 2024
  kepadatan: 147, // jiwa/km², 2024
  pdbTriliun: 22100, // Rp triliun, 2024
  pdbPerKapitaJuta: 78, // Rp juta, 2024
  inflasi: 1.57, // % yoy Desember 2024
  pengangguran: 4.91, // % Agustus 2024
  kemiskinan: 9.03, // % Maret 2024
  ipm: 75.02, // 2024
  harapanHidup: 74.2, // tahun, 2024
  rataLamaSekolah: 9.1, // tahun, 2024
  melekHuruf: 97, // % penduduk 15+, 2024 (dibulatkan)
  gini: 0.38, // 2024 (dibulatkan)
};

// Tren nasional (angka dibulatkan, Sumber: BPS, tahun bersangkutan).
export const TREND_PENDUDUK = [
  { tahun: 2020, nilai: 270 },
  { tahun: 2021, nilai: 273 },
  { tahun: 2022, nilai: 276 },
  { tahun: 2023, nilai: 279 },
  { tahun: 2024, nilai: 282 },
];

export const TREND_PDB = [
  // pertumbuhan ekonomi (% yoy)
  { tahun: 2020, nilai: -2.07 },
  { tahun: 2021, nilai: 3.7 },
  { tahun: 2022, nilai: 5.31 },
  { tahun: 2023, nilai: 5.05 },
  { tahun: 2024, nilai: 5.03 },
];

export const TREND_PENGANGGURAN = [
  { tahun: 2020, nilai: 7.07 },
  { tahun: 2021, nilai: 6.49 },
  { tahun: 2022, nilai: 5.86 },
  { tahun: 2023, nilai: 5.45 },
  { tahun: 2024, nilai: 4.91 },
];

export const TREND_KEMISKINAN = [
  { tahun: 2020, nilai: 10.19 },
  { tahun: 2021, nilai: 9.71 },
  { tahun: 2022, nilai: 9.57 },
  { tahun: 2023, nilai: 9.36 },
  { tahun: 2024, nilai: 9.03 },
];

export const TREND_IPM = [
  { tahun: 2020, nilai: 71.94 },
  { tahun: 2021, nilai: 72.29 },
  { tahun: 2022, nilai: 72.91 },
  { tahun: 2023, nilai: 74.39 },
  { tahun: 2024, nilai: 75.02 },
];

// 38 provinsi: penduduk (jiwa, dibulatkan) dan luas daratan (km², dibulatkan).
// Sumber: BPS, 2024 (angka dibulatkan).
export const PROVINSI = [
  { nama: "Aceh", penduduk: 5550000, luas: 57956 },
  { nama: "Sumatera Utara", penduduk: 15590000, luas: 72981 },
  { nama: "Sumatera Barat", penduduk: 5760000, luas: 42012 },
  { nama: "Riau", penduduk: 6690000, luas: 87023 },
  { nama: "Kepulauan Riau", penduduk: 2240000, luas: 8201 },
  { nama: "Jambi", penduduk: 3660000, luas: 50058 },
  { nama: "Sumatera Selatan", penduduk: 8940000, luas: 91592 },
  { nama: "Kepulauan Bangka Belitung", penduduk: 1550000, luas: 16424 },
  { nama: "Bengkulu", penduduk: 2060000, luas: 19919 },
  { nama: "Lampung", penduduk: 9300000, luas: 34623 },
  { nama: "DKI Jakarta", penduduk: 10560000, luas: 664 },
  { nama: "Jawa Barat", penduduk: 50350000, luas: 35377 },
  { nama: "Banten", penduduk: 12430000, luas: 9662 },
  { nama: "Jawa Tengah", penduduk: 37890000, luas: 32800 },
  { nama: "DI Yogyakarta", penduduk: 3760000, luas: 3133 },
  { nama: "Jawa Timur", penduduk: 41810000, luas: 47799 },
  { nama: "Bali", penduduk: 4350000, luas: 5780 },
  { nama: "Nusa Tenggara Barat", penduduk: 5600000, luas: 18572 },
  { nama: "Nusa Tenggara Timur", penduduk: 5660000, luas: 48718 },
  { nama: "Kalimantan Barat", penduduk: 5800000, luas: 147307 },
  { nama: "Kalimantan Tengah", penduduk: 2810000, luas: 153564 },
  { nama: "Kalimantan Selatan", penduduk: 4290000, luas: 38744 },
  { nama: "Kalimantan Timur", penduduk: 3960000, luas: 127346 },
  { nama: "Kalimantan Utara", penduduk: 740000, luas: 75467 },
  { nama: "Sulawesi Utara", penduduk: 2710000, luas: 13851 },
  { nama: "Gorontalo", penduduk: 1270000, luas: 11257 },
  { nama: "Sulawesi Tengah", penduduk: 3140000, luas: 61841 },
  { nama: "Sulawesi Selatan", penduduk: 9360000, luas: 46717 },
  { nama: "Sulawesi Barat", penduduk: 1550000, luas: 16787 },
  { nama: "Sulawesi Tenggara", penduduk: 2820000, luas: 38067 },
  { nama: "Maluku", penduduk: 1980000, luas: 46914 },
  { nama: "Maluku Utara", penduduk: 1410000, luas: 31982 },
  { nama: "Papua", penduduk: 1190000, luas: 82680 },
  { nama: "Papua Barat", penduduk: 590000, luas: 64125 },
  { nama: "Papua Selatan", penduduk: 540000, luas: 117849 },
  { nama: "Papua Tengah", penduduk: 1370000, luas: 61073 },
  { nama: "Papua Pegunungan", penduduk: 1470000, luas: 51213 },
  { nama: "Papua Barat Daya", penduduk: 620000, luas: 38902 },
];

export function kepadatan(p) {
  return p.penduduk / p.luas;
}

export function totalPendudukProvinsi() {
  return PROVINSI.reduce((s, p) => s + p.penduduk, 0);
}
