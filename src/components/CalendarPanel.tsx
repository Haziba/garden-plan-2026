import { useState, useEffect, useRef } from "react";
import type { MonthKey, CropPlan } from "../plan/plan2026";
import { MONTH_KEYS, MONTH_LABELS, plan2026, STATUS_CONFIG } from "../plan/plan2026";

interface Props {
  crops: CropPlan[];
}

const MONTH_NUMBERS: Record<MonthKey, number> = {
  feb: 1, mar: 2, apr: 3, may: 4, jun: 5, jul: 6, aug: 7, sep: 8, oct: 9,
};

function getProgress(): number {
  const now = new Date();
  const year = 2026;
  const start = new Date(year, 1, 1);
  const end = new Date(year, 10, 1);
  if (now < start) return 0;
  if (now > end) return 100;
  return ((now.getTime() - start.getTime()) / (end.getTime() - start.getTime())) * 100;
}

export function CalendarPanel({ crops }: Props) {
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && progressRef.current) {
      progressRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const progress = getProgress();

  return (
    <>
      {!open && (
        <button className="calendar-fab" onClick={() => setOpen(true)}>
          Calendar
        </button>
      )}
      {open && <div className="calendar-backdrop" onClick={() => setOpen(false)} />}
      <div className={`calendar-panel ${open ? "calendar-panel-open" : ""}`}>
        <button className="calendar-sheet-close" onClick={() => setOpen(false)}>&times;</button>
        <h2>Growing Calendar</h2>
        <div className="calendar-list">
          {MONTH_KEYS.map((m) => {
            const monthNum = MONTH_NUMBERS[m];
            const monthStart = ((monthNum - 1) / 9) * 100;
            const monthEnd = (monthNum / 9) * 100;
            const isNowMonth = progress >= monthStart && progress < monthEnd;
            const global = plan2026.months[m].global;
            const activeCrops = crops.filter((c) => c.months[m]);

            return (
              <div key={m} className={`calendar-month ${isNowMonth ? "calendar-month-now" : ""}`}>
                {isNowMonth && (
                  <div
                    className="calendar-progress-line"
                    ref={progressRef}
                    style={{ top: `${((progress - monthStart) / (monthEnd - monthStart)) * 100}%` }}
                  />
                )}
                <h3 className="calendar-month-title">{MONTH_LABELS[m]}</h3>
                <div className="calendar-focus">
                  {global.focus.map((f, i) => (
                    <span key={i} className="calendar-focus-tag">{f}</span>
                  ))}
                </div>
                <ul className="calendar-tasks">
                  {global.tasks.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
                {activeCrops.length > 0 && (
                  <div className="calendar-crops">
                    {activeCrops.map((c) => {
                      const ms = c.months[m]!;
                      return (
                        <div key={c.id} className="calendar-crop-row">
                          <span className="calendar-crop-name">{c.name.split("(")[0].trim()}</span>
                          <span className="calendar-crop-statuses">
                            {ms.status.map((s) => {
                              const cfg = STATUS_CONFIG[s];
                              return (
                                <span key={s} className="calendar-status-pill" style={{ background: cfg.bg, color: cfg.color }}>
                                  {cfg.icon} {cfg.label}
                                </span>
                              );
                            })}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
