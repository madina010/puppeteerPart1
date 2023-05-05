const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto('https://habr.com/ru/all/')

    const titles = await page.evaluate(() => {
        const results = [];

        const items = document.querySelectorAll('span.tm-tabs__tab-item');

        items.forEach(item => {
            results.push(item.innerText);
        });

        return results;
    })
    
    const html = `<ul>\n${titles.map(title => ` <li>${title}</li>\n`).join('')}</ul>`;

    fs.writeFile('index.html', html, err => {
        if(err) throw err;
        console.log('Изменения сохранены в файл index.html')
    });

    await browser.close();
})();

async function getPic() {

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto('http://127.0.0.1:5501/index.html');

    await page.screenshot({ path: 'screenshot.png' });

    await browser.close();
}

getPic();