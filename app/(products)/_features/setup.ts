import { Builder } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import firefox from "selenium-webdriver/firefox";

const browser = process.env.TEST_BROWSER || "safari";

export const getDriver = () =>
  new Builder()
    .forBrowser(browser)
    .setChromeOptions(new chrome.Options().addArguments("--headless"))
    .setFirefoxOptions(new firefox.Options().addArguments("--headless"))
    .build();
