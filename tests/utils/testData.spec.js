import { test, expect } from '@playwright/test';
import testData from './testData.js';

test('testData shape and sample values', async () => {
  // users
  expect(testData.users.standard.username).toBe('standard_user');
  expect(testData.users.standard.password).toBe('secret_sauce');

  // checkout
  expect(testData.checkout.firstName).toBe('Naledi');
  expect(testData.checkout.postalCode).toBe('2196');
});
