
// tests/api/booking.spec.js
import { test, expect } from '@playwright/test';
import { apiBase, defaultBooking, uniqueBooking } from '../../utils/apiClient.js';

// Helper to fetch auth token
async function getToken(request) {
  const res = await request.post(`${apiBase}/auth`, {
    data: { username: 'admin', password: 'password123' }
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  return body.token;
}

test.describe('Booking CRUD', () => {

  test('Create → Get → PUT → PATCH → DELETE → Verify 404', async ({ request }) => {
    // --- CREATE ---
    const createRes = await request.post(`${apiBase}/booking`, {
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      data: uniqueBooking() // or defaultBooking()
    });
    expect(createRes.status()).toBe(200);
    const created = await createRes.json();
    // Response shape: { bookingid: number, booking: {...} }
    expect(created.bookingid).toBeDefined();
    const bookingId = created.bookingid;

    // --- GET ---
    const getRes = await request.get(`${apiBase}/booking/${bookingId}`, {
      headers: { 'Accept': 'application/json' }
    });
    expect(getRes.status()).toBe(200);
    const booking = await getRes.json();

    // Basic schema validation based on docs
    expect(booking).toMatchObject({
      firstname: expect.any(String),
      lastname: expect.any(String),
      totalprice: expect.any(Number),
      depositpaid: expect.any(Boolean),
      bookingdates: {
        checkin: expect.any(String),
        checkout: expect.any(String),
      }
      // additionalneeds may or may not be present
    });

    // --- PUT (full update) ---
    const token = await getToken(request);
    const putRes = await request.put(`${apiBase}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      },
      data: {
        firstname: 'James',
        lastname: 'Brown',
        totalprice: 222,
        depositpaid: false,
        bookingdates: { checkin: '2024-03-01', checkout: '2024-03-05' },
        additionalneeds: 'Dinner'
      }
    });
    expect(putRes.status()).toBe(200);
    const putBody = await putRes.json();
    expect(putBody.firstname).toBe('James');
    expect(putBody.lastname).toBe('Brown');
    expect(putBody.totalprice).toBe(222);
    expect(putBody.depositpaid).toBe(false);

    // --- PATCH (partial update) ---
    const patchRes = await request.patch(`${apiBase}/booking/${bookingId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cookie': `token=${token}`
      },
      data: { firstname: 'Naledi', additionalneeds: 'Breakfast & Lunch' }
    });
    expect(patchRes.status()).toBe(200);
    const patchBody = await patchRes.json();
    expect(patchBody.firstname).toBe('Naledi');
    expect(patchBody.additionalneeds).toBe('Breakfast & Lunch');

    // --- DELETE ---
    const deleteRes = await request.delete(`${apiBase}/booking/${bookingId}`, {
      headers: {
        // Auth via Cookie header per docs
        'Cookie': `token=${token}`,
        'Accept': 'application/json'
      }
    });
    // Docs show 201 Created as default success; accept common success codes
    expect([200, 201, 204]).toContain(deleteRes.status());

    // --- Verify deletion: GET should now be 404 ---
    const verifyRes = await request.get(`${apiBase}/booking/${bookingId}`);
    expect(verifyRes.status()).toBe(404);
  });

});
