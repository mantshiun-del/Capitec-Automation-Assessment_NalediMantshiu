import { test, expect } from '@playwright/test';
import testData from '../utils/testData.js';
import LoginPage from '../../pages/LoginPage.js';
import InventoryPage from '../../pages/InventoryPage.js';
import CartPage from '../../pages/CartPage.js';
import CheckoutPage from '../../pages/CheckoutPage.js';

test('Complete checkout flow', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  await login.goto();
  await login.login(testData.users.standard.username, testData.users.standard.password);

  await inventory.addToCartButtons.first().click();
  await inventory.cartLink.click();

  await cart.checkoutBtn.click();

  await checkout.firstName.fill(testData.checkout.firstName);
  await checkout.lastName.fill(testData.checkout.lastName);
  await checkout.postal.fill(testData.checkout.postalCode);
  await checkout.continue.click();

  await checkout.finish.click();
  await expect(checkout.complete).toHaveText('Thank you for your order!');
});
