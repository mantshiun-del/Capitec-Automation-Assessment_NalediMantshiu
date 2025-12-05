class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryList = page.locator('.inventory_list');
    this.cartIcon = page.locator('.shopping_cart_link');
  }

  async addItemByName(name) {
    const item = this.page.locator('.inventory_item').filter({ hasText: name });
    await item.locator('text=Add to cart').click();
  }

  async removeItemByName(name) {
    const item = this.page.locator('.inventory_item').filter({ hasText: name });
    await item.locator('text=Remove').click();
  }

  async gotoCart() {
    await this.cartIcon.click();
  }
}

module.exports = { InventoryPage };
