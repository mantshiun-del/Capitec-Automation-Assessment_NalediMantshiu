
// pages/CheckoutPage.js
export default class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // Step One: Your Information
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName  = page.locator('[data-test="lastName"]');
    this.postal    = page.locator('[data-test="postalCode"]');
    this.continue  = page.locator('[data-test="continue"]');

    // Step Two: Overview
    this.finish    = page.locator('[data-test="finish"]');

    // Complete
    this.completeHeader = page.locator('.complete-header'); // "Thank you for your order!"
  }

  async fillYourInfo({ firstName, lastName, postalCode }) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postal.fill(postalCode);
    await this.continue.click();
  }

  async finishOrder() {
    await this.finish.click();
  }
}
