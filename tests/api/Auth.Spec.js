// tests/api/auth.spec.js
import { test, expect } from '@playwright/test';
import { apiBase } from '../../utils/apiClient.js';

test('Auth: should return a token', async ({ request }) => {
  const res = await request.post(`${apiBase}/auth`, {
    data: { username: 'admin', password: 'password123' }
  });

  expect(res.status()).toBe(200);

  const body = await res.json();
  // Response: { "token": "abc123" }
  expect(body.token).toBeDefined();
  expect(typeof body.token).toBe('string');
});
