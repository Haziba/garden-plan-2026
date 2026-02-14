import { useState, useEffect, useRef } from "react";
import type { MonthKey, CropPlan, BedKey, Zone, DisplayCategory } from "../plan/plan2026";
import { STATUS_DISPLAY_CATEGORY, DISPLAY_CATEGORY_CONFIG, plan2026 } from "../plan/plan2026";

const CROP_EMOJI: Record<string, string> = {
  salad_leaves_left: "🥬",
  salad_leaves_right: "🥬",
  peppers: "🌶️",
  basil: "🌿",
  marigold: "🌼",
  cucumbers: "🥒",
  pumpkin_1: "🎃",
  dwarf_french_beans: "🫘",
  courgette: "🫑",
  peas: "🫛",
  borage: "💠",
  calendula: "🌻",
};

interface Props {
  month: MonthKey;
  crops: CropPlan[];
  onCropClick: (crop: CropPlan) => void;
}

function getDisplayCategory(crop: CropPlan, month: MonthKey) {
  const ms = crop.months[month];
  if (!ms) return null;
  const priority: DisplayCategory[] = ["harvest", "sow", "grow", "maintain", "clear"];
  const categories = ms.status.map(s => STATUS_DISPLAY_CATEGORY[s]);
  const primary = priority.find(cat => categories.includes(cat)) || categories[0];
  return DISPLAY_CATEGORY_CONFIG[primary];
}

function CropChip({
  crop,
  month,
  onClick,
}: {
  crop: CropPlan;
  month: MonthKey;
  onClick: () => void;
}) {
  const badge = getDisplayCategory(crop, month);
  if (!badge) return null;

  return (
    <button
      className="crop-chip"
      style={{
        background: badge.bg,
        color: badge.color,
        borderColor: badge.color,
      }}
      onClick={onClick}
      title={`${crop.name} — ${badge.label}`}
    >
      <span className="crop-chip-icon">
        {CROP_EMOJI[crop.id] || "🌱"}
      </span>
      <span className="crop-chip-name">
        {crop.name.split("(")[0].trim()}
      </span>
      <span className="crop-chip-status">{badge.label}</span>
    </button>
  );
}

/** A zone cell placed within the bed grid */
function ZoneCell({
  zone,
  crops,
  month,
  onCropClick,
  className,
}: {
  zone: Zone;
  crops: CropPlan[];
  month: MonthKey;
  onCropClick: (crop: CropPlan) => void;
  className: string;
}) {
  return (
    <div className={`bed-zone ${className}${crops.length === 0 ? " bed-zone-empty" : ""}`}>
      <span className="zone-label">{zone}</span>
      <div className="zone-crops">
        {crops.length === 0 ? (
          <span className="zone-empty-hint">—</span>
        ) : (
          crops.map((crop) => (
            <CropChip
              key={crop.id}
              crop={crop}
              month={month}
              onClick={() => onCropClick(crop)}
            />
          ))
        )}
      </div>
    </div>
  );
}

/**
 * Bed layout (top-down, viewed from above):
 *
 *           SOUTH (sunny, house side)
 *   ┌─────────┐         ┌─────────┐
 *   │         │         │         │
 *   │ corner  │ LEFT    │  RIGHT  │ corner
 *   │         │  BED    │   BED   │
 *   │  south  │         │         │
 *   │  middle │ arch →  │ ← arch  │
 *   │  north  │         │         │
 *   │         │         │         │
 *   └─────────┘         └─────────┘
 *          NORTH (shade side)
 *
 * Each bed: 90cm wide × 180cm long (aspect 1:2)
 * South = top (sunny, house side), North = bottom (shade)
 * Arch = inner vertical edge between beds
 * Corner = outer vertical edge
 */

function BedDiagram({
  bedKey,
  label,
  crops,
  month,
  onCropClick,
}: {
  bedKey: BedKey;
  label: string;
  crops: CropPlan[];
  month: MonthKey;
  onCropClick: (crop: CropPlan) => void;
}) {
  const bedCrops = crops.filter((c) => c.placement.bed === bedKey);

  const activeInZone = (zone: Zone): CropPlan[] =>
    bedCrops.filter((c) => c.placement.zone === zone && c.months[month]);

  const south = activeInZone("south");
  const middle = activeInZone("middle");
  const north = activeInZone("north");
  const arch = activeInZone("arch");
  const corner = activeInZone("corner");

  return (
    <div className={`bed bed-${bedKey}`}>
      <div className="bed-header">
        <span className="bed-label">{label}</span>
        <span className="bed-dimensions">180 × 60 cm</span>
      </div>
      <div className={`bed-grid bed-grid-${bedKey}`}>
        <ZoneCell zone="south" crops={south} month={month} onCropClick={onCropClick} className="grid-south" />
        <ZoneCell zone="middle" crops={middle} month={month} onCropClick={onCropClick} className="grid-middle" />
        <ZoneCell zone="north" crops={north} month={month} onCropClick={onCropClick} className="grid-north" />
        <ZoneCell zone="arch" crops={arch} month={month} onCropClick={onCropClick} className="grid-arch" />
        <ZoneCell zone="corner" crops={corner} month={month} onCropClick={onCropClick} className="grid-corner" />
      </div>
    </div>
  );
}

export function BedMap({ month, crops, onCropClick }: Props) {
  const [zoomed, setZoomed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!zoomed && scrollRef.current) scrollRef.current.scrollLeft = 0;
  }, [zoomed]);

  const archUsers = plan2026.meta.structure.used_by[month] || [];
  const archCrops = crops.filter((c) => archUsers.includes(c.id));

  return (
    <div className="bed-map">
      <div className="bed-map-label house-label">south (sunny)</div>
      <button className="bed-zoom-toggle" onClick={() => setZoomed(z => !z)}>
        {zoomed ? "Overview" : "Zoom"}
      </button>
      <div
        ref={scrollRef}
        className={`beds-container ${zoomed ? "beds-zoomed" : "beds-overview"}`}
      >
        <BedDiagram
          bedKey="left"
          label="Left Bed (tall / heavy feeders)"
          crops={crops}
          month={month}
          onCropClick={onCropClick}
        />
        <div className="arch-column">
          <div className="arch-visual">
            <div className="arch-line" />
            <span className="arch-title">Cattle-panel arch</span>
            {archCrops.length > 0 && (
              <div className="arch-crops">
                {archCrops.map((c) => (
                  <span key={c.id} className="arch-crop-tag">
                    {c.name.split("(")[0].trim()}
                  </span>
                ))}
              </div>
            )}
            {archCrops.length === 0 && (
              <div className="arch-crops">
                <span className="arch-crop-tag arch-empty">Empty</span>
              </div>
            )}
          </div>
        </div>
        <BedDiagram
          bedKey="right"
          label="Right Bed (bulk + succession)"
          crops={crops}
          month={month}
          onCropClick={onCropClick}
        />
      </div>
      <div className="bed-map-label back-label">north (shade)</div>
      <div className="bed-legend">
        {(["sow", "grow", "harvest", "maintain", "clear"] as DisplayCategory[]).map((cat) => {
          const cfg = DISPLAY_CATEGORY_CONFIG[cat];
          return (
            <span key={cat} className="bed-legend-item" style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.color }}>
              {cfg.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
