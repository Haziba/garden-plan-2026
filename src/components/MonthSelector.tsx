import { useEffect, useRef } from "react";
import type { MonthKey } from "../plan/plan2026";
import { MONTH_KEYS, MONTH_LABELS, SEASONS } from "../plan/plan2026";

interface Props {
  month: MonthKey;
  setMonth: (m: MonthKey) => void;
}

export function MonthSelector({ month, setMonth }: Props) {
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = tabsRef.current;
    if (!container) return;
    const active = container.querySelector(".month-tab.active") as HTMLElement | null;
    if (!active) return;
    const left = active.offsetLeft - container.offsetWidth / 2 + active.offsetWidth / 2;
    container.scrollTo({ left, behavior: "smooth" });
  }, [month]);

  return (
    <div className="month-selector">
      <div className="month-tabs" ref={tabsRef}>
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
