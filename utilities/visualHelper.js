const fs = require('fs');
const path = require('path');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

class visualRegressionHelper {
    async compareImages(imageName) {
        const baselinePath = path.join(__dirname, '..', 'screenshots', 'baseline', imageName);
        const currentPath = path.join(__dirname, '..', 'screenshots', 'current', imageName);
        const diffPath = path.join(__dirname, '..', 'screenshots', 'diff', imageName);

        if (!fs.existsSync(baselinePath)) {
            fs.copyFileSync(currentPath, baselinePath);
            return { hasBaseline: false };
        }

        const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
        const current = PNG.sync.read(fs.readFileSync(currentPath));
        const { width, height } = baseline;
        const diff = new PNG({ width, height });

        const diffPixels = pixelmatch(
            baseline.data, current.data, diff.data, width, height, { threshold: 0.1 }
        );

        fs.writeFileSync(diffPath, PNG.sync.write(diff));
        
        return { 
            hasBaseline: true, 
            match: diffPixels === 0, 
            diffPixels 
        };
    }
}

module.exports = visualRegressionHelper;