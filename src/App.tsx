import { useState } from "react";
import type { CropPlan } from "./plan/plan2026";
import { plan2026, MONTH_COLORS } from "./plan/plan2026";
import { useMonth } from "./hooks/useMonth";
import { MonthSelector } from "./components/MonthSelector";
import { BedMap } from "./components/BedMap";
import { SummaryPanel } from "./components/SummaryPanel";
import { CalendarPanel } from "./components/CalendarPanel";
import { CropModal } from "./components/CropModal";
import { PrintSummary } from "./components/PrintSummary";
import "./App.css";

function App() {
  const { month, setMonth } = useMonth();
  const [selectedCrop, setSelectedCrop] = useState<CropPlan | null>(null);

  const crops = plan2026.crops;
  const colors = MONTH_COLORS[month];

  return (
    <div
      className="app"
      style={{
        '--month-primary': colors.primary,
        '--month-bg': colors.bg,
        '--month-accent': colors.accent,
      } as React.CSSProperties}
    >
      <header className="app-header">
        <h1>Raised Bed Planner 2026</h1>
        <p className="app-subtitle">
          Nottingham, UK — Seasonal control panel
        </p>
      </header>

      <MonthSelector month={month} setMonth={setMonth} />

      <main className="app-main">
        <BedMap month={month} crops={crops} onCropClick={setSelectedCrop} />

        <div className="side-panels">
          <SummaryPanel month={month} crops={crops} />
          <PrintSummary month={month} crops={crops} />
        </div>
      </main>

      <CalendarPanel crops={crops} />

      {selectedCrop && (
        <CropModal
          crop={selectedCrop}
          month={month}
          onClose={() => setSelectedCrop(null)}
        />
      )}
    </div>
  );
}

export default App;
