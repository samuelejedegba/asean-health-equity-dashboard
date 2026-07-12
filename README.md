# ASEAN Health Equity & SDG 3 Progress

Interactive dashboard for the 10Alytics Global Hackathon 2026 — Pod 4, HealthTech Analytics Programme.

**[View the live interactive dashboard →]([https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPO-NAME/](https://samuelejedegba.github.io/asean-health-equity-dashboard/)**


## What this is

Three linked findings on ASEAN health outcomes (1990–2016), built from 20 official WHO/World Bank indicator files standardised into a 252-row country-year panel:

1. **Funding Efficiency** — spend and workforce levels don't reliably predict outcomes; Thailand outperforms its spend-predicted life expectancy by nearly 3 years.
2. **Childhood Survival** — DPT vaccination coverage is the strongest predictor of infant mortality in the dataset (correlation -0.76); Laos and Myanmar are the clearest high-risk cohort.
3. **Disease Containment & Data Integrity** — 8 of 10 countries have documented TB reporting anomalies; containment success cannot currently be verified region-wide.

## The Process

This wasn't a straightforward "load data, make charts" build. It involved real data 
modelling, statistical analysis outside Power BI, and catching real errors along the way — 
the kind that would have undercut the whole analysis if they'd shipped unnoticed.

**Data engineering**
- 20 official WHO/World Bank indicator files, spanning 1990–2016, cleaned and standardised 
  in Python into a single 252-row country-year panel
- Country name inconsistencies reconciled across sources (e.g. three different spellings 
  of Laos)
- Modelled as a proper star schema in Power BI: one fact table (`fact_HealthIndicators`) 
  joined to `dim_Country` and `dim_Year`, plus standalone reference tables 
  (`ref_Benchmarks` for WHO/SDG thresholds, `ref_SpendEfficiency` for regression output) 
  deliberately left unjoined to avoid ambiguous relationship paths
- A systematic anomaly-detection script — not manual eyeballing — flagged 28 individual 
  data-quality issues (implausible year-on-year swings, early reporting cessation, 
  suspected placeholder values) and logged them as their own queryable table

**Analysis beyond drag-and-drop**
- A log-linear regression, run in Python, fitted life expectancy against log-transformed 
  spend per capita across all ten countries, then used to calculate each country's 
  residual — how far its actual outcome sits above or below what its spend level predicts
- A Pearson correlation coefficient, built from scratch in DAX (no built-in CORREL function 
  in Power BI), to quantify the DPT-coverage-to-infant-mortality relationship precisely 
  rather than asserting it
- A recurring `LASTNONBLANK`-based DAX pattern used across multiple measures to pull each 
  country's most recent reported year rather than an all-time average — the fix for a real 
  bug found mid-build (below)

**Corrections made mid-build**
- Found and fixed a measure that used a 27-year historical average instead of each 
  country's current status — the original version wrongly flagged Malaysia as below the 
  WHO workforce threshold, and wrongly counted 7 countries below target instead of 6
- Replaced an early "efficiency" ranking (life expectancy ÷ spend) after realising it 
  rewarded low spend rather than genuine performance — rebuilt it as the regression 
  residual measure described above
- Verified a stated correlation (initially cited as -0.85) against the actual chart it was 
  meant to support, found the true figure for that pairing was -0.76, and corrected every 
  reference across the dashboard, report, and slides — keeping -0.85 only where it 
  genuinely applied (DPT vs under-5 mortality, a different pairing)
- Cross-checked country-level expenditure figures directly against the live dashboard 
  rather than trusting an early estimate — caught a figure that was off by more than 50x 
  for Singapore

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

## Policy Recommendations

**1. Target funding at the six countries below the WHO workforce threshold, weighted by need.**
Cambodia, Indonesia, Laos, Myanmar, Thailand, and Vietnam fall below the WHO's minimum of 
4.45 health workers per 1,000 population — a combined population of roughly 494 million 
people. The spend-vs-outcome relationship shows diminishing returns at the high end, so 
directing funding toward this group targets it where the workforce gap is most acute and 
best-evidenced, rather than spreading it evenly across all ten countries.

**2. Scale Thailand's community health worker model regionally.**
Thailand achieves substantially better child survival than the Philippines with roughly a 
third of the workforce density, backed by a network of community health volunteers 
connected to the formal referral system. Training and digitally connecting similar 
volunteer networks in under-threshold countries is achievable on a far shorter timeline 
than training enough new doctors and nurses to close the same gap.

**3. Mandate a common ASEAN health data reporting standard.**
Eight of ten countries have at least one documented TB reporting anomaly, and only two 
still report data past 2012. A region cannot verify its own disease containment success 
under these conditions. A shared reporting format and minimum-frequency requirement, 
starting with TB and malaria and coordinated through the ASEAN Public Health Task Force, 
would directly address this — and supports SDG 17 (cross-border data partnerships) 
alongside SDG 3.


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

Built with data analysis and web development assistance.
