import type { MonthKey } from "../plan/plan2026";
import { plan2026, MONTH_LABELS } from "../plan/plan2026";

interface Props {
  month: MonthKey;
}

export function MoonWidget({ month }: Props) {
  const guidance = plan2026.months[month].global.moon_guidance;

  return (
    <div className="moon-widget">
      <div className="moon-header">
        <span className="moon-icon">🌙</span>
        <span>Moon Guidance — {MONTH_LABELS[month]}</span>
      </div>
      <ul className="moon-list">
        {guidance.map((g, i) => (
          <li key={i}>{g}</li>
        ))}
      </ul>
    </div>
  );
}
