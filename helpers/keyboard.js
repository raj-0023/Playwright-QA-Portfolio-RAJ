async function tabUntilFocused(page, locator, maxTabs = 40) {
  for (let tabCount = 0; tabCount < maxTabs; tabCount += 1) {
    await page.keyboard.press('Tab');
    if (await locator.evaluate((element) => element === document.activeElement)) {
      return;
    }
  }

  throw new Error(`Element did not receive keyboard focus within ${maxTabs} Tab presses`);
}

module.exports = { tabUntilFocused };