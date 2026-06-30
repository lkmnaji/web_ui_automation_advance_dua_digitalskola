const { By, until } = require('selenium-webdriver');
const locators = require('../locator/app.locator');

class appPage {
    constructor(driver) {
        this.driver = driver;
    }

    async open() {
        await this.driver.get(locators.url);
    }

    async login(username, password) {
        await this.driver.findElement(By.css(locators.login.inputUsername.value)).sendKeys(username);
        await this.driver.findElement(By.css(locators.login.inputPassword.value)).sendKeys(password);
        await this.driver.findElement(By.css(locators.login.loginButton.value)).click();
    }

    async getErrorMessage() {
        const errorMessageElement = await this.driver.wait(until.elementLocated(By.css(locators.login.errorMessage.value)), 5000);
        return await errorMessageElement.getText();
    }

    async addToCartAndCheckout() {
        await this.driver.findElement(By.css(locators.inventory.addToCartBtn.value)).click();
        await this.driver.findElement(By.css(locators.inventory.cartLink.value)).click();
        await this.driver.findElement(By.css(locators.checkout.checkoutBtn.value)).click();
        
        await this.driver.findElement(By.css(locators.checkout.firstNameInput.value)).sendKeys('Test');
        await this.driver.findElement(By.css(locators.checkout.lastNameInput.value)).sendKeys('User');
        await this.driver.findElement(By.css(locators.checkout.postalCodeInput.value)).sendKeys('12345');
        await this.driver.findElement(By.css(locators.checkout.continueBtn.value)).click();
        await this.driver.findElement(By.css(locators.checkout.finishBtn.value)).click();
    }

    async getCheckoutCompleteMessage() {
        const header = await this.driver.wait(until.elementLocated(By.css(locators.checkout.completeHeader.value)), 5000);
        return await header.getText();
    }
}

module.exports = appPage;