import { test, expect } from '@playwright/test';

const BASE = 'https://restful-booker.herokuapp.com';

test.describe('Restful-Booker CRUD', () => {

  test('Auth → Create → Get → Update → Patch → Delete', async ({ request }) => {
    // 1) Auth (token)
    const authRes = await request.post(`${BASE}/auth`, {
      data: { username: 'admin', password: 'password123' },
      headers: { 'Content-Type': 'application/json' }
    });
    expect(authRes.ok()).toBeTruthy();
    const { token } = await authRes.json();
    expect(token).toBeTruthy(); // token string returned
    // token is used as Cookie: token=<value> on protected operations
    // (PUT / PATCH / DELETE) per Restful Booker docs
    const authHeaders = { Cookie: `token=${token}`, 'Content-Type': 'application/json' };

    // 2) Create booking (POST)
    const createRes = await request.post(`${BASE}/booking`, {
      data: {
        firstname: 'Naledi',
        lastname: 'Mantshiu',
        totalprice: 111,
        depositpaid: true,
        bookingdates: { checkin: '2024-02-23', checkout: '2024-10-23' },
        additionalneeds: 'Breakfast'
      },
      headers: { 'Content-Type': 'application/json' }
    });
    expect(createRes.status()).toBe(200);
    const createBody = await createRes.json();
    const bookingId = createBody.bookingid;
    expect(bookingId).toBeGreaterThan(0);

    // 3) Get booking (GET)
    const getRes = await request.get(`${BASE}/booking/${bookingId}`, {
      headers: { Accept: 'application/json' }
    });
    expect(getRes.ok()).toBeTruthy();
    const booking = await getRes.json();
    expect(booking.firstname).toBe('Naledi');

    // 4) Update booking (PUT — protected)
    const putRes = await request.put(`${BASE}/booking/${bookingId}`, {
      headers: authHeaders,
      data: {
        firstname: 'Naledi',
        lastname: 'Mantshiu',
        totalprice: 150,
        depositpaid: true,
        bookingdates: { checkin: '2024-02-23', checkout: '2024-10-23' },
        additionalneeds: 'Breakfast'
      }
    });
    expect(putRes.ok()).toBeTruthy();
    const putBody = await putRes.json();
    expect(putBody.totalprice).toBe(150);

    // 5) Partial update (PATCH — protected)
    const patchRes = await request.patch(`${BASE}/booking/${bookingId}`, {
      headers: authHeaders,
      data: { additionalneeds: 'Lunch' }
    });
    expect(patchRes.ok()).toBeTruthy();
    const patchBody = await patchRes.json();
    expect(patchBody.additionalneeds).toBe('Lunch');

    // 6) Delete booking (DELETE — protected)
    const delRes = await request.delete(`${BASE}/booking/${bookingId}`, {
      headers: authHeaders
    });
    expect([201, 200, 204]).toContain(delRes.status()); // DELETE can vary

    // 7) Verify deletion (GET should 404)
    const verifyRes = await request.get(`${BASE}/booking/${bookingId}`);
    expect([404, 410]).toContain(verifyRes.status());
  });

});
