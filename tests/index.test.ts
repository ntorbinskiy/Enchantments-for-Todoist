import puppeteer, { Browser } from "puppeteer";
import path from "path";

const pathToExtension = path.join(process.cwd(), "dist");

let browser: undefined | Browser = undefined;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
  });
});

// afterEach(async () => {
//   if (!browser) {
//     return;
//   }

//   await browser.close();
//   browser = undefined;
// });

describe("Todoist health report:", async () => {
  if (!browser) {
    return;
  }

  const page = await browser.newPage();

  await page.goto("https://app.todoist.com/auth/login");

  test("Todoist opening", async () => {
    await page.waitForSelector("input");

    const emailInput = await page.$("input[type='email']");
    const passwordInput = await page.$("[type='password']");
    const acceptButton = await page.$("[data-gtm-id='start-email-login']");

    if (!emailInput || !passwordInput || !acceptButton) {
      throw new Error("Error");
    }

    await emailInput.type("n.torbinskiy@icloud.com");
    await passwordInput.type("NikPetrovich11");
    await acceptButton.click();
    await page.waitForSelector(".simple_content");

    const url = await page.url();

    expect(url).toContain("/today");
  }, 15000);

  test("Unknown estimates", async () => {});
});
