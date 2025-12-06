import { test, expect } from '@playwright/test';
import CartPage from '../../pages/CartPage.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';

test.describe('Shopping Cart Tests', () => {
  let cartPage;

  test.beforeEach(async ({ page }) => {
    // Navigate and login first
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Add an item to cart first
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstItemToCart();
    
    // Then navigate to cart
    await inventoryPage.goToCart();
    cartPage = new CartPage(page);
  });

  test('should display cart items', async ({ page }) => {
    const items = await cartPage.cartItems.count();
    expect(items).toBeGreaterThan(0);
  });

  test('should proceed to checkout', async () => {
    await cartPage.proceedToCheckout();
    await expect(cartPage.page).toHaveURL(/.*checkout/);
  });

  test('should have continue shopping button', async () => {
    await expect(cartPage.continueShoppingBtn).toBeVisible();
  });
});