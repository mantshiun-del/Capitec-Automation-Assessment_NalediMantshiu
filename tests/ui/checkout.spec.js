const { test } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');
const { InventoryPage } = require('../../pages/InventoryPage.js');
const { CartPage } = require('../../pages/CartPage.js');
const { CheckoutPage } = require('../../pages/CheckoutPage.js');
const checkoutData = require('../../test-data/checkout.json');

test('Add items to cart and complete checkout', async ({ page }) => {
  const login = new LoginPage(page);
  const inventory = new InventoryPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);

  // Login
  await login.goto();
  await login.login('standard_user', 'secret_sauce');

  // Inventory management: add items
  await inventory.addItemByName('Sauce Labs Backpack');
  await inventory.addItemByName('Sauce Labs Bike Light');

  // Go to cart and verify
  await inventory.gotoCart();
  await cart.expectItemPresent('Sauce Labs Backpack');
  await cart.expectItemPresent('Sauce Labs Bike Light');

  // Checkout with your details
  await cart.checkout();
  await checkout.fillDetails(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
  await checkout.continue();
  await checkout.finish();
  await checkout.expectSuccess();
})