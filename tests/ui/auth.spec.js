
import { test, expect } from '@playwright/test';
import testData from '../utils/testData.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';

test.describe('Authentication', () => {
  for (const [name, creds] of Object.entries(testData.users)) {
    test(`Login as ${name}`, async ({ page }) => {
      const login = new LoginPage(page);
      const inventory = new InventoryPage(page);

      await login.goto();
      await login.login(creds.username, creds.password);

      if (name === 'locked') {
        await expect(login.error).toContainText('locked');     // locked user error
      } else {
        await expect(inventory.title).toHaveText('Products');  // success lands on inventory
      }
    });
  }
});
