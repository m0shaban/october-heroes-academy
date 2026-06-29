import { test, expect } from '@playwright/test';

test.describe('Milestone B1 - Challenger 2 Stress Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Test 1: Popstate history navigation sync
  test('history-navigation-popstate-sync', async ({ page }) => {
    // Start at default (Arabic)
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');

    // Click language switch to English
    const desktopLangBtn = page.locator('button[aria-label^="Switch to"]').first();
    await desktopLangBtn.click();
    await expect(page).toHaveURL(/\?lang=en/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');

    // Go back in history
    await page.goBack();
    await expect(page).toHaveURL(/\?lang=ar/);
    // Let's see if the page language updates back to Arabic immediately!
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
  });

  // Test 2: Invalid/Unknown query parameter boundary test
  test('invalid-lang-param-boundary', async ({ page }) => {
    // Load page with lang=invalid
    await page.goto('/?lang=invalid');
    // It should fall back to default 'ar'
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');

    // Load page with lang=EN (uppercase)
    await page.goto('/?lang=EN');
    // Case sensitivity: check if it handles uppercase gracefully or falls back
    // The requirement says lang=ar|en. If case-sensitive, ?lang=EN might fall back to 'ar'.
    // Let's observe what happens.
    const currentLang = await page.locator('html').getAttribute('lang');
    console.log('Language for ?lang=EN is:', currentLang);
  });

  // Test 3: Chevron rotation class validation in Mobile Menu
  test('mobile-menu-chevron-rotation-classes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const hamburger = page.locator('button[aria-label="Toggle navigation menu"]');
    await hamburger.click();
    await page.waitForTimeout(500);

    // Look for chevrons inside the mobile menu
    const chevrons = page.locator('div[class*="fixed"] nav svg[class*="rotate-"]');
    const count = await chevrons.count();
    console.log('Found chevrons with rotate- class count:', count);
    
    // Check if the rotation class works/compiles.
    // In Tailwind, rotate-90 or rotate--90 might not be compiled if they are generated dynamically.
    // Let's print classes of all chevrons in the drawer.
    const drawerLinks = page.locator('div[class*="fixed"] nav a');
    for (let i = 0; i < await drawerLinks.count(); i++) {
      const svg = drawerLinks.nth(i).locator('svg');
      if (await svg.count() > 0) {
        const className = await svg.first().getAttribute('class');
        console.log(`Drawer link ${i} svg classes:`, className);
      }
    }
  });

  // Test 4: Scroll progress origin and transform validation
  test('scroll-progress-transform-origin', async ({ page }) => {
    // In Arabic (RTL) mode
    await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    const arabicProgress = page.locator('div.fixed.top-0.h-1');
    const arabicOrigin = await arabicProgress.evaluate((el) => window.getComputedStyle(el).transformOrigin);
    console.log('Arabic scroll progress transform origin:', arabicOrigin);

    // Switch to English (LTR) mode
    const desktopLangBtn = page.locator('button[aria-label^="Switch to"]').first();
    await desktopLangBtn.click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    
    const englishProgress = page.locator('div.fixed.top-0.h-1');
    const englishOrigin = await englishProgress.evaluate((el) => window.getComputedStyle(el).transformOrigin);
    console.log('English scroll progress transform origin:', englishOrigin);
  });

  // Test 5: Mobile drawer resize and reopen stress test
  test('mobile-drawer-resize-stress', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    const hamburger = page.locator('button[aria-label="Toggle navigation menu"]');
    await hamburger.click();
    
    // Resize to desktop
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(300);
    
    // Drawer backdrop/container should be hidden
    const drawer = page.locator('div[class*="fixed"]').filter({ hasText: /برامجنا|المدربون/ });
    await expect(drawer.first()).toBeHidden();

    // Resize back to mobile
    await page.setViewportSize({ width: 375, height: 812 });
    await page.waitForTimeout(300);

    // Is the drawer automatically closed, or does it reopen, or is it in a weird state?
    // Let's verify.
    const isVisible = await drawer.first().isVisible();
    console.log('Mobile drawer visible after resizing back to mobile:', isVisible);
  });
});
