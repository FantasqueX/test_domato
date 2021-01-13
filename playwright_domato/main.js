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
            await page.goto(`file:${path.join(__dirname, `../template/${fileName}`)}`);
        } catch (error) {
            console.log(error);
            console.log(error.name);
            if (error.name === "TimeoutError") {
                console.log(`${type}: ${fileName} timeout!`);
                fs.copyFile(path.join(__dirname, `../template/${fileName}`), '../timeout/hang_' + fileName, COPYFILE_EXCL, (err) => {
                    if (err) throw err;
                    console.log("Copying file succeed.");
                })
            }
            else {
                console.log(`${type}: ${fileName} crashed!`);
                fs.copyFile(path.join(__dirname, `../template/${fileName}`), '../crash/crash_' + fileName, COPYFILE_EXCL, (err) => {
                    if (err) throw err;
                    console.log("Copying file succeed.");
                })
            }
        }

        await browser.close();
    }
})();
