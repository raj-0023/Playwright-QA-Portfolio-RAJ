const { test, expect } = require('./fixtures');
const { users } = require('../test-data/users');
const { tabUntilFocused } = require('../helpers/keyboard');

//Checks that key shopping controls work on a small screen and can be used with the keyboard.

test('[TC22] Core product and checkout controls remain usable at 375px', async ({ page, loginPage, productsPage, cartPage }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(productsPage.sortSelect).toBeVisible();
  await expect(productsPage.product('Sauce Labs Backpack').getByRole('button', { name: 'Add to cart' })).toBeVisible();
  await productsPage.addToCart('Sauce Labs Backpack');
  await productsPage.openCart();
  await expect(cartPage.checkoutButton).toBeVisible();
  await cartPage.checkout();
  await expect(page.getByTestId('firstName')).toBeVisible();
});

test('[TC23] Keyboard can submit login and operate sort and add-to-cart controls', async ({ page, loginPage, productsPage }) => {
  await loginPage.goto();
  await tabUntilFocused(page, loginPage.usernameInput);
  await page.keyboard.type(users.standard.username);
  await page.keyboard.press('Tab');
  await page.keyboard.type(users.standard.password);
  await page.keyboard.press('Tab');
  await expect(loginPage.loginButton).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/inventory\.html/);

  await tabUntilFocused(page, productsPage.sortSelect);
  await expect(productsPage.sortSelect).toBeFocused();
  await tabUntilFocused(page, productsPage.product('Sauce Labs Backpack').getByRole('button', { name: 'Add to cart' }));
  await page.keyboard.press('Enter');

  await expect(productsPage.cartBadge).toHaveText('1');
});