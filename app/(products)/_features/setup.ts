import { Builder } from "selenium-webdriver";

const browser = process.env.TEST_BROWSER || "safari";

export const getDriver = () => new Builder().forBrowser(browser).build();
