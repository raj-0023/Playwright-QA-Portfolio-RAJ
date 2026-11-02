const { test, expect } = require('./fixtures');

test('[TC06] Product names sort A to Z across the full list', async ({ authenticatedProductsPage }) => {
  const productsPage = authenticatedProductsPage;
  await productsPage.sortBy('az');
  const names = await productsPage.getProductNames();

  expect(names).toEqual([...names].sort((first, second) => first.localeCompare(second)));
});

// Sorts products by name or price, then checks the order and that no products are missing.

test('[TC07] Product names sort Z to A across the full list', async ({ authenticatedProductsPage }) => {
  const productsPage = authenticatedProductsPage;
  await productsPage.sortBy('za');
  const names = await productsPage.getProductNames();

  expect(names).toEqual([...names].sort((first, second) => second.localeCompare(first)));
});

test('[TC08] Prices sort low to high across the full list', async ({ authenticatedProductsPage }) => {
  const productsPage = authenticatedProductsPage;
  await productsPage.sortBy('lohi');
  const prices = await productsPage.getPrices();

  expect(prices.length).toBeGreaterThan(0);
  expect(prices).toEqual([...prices].sort((first, second) => first - second));
});

test('[TC09] Prices sort high to low across the full list', async ({ authenticatedProductsPage }) => {
  const productsPage = authenticatedProductsPage;
  await productsPage.sortBy('hilo');
  const prices = await productsPage.getPrices();

  expect(prices.length).toBeGreaterThan(0);
  expect(prices).toEqual([...prices].sort((first, second) => second - first));
});

test('[TC24] Both price orders include every inventory item and handle ties', async ({ authenticatedProductsPage }) => {
  const productsPage = authenticatedProductsPage;
  const inventoryNames = await productsPage.getProductNames();

  await productsPage.sortBy('lohi');
  const lowToHighPrices = await productsPage.getPrices();
  const lowToHighNames = await productsPage.getProductNames();
  expect(lowToHighNames).toHaveLength(inventoryNames.length);
  expect([...lowToHighNames].sort()).toEqual([...inventoryNames].sort());
  expect(lowToHighPrices.every((price, index) => index === 0 || lowToHighPrices[index - 1] <= price)).toBe(true);

  await productsPage.sortBy('hilo');
  const highToLowPrices = await productsPage.getPrices();
  const highToLowNames = await productsPage.getProductNames();
  expect(highToLowNames).toHaveLength(inventoryNames.length);
  expect([...highToLowNames].sort()).toEqual([...inventoryNames].sort());
  expect(highToLowPrices.every((price, index) => index === 0 || highToLowPrices[index - 1] >= price)).toBe(true);
});