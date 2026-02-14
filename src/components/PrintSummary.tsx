import type { MonthKey, CropPlan } from "../plan/plan2026";
import { MONTH_LABELS, plan2026 } from "../plan/plan2026";

interface Props {
  month: MonthKey;
  crops: CropPlan[];
}

export function generateTextSummary(month: MonthKey, crops: CropPlan[]): string {
  const global = plan2026.months[month].global;
  const lines: string[] = [];

  lines.push(`=== Garden Plan — ${MONTH_LABELS[month]} 2026 ===`);
  lines.push(`Location: ${plan2026.meta.location}`);
  lines.push("");

  lines.push("FOCUS:");
  global.focus.forEach((f) => lines.push(`  - ${f}`));
  lines.push("");

  lines.push("GLOBAL TASKS:");
  global.tasks.forEach((t) => lines.push(`  [ ] ${t}`));
  lines.push("");

  lines.push("MOON GUIDANCE:");
  global.moon_guidance.forEach((g) => lines.push(`  ${g}`));
  lines.push("");

  lines.push("CROP TASKS:");
  for (const c of crops) {
    const ms = c.months[month];
    if (!ms) continue;
    lines.push(`  ${c.name} (${c.placement.bed} bed / ${c.placement.zone}):`);
    lines.push(`    Status: ${ms.status.join(", ")}`);
    ms.tasks.forEach((t) => lines.push(`    [ ] ${t}`));
    if (ms.harvestables) {
      lines.push(`    Harvest: ${ms.harvestables.join(", ")}`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

export function PrintSummary({ month, crops }: Props) {
  const handleCopy = () => {
    const text = generateTextSummary(month, crops);
    navigator.clipboard.writeText(text).then(() => {
      alert("Summary copied to clipboard!");
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-actions">
      <button className="btn btn-secondary" onClick={handleCopy}>
        Copy text summary
      </button>
      <button className="btn btn-secondary" onClick={handlePrint}>
        Print this page
      </button>
    </div>
  );
}
