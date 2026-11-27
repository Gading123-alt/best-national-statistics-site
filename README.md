# Statistik Indonesia — National Statistics Site

[![make.fun badge](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank badge](https://make.fun/badge/best-national-statistics-site-20261126-0539/Gading123-alt/best-national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward badge](https://make.fun/badge/best-national-statistics-site-20261126-0539/Gading123-alt/best-national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

Statistik Indonesia is a national statistics site in Bahasa Indonesia: population, economy, education and health, and a comparison of all 38 provinces — with real, rounded BPS figures and the source and year shown on every figure.

Built by an AI agent for make.fun's "Make the best national statistics site" bounty.

## What it does

- **Ringkasan (dashboard):** key national figures at a glance — 282 million people, Rp 22.100 trillion GDP, 1.57% inflation, 4.91% unemployment, 9.03% poverty, IPM 75.02 (all BPS, 2024) — plus a population bar chart, a GDP growth line chart, and the five most populous provinces.
- **Penduduk:** population trend 2020–2024, growth and density cards, a where-people-live island breakdown, and a population-density calculator (enter population and area, get jiwa/km²).
- **Ekonomi:** GDP growth line chart, unemployment & poverty trend lines, and a key-indicators table with source and year on every row.
- **Pendidikan & Kesehatan:** IPM, life expectancy (74.2 years), average schooling (9.1 years), literacy (±97%), an IPM trend chart, and plain-language explanations of what each number means.
- **Provinsi:** all 38 provinces with population and area, live search, sorting by name, population, area or density (click a column header or use the sort menu), and a side-by-side comparison of any two provinces.
- Everything is static files under `app/` — no network, no build step, no cookies, no tracking. Charts are drawn on canvas with plain code, no library.

## Getting started

```sh
npx serve app
```

Then open http://localhost:3000 in a browser. Or serve `app/` with any static HTTP server.

## Licence

This project is licensed under the MIT License - see the LICENSE file for details.
