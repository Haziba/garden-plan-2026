// src/plan/plan2026.ts
export type MonthKey =
  | "feb"
  | "mar"
  | "apr"
  | "may"
  | "jun"
  | "jul"
  | "aug"
  | "sep"
  | "oct";

export type Status =
  | "plan"
  | "sow_indoors"
  | "direct_sow"
  | "harden_off"
  | "transplant"
  | "install_support"
  | "growing"
  | "flowering"
  | "fruiting"
  | "harvest"
  | "succession_sow"
  | "thin"
  | "feed"
  | "prune_train"
  | "pest_check"
  | "clear"
  | "soil_build";

export type Zone = "south" | "middle" | "north" | "arch" | "corner";

export type BedKey = "left" | "right";

export type DisplayCategory = "sow" | "grow" | "harvest" | "maintain" | "clear";

export interface CropMonthState {
  status: Status[];
  tasks: string[];
  notes?: string;
  harvestables?: string[];
}

export interface CropPlan {
  id: string;
  name: string;
  category:
    | "fruiting"
    | "leafy"
    | "legume"
    | "flower"
    | "herb"
    | "supporting";
  placement: {
    bed: BedKey;
    zone: Zone;
    count?: number;
    spacing_cm?: string;
    footprint_notes?: string;
    height_notes?: string;
    support?: string[];
  };
  companions?: string[];
  tips?: string[];
  months: Partial<Record<MonthKey, CropMonthState>>;
}

export interface GlobalMonthPlan {
  focus: string[];
  tasks: string[];
  moon_guidance: string[];
}

export interface GardenPlan2026 {
  meta: {
    year: 2026;
    location: string;
    beds: { width_cm: number; length_cm: number; count: number };
    sun: string;
    constraints: string[];
    structure: {
      id: string;
      name: string;
      description: string;
      used_by: Partial<Record<MonthKey, string[]>>;
    };
  };
  months: Record<MonthKey, { label: string; global: GlobalMonthPlan }>;
  crops: CropPlan[];
}

export const MONTH_KEYS: MonthKey[] = [
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
];

export const MONTH_LABELS: Record<MonthKey, string> = {
  feb: "February",
  mar: "March",
  apr: "April",
  may: "May",
  jun: "June",
  jul: "July",
  aug: "August",
  sep: "September",
  oct: "October",
};

export const SEASONS: { label: string; months: MonthKey[] }[] = [
  { label: "Spring", months: ["mar", "apr", "may"] },
  { label: "Summer", months: ["jun", "jul", "aug"] },
  { label: "Autumn", months: ["sep", "oct"] },
];

export const STATUS_CONFIG: Record<
  Status,
  { label: string; color: string; bg: string; icon: string }
> = {
  plan: { label: "Planning", color: "#6b7280", bg: "#f3f4f6", icon: "📋" },
  sow_indoors: {
    label: "Sow indoors",
    color: "#7c3aed",
    bg: "#ede9fe",
    icon: "🌱",
  },
  direct_sow: {
    label: "Direct sow",
    color: "#059669",
    bg: "#d1fae5",
    icon: "🌰",
  },
  harden_off: {
    label: "Harden off",
    color: "#d97706",
    bg: "#fef3c7",
    icon: "🌤️",
  },
  transplant: {
    label: "Transplant",
    color: "#2563eb",
    bg: "#dbeafe",
    icon: "🪴",
  },
  install_support: {
    label: "Install support",
    color: "#78716c",
    bg: "#f5f5f4",
    icon: "🪵",
  },
  growing: { label: "Growing", color: "#16a34a", bg: "#dcfce7", icon: "🌿" },
  flowering: {
    label: "Flowering",
    color: "#db2777",
    bg: "#fce7f3",
    icon: "🌸",
  },
  fruiting: {
    label: "Fruiting",
    color: "#ea580c",
    bg: "#fed7aa",
    icon: "🍅",
  },
  harvest: { label: "Harvest", color: "#b45309", bg: "#fef3c7", icon: "🧺" },
  succession_sow: {
    label: "Succession sow",
    color: "#0891b2",
    bg: "#cffafe",
    icon: "🔄",
  },
  thin: { label: "Thin", color: "#6366f1", bg: "#e0e7ff", icon: "✂️" },
  feed: { label: "Feed", color: "#65a30d", bg: "#ecfccb", icon: "🧪" },
  prune_train: {
    label: "Prune/train",
    color: "#9333ea",
    bg: "#f3e8ff",
    icon: "✂️",
  },
  pest_check: {
    label: "Pest check",
    color: "#dc2626",
    bg: "#fee2e2",
    icon: "🔍",
  },
  clear: { label: "Clear", color: "#78716c", bg: "#f5f5f4", icon: "🧹" },
  soil_build: {
    label: "Soil build",
    color: "#92400e",
    bg: "#fde68a",
    icon: "🪱",
  },
};

export const STATUS_DISPLAY_CATEGORY: Record<Status, DisplayCategory> = {
  plan: "maintain",
  sow_indoors: "sow",
  direct_sow: "sow",
  harden_off: "grow",
  transplant: "grow",
  install_support: "maintain",
  growing: "grow",
  flowering: "grow",
  fruiting: "grow",
  harvest: "harvest",
  succession_sow: "sow",
  thin: "maintain",
  feed: "maintain",
  prune_train: "maintain",
  pest_check: "maintain",
  clear: "clear",
  soil_build: "clear",
};

export const DISPLAY_CATEGORY_CONFIG: Record<DisplayCategory, { label: string; color: string; bg: string }> = {
  sow: { label: "Sow", color: "#6d28d9", bg: "#ede9fe" },
  grow: { label: "Grow", color: "#16a34a", bg: "#dcfce7" },
  harvest: { label: "Harvest", color: "#b45309", bg: "#fef3c7" },
  maintain: { label: "Maintain", color: "#2563eb", bg: "#dbeafe" },
  clear: { label: "Clear", color: "#78716c", bg: "#f5f5f4" },
};

export const MONTH_COLORS: Record<MonthKey, { primary: string; bg: string; accent: string }> = {
  feb: { primary: "#6366f1", bg: "#eef2ff", accent: "#818cf8" },
  mar: { primary: "#3b82f6", bg: "#eff6ff", accent: "#60a5fa" },
  apr: { primary: "#06b6d4", bg: "#ecfeff", accent: "#22d3ee" },
  may: { primary: "#10b981", bg: "#ecfdf5", accent: "#34d399" },
  jun: { primary: "#84cc16", bg: "#f7fee7", accent: "#a3e635" },
  jul: { primary: "#f59e0b", bg: "#fffbeb", accent: "#fbbf24" },
  aug: { primary: "#f97316", bg: "#fff7ed", accent: "#fb923c" },
  sep: { primary: "#ef4444", bg: "#fef2f2", accent: "#f87171" },
  oct: { primary: "#8b5cf6", bg: "#f5f3ff", accent: "#a78bfa" },
};

export const plan2026: GardenPlan2026 = {
  meta: {
    year: 2026,
    location: "Nottingham, UK",
    beds: { length_cm: 180, width_cm: 90, count: 2 },
    sun: "Beds run East-West, sun from South. South edge = sunniest, North edge = shadiest.",
    constraints: [
      "Left bed can shade right bed if tall crops are placed on the left",
      "Aim: high yield + nature friendly (semi-wild, lots of mulch/flowers, minimal bare soil)",
      "Seedlings can get leggy on windowsill; use grow light if possible",
    ],
    structure: {
      id: "arch_cattle_panel",
      name: "Central cattle-panel arch between beds",
      description:
        "A strong arch between the two beds used for peas in spring, then cucumber + 1 mini pumpkin in summer. Creates vertical growing space and a productive 'spine' for the system.",
      used_by: {
        mar: ["peas"],
        apr: ["peas"],
        may: ["peas", "cucumbers", "pumpkin_1"],
        jun: ["cucumbers", "pumpkin_1"],
        jul: ["cucumbers", "pumpkin_1"],
        aug: ["cucumbers", "pumpkin_1"],
        sep: ["pumpkin_1"],
      },
    },
  },

  months: {
    feb: {
      label: "February",
      global: {
        focus: ["Start strong seedlings", "Improve light to prevent legginess"],
        tasks: [
          "Sow peppers indoors (heated propagator).",
          "Optional: sow early salad leaves indoors for left bed south edge.",
          "Improve light to prevent legginess: add a small grow light (14-16h/day) and keep it close to seedlings.",
          "Prepare pots/modules and labels; check compost/seed-start mix.",
          "Sketch bed zones + decide arch placement and fixings.",
        ],
        moon_guidance: [
          "Waxing moon: good for sowing above-ground crops indoors (e.g., peppers).",
          "Waning moon: tidy, plan, soil prep. Do not delay sowing if you have a good warm setup.",
        ],
      },
    },
    mar: {
      label: "March",
      global: {
        focus: ["Early greens + spring vertical", "Succession mindset begins"],
        tasks: [
          "Direct sow peas at the arch (as soon as soil workable).",
          "Direct sow first salad batch in right bed south strip.",
          "Direct sow calendula at right bed edges.",
          "Keep peppers growing indoors; pot on if roots fill cells.",
          "Start thinking about slug protection now (beer traps, wool pellets, copper tape, night checks).",
        ],
        moon_guidance: [
          "Waxing moon: sow leafy and above-ground crops.",
          "Waning moon: soil building, mulching, tidying old growth.",
        ],
      },
    },
    apr: {
      label: "April",
      global: {
        focus: ["Build momentum", "Start warm-season crops indoors"],
        tasks: [
          "Start cucumbers indoors late April.",
          "Start pumpkin indoors mid/late April.",
          "Start courgette indoors mid/late April.",
          "Dwarf French beans: sow indoors (or wait for May direct sow).",
          "Start basil indoors in modules.",
          "Continue salad successions every 3-4 weeks.",
          "Check arch stability; add ties/clips ready for training.",
        ],
        moon_guidance: [
          "Waxing moon: sow/plant above-ground crops (salads, peas, cucumbers, courgettes).",
          "Waning moon: weed, mulch, prep beds.",
        ],
      },
    },
    may: {
      label: "May",
      global: {
        focus: ["Hardening off + planting out", "Build canopy + mulch deeply"],
        tasks: [
          "Harden off all warm crops (peppers, cucumbers, courgette, pumpkin, French beans).",
          "Transplant out after last frost risk (late May for Nottingham).",
          "Install supports immediately BEFORE plants sprawl (arch ties, strings, clips).",
          "Mulch deeply (compost + leaf mould) to lock in moisture and reduce weeds.",
          "Direct sow dwarf French beans if not started indoors.",
          "Transplant marigolds out around left bed middle (between peppers).",
          "Direct sow or transplant nasturtiums at left bed south edge.",
        ],
        moon_guidance: [
          "Waxing moon: transplanting above-ground crops is ideal if weather allows.",
          "Waning moon: mulch, tidy, soil work. Weather > moon timing.",
        ],
      },
    },
    jun: {
      label: "June",
      global: {
        focus: ["Training + feeding begins", "Harvest rhythm starts"],
        tasks: [
          "Remove peas as they finish; clear vines and compost/chop-and-drop.",
          "Begin weekly feeding of cucumbers, courgette, pumpkin once flowering/fruiting starts.",
          "Train cucumber + pumpkin weekly on arch.",
          "Keep salad succession sowing going.",
          "Dwarf French beans: growing and flowering.",
          "Regular pest checks (aphids, slugs, mildew).",
        ],
        moon_guidance: [
          "Waxing moon: sow more salads and quick greens.",
          "Waning moon: prune/train, tidy, remove spent peas, mulch top-ups.",
        ],
      },
    },
    jul: {
      label: "July",
      global: {
        focus: ["Peak production", "Ruthless Pruning Week"],
        tasks: [
          "Harvest courgettes, cucumbers, salad, French beans frequently.",
          "Peppers starting to produce; harvest as they ripen.",
          "Feed weekly (especially cucumbers, courgette, pumpkin).",
          "Ruthless Pruning Week tasks:",
          "  - Maintain airflow spine on arch — remove crossing/crowding growth.",
          "  - Remove overcrowded leaves from peppers for air circulation.",
          "  - Keep pumpkin contained — pinch side shoots, limit to 3-4 fruit.",
          "  - Remove yellowing courgette leaves immediately.",
          "  - Check for and remove any mildew-affected foliage.",
          "Succession sow salads (and optionally late greens).",
        ],
        moon_guidance: [
          "Waxing moon: sow salads and greens.",
          "Waning moon: pruning/training, clearing overcrowding, soil care.",
        ],
      },
    },
    aug: {
      label: "August",
      global: {
        focus: ["Keep harvesting + start the autumn pivot", "Continue maintaining airflow"],
        tasks: [
          "Continue feeding and harvesting cucumbers, courgettes, peppers, French beans.",
          "Harvest French beans regularly to keep production going.",
          "Start sowing autumn greens (spinach, rocket) late August.",
          "Watch for powdery mildew; improve airflow and water at soil level.",
          "Continue maintaining airflow on arch and around all crops.",
          "Let one lettuce bolt for pollinators (optional).",
        ],
        moon_guidance: [
          "Waxing moon: sow autumn greens.",
          "Waning moon: clear tired plants, compost top-up.",
        ],
      },
    },
    sep: {
      label: "September",
      global: {
        focus: ["Pumpkin ripening + autumn greens", "Wind down summer crops"],
        tasks: [
          "Reduce feeding as summer crops slow.",
          "Prioritise pumpkin ripening: expose fruit to light, keep off wet soil (tile/wood).",
          "Harvest remaining cucumbers and courgettes.",
          "Dwarf French beans: final harvest and clear.",
          "Continue salad and autumn greens harvest.",
          "Keep harvesting salads and autumn greens.",
        ],
        moon_guidance: [
          "Waxing moon: sow greens if still warm enough.",
          "Waning moon: clear fading summer crops, soil building.",
        ],
      },
    },
    oct: {
      label: "October",
      global: {
        focus: ["Clear + rebuild soil", "Set up next year"],
        tasks: [
          "Harvest pumpkins before hard frosts; cure somewhere airy.",
          "Clear all beds; chop-and-drop healthy material, bin diseased foliage.",
          "Add compost and mulch thickly (leaf mould if available).",
          "Optional: cover beds (cardboard + compost) for winter weed suppression.",
          "Soil building across all beds.",
        ],
        moon_guidance: [
          "Waning moon: soil work, mulching, pruning/tidying jobs.",
          "Don't stress moon timing; get the soil protected before winter.",
        ],
      },
    },
  },

  crops: [
    // --- LEFT BED (Fruiting System Bed) ---

    // Left bed, south edge: early-season salad leaves
    {
      id: "salad_leaves_left",
      name: "Salad leaves (left bed, early season)",
      category: "leafy",
      placement: {
        bed: "left",
        zone: "south",
        count: undefined,
        spacing_cm: "Scatter/broadcast in strip; thin as needed",
        footprint_notes:
          "Early-season salad strip across south edge of left bed.",
        height_notes: "Low; good for south edge positions.",
      },
      companions: ["nasturtium", "basil"],
      tips: [
        "Start early indoors (Feb) for earliest harvests.",
        "Cut-and-come-again varieties give multiple harvests per sowing.",
        "As peppers grow, salads benefit from their partial shade in summer.",
      ],
      months: {
        feb: {
          status: ["sow_indoors"],
          tasks: ["Optional: start early salad indoors for transplant."],
          notes: "Only if you have light/space.",
        },
        mar: {
          status: ["direct_sow"],
          tasks: [
            "Direct sow first batch in left bed south strip.",
            "Cover with fleece if cold snaps expected.",
          ],
        },
        apr: {
          status: ["growing", "succession_sow", "thin"],
          tasks: [
            "Thin seedlings; eat thinnings.",
            "Sow next batch for succession.",
          ],
          harvestables: ["Baby salad leaves"],
        },
        may: {
          status: ["harvest", "succession_sow"],
          tasks: [
            "Harvest cut-and-come-again.",
            "Sow next succession.",
          ],
          harvestables: ["Salad leaves"],
        },
        jun: {
          status: ["harvest", "succession_sow"],
          tasks: [
            "Keep harvesting; sow more every 3-4 weeks.",
            "Salads benefit from shade of growing peppers in hot weather.",
          ],
          harvestables: ["Salad leaves"],
        },
        jul: {
          status: ["harvest"],
          tasks: [
            "Harvest regularly.",
            "Heat-tolerant varieties do best now; shade from peppers helps.",
          ],
          harvestables: ["Salad leaves"],
        },
        aug: {
          status: ["harvest"],
          tasks: ["Continue harvests as long as plants produce."],
          harvestables: ["Salad leaves"],
        },
        sep: {
          status: ["clear"],
          tasks: ["Clear spent plants; mulch area."],
        },
      },
    },

    // Left bed, middle: peppers + basil underplanting + marigolds interplanted
    {
      id: "peppers",
      name: "Peppers (snack + button red)",
      category: "fruiting",
      placement: {
        bed: "left",
        zone: "middle",
        count: 3,
        spacing_cm: "35-40cm (diamond pattern)",
        height_notes: "Medium height; benefits from warmth and shelter.",
        support: [
          "Optional cane support per plant",
          "Shelter from strong wind",
        ],
      },
      companions: ["basil", "marigold"],
      tips: [
        "Leggy seedlings = not enough light; use a grow light close to canopy.",
        "Pinch first flowers only if plants are very small/weak at planting out.",
      ],
      months: {
        feb: {
          status: ["sow_indoors"],
          tasks: [
            "Sow in modules; keep warm in propagator until germination.",
            "Provide strong light (grow light recommended) to prevent legginess.",
          ],
          notes: "Aim for sturdy, compact seedlings.",
        },
        mar: {
          status: ["growing"],
          tasks: [
            "Pot on if roots fill modules.",
            "Keep warm + bright; rotate seedlings to avoid leaning.",
          ],
        },
        apr: {
          status: ["growing"],
          tasks: [
            "Pot on again if needed.",
            "Start gentle airflow (small fan).",
          ],
        },
        may: {
          status: ["harden_off", "transplant"],
          tasks: [
            "Harden off over 7-10 days.",
            "Transplant out late May when nights are reliably mild.",
            "Mulch around plants once soil warms.",
          ],
        },
        jun: {
          status: ["growing", "flowering", "pest_check"],
          tasks: [
            "Check for aphids; squish or rinse early.",
            "Water consistently; avoid drought swings.",
          ],
        },
        jul: {
          status: ["growing", "fruiting", "feed", "prune_train"],
          tasks: [
            "Feed weekly (tomato feed works).",
            "Support branches if heavy with fruit.",
            "Remove overcrowded leaves for air circulation.",
          ],
        },
        aug: {
          status: ["harvest", "feed", "pest_check"],
          tasks: [
            "Harvest regularly to encourage more fruit.",
            "Continue weekly feed.",
          ],
          harvestables: ["Peppers"],
        },
        sep: {
          status: ["harvest"],
          tasks: ["Harvest remaining peppers before cold slows ripening."],
          harvestables: ["Peppers"],
        },
        oct: {
          status: ["clear", "soil_build"],
          tasks: ["Remove plants; compost healthy material."],
        },
      },
    },

    {
      id: "basil",
      name: "Basil (underplanting peppers)",
      category: "herb",
      placement: {
        bed: "left",
        zone: "middle",
        count: 3,
        spacing_cm: "Between peppers",
        height_notes: "Compact; good interplant beneath peppers.",
      },
      companions: ["peppers", "cucumbers"],
      tips: ["Pinch growing tips to keep bushy and delay flowering."],
      months: {
        apr: {
          status: ["sow_indoors"],
          tasks: ["Sow indoors in modules."],
        },
        may: {
          status: ["transplant"],
          tasks: ["Plant out between peppers after last frost."],
        },
        jun: {
          status: ["growing"],
          tasks: ["Pinch tips to encourage bushiness."],
        },
        jul: {
          status: ["growing", "harvest"],
          tasks: ["Harvest leaves regularly."],
          harvestables: ["Basil"],
        },
        aug: {
          status: ["harvest"],
          tasks: ["Continue harvesting; allow some to flower for pollinators."],
          harvestables: ["Basil"],
        },
        sep: {
          status: ["harvest", "clear"],
          tasks: ["Final harvest before cold."],
          harvestables: ["Basil"],
        },
      },
    },

    {
      id: "marigold",
      name: "Marigolds (interplanted with peppers)",
      category: "flower",
      placement: {
        bed: "left",
        zone: "middle",
        count: 4,
        spacing_cm: "Interplanted between peppers in diamond gaps",
        height_notes: "Low-medium; attracts hoverflies.",
      },
      companions: ["peppers", "basil"],
      tips: [
        "French marigolds (Tagetes) for pest deterrence.",
        "Deadhead to prolong flowering.",
      ],
      months: {
        apr: {
          status: ["sow_indoors"],
          tasks: ["Sow indoors in modules."],
        },
        may: {
          status: ["transplant"],
          tasks: ["Transplant out between peppers in left bed middle."],
        },
        jun: {
          status: ["growing", "flowering"],
          tasks: ["Deadhead spent flowers to encourage more blooms."],
        },
        jul: {
          status: ["flowering"],
          tasks: ["Continue deadheading; enjoy the colour."],
        },
        aug: {
          status: ["flowering"],
          tasks: ["Keep deadheading for continuous bloom."],
        },
        sep: {
          status: ["flowering", "clear"],
          tasks: ["Allow some to set seed for next year."],
        },
        oct: {
          status: ["clear"],
          tasks: ["Remove; compost or chop-and-drop."],
        },
      },
    },

    // Left bed, south edge: nasturtiums (trailing)
    {
      id: "nasturtium",
      name: "Nasturtiums (trailing, left bed south)",
      category: "flower",
      placement: {
        bed: "left",
        zone: "south",
        count: 4,
        spacing_cm: "Trailing from south edge of left bed",
        footprint_notes: "Trail over edges; act as trap crop for aphids.",
        height_notes: "Trailing/low; spills over bed edges.",
      },
      companions: ["cucumbers", "peppers", "pumpkin_1"],
      tips: [
        "Trap crop for blackfly — sacrifice them so other plants stay clean.",
        "Edible flowers and leaves (peppery).",
      ],
      months: {
        may: {
          status: ["direct_sow", "transplant"],
          tasks: ["Direct sow or transplant nasturtiums at left bed south edge."],
        },
        jun: {
          status: ["growing", "flowering"],
          tasks: [
            "Let them trail and flower; they attract aphids away from crops.",
          ],
        },
        jul: {
          status: ["flowering", "harvest"],
          tasks: ["Enjoy flowers; harvest edible leaves/flowers."],
          harvestables: ["Nasturtium flowers/leaves"],
        },
        aug: {
          status: ["flowering"],
          tasks: ["Continue enjoying; they will self-seed."],
        },
        sep: {
          status: ["flowering", "clear"],
          tasks: ["Let some set seed; clear as they fade."],
        },
        oct: {
          status: ["clear"],
          tasks: ["Clear; will likely self-seed for next year."],
        },
      },
    },

    // Left bed, north edge: cucumber (trained up arch)
    {
      id: "cucumbers",
      name: "Cucumber (trained up arch, left bed side)",
      category: "fruiting",
      placement: {
        bed: "left",
        zone: "north",
        count: 1,
        spacing_cm: "Single plant at arch base",
        height_notes:
          "Vertical; will climb strongly and create shade under arch.",
        support: ["Arch + strings/ties", "Clips/twine for weekly training"],
      },
      companions: ["basil", "salad_leaves_left", "nasturtium"],
      tips: [
        "Keep training weekly; untamed cucumbers become a tangled mess fast.",
        "Water at soil level to reduce mildew; improve airflow.",
      ],
      months: {
        apr: {
          status: ["sow_indoors"],
          tasks: [
            "Start indoors late April.",
            "Pot on carefully; cucumbers dislike root disturbance.",
          ],
        },
        may: {
          status: ["harden_off", "transplant", "install_support"],
          tasks: [
            "Harden off and transplant late May.",
            "Tie in to arch immediately; guide leader up.",
            "Mulch around base.",
          ],
        },
        jun: {
          status: ["growing", "prune_train", "pest_check", "feed"],
          tasks: [
            "Train up arch weekly; pinch side shoots if too vigorous.",
            "Check for aphids and slugs.",
            "Start feeding once first flowers appear.",
          ],
        },
        jul: {
          status: ["growing", "fruiting", "harvest", "feed", "prune_train"],
          tasks: [
            "Harvest cucumbers regularly to keep production going.",
            "Feed weekly with liquid feed.",
            "Continue tying in new growth.",
            "Maintain airflow spine on arch — remove crossing/crowding growth.",
          ],
          harvestables: ["Cucumbers"],
        },
        aug: {
          status: ["harvest", "feed", "pest_check"],
          tasks: [
            "Keep harvesting; remove yellowing leaves.",
            "Watch for powdery mildew.",
            "Continue weekly feed.",
          ],
          harvestables: ["Cucumbers"],
        },
        sep: {
          status: ["harvest", "clear"],
          tasks: [
            "Harvest remaining fruits.",
            "Remove plants as they fade; compost vines.",
          ],
          harvestables: ["Cucumbers"],
        },
        oct: {
          status: ["clear"],
          tasks: ["Clear any remaining stems from arch."],
        },
      },
    },

    // Left bed, north edge: mini pumpkin (trained up arch, opposite side)
    {
      id: "pumpkin_1",
      name: "Mini pumpkin (arch, left bed, opposite side to cucumber)",
      category: "fruiting",
      placement: {
        bed: "left",
        zone: "north",
        count: 1,
        spacing_cm: "Single plant at arch base (opposite side to cucumber)",
        height_notes:
          "Trained vertically up arch; fruit may need sling support.",
        support: ["Arch", "Fabric slings for developing fruit"],
      },
      companions: ["nasturtium", "borage"],
      tips: [
        "Limit to 3-4 fruit per plant for good sizing.",
        "Support fruit with old tights or fabric slings on arch.",
      ],
      months: {
        apr: {
          status: ["sow_indoors"],
          tasks: [
            "Sow indoors mid-late April.",
            "Use large pots; pumpkins grow fast.",
          ],
        },
        may: {
          status: ["harden_off", "transplant"],
          tasks: [
            "Harden off and plant out late May.",
            "Train leader towards arch from the start.",
          ],
        },
        jun: {
          status: ["growing", "prune_train"],
          tasks: [
            "Train up arch; remove excess side shoots.",
            "Water deeply; start feeding once flowers appear.",
          ],
        },
        jul: {
          status: ["growing", "flowering", "fruiting", "feed", "prune_train"],
          tasks: [
            "Feed weekly.",
            "Support developing fruit with slings.",
            "Keep pumpkin contained — pinch side shoots, limit to 3-4 fruit.",
          ],
        },
        aug: {
          status: ["fruiting", "feed"],
          tasks: [
            "Continue feeding and watering.",
            "Ensure fruit supports are secure.",
          ],
        },
        sep: {
          status: ["harvest"],
          tasks: [
            "Expose fruit to sunlight to ripen.",
            "Harvest when stems start to dry and skin is hard.",
            "Place fruit on tile/wood to keep off wet soil.",
          ],
          harvestables: ["Mini pumpkins"],
        },
        oct: {
          status: ["harvest", "clear", "soil_build"],
          tasks: [
            "Harvest before hard frost; cure in airy spot.",
            "Clear vines; chop-and-drop healthy material.",
          ],
          harvestables: ["Mini pumpkins"],
        },
      },
    },

    // --- RIGHT BED (Bulk + Succession Bed) ---

    // Right bed, south edge: dedicated salad succession strip
    {
      id: "salad_leaves_right",
      name: "Salad leaves (right bed, succession strip)",
      category: "leafy",
      placement: {
        bed: "right",
        zone: "south",
        count: undefined,
        spacing_cm: "Scatter/broadcast in strips; thin as needed",
        footprint_notes:
          "Dedicated salad succession strip across south edge of right bed.",
        height_notes: "Low; good for south edge positions.",
      },
      companions: ["nasturtium", "calendula"],
      tips: [
        "Succession sow every 3-4 weeks for continuous supply.",
        "Cut-and-come-again varieties give multiple harvests per sowing.",
        "Shade from taller plants is a bonus in hot summer months.",
      ],
      months: {
        mar: {
          status: ["direct_sow"],
          tasks: [
            "Direct sow first batch in right bed south salad strip.",
            "Cover with fleece if cold snaps expected.",
          ],
        },
        apr: {
          status: ["growing", "succession_sow", "thin"],
          tasks: [
            "Thin seedlings; eat thinnings.",
            "Sow next batch for succession.",
          ],
          harvestables: ["Baby salad leaves"],
        },
        may: {
          status: ["harvest", "succession_sow"],
          tasks: [
            "Harvest cut-and-come-again.",
            "Sow next succession.",
          ],
          harvestables: ["Salad leaves"],
        },
        jun: {
          status: ["harvest", "succession_sow"],
          tasks: [
            "Keep harvesting; sow more every 3-4 weeks.",
            "Move sowings to shadier spots if weather turns hot.",
          ],
          harvestables: ["Salad leaves"],
        },
        jul: {
          status: ["harvest", "succession_sow"],
          tasks: [
            "Harvest regularly.",
            "Sow heat-tolerant varieties or in partial shade.",
          ],
          harvestables: ["Salad leaves"],
        },
        aug: {
          status: ["harvest", "succession_sow"],
          tasks: [
            "Continue harvests.",
            "Start sowing autumn spinach/rocket late August.",
          ],
          harvestables: ["Salad leaves"],
        },
        sep: {
          status: ["harvest", "direct_sow"],
          tasks: [
            "Harvest autumn greens.",
            "Sow final batch of winter-hardy varieties if desired.",
          ],
          harvestables: ["Salad leaves", "Spinach", "Rocket"],
        },
        oct: {
          status: ["harvest", "clear"],
          tasks: [
            "Final harvests.",
            "Clear spent plants; mulch bed.",
          ],
          harvestables: ["Salad leaves"],
        },
      },
    },

    // Right bed, middle: dwarf French beans strip (NEW)
    {
      id: "dwarf_french_beans",
      name: "Dwarf French beans",
      category: "legume",
      placement: {
        bed: "right",
        zone: "middle",
        count: undefined,
        spacing_cm: "15-20cm apart in rows, double row across middle strip",
        footprint_notes:
          "Strip across the middle of the right bed. Compact dwarf variety; no support needed.",
        height_notes: "Dwarf (40-50cm); bushy and self-supporting.",
      },
      companions: ["salad_leaves_right", "calendula", "borage"],
      tips: [
        "Harvest frequently to keep production going.",
        "Dwarf varieties do not need staking or support.",
        "Beans fix nitrogen — great for soil building after clearing.",
      ],
      months: {
        apr: {
          status: ["sow_indoors"],
          tasks: [
            "Sow indoors in deep modules or 9cm pots.",
            "Alternatively, wait and direct sow in May.",
          ],
          notes: "Indoor start gives a head start but direct sow works well too.",
        },
        may: {
          status: ["harden_off", "transplant", "direct_sow"],
          tasks: [
            "If started indoors: harden off and transplant out late May.",
            "If not started: direct sow after last frost (late May).",
            "Mulch around plants.",
          ],
        },
        jun: {
          status: ["growing", "flowering"],
          tasks: [
            "Growing strongly; first flowers appearing.",
            "Water consistently, especially during flowering.",
            "No support needed for dwarf varieties.",
          ],
        },
        jul: {
          status: ["flowering", "fruiting", "harvest", "feed"],
          tasks: [
            "Harvest beans regularly when 10-12cm long.",
            "Pick every 2-3 days to encourage more pods.",
            "Feed fortnightly with general liquid feed.",
          ],
          harvestables: ["French beans"],
        },
        aug: {
          status: ["harvest", "feed"],
          tasks: [
            "Continue regular harvests.",
            "Harvest French beans frequently to maintain production.",
            "Feed fortnightly.",
          ],
          harvestables: ["French beans"],
        },
        sep: {
          status: ["harvest", "clear"],
          tasks: [
            "Final harvest as production slows.",
            "Clear plants; cut at soil level to leave nitrogen-fixing roots in place.",
            "Compost or chop-and-drop the top growth.",
          ],
          harvestables: ["French beans"],
        },
        oct: {
          status: ["clear", "soil_build"],
          tasks: ["Clear any remaining material; add compost to area."],
        },
      },
    },

    // Right bed, north edge: courgette (single plant)
    {
      id: "courgette",
      name: "Courgette",
      category: "fruiting",
      placement: {
        bed: "right",
        zone: "north",
        count: 1,
        spacing_cm: "Single plant; needs ~60cm spread",
        footprint_notes:
          "One plant only! Courgettes produce huge amounts from a single plant.",
        height_notes: "Low-spreading; may shade neighbours.",
        support: ["None needed; just space"],
      },
      companions: ["borage", "calendula"],
      tips: [
        "Harvest at 15-20cm for best flavour and to keep production high.",
        "One plant is enough. Seriously.",
      ],
      months: {
        apr: {
          status: ["sow_indoors"],
          tasks: [
            "Sow indoors mid-late April in 9cm pots.",
            "Keep warm; germinates quickly.",
          ],
        },
        may: {
          status: ["harden_off", "transplant"],
          tasks: [
            "Harden off and transplant late May.",
            "Mulch deeply around plant.",
          ],
        },
        jun: {
          status: ["growing", "flowering"],
          tasks: [
            "Water consistently; avoid wetting leaves.",
            "Start feeding when first flowers appear.",
          ],
        },
        jul: {
          status: ["harvest", "feed", "pest_check", "prune_train"],
          tasks: [
            "Harvest courgettes every 2-3 days.",
            "Feed weekly.",
            "Check for powdery mildew; remove affected leaves.",
            "Remove yellowing courgette leaves immediately.",
          ],
          harvestables: ["Courgettes"],
        },
        aug: {
          status: ["harvest", "feed", "pest_check"],
          tasks: [
            "Continue regular harvests.",
            "Remove yellowing/mildewed leaves for airflow.",
            "Continue weekly feed.",
          ],
          harvestables: ["Courgettes"],
        },
        sep: {
          status: ["harvest", "clear"],
          tasks: [
            "Final harvests as production slows.",
            "Remove plant when finished; compost.",
          ],
          harvestables: ["Courgettes"],
        },
        oct: {
          status: ["clear", "soil_build"],
          tasks: ["Clear and add compost to area."],
        },
      },
    },

    // Right bed, arch: peas (spring only)
    {
      id: "peas",
      name: "Peas (spring arch crop)",
      category: "legume",
      placement: {
        bed: "right",
        zone: "arch",
        count: undefined,
        spacing_cm: "5-8cm along row at arch base",
        height_notes: "Climb 1.5-2m on the arch.",
        support: ["Cattle-panel arch"],
      },
      companions: ["salad_leaves_right"],
      tips: [
        "Sow a double row either side of arch base for a thick screen.",
        "Peas fix nitrogen — great predecessor for hungry cucumbers.",
      ],
      months: {
        mar: {
          status: ["direct_sow"],
          tasks: [
            "Direct sow at arch base as soon as soil is workable.",
            "Cover with netting/fleece if mice/pigeons are a problem.",
          ],
        },
        apr: {
          status: ["growing"],
          tasks: [
            "Guide tendrils to arch; they will climb naturally.",
            "Water in dry spells.",
          ],
        },
        may: {
          status: ["growing", "flowering"],
          tasks: [
            "Enjoy the flowers (great for pollinators).",
            "Water regularly once flowering starts.",
          ],
        },
        jun: {
          status: ["harvest", "clear"],
          tasks: [
            "Harvest pods regularly for continuous production.",
            "Once production drops, cut at soil level (leave roots for nitrogen).",
            "Compost or chop-and-drop the vines.",
          ],
          harvestables: ["Peas"],
        },
      },
    },

    // Right bed, corners: borage + calendula
    {
      id: "borage",
      name: "Borage",
      category: "flower",
      placement: {
        bed: "right",
        zone: "corner",
        count: 2,
        spacing_cm: "30-40cm; corners of right bed",
        height_notes: "Tall (60-90cm); put at back corners.",
      },
      companions: ["courgette", "dwarf_french_beans"],
      tips: [
        "Excellent pollinator plant; bees love it.",
        "Self-seeds readily — pull extras if unwanted.",
        "Edible flowers (cucumber-flavoured).",
      ],
      months: {
        apr: {
          status: ["direct_sow"],
          tasks: ["Direct sow at corners of right bed."],
        },
        may: {
          status: ["growing"],
          tasks: ["Thin if overcrowded."],
        },
        jun: {
          status: ["growing", "flowering"],
          tasks: ["Enjoy flowers; excellent for pollinators."],
        },
        jul: {
          status: ["flowering"],
          tasks: ["Continue flowering; harvest flowers for drinks/salads."],
          harvestables: ["Borage flowers"],
        },
        aug: {
          status: ["flowering"],
          tasks: ["Still flowering; let some go to seed."],
        },
        sep: {
          status: ["clear"],
          tasks: ["Let self-seed then clear."],
        },
        oct: {
          status: ["clear", "soil_build"],
          tasks: ["Chop-and-drop; great green manure."],
        },
      },
    },

    {
      id: "calendula",
      name: "Calendula (pot marigold)",
      category: "flower",
      placement: {
        bed: "right",
        zone: "corner",
        count: 4,
        spacing_cm: "Along edges and corners of right bed",
        height_notes: "Medium; cheerful orange flowers.",
      },
      companions: ["salad_leaves_right", "courgette", "dwarf_french_beans"],
      tips: [
        "Attracts hoverflies (aphid predators).",
        "Petals are edible — scatter in salads.",
        "Self-seeds readily.",
      ],
      months: {
        mar: {
          status: ["direct_sow"],
          tasks: ["Direct sow at right bed corners and edges (hardy enough for early spring)."],
        },
        apr: {
          status: ["growing"],
          tasks: ["Thin if too dense; transplant extras."],
        },
        may: {
          status: ["growing", "flowering"],
          tasks: ["Enjoy first flowers."],
        },
        jun: {
          status: ["flowering"],
          tasks: ["Deadhead for continuous bloom."],
        },
        jul: {
          status: ["flowering", "harvest"],
          tasks: ["Harvest petals for salads."],
          harvestables: ["Calendula petals"],
        },
        aug: {
          status: ["flowering"],
          tasks: ["Continue deadheading and enjoying."],
        },
        sep: {
          status: ["flowering", "clear"],
          tasks: ["Let some set seed for next year."],
        },
        oct: {
          status: ["clear"],
          tasks: ["Clear; will self-seed."],
        },
      },
    },
  ],
};
