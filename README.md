# Capitec Automation Assessment – Naledi Mantshiu

## Project Overview
Automated tests using **Playwright** for:
- **UI**: SauceDemo (Authentication, Inventory, Cart, Checkout)
- **API**: Restful-Booker (Auth + Booking CRUD including **DELETE**)

## Prerequisites
- Node.js LTS (18+ recommended)
- npm
- Playwright

## Install & Run
```bash
npm install
npx playwright install

# run all tests
npx playwright test

# run a single test (example)
npx playwright test "tests/ui/auth.spec.js"

# open HTML report
npx playwright show-report
