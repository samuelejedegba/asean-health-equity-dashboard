# ASEAN Health Equity & SDG 3 Progress

Interactive dashboard for the 10Alytics Global Hackathon 2026 — Pod 4, HealthTech Analytics Programme.

**[View the live interactive dashboard →]([https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/](https://samuelejedegba.github.io/asean-health-equity-dashboard/)**


## What this is

Three linked findings on ASEAN health outcomes (1990–2016), built from 20 official WHO/World Bank indicator files standardised into a 252-row country-year panel:

1. **Funding Efficiency** — spend and workforce levels don't reliably predict outcomes; Thailand outperforms its spend-predicted life expectancy by nearly 3 years.
2. **Childhood Survival** — DPT vaccination coverage is the strongest predictor of infant mortality in the dataset (correlation -0.76); Laos and Myanmar are the clearest high-risk cohort.
3. **Disease Containment & Data Integrity** — 8 of 10 countries have documented TB reporting anomalies; containment success cannot currently be verified region-wide.

## The Process

This wasn't a straightforward "load data, make charts" build. Getting to three trustworthy 
findings meant catching and fixing real errors along the way — the kind that would have 
undercut the whole analysis if they'd shipped unnoticed.

**Data**
- 20 official WHO/World Bank indicator files, spanning 1990–2016, standardised into a 
  single 252-row country-year panel
- Country name inconsistencies reconciled across sources (e.g. three different spellings 
  of Laos)
- 28 individual data-quality anomalies identified through systematic checks — not eyeballed, 
  detected — and disclosed rather than quietly cleaned away

**Corrections made mid-build**
- Found and fixed a measure that used a 27-year historical average instead of each 
  country's current status — the original version wrongly flagged Malaysia as below the 
  WHO workforce threshold
- Replaced an early "efficiency" ranking after realising it rewarded low spend rather than 
  genuine performance — rebuilt it as a proper log-linear regression with residual analysis
- Verified a stated correlation (initially cited as -0.85) against the actual chart it was 
  meant to support, found it was -0.76, and corrected every reference across the dashboard, 
  report, and slides

**Why this matters**
Every number on this dashboard has been checked against the underlying data at least once, 
and several were checked twice after something didn't look right. The three findings below 
are the ones that survived that scrutiny.

## The Findings

1. **Funding Efficiency** — spend and workforce levels don't reliably predict outcomes. 
   Thailand outperforms its own spend-predicted life expectancy by nearly 3 years — the 
   largest gap in the region — while having a third of the Philippines' health workforce 
   and far better child survival.
2. **Childhood Survival** — DPT vaccination coverage is the strongest predictor of infant 
   mortality in the dataset (correlation -0.76, n=78). Laos and Myanmar are the clearest 
   high-risk cohort on every chart tested.
3. **Disease Containment & Data Integrity** — 8 of 10 countries have a documented TB 
   reporting anomaly, and only 2 still report data past 2012. Containment success cannot 
   currently be verified region-wide — which is itself the finding.



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
