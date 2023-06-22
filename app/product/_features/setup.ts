import { AfterAll } from "@cucumber/cucumber";
import { Builder } from "selenium-webdriver";

export const driver = new Builder().forBrowser("safari").build();

AfterAll(async function () {
  await driver.quit();
});
