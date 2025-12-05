import { test, expect } from '@playwright/test';

test('Site loads and shows Login button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});
