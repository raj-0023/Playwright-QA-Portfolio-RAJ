class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.getByTestId('inventory-item');
    this.itemNames = page.getByTestId('inventory-item-name');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.checkoutButton = page.getByTestId('checkout');
    this.continueShoppingButton = page.getByTestId('continue-shopping');
  }

  item(name) {
    return this.cartItems.filter({
      has: this.page.getByTestId('inventory-item-name').getByText(name, { exact: true })
    });
  }

  async remove(name) {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async getItemNames() {
    return this.itemNames.allTextContents();
  }
}

module.exports = { CartPage };