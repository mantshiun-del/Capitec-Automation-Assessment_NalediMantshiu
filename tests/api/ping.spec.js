// tests/api/ping.spec.js
import { test, expect } from '@playwright/test';
import { apiBase } from '../../utils/apiClient.js';

test('Ping: server should be up', async ({ request }) => {
  const res = await request.get(`${apiBase}/ping`);
  // Docs show 201 Created is typical for ping; accept 200/201
  expect([200, 201]).toContain(res.status());
  const bodyText = await res.text();
  // Often returns just 'Created' or empty; we just assert status.
  expect([undefined, '', 'Created']).toContain(bodyText?.trim());
});
