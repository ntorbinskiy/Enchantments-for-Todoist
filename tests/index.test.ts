import puppeteer, { Browser, Page } from "puppeteer";
import path from "path";

const pathToExtension = path.join(process.cwd(), "dist");

let browser: undefined | Browser;
let page: undefined | Page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
    ],
  });

  page = await browser.newPage();

  await page.goto("https://app.todoist.com/auth/login");
});

afterAll(async () => {
  if (!browser) {
    return;
  }

  await browser.close();
  browser = undefined;
});

const todoistOpeningTest = async (): Promise<void> => {
  if (!browser || !page) {
    throw new Error("Error, browser or page are undefined");
  }

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
};

test("Todoist opening", async () => {
  todoistOpeningTest();

  if (!browser || !page) {
    throw new Error("Error, browser or page are undefined");
  }

  await page.waitForSelector(".simple_content");

  const url = await page.url();

  expect(url).toContain("/today");
}, 15000);
