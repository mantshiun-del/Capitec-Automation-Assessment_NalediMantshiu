import { test, expect } from '@playwright/test';
import { users } from '../../utils/testData.js';

test('complete checkout flow', async ({ page }) => {
  // Login
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(users.standard.username);
  await page.locator('[data-test="password"]').fill(users.standard.password);
  await page.locator('[data-test="login-button"]').click();

  // Add one item
  await page.locator('[data-test^="add-to-cart"]').first().click();
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Cart → Checkout
  await page.click('.shopping_cart_link');
  await page.locator('[data-test="checkout"]').click();

  // Fill info
  await page.locator('[data-test="firstName"]').fill('Naledi');
  await page.locator('[data-test="lastName"]').fill('Mantshiu');
  await page.locator('[data-test="postalCode"]').fill('2196');
  await page.locator('[data-test="continue"]').click();

  // Review & finish
  await expect(page.locator('.summary_total_label')).toContainText('Total');
  await page.locator('[data-test="finish"]').click();

  // Confirmation
  await expect(page.locator('.complete-header'))
    .toHaveText('Thank you for your order!');
});
