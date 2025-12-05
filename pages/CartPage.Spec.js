const { expect } = require('@playwright/test');

class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_item');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  async expectItemPresent(name) {
    await expect(this.page.locator('.cart_item').filter({ hasText: name })).toBeVisible();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
