const puppeteer = require('puppeteer');

/// using asyc/await: ///
async function getProjectInfoAwaitAsync(urlPath) {
  let browser;
  try {
    browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto(urlPath, {timeout: 0});
    await page.click('#app > div > div > div.main-navbar-styling > div.main-nav-buttons > div.nav-menu > a');
    await page.click('#app > div > div > div.dropdown-main-menu.greenBackground > ul > li:nth-child(4) > a');

    const data = await page.evaluate(() => {
      const descriptions = [...document.querySelectorAll('ul.description-column > li:first-child')];
      const links = [...document.querySelectorAll('a.a-td-button[aria-label="GitHub Project Link"]')];

      return descriptions.map((el, i) => {
        const projectDescription = el.innerText;
        const githubLink = links[i].href;

        return {
          projectDescription,
          githubLink
        };
      });
    });

    await browser.close();
    console.log('"getProjectInfo" Process completed. Data below:');
    console.log(data);

  } catch (err) {
    handleError(err, browser);
  }
}

/// using .then() and .catch() ///
const getProjectInfo = urlPath => {
  let browser, page, data;
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
      return page.click('#app > div > div > div.main-navbar-styling > div.main-nav-buttons > div.nav-menu > a');
    })
    .then(() => {
      return page.click('#app > div > div > div.dropdown-main-menu.greenBackground > ul > li:nth-child(4) > a');
    })
    .then(() => {
      return page.evaluate(() => {
        const descriptions = [...document.querySelectorAll('ul.description-column > li:first-child')];
        const links = [...document.querySelectorAll('a.a-td-button[aria-label="GitHub Project Link"]')];

        return descriptions.map((el, i) => {
          const projectDescription = el.innerText;
          const githubLink = links[i].href;

          return {
            projectDescription,
            githubLink
          };
        });
      });
    })
    .then(dt => {
      data = dt;
    })
    .then(() => {
      return browser.close();
    })
    .then(() => {
      console.log('"getProjectInfo" Process completed. Data below:');
      console.log(data);
    })
    .catch(err => handleError(err, browser));
};

function handleError(err, browser) {
  console.error('Error getting project info:', err);
  try {
    browser.close();
    console.log('Closing browser.');
  } catch (errBrowser) {
    console.error('Cannot close browser.', errBrowser);
  }
}

// getProjectInfo('https://beta-version-jrleja-design.herokuapp.com');
getProjectInfoAwaitAsync('https://beta-version-jrleja-design.herokuapp.com');
