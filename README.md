# ASEAN Health Equity & SDG 3 Progress

Interactive dashboard for the 10Alytics Global Hackathon 2026 — Pod 4, HealthTech Analytics Programme.

**[View the live interactive dashboard →]([https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/](https://samuelejedegba.github.io/asean-health-equity-dashboard/)**


## What this is

Three linked findings on ASEAN health outcomes (1990–2016), built from 20 official WHO/World Bank indicator files standardised into a 252-row country-year panel:

1. **Funding Efficiency** — spend and workforce levels don't reliably predict outcomes; Thailand outperforms its spend-predicted life expectancy by nearly 3 years.
2. **Childhood Survival** — DPT vaccination coverage is the strongest predictor of infant mortality in the dataset (correlation -0.76); Laos and Myanmar are the clearest high-risk cohort.
3. **Disease Containment & Data Integrity** — 8 of 10 countries have documented TB reporting anomalies; containment success cannot currently be verified region-wide.

## How to view it

**Option A — GitHub Pages (recommended):**
1. Go to this repo's **Settings → Pages**
2. Under "Source," select the `main` branch and `/ (root)` folder
3. Save — GitHub gives you a live URL within a minute or two
4. Paste that URL at the top of this README

**Option B — locally:** download all files to one folder, open `index.html` in any browser. No installation needed.

## Files

| File | What it is |
|---|---|
| `index.html` | Page structure and all three dashboard tabs |
| `style.css` | Visual theme (matches the companion Power BI dashboard) |
| `app.js` | Chart logic (built with Chart.js) |
| `dashboard_data.js` | The underlying dataset, embedded as JavaScript |

## Also in this project

- Full Power BI dashboard (`.pbix`)
- Written insights report with methodology and policy recommendations
- Presentation deck

Built with data analysis and web development assistance from Claude (Anthropic).
