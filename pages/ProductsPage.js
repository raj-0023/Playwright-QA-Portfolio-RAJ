class ProductsPage {
  constructor(page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.sortSelect = page.getByTestId('product-sort-container');
    this.inventoryItems = page.getByTestId('inventory-item');
    this.productNames = page.getByTestId('inventory-item-name');
    this.productPrices = page.getByTestId('inventory-item-price');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.cartLink = page.getByTestId('shopping-cart-link');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
  }

  product(name) {
    return this.inventoryItems.filter({
      has: this.page.getByTestId('inventory-item-name').getByText(name, { exact: true })
    });
  }

  async sortBy(value) {
    await this.sortSelect.selectOption(value);
  }

  async addToCart(name) {
    await this.product(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCart(name) {
    await this.product(name).getByRole('button', { name: 'Remove' }).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }

  async getProductNames() {
    return this.productNames.allTextContents();
  }

  async getPrices() {
    const textValues = await this.productPrices.allTextContents();
    return textValues.map((value) => Number(value.replace('$', '')));
  }
}

module.exports = { ProductsPage };