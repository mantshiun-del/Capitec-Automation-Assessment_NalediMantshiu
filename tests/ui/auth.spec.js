import { test, expect } from '@playwright/test';
import { users } from '../../utils/testData.js';

// Happy path: standard user logs in
test('standard_user can log in and see inventory', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(users.standard.username);
  await page.locator('[data-test="password"]').fill(users.standard.password);
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('.inventory_list')).toBeVisible();
});

// Negative path: locked out user shows error message
test('locked_out_user shows locked-out error', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(users.lockedOut.username);
  await page.locator('[data-test="password"]').fill(users.lockedOut.password);
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Sorry, this user has been locked out.');
});

// Persona: problem_user
test('problem_user can log in (UI may have quirks)', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(users.problem.username);
  await page.locator('[data-test="password"]').fill(users.problem.password);
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('.inventory_list')).toBeVisible();
});

// Persona: performance_glitch_user (allow more time)
test('performance_glitch_user loads inventory with delay', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(users.performance.username);
  await page.locator('[data-test="password"]').fill(users.performance.password);
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('.inventory_list')).toBeVisible({ timeout: 10000 });
});
