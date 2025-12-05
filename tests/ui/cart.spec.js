import { test, expect } from '@playwright/test';
import { users } from '../../utils/testData.js';

test('add two items to cart, then remove one', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-test="username"]').fill(users.standard.username);
  await page.locator('[data-test="password"]').fill(users.standard.password);
  await page.locator('[data-test="login-button"]').click();

  // Add first two items (buttons start with add-to-cart)
  const addButtons = page.locator('[data-test^="add-to-cart"]');
  await addButtons.nth(0).click();
  await addButtons.nth(1).click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

  await page.click('.shopping_cart_link');

  // Remove one item (buttons start with remove)
  const removeButtons = page.locator('[data-test^="remove"]');
  await removeButtons.nth(0).click();

  await expect(page.locator('.cart_item')).toHaveCount(1);
});
