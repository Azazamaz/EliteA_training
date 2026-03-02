import { test, expect } from '@playwright/test';

/* TEST_CONTENT_START */

test.describe('EPAM website - Client Work navigation', () => {
  test('Navigate to Services -> Explore Our Client Work and verify Client Work text', async ({ page }) => {
    // Navigate to homepage
    await page.goto('https://www.epam.com/');
    await page.waitForLoadState('networkidle');

    // Open Services menu (hover to reveal dropdown if present)
    const services = page.locator('a:has-text("Services")');
    if (await services.count() > 0) {
      await services.first().hover();
    }

    // Click the "Explore Our Client Work" link. Try multiple locators for robustness.
    const exploreLink = page.locator('a:has-text("Explore Our Client Work")');
    if (await exploreLink.count() > 0) {
      await exploreLink.first().click();
    } else {
      // fallback: try text click
      await page.click('text=Explore Our Client Work', { timeout: 5000 }).catch(() => {});
    }

    // Verify that "Client Work" text is visible on the page
    await expect(page.locator('text=Client Work')).toBeVisible({ timeout: 10000 });
  });
});

/* TEST_CONTENT_END */
