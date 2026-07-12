// ============ COUNTRY COLOUR MAP (matches Power BI palette) ============
const COUNTRY_COLOR = {
  Brunei: "#4C7DF0",
  Cambodia: "#E8B93E",
  Indonesia: "#D0479C",
  Laos: "#7B5FE0",
  Malaysia: "#3FBF7F",
  Myanmar: "#E0713C",
  Philippines: "#5AC8E8",
  Singapore: "#8A93A8",
  Thailand: "#2EC4B6",
  Vietnam: "#E0473C",
};

const D = DASHBOARD_DATA;
const COUNTRIES = Object.keys(D.countries);
Chart.defaults.color = "#8A93A8";
Chart.defaults.font.family = "-apple-system, Segoe UI, Roboto, Arial, sans-serif";
Chart.defaults.font.size = 11;

// ============ TAB NAVIGATION ============
document.querySelectorAll(".tab").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((b) => b.classList.remove("active"));
    document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById("page-" + btn.dataset.page).classList.add("active");
  });
});

// ============ CARD VALUES ============
document.getElementById("c-lifeexp").textContent = D.summary.avgLifeExp;
document.getElementById("c-below").textContent = D.summary.countriesBelowWorkforce;
document.getElementById("c-pop").textContent = D.summary.popBelowThreshold;
document.getElementById("c-spend").textContent = "$" + D.summary.avgSpend;

document.getElementById("c-infantmort").textContent = D.summary.avgInfantMort;
document.getElementById("c-dpt").textContent = D.summary.avgDPT;
document.getElementById("c-dptbelow").textContent = D.summary.countriesBelowDPT;
document.getElementById("c-corr").textContent = D.summary.dptCorr;

document.getElementById("c-anomalies").textContent = D.summary.anomalyCount;
document.getElementById("c-tbafter").textContent = D.summary.countriesReportingTBAfter2012;
document.getElementById("c-tbavg").textContent = D.summary.avgTB;

// ============ SHARED SCATTER OPTIONS ============
function labelPlugin() {
  return {
    id: "pointLabels",
    afterDatasetsDraw(chart) {
      const ctx = chart.ctx;
      chart.data.datasets.forEach((ds, i) => {
        if (!ds.showLabels) return;
        const meta = chart.getDatasetMeta(i);
        meta.data.forEach((point, idx) => {
          const label = ds.data[idx].label;
          if (!label) return;
          ctx.save();
          ctx.font = "600 10px -apple-system, Segoe UI, Arial, sans-serif";
          ctx.fillStyle = "#E8EAF0";
          ctx.textAlign = "left";
          ctx.fillText(label, point.x + 6, point.y + 3);
          ctx.restore();
        });
      });
    },
  };
}

// ============ PAGE 1: SPEND vs LIFE EXPECTANCY ============
new Chart(document.getElementById("chartSpend"), {
  type: "scatter",
  data: {
    datasets: COUNTRIES.map((c) => ({
      label: c,
      showLabels: true,
      data: [{ x: D.countries[c].spend, y: D.countries[c].lifeexp, label: c }],
      backgroundColor: COUNTRY_COLOR[c],
      pointRadius: 6,
      pointHoverRadius: 8,
    })),
  },
  options: {
    layout: { padding: { right: 55 } },
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${ctx.raw.label}: $${ctx.raw.x} → ${ctx.raw.y} yrs` } } },
    scales: {
      x: { type: "logarithmic", title: { display: true, text: "Health Spend per Capita ($, log scale)" }, grid: { color: "#1D2444" } },
      y: { title: { display: true, text: "Life Expectancy" }, grid: { color: "#1D2444" } },
    },
  },
  plugins: [labelPlugin()],
});

// ============ PAGE 1: WORKFORCE vs UNDER-5 MORTALITY ============
new Chart(document.getElementById("chartWorkforce"), {
  type: "scatter",
  data: {
    datasets: COUNTRIES.map((c) => ({
      label: c,
      showLabels: true,
      data: [{ x: D.countries[c].workforce, y: D.countries[c].under5mort, label: c }],
      backgroundColor: COUNTRY_COLOR[c],
      pointRadius: 6,
      pointHoverRadius: 8,
    })),
  },
  options: {
    layout: { padding: { right: 55 } },
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.raw.label}: ${ctx.raw.x}/1000 pop → ${ctx.raw.y}/1000 births` } },
      annotation: {
        annotations: {
          line1: {
            type: "line", xMin: 4.45, xMax: 4.45,
            borderColor: "#E8EAF0", borderWidth: 1, borderDash: [4, 4],
            label: { display: true, content: "WHO min 4.45", position: "start", color: "#E8EAF0", font: { size: 9 } },
          },
        },
      },
    },
    scales: {
      x: { title: { display: true, text: "Workforce Density (Latest, per 1,000 pop)" }, grid: { color: "#1D2444" } },
      y: { title: { display: true, text: "Under-5 Mortality (Latest, per 1,000)" }, grid: { color: "#1D2444" } },
    },
  },
  plugins: [labelPlugin()],
});

// ============ PAGE 1: RESIDUAL BAR CHART ============
const residSorted = COUNTRIES.slice().sort((a, b) => D.residuals[b] - D.residuals[a]);
new Chart(document.getElementById("chartResidual"), {
  type: "bar",
  data: {
    labels: residSorted,
    datasets: [
      {
        data: residSorted.map((c) => D.residuals[c]),
        backgroundColor: residSorted.map((c) => (D.residuals[c] >= 0 ? "#2EC4B6" : "#8A93A8")),
        borderRadius: 4,
      },
    ],
  },
  options: {
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (ctx) => `${ctx.raw > 0 ? "+" : ""}${ctx.raw} years vs predicted` } },
    },
    scales: {
      x: { title: { display: true, text: "Residual (actual − predicted life expectancy, years)" }, grid: { color: "#1D2444" } },
      y: { grid: { display: false } },
    },
  },
});

// ============ PAGE 2: DPT vs INFANT MORTALITY ============
new Chart(document.getElementById("chartDPT"), {
  type: "scatter",
  data: {
    datasets: COUNTRIES.map((c) => ({
      label: c,
      showLabels: true,
      data: [{ x: D.countries[c].dpt, y: D.countries[c].infantmort, label: c }],
      backgroundColor: COUNTRY_COLOR[c],
      pointRadius: 6,
      pointHoverRadius: 8,
    })),
  },
  options: {
    layout: { padding: { right: 45 } },
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${ctx.raw.label}: ${ctx.raw.x}% → ${ctx.raw.y}/1000` } } },
    scales: {
      x: { min: 60, max: 100, title: { display: true, text: "DPT Coverage (%)" }, grid: { color: "#1D2444" } },
      y: { title: { display: true, text: "Infant Mortality (per 1,000)" }, grid: { color: "#1D2444" } },
    },
  },
  plugins: [labelPlugin()],
});

// ============ PAGE 2: UNDERNOURISHED vs UNDER-5 MORTALITY ============
new Chart(document.getElementById("chartNutrition"), {
  type: "scatter",
  data: {
    datasets: COUNTRIES.filter((c) => D.countries[c].undernourished != null).map((c) => ({
      label: c,
      showLabels: true,
      data: [{ x: D.countries[c].undernourished, y: D.countries[c].under5mort, label: c }],
      backgroundColor: COUNTRY_COLOR[c],
      pointRadius: 6,
      pointHoverRadius: 8,
    })),
  },
  options: {
    plugins: { legend: { display: false }, tooltip: { callbacks: { label: (ctx) => `${ctx.raw.label}: ${ctx.raw.x}% → ${ctx.raw.y}/1000` } } },
    scales: {
      x: { min: 0, max: 45, title: { display: true, text: "Undernourished (%)" }, grid: { color: "#1D2444" } },
      y: { title: { display: true, text: "Under-5 Mortality (per 1,000)" }, grid: { color: "#1D2444" } },
    },
  },
  plugins: [labelPlugin()],
});

// ============ PAGE 3: TB PREVALENCE TIME SERIES ============
const allYears = new Set();
COUNTRIES.forEach((c) => (D.tb_timeseries[c].years || []).forEach((y) => allYears.add(y)));
const years = Array.from(allYears).sort((a, b) => a - b);

new Chart(document.getElementById("chartTB"), {
  type: "line",
  data: {
    labels: years,
    datasets: COUNTRIES.map((c) => {
      const ts = D.tb_timeseries[c];
      const map = {};
      (ts.years || []).forEach((y, i) => (map[y] = ts.values[i]));
      return {
        label: c,
        data: years.map((y) => (map[y] !== undefined ? map[y] : null)),
        borderColor: COUNTRY_COLOR[c],
        backgroundColor: COUNTRY_COLOR[c],
        spanGaps: false,
        tension: 0.15,
        pointRadius: 2,
        borderWidth: 1.5,
      };
    }),
  },
  options: {
    plugins: {
      legend: { position: "bottom", labels: { boxWidth: 10, font: { size: 9 }, padding: 8 } },
      tooltip: { mode: "nearest", intersect: false },
    },
    scales: {
      x: { title: { display: true, text: "Year" }, grid: { color: "#1D2444" } },
      y: { type: "logarithmic", title: { display: true, text: "TB Prevalence (per 100,000, log scale)" }, grid: { color: "#1D2444" } },
    },
    interaction: { mode: "nearest", intersect: false },
  },
});

// ============ PAGE 3: ANOMALY TABLE ============
const anomalyTypeClass = (type) => {
  if (type.includes("swing")) return "anomaly-swing";
  if (type.includes("ceases")) return "anomaly-gap";
  if (type.includes("variance")) return "anomaly-flat";
  if (type.includes("Zero")) return "anomaly-zero";
  return "";
};

let rows = "<table><thead><tr><th>Country</th><th>Period</th><th>Values</th><th>Type</th></tr></thead><tbody>";
D.anomalies.forEach((a) => {
  rows += `<tr><td>${a.Country}</td><td>${a.Period}</td><td>${a.Values}</td><td class="${anomalyTypeClass(a.AnomalyType)}">${a.AnomalyType}</td></tr>`;
});
rows += "</tbody></table>";
document.getElementById("anomalyTable").innerHTML = rows;
