const playwright = require('playwright');
const path = require('path');
const fs = require('fs');
const { COPYFILE_EXCL } = fs.constants;

(async () => {

    const args = process.argv.slice(2);
    if (args.length == 0) {
        console.log("Please provide an argument.");
        return;
    }

    let fileName = args[0];

    for (const type of ['chromium', 'webkit', 'firefox']) {
        const browser = await playwright[type].launch();
        const context = await browser.newContext();
        const page = await context.newPage();

        try {
            await page.goto(`file:${path.join(__dirname, `${fileName}`)}`);
        } catch (error) {
            console.log(error);
            console.log(`${fileName} crashed!`);
            fs.copyFile(fileName, '../crash/crash_' + fileName, COPYFILE_EXCL, (err) => {
                if (err) throw err;
                console.log("Copying file succeed.");
            })
        }

        await browser.close();
    }
})();
