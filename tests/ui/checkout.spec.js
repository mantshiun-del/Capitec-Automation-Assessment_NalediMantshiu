import { test, expect } from '@playwright/test';
import CheckoutPage from '../../pages/CheckoutPage.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import CartPage from '../../pages/CartPage.js';

test.describe('Checkout Tests', () => {
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    // Navigate and login
    const loginPage = new LoginPage(page);
    await page.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Add an item to cart
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstItemToCart();
    
    // Navigate to cart
    await inventoryPage.goToCart();
    
    // Proceed to checkout
    const cartPage = new CartPage(page);
    await cartPage.proceedToCheckout();
    
    checkoutPage = new CheckoutPage(page);
  });

  test('should fill checkout information', async () => {
    await checkoutPage.fillYourInfo({
      firstName: 'John',
      lastName: 'Doe',
      postalCode: '12345'
    });
    await expect(checkoutPage.page).toHaveURL(/.*checkout-step-two/);
  });

  test('should complete order', async () => {
    await checkoutPage.fillYourInfo({
      firstName: 'Jane',
      lastName: 'Smith',
      postalCode: '54321'
    });
    
    await checkoutPage.finishOrder();
    await expect(checkoutPage.completeHeader).toBeVisible();
  });
});
