const { expect } = require('@playwright/test');

class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.postalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.successHeader = page.locator('.complete-header');
  }

  async fillDetails(firstName, lastName, postalCode) {
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continue() { await this.continueButton.click(); }
  async finish() { await this.finishButton.click(); }

  async expectSuccess() {
    await expect(this.successHeader).toHaveText(/Thank you for your order!/i);
  }
}

module.exports = { CheckoutPage };
