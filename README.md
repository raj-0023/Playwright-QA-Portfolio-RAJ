# Harvee QA Automation

The automation code written inside This code base Is exactly done As per the requirement Under the website Sauce Demo. Find All the 5 test Files Prepared For this particular website.

## Requirements

- Node.js 18 or newer and npm
- Google Chrome installed by Playwright, or a supported Playwright browser
- Network access to `https://www.saucedemo.com/`

## Install and run

From this project folder in PowerShell:

```powershell
npm install
npm run install:browsers
npm test
```

The default browser channel is Google Chrome to align with the defect report environment. To use Playwright's bundled Chromium instead, first run `npx playwright install chromium`, then run `$env:PLAYWRIGHT_CHANNEL='chromium'; npm test` in PowerShell. A test failure creates trace/screenshot artifacts under `test-results/`; view the HTML report with `npm run report`.

1. TO RUN ALL THE TEST TOGETHER FOR CONFIRMATION RUN >> npx playwright test
2. TO RUN auth.spec.js >> npx playwright test tests/auth.spec.js
3. TO RUN cart.spec.js >> npx playwright test tests/cart.spec.js
4. TO RUN checkout.spec.js >> npx playwright test tests/checkout.spec.js
5. TO RUN journey.spec.js >> npx playwright test tests/journey.spec.js
6. TO RUN sorting.spec.js >> npx playwright test tests/sorting.spec.js

NOTE : To run the test in a particular browser suppose chrome USE >> project=chromium.

NOTE : To run the test in headed mode USE >> --headed

## Traceability and coverage

Test titles include their A1 IDs. Automated coverage includes `TC01`-`TC20`, plus automated portions of `TC22` and `TC23`, and full-list price-order checks for `TC24`. `TC21` is intentionally not automated because the manual suite marks it as human-judgment focused; `TC25` remains exploratory which is reported in the defect PDF. The low-to-high defect scenario is asserted across every displayed numeric price in `TC08` and checked again for full-list integrity in `TC24`.

ALSO added seperae document for REPORTED BUG.

## Code map

- `pages/`: page objects encapsulate locators and user actions.
- `tests/`: test specifications and assertions, with IDs matching the manual cases.
- `tests/fixtures.js`: creates page objects and a reusable signed-in product-page fixture.
- `test-data/`: public Sauce Demo account and checkout data.
- `helpers/`: reusable keyboard navigation helper.
- `playwright.config.js`: base URL, Chrome channel, timeouts, reporters, and failure artifacts.


## Verification

Verified, tests passed on the current public Sauce Demo site using Google Chrome. `TC08` passed, so the low-to-high sorting defect was not reproduced in this run. I genuinly want to discuss this Low-to-high Problem faced while testing.