import { test, expect } from "@playwright/test";

test.describe("Garden Planner smoke tests", () => {
  test("page loads with header and default month", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("h1")).toHaveText("Raised Bed Planner 2026");
    await expect(page.locator("p.app-subtitle")).toHaveText(
      "Nottingham, UK — Seasonal control panel"
    );
    await expect(page.locator("button.month-tab.active")).toBeVisible();
  });

  test("month selector switches months", async ({ page }) => {
    await page.goto("/");

    await page.locator("button.month-tab", { hasText: "Jul" }).click();

    await expect(page).toHaveURL(/[?&]month=jul/);
    await expect(page.locator("div.summary-panel h2")).toContainText(
      "July — At a Glance"
    );
  });

  test("season tabs work", async ({ page }) => {
    await page.goto("/");

    await page.locator("button.season-tab", { hasText: "Summer" }).click();

    await expect(page).toHaveURL(/[?&]month=jun/);
    await expect(page.locator("div.summary-panel h2")).toContainText(
      "June — At a Glance"
    );
  });

  test("URL param sets initial month", async ({ page }) => {
    await page.goto("/?month=mar");

    await expect(
      page.locator("button.month-tab.active")
    ).toHaveText("Mar");
    await expect(page.locator("div.summary-panel h2")).toContainText("March");
  });

  test("bed map renders both beds", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("div.bed-left .bed-label")).toHaveText(
      "Left Bed (tall / heavy feeders)"
    );
    await expect(page.locator("div.bed-right .bed-label")).toHaveText(
      "Right Bed (bulk + succession)"
    );
    await expect(page.locator("span.arch-title")).toHaveText(
      "Cattle-panel arch"
    );
    await expect(page.locator("div.bed-map-label.house-label")).toContainText(
      "south (sunny)"
    );
  });

  test("February shows correct crops", async ({ page }) => {
    await page.goto("/?month=feb");

    const peppersChip = page.locator("button.crop-chip", {
      has: page.locator("span.crop-chip-name", { hasText: "Peppers" }),
    });
    await expect(peppersChip).toBeVisible();
    await expect(peppersChip.locator("span.crop-chip-status")).toContainText(
      "Sow"
    );

    // Arch should be empty in February
    await expect(page.locator("div.arch-column")).not.toHaveText(/Peas/);
  });

  test("March shows peas on arch", async ({ page }) => {
    await page.goto("/?month=mar");

    await expect(
      page.locator("div.arch-column span.arch-crop-tag", { hasText: "Peas" })
    ).toBeVisible();

    const peasChip = page.locator("button.crop-chip", {
      has: page.locator("span.crop-chip-name", { hasText: "Peas" }),
    });
    await expect(peasChip).toBeVisible();
  });

  test("July shows harvest crops", async ({ page }) => {
    await page.goto("/?month=jul");

    // Summary should have a Harvest card
    await expect(
      page.locator("div.summary-card h3", { hasText: "Harvest" })
    ).toBeVisible();

    // Courgette chip should show harvest status
    const courgetteChip = page.locator("button.crop-chip", {
      has: page.locator("span.crop-chip-name", { hasText: "Courgette" }),
    });
    await expect(
      courgetteChip.locator("span.crop-chip-status")
    ).toContainText("Harvest");

    // Cucumber chip should show harvest status
    const cucumbersChip = page.locator("button.crop-chip", {
      has: page.locator("span.crop-chip-name", { hasText: "Cucumber" }),
    });
    await expect(
      cucumbersChip.locator("span.crop-chip-status")
    ).toContainText("Harvest");
  });

  test("crop modal opens on chip click", async ({ page }) => {
    await page.goto("/?month=feb");

    const peppersChip = page.locator("button.crop-chip", {
      has: page.locator("span.crop-chip-name", { hasText: "Peppers" }),
    });
    await peppersChip.first().click();

    const modal = page.locator("div.modal-overlay");
    await expect(modal).toBeVisible();

    await expect(modal.locator("div.modal-content h2")).toContainText(
      "Peppers (snack + button red)"
    );
    await expect(modal.locator("div.modal-content")).toContainText(
      "What to do in February"
    );
    await expect(
      modal.locator("div.modal-content", { hasText: "Sow" })
    ).toBeVisible();
  });

  test("crop modal closes on × click", async ({ page }) => {
    await page.goto("/?month=feb");

    await page
      .locator("button.crop-chip", {
        has: page.locator("span.crop-chip-name", { hasText: "Peppers" }),
      })
      .first()
      .click();

    const modal = page.locator("div.modal-overlay");
    await expect(modal).toBeVisible();

    await page.locator("button.modal-close").click();
    await expect(modal).not.toBeVisible();
  });

  test("crop modal closes on overlay click", async ({ page }) => {
    await page.goto("/?month=feb");

    await page
      .locator("button.crop-chip", {
        has: page.locator("span.crop-chip-name", { hasText: "Peppers" }),
      })
      .first()
      .click();

    const modal = page.locator("div.modal-overlay");
    await expect(modal).toBeVisible();

    // Click the overlay itself (not the modal content) by clicking at the edge
    await modal.click({ position: { x: 5, y: 5 } });
    await expect(modal).not.toBeVisible();
  });

  test("crop modal shows lifecycle overview", async ({ page }) => {
    await page.goto("/?month=feb");

    await page
      .locator("button.crop-chip", {
        has: page.locator("span.crop-chip-name", { hasText: "Peppers" }),
      })
      .first()
      .click();

    const modal = page.locator("div.modal-content");
    await expect(modal).toBeVisible();
    await expect(
      modal.locator("h3", { hasText: "Full Season Overview" })
    ).toBeVisible();
  });

  test("moon widget shows guidance", async ({ page }) => {
    await page.goto("/?month=feb");

    const moonWidget = page.locator("div.moon-widget");
    await expect(moonWidget.locator("div.moon-header")).toContainText(
      "Moon Guidance — February"
    );
    await expect(moonWidget.locator("ul.moon-list")).toContainText(
      "Waxing moon"
    );
  });

  test("summary panel shows tasks", async ({ page }) => {
    await page.goto("/?month=feb");

    const tasks = page.locator("div.summary-tasks");
    await expect(tasks.locator("h3")).toHaveText("Tasks this month");
    await expect(tasks.locator("li").first()).toBeVisible();
  });

  test("copy summary button exists", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.locator("div.print-actions button", {
        hasText: "Copy text summary",
      })
    ).toBeVisible();
  });

  test("October shows clear/soil status", async ({ page }) => {
    await page.goto("/?month=oct");

    await expect(page.locator("div.summary-panel h2")).toContainText(
      "October — At a Glance"
    );
  });
});
