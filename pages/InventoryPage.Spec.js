// pages/InventoryPage.js
export default class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Page header / title
    this.title = page.locator('.title');                         // "Products"

    // Product list
    this.items = page.locator('.inventory_item');                // All product cards

    // Add-to-cart buttons (data-test values differ per item; ^ starts-with)
    this.addToCartButtons = page.locator('[data-test^="add-to-cart"]');

    // Cart link & badge
    this.cartLink = page.locator('.shopping_cart_link');
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addFirstItemToCart() {
    await this.addToCartButtons.first().click();
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
