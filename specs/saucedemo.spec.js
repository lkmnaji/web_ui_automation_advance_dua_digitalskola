const { Builder } = require('selenium-webdriver');
const { expect } = require('chai');
const AppPage = require('../page/appPage');
const ScreenshotPage = require('../page/screenshotPage');
const VisualRegressionHelper = require('../utilities/visualHelper');

describe('test automation sauce demo', function () {
    let driver;
    let appPage;
    let screenshot;
    let visualRegression;

    // Persiapan browser sebelum menjalankan tes
    beforeEach(async function () {
        driver = await new Builder().forBrowser('chrome').build();
        appPage = new AppPage(driver);
        screenshot = new ScreenshotPage(driver);
        visualRegression = new VisualRegressionHelper();
        await appPage.open();
    });

    afterEach(async function () {
        await driver.quit();
    });

    it('Positif case : test login masuk, kemudian bisa masuk keranjang dan checkout barang', async function () {
        await appPage.login('standard_user', 'secret_sauce');
        await appPage.addToCartAndCheckout();
        
        const sampelMessage = await appPage.getCheckoutCompleteMessage();
        expect(sampelMessage).to.equal('Thank you for your order!');

        await screenshot.takeFullScreenshot('current/positive_checkout.png');
        const vrResult = await visualRegression.compareImages('positive_checkout.png');
        if (vrResult.hasBaseline) {
            expect(vrResult.match).to.be.true;
        }
    });

    it('Negative case: invalid username', async function () {
        await appPage.login('invalid_user', 'secret_sauce');
        
        const errorMsg = await appPage.getErrorMessage();
        expect(errorMsg).to.include('Username and password do not match');

        await screenshot.takeFullScreenshot('current/negative_invalid_user.png');
        const vrResult = await visualRegression.compareImages('negative_invalid_user.png');
        if (vrResult.hasBaseline) expect(vrResult.match).to.be.true;
    });

    it('Negative: wrong password', async function () {
        await appPage.login('standard_user', 'wrong_password');
        
        const errorMsg = await appPage.getErrorMessage();
        expect(errorMsg).to.include('Username and password do not match');

        await screenshot.takeFullScreenshot('current/negative_wrong_pass.png');
        const vrResult = await visualRegression.compareImages('negative_wrong_pass.png');
        if (vrResult.hasBaseline) expect(vrResult.match).to.be.true;
    });

    it('Negative case : login gagal', async function () {
        await appPage.login('locked_out_user', 'secret_sauce');
        
        const errorMsg = await appPage.getErrorMessage();
        expect(errorMsg).to.include('Sorry, this user has been locked out');

        await screenshot.takeFullScreenshot('current/negative_locked_user.png');
        const vrResult = await visualRegression.compareImages('negative_locked_user.png');
        if (vrResult.hasBaseline) expect(vrResult.match).to.be.true;
    });
});