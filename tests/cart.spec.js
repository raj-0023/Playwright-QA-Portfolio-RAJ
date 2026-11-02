const { test, expect } = require('./fixtures');

const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltTShirt: 'Sauce Labs Bolt T-Shirt'
};

//Adds and removes products, then checks the cart contents and item-count badge.

test('[TC10] Adding one product updates the badge and action state', async ({ authenticatedProductsPage, cartPage }) => {
  await authenticatedProductsPage.addToCart(products.backpack);

  await expect(authenticatedProductsPage.cartBadge).toHaveText('1');
  await expect(authenticatedProductsPage.product(products.backpack).getByRole('button', { name: 'Remove' })).toBeVisible();
  await authenticatedProductsPage.openCart();
  await expect(cartPage.item(products.backpack)).toBeVisible();
});

test('[TC11] Adding two different products shows both in the cart', async ({ authenticatedProductsPage, cartPage }) => {
  await authenticatedProductsPage.addToCart(products.backpack);
  await authenticatedProductsPage.addToCart(products.bikeLight);

  await expect(authenticatedProductsPage.cartBadge).toHaveText('2');
  await authenticatedProductsPage.openCart();
  expect(await cartPage.getItemNames()).toEqual(expect.arrayContaining([products.backpack, products.bikeLight]));
});

test('[TC12] Removing a product from the products page removes it from the cart', async ({ authenticatedProductsPage, cartPage }) => {
  await authenticatedProductsPage.addToCart(products.backpack);
  await authenticatedProductsPage.removeFromCart(products.backpack);

  await expect(authenticatedProductsPage.cartBadge).toHaveCount(0);
  await authenticatedProductsPage.openCart();
  await expect(cartPage.item(products.backpack)).toHaveCount(0);
});

test('[TC13] Removing a product from the cart page updates cart contents and badge', async ({ authenticatedProductsPage, cartPage }) => {
  await authenticatedProductsPage.addToCart(products.backpack);
  await authenticatedProductsPage.openCart();
  await cartPage.remove(products.backpack);

  await expect(cartPage.item(products.backpack)).toHaveCount(0);
  await expect(cartPage.cartBadge).toHaveCount(0);
});

test('[TC14] Cart badge equals visible items after adding three and removing one', async ({ authenticatedProductsPage, cartPage }) => {
  await authenticatedProductsPage.addToCart(products.backpack);
  await authenticatedProductsPage.addToCart(products.bikeLight);
  await authenticatedProductsPage.addToCart(products.boltTShirt);
  await authenticatedProductsPage.removeFromCart(products.bikeLight);
  await authenticatedProductsPage.openCart();

  const itemNames = await cartPage.getItemNames();
  await expect(cartPage.cartBadge).toHaveText(String(itemNames.length));
  expect(itemNames).toEqual(expect.arrayContaining([products.backpack, products.boltTShirt]));
});