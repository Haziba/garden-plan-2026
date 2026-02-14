import type { MonthKey } from "../plan/plan2026";
import { MONTH_KEYS, MONTH_LABELS, SEASONS } from "../plan/plan2026";

interface Props {
  month: MonthKey;
  setMonth: (m: MonthKey) => void;
}

export function MonthSelector({ month, setMonth }: Props) {
  return (
    <div className="month-selector">
      <div className="month-tabs">
        {MONTH_KEYS.map((m) => (
          <button
            key={m}
            className={`month-tab ${m === month ? "active" : ""}`}
            onClick={() => setMonth(m)}
          >
            {MONTH_LABELS[m].slice(0, 3)}
          </button>
        ))}
      </div>
      <div className="season-tabs">
        {SEASONS.map((s) => {
          const active = s.months.includes(month);
          return (
            <button
              key={s.label}
              className={`season-tab ${active ? "active" : ""}`}
              onClick={() => setMonth(s.months[0])}
            >
              {s.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
