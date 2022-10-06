import puppeteer from 'puppeteer';

describe('show/hide an event detail', () => {
    let browser;
    let page;
    beforeAll(async () => {
        jest.setTimeout(30000);
        browser = await puppeteer.launch({ // Launches the browser
            headless: false,
            slowMo: 250,
            ignoreDefaultArgs: ['--disable-extensions'] // ignores default setting that causes timeout errors
        }); 
        page = await browser.newPage(); // opens a new tap
        await page.goto('http://localhost:3000/');// navigates to the link
        await page.waitForSelector('.event');
    })

    afterAll(() => {
        browser.close();
    })

    test('An event is collapsed by default', async() => {
        const eventDetails = await page.$('.event .event__Details');
        expect(eventDetails).toBeNull(); // the toBeNull() matcher is used to ensure the extra details element no longer exists.
    });

    test('User can expand an event to see its details', async () => {
        await page.click('.event .details-btn');
        const eventDetails =await page.$('.event .event__Details');
        expect(eventDetails).toBeDefined();
    })

    test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeNull(); // the toBeNull() matcher is used to ensure the extra details element no longer exists.
  });
})
