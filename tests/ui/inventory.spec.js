import { test, expect } from '@playwright/test';
import InventoryPage from '../../pages/InventoryPage.js';
import LoginPage from '../../pages/LoginPage.js';

test.describe('Inventory Tests', () => {
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    // Navigate and login
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    inventoryPage = new InventoryPage(page);
  });

  test('should display products title', async () => {
    await expect(inventoryPage.title).toContainText('Products');
  });

  test('should display inventory items', async () => {
    const items = await inventoryPage.items.count();
    expect(items).toBeGreaterThan(0);
  });

  test('should add first item to cart', async () => {
    await inventoryPage.addFirstItemToCart();
    const badgeCount = await inventoryPage.cartBadge.textContent();
    expect(badgeCount).toBe('1');
  });

  test('should navigate to cart', async () => {
    await inventoryPage.addFirstItemToCart();
    await inventoryPage.goToCart();
    await expect(inventoryPage.page).toHaveURL(/.*cart/);
  });
});