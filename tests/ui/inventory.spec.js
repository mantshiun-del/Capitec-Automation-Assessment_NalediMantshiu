import { test, expect } from '@playwright/test';
import { users } from '../../utils/testData.js';

test('inventory lists 6 products and can sort by price high→low', async ({ page }) => {
  // Login
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(users.standard.username);
  await page.locator('[data-test="password"]').fill(users.standard.password);
  await page.locator('[data-test="login-button"]').click();

  await expect(page.locator('.inventory_list')).toBeVisible();

  // SauceDemo usually has 6 items
  const items = page.locator('.inventory_item');
  await expect(items).toHaveCount(6);

  // Sort by price: high to low
  await page.locator('.product_sort_container').selectOption('hilo');

  // Quick check: first price should be the highest
  const prices = await page.$$eval('.inventory_item_price', els =>
    els.map(e => Number(e.textContent.replace('$', '')))
  );
  const sortedDesc = [...prices].sort((a, b) => b - a);
  expect(prices[0]).toBe(sortedDesc[0]);
});
