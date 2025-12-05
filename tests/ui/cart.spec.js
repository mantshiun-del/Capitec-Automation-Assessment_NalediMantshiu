import { test, expect } from '@playwright/test';
import testData from '../utils/testData.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import CartPage from '../../pages/CartPage.js';

test('Add to cart and see badge increment', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login(testData.users.standard.username, testData.users.standard.password);

  await inventory.addToCartButtons.first().click();
  await expect(inventory.cartBadge).toHaveText('1');
});
