# Capitec Automation Assessment

## 📌 Overview
This project contains automated UI and API tests for the Capitec assessment using [Playwright](https://playwright.dev/).  
It validates critical workflows on [SauceDemo](https://www.saucedemo.com) and API endpoints for booking services.

---

## ✅ Tech Stack
- **Playwright** v1.57.0
- **Node.js** v18
- **Monocart Reporter** for advanced reporting
- **GitHub Actions** for CI/CD

---

## 🚀 Setup and Execution Instructions

### ✅ Prerequisites
- Node.js v18+
- Git installed
- Access to this repository

### ✅ Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/mantshiun-del/Capitec-Automation-Assessment_NalediMantshiu.git
   cd Capitec-Automation-Assessment_NalediMantshiu
   ```
2. Install dependencies:
   ```bash
   npm ci
   ```
3. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

### ✅ Run All Tests
```bash
npx playwright test --project=chromium --workers=2 --reporter=list,html,monocart-reporter
```

### ✅ View Reports
- **Playwright HTML Report**:
  ```bash
  npx playwright show-report
  ```
- **Monocart Report**:
  ```bash
  npx monocart show-report monocart-report/index.html
  ```

---

## 🧪 Test Structure
- `tests/ui` → UI tests for SauceDemo
- `tests/api` → API tests for booking service
- `tests/utils` → Utility tests and data validation

---

## 🔄 CI/CD Workflow
- Runs on **GitHub Actions** using Ubuntu runners
- Installs browsers with `npx playwright install --with-deps`
- Uploads HTML and Monocart reports as artifacts

---

## ✅ Test Execution Evidence
Latest run summary:
```
Tests: 18
Passed: 18 (100%)
Failed: 0
Duration: ~18.6s
```
Reports are available in:
- `monocart-report/index.html`
- `playwright-report/index.html`

---

## 👤 Author
Naledi Mantshiu – Test Engineer  
Capitec Automation Assessment
