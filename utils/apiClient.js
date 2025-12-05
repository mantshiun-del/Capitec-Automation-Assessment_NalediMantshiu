// utils/apiClient.js
export const apiBase = 'https://restful-booker.herokuapp.com';

/**
 * Default booking data (matches the API docs)
 * We keep test data in one place to demonstrate data management.
 */
export const defaultBooking = () => ({
  firstname: 'John',
  lastname: 'Doe',
  totalprice: 123,
  depositpaid: true,
  bookingdates: {
    checkin: '2024-01-01',
    checkout: '2024-01-05'
  },
  additionalneeds: 'Breakfast'
});

/**
 * Optional: generate slightly unique data per run
 * (avoids clashes and is a good habit in automation)
 */
export const uniqueBooking = () => {
  const ts = Date.now();
  return {
    firstname: `Naledi-${ts}`,
    lastname: 'Mantshiu',
    totalprice: Math.floor(Math.random() * 300) + 50,
    depositpaid: true,
    bookingdates: {
      checkin: '2024-02-01',
      checkout: '2024-02-05'
    },
    additionalneeds: 'Lunch'
  };
};
