const puppeteer = require('puppeteer');

/// using asyc/await: ///
async function getScreenshotAwaitAsync(urlPath, fileName) {
  let browser;
  try {
    browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(urlPath, {timeout: 0});
    await page.setViewport({width: 1200, height: 740});
    await page.screenshot({ path: `public/assets/${fileName}.png` });

    await browser.close();
    console.log(`'getScreenshot' Process completed. Check public/assets for fileName: ${fileName}.png.`);
  } catch (err) {
    handleError(err, browser, fileName);
  }
}

/// using .then() and .catch() ///
function getScreenshot(urlPath, fileName) {
  let browser, page;
  puppeteer.launch({headless: true})
    .then(brw => {
      browser = brw;
      return browser.newPage();
    })
    .then(pg => {
      page = pg;
      return page.goto(urlPath, {timeout: 0});
    })
    .then(() => {
      return page.setViewport({width: 1200, height: 740});
    })
    .then(() => {
      return page.screenshot({ path: `public/assets/${fileName}.png` });
    })
    .then(() => {
      return browser.close();
    })
    .then(() => {
      console.log(`'getScreenshot' Process completed. Check public/assets for fileName: ${fileName}.png.`);
    })
    .catch(err => handleError(err, browser, fileName));
}

function handleError(err, browser, fileName) {
  console.error(`Error getting fileName: ${fileName}.png`, err);
  try {
    browser.close();
    console.log('Closing browser.');
  } catch (errBrowser) {
    console.error('Cannot close browser.', errBrowser);
  }
}

getScreenshot('https://beta-version-jrleja-design.herokuapp.com', 'home_jrleja_design');
getScreenshotAwaitAsync('https://beta-version-jrleja-design.herokuapp.com/projects', 'projects_jrleja_design');
