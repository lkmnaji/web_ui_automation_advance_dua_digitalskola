const fs = require('fs');
const path = require('path');

class screenshotPage {
    constructor(driver) {
        this.driver = driver;
    }

    async takeFullScreenshot(filename) {
        const screenshotPath = path.join(__dirname, '..', 'screenshots', filename);
        const screenshot = await this.driver.takeScreenshot();
        fs.writeFileSync(screenshotPath, screenshot, 'base64');
        return screenshotPath;
    }
}

module.exports = screenshotPage;