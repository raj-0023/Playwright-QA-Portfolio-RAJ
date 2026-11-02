class CheckoutPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('firstName');
    this.lastNameInput = page.getByTestId('lastName');
    this.postalCodeInput = page.getByTestId('postalCode');
    this.errorMessage = page.getByTestId('error');
    this.continueButton = page.getByTestId('continue');
    this.cancelButton = page.getByTestId('cancel');
    this.finishButton = page.getByTestId('finish');
    this.summaryItems = page.getByTestId('inventory-item');
    this.summaryNames = page.getByTestId('inventory-item-name');
    this.completeHeader = page.getByTestId('complete-header');
    this.backHomeButton = page.getByTestId('back-to-products');
  }

  async fillInformation(details) {
    await this.firstNameInput.fill(details.firstName);
    await this.lastNameInput.fill(details.lastName);
    await this.postalCodeInput.fill(details.postalCode);
  }

  async continue() {
    await this.continueButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async finish() {
    await this.finishButton.click();
  }

  async getSummaryItemNames() {
    return this.summaryNames.allTextContents();
  }

  async getMoneyValue(testId) {
    const label = await this.page.getByTestId(testId).innerText();
    const match = label.match(/\$([\d.]+)/);
    if (!match) {
      throw new Error(`Could not read a price from checkout label: ${label}`);
    }
    return Number(match[1]);
  }
}

module.exports = { CheckoutPage };