import type { MonthKey, CropPlan, DisplayCategory } from "../plan/plan2026";
import { MONTH_LABELS, plan2026, STATUS_DISPLAY_CATEGORY, DISPLAY_CATEGORY_CONFIG } from "../plan/plan2026";

interface Props {
  month: MonthKey;
  crops: CropPlan[];
}

function categoriseCrops(crops: CropPlan[], month: MonthKey) {
  const groups: Record<DisplayCategory, string[]> = {
    sow: [],
    grow: [],
    harvest: [],
    maintain: [],
    clear: [],
  };

  for (const c of crops) {
    const ms = c.months[month];
    if (!ms) continue;
    const name = c.name.split("(")[0].trim();

    // Collect unique display categories for this crop
    const seen = new Set<DisplayCategory>();
    for (const s of ms.status) {
      const cat = STATUS_DISPLAY_CATEGORY[s];
      if (!seen.has(cat)) {
        seen.add(cat);
        groups[cat].push(name);
      }
    }
  }

  return groups;
}

export function SummaryPanel({ month, crops }: Props) {
  const global = plan2026.months[month].global;
  const groups = categoriseCrops(crops, month);

  const categoryOrder: DisplayCategory[] = ["sow", "grow", "harvest", "maintain", "clear"];

  return (
    <div className="summary-panel">
      <h2>{MONTH_LABELS[month]} — At a Glance</h2>

      <div className="summary-focus">
        {global.focus.map((f, i) => (
          <span key={i} className="focus-tag">
            {f}
          </span>
        ))}
      </div>

      <div className="summary-grid">
        {categoryOrder.map((cat) => {
          const items = groups[cat];
          if (items.length === 0) return null;
          const cfg = DISPLAY_CATEGORY_CONFIG[cat];
          return (
            <div
              key={cat}
              className="summary-card"
              style={{ borderColor: cfg.color }}
            >
              <h3 style={{ color: cfg.color }}>{cfg.label}</h3>
              <ul>
                {items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <div className="summary-tasks">
        <h3>Tasks this month</h3>
        <ul>
          {global.tasks.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
