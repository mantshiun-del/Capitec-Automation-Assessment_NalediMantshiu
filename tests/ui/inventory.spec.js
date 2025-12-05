import { test, expect } from '@playwright/test';
import testData from '../utils/testData.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';

test('Inventory shows products after login', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);

  await login.goto();
  await login.login(testData.users.standard.username, testData.users.standard.password);

  await expect(inventory.title).toHaveText('Products');
  await expect(inventory.items).toHaveCount(6);   // SauceDemo has 6 items
});
