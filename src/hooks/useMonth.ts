import { useState, useEffect, useCallback } from "react";
import type { MonthKey } from "../plan/plan2026";
import { MONTH_KEYS } from "../plan/plan2026";

function getMonthFromDate(): MonthKey {
  const m = new Date().getMonth(); // 0-indexed
  // Map: Jan=0 -> feb, Feb=1 -> feb, Mar=2 -> mar, ... Oct=9 -> oct, Nov+ -> oct
  const map: Record<number, MonthKey> = {
    0: "feb",
    1: "feb",
    2: "mar",
    3: "apr",
    4: "may",
    5: "jun",
    6: "jul",
    7: "aug",
    8: "sep",
    9: "oct",
    10: "oct",
    11: "feb",
  };
  return map[m] ?? "feb";
}

function getMonthFromURL(): MonthKey | null {
  const params = new URLSearchParams(window.location.search);
  const m = params.get("month") as MonthKey | null;
  if (m && MONTH_KEYS.includes(m)) return m;
  return null;
}

function setMonthInURL(month: MonthKey) {
  const url = new URL(window.location.href);
  url.searchParams.set("month", month);
  window.history.replaceState({}, "", url.toString());
}

export function useMonth() {
  const [month, setMonthState] = useState<MonthKey>(
    () => getMonthFromURL() || getMonthFromDate()
  );

  useEffect(() => {
    setMonthInURL(month);
  }, [month]);

  const setMonth = useCallback((m: MonthKey) => {
    setMonthState(m);
  }, []);

  return { month, setMonth };
}
