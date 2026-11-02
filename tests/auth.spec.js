const { test, expect } = require('./fixtures');
const { users } = require('../test-data/users');

//Opens the login page, tests successful and failed logins, and checks that logging out blocks access to products.

test('[TC01] Standard user logs in and sees product inventory', async ({ page, loginPage, productsPage }) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  await expect(page).toHaveURL(/inventory\.html/);
  await expect(productsPage.title).toHaveText('Products');
  await expect(productsPage.inventoryItems).toHaveCount(6);
});

test('[TC02] Locked-out user is prevented from logging in', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.lockedOut.username, users.lockedOut.password);

  await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out');
  await expect(page).toHaveURL(/\/$/);
});

test('[TC03] Invalid password is rejected', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, 'incorrect_password');

  await expect(loginPage.errorMessage).toContainText('Username and password do not match');
  await expect(page).toHaveURL(/\/$/);
});

test('[TC04] Empty credentials show required-field feedback', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.loginButton.click();

  await expect(loginPage.errorMessage).toContainText('Username is required');
  await expect(page).toHaveURL(/\/$/);
});

test('[TC05] Products URL is blocked after logout', async ({ page, loginPage, productsPage }) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);
  await expect(page).toHaveURL(/inventory\.html/);

  await productsPage.logout();
  await page.goto('/inventory.html');

  await expect(page).toHaveURL(/\/$/);
  await expect(loginPage.loginButton).toBeVisible();
  await expect(productsPage.title).toHaveCount(0);
});