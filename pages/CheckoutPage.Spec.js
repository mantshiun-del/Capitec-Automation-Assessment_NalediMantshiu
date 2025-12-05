export default class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName  = page.locator('[data-test="lastName"]');
    this.postal    = page.locator('[data-test="postalCode"]');
    this.continue  = page.locator('[data-test="continue"]');
    this.finish    = page.locator('[data-test="finish"]');
    this.complete  = page.locator('.complete-header');
  }
}
