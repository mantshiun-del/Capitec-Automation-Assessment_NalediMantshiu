const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/LoginPage.js');

test.describe('Authentication - multiple users', () => {

  test('standard_user can log in', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('locked_out_user shows error', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
    await expect(login.errorBanner).toContainText('Sorry, this user has been locked out');
  });

  test('problem_user logs in', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('problem_user', 'secret_sauce');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('performance_glitch_user logs in', async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('performance_glitch_user', 'secret_sauce');
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

});
