import type { CropPlan, MonthKey, DisplayCategory } from "../plan/plan2026";
import { STATUS_CONFIG, MONTH_LABELS, STATUS_DISPLAY_CATEGORY, DISPLAY_CATEGORY_CONFIG } from "../plan/plan2026";

interface Props {
  crop: CropPlan;
  month: MonthKey;
  onClose: () => void;
}

const ZONE_DISPLAY: Record<string, string> = {
  south: "South edge",
  north: "North edge",
  middle: "Middle",
  arch: "Arch",
  corner: "Corner",
};

export function CropModal({ crop, month, onClose }: Props) {
  const ms = crop.months[month];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>

        <h2>{crop.name}</h2>
        <div className="modal-meta">
          <span className="modal-tag">
            {crop.placement.bed === "left" ? "Left bed" : "Right bed"} —{" "}
            {ZONE_DISPLAY[crop.placement.zone] || crop.placement.zone}
          </span>
          {crop.placement.count && (
            <span className="modal-tag">x{crop.placement.count}</span>
          )}
          <span className="modal-tag category-tag">{crop.category}</span>
        </div>

        {/* Placement info */}
        <div className="modal-section">
          <h3>Placement</h3>
          <ul>
            {crop.placement.spacing_cm && (
              <li>
                <strong>Spacing:</strong> {crop.placement.spacing_cm}
              </li>
            )}
            {crop.placement.height_notes && (
              <li>
                <strong>Height:</strong> {crop.placement.height_notes}
              </li>
            )}
            {crop.placement.footprint_notes && (
              <li>{crop.placement.footprint_notes}</li>
            )}
            {crop.placement.support?.map((s, i) => (
              <li key={i}>
                <strong>Support:</strong> {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Companions */}
        {crop.companions && crop.companions.length > 0 && (
          <div className="modal-section">
            <h3>Companions</h3>
            <div className="companion-tags">
              {crop.companions.map((c) => (
                <span key={c} className="companion-tag">
                  {c}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Tips */}
        {crop.tips && crop.tips.length > 0 && (
          <div className="modal-section">
            <h3>Tips</h3>
            <ul>
              {crop.tips.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        )}

        {/* This month */}
        {ms && (
          <div className="modal-section modal-month-section">
            <h3>
              What to do in {MONTH_LABELS[month]}
            </h3>
            <div className="modal-statuses">
              {ms.status.map((s) => {
                const cfg = STATUS_CONFIG[s];
                return (
                  <span
                    key={s}
                    className="status-pill"
                    style={{ background: cfg.bg, color: cfg.color }}
                  >
                    {cfg.icon} {cfg.label}
                  </span>
                );
              })}
            </div>
            {ms.notes && <p className="modal-notes">{ms.notes}</p>}
            <ul className="modal-tasks">
              {ms.tasks.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
            {ms.harvestables && ms.harvestables.length > 0 && (
              <div className="modal-harvest">
                <strong>Harvestable:</strong> {ms.harvestables.join(", ")}
              </div>
            )}
          </div>
        )}

        {!ms && (
          <div className="modal-section">
            <p className="modal-inactive">
              No activity for this crop in {MONTH_LABELS[month]}.
            </p>
          </div>
        )}

        {/* Full lifecycle overview */}
        <div className="modal-section">
          <h3>Full Season Overview</h3>
          <div className="lifecycle-grid">
            {Object.entries(crop.months).map(([mk, state]) => {
              // Deduplicate display categories for this month
              const seen = new Set<DisplayCategory>();
              const categoryPills: { cat: DisplayCategory; cfg: { label: string; color: string; bg: string } }[] = [];
              for (const s of state.status) {
                const cat = STATUS_DISPLAY_CATEGORY[s];
                if (!seen.has(cat)) {
                  seen.add(cat);
                  categoryPills.push({ cat, cfg: DISPLAY_CATEGORY_CONFIG[cat] });
                }
              }

              return (
                <div key={mk} className="lifecycle-row">
                  <span className="lifecycle-month">
                    {MONTH_LABELS[mk as MonthKey].slice(0, 3)}
                  </span>
                  <div className="lifecycle-statuses">
                    {categoryPills.map(({ cat, cfg }) => (
                      <span
                        key={cat}
                        className="status-pill-sm"
                        style={{ background: cfg.bg, color: cfg.color }}
                      >
                        {cfg.label}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
