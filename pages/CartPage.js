// pages/CartPage.js
export default class CartPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Items visible in the cart page
    this.cartItems = page.locator('.cart_item');

    // Buttons
    this.checkoutBtn = page.locator('[data-test="checkout"]');
    this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
  }

  async proceedToCheckout() {
    await this.checkoutBtn.click();
  }
}
