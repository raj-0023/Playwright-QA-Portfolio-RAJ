const { test, expect } = require('./fixtures');
const { validCheckoutDetails } = require('../test-data/checkout-data');

const productName = 'Sauce Labs Backpack';

//Tests required checkout fields, verifies the price total, and checks completing or cancelling an order.

async function openCheckoutInformation(productsPage, cartPage) {
  await productsPage.addToCart(productName);
  await productsPage.openCart();
  await cartPage.checkout();
}

const missingFieldScenarios = [
  {
    id: 'TC15',
    title: 'first name',
    details: { firstName: '', lastName: validCheckoutDetails.lastName, postalCode: validCheckoutDetails.postalCode },
    message: 'First Name is required'
  },
  {
    id: 'TC16',
    title: 'last name',
    details: { firstName: validCheckoutDetails.firstName, lastName: '', postalCode: validCheckoutDetails.postalCode },
    message: 'Last Name is required'
  },
  {
    id: 'TC17',
    title: 'postal code',
    details: { firstName: validCheckoutDetails.firstName, lastName: validCheckoutDetails.lastName, postalCode: '' },
    message: 'Postal Code is required'
  }
];

for (const scenario of missingFieldScenarios) {
  test(`[${scenario.id}] Checkout rejects a missing ${scenario.title}`, async ({ authenticatedProductsPage, cartPage, checkoutPage, page }) => {
    await openCheckoutInformation(authenticatedProductsPage, cartPage);
    await checkoutPage.fillInformation(scenario.details);
    await checkoutPage.continue();

    await expect(checkoutPage.errorMessage).toContainText(scenario.message);
    await expect(page).toHaveURL(/checkout-step-one\.html/);
  });
}

test('[TC18] Checkout total equals item total plus tax and preserves cart items', async ({ authenticatedProductsPage, cartPage, checkoutPage }) => {
  const cartProductNames = [productName];
  await openCheckoutInformation(authenticatedProductsPage, cartPage);
  await checkoutPage.fillInformation(validCheckoutDetails);
  await checkoutPage.continue();

  const itemTotal = await checkoutPage.getMoneyValue('subtotal-label');
  const tax = await checkoutPage.getMoneyValue('tax-label');
  const total = await checkoutPage.getMoneyValue('total-label');
  expect(Math.round((itemTotal + tax) * 100)).toBe(Math.round(total * 100));
  expect(await checkoutPage.getSummaryItemNames()).toEqual(cartProductNames);
});

test('[TC19] Finishing checkout confirms the order and empties the cart', async ({ authenticatedProductsPage, cartPage, checkoutPage, page }) => {
  await openCheckoutInformation(authenticatedProductsPage, cartPage);
  await checkoutPage.fillInformation(validCheckoutDetails);
  await checkoutPage.continue();
  await checkoutPage.finish();

  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  await checkoutPage.backHomeButton.click();
  await authenticatedProductsPage.openCart();
  await expect(cartPage.cartItems).toHaveCount(0);
  await expect(cartPage.cartBadge).toHaveCount(0);
  await expect(page).not.toHaveURL(/checkout-complete\.html/);
});

test('[TC20] Cancelling checkout returns to products without placing an order', async ({ authenticatedProductsPage, cartPage, checkoutPage, page }) => {
  await openCheckoutInformation(authenticatedProductsPage, cartPage);
  await checkoutPage.fillInformation(validCheckoutDetails);
  await checkoutPage.continue();
  await checkoutPage.cancel();

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(authenticatedProductsPage.cartBadge).toHaveText('1');
  await expect(checkoutPage.completeHeader).toHaveCount(0);
});