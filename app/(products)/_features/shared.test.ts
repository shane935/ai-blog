import "dotenv/config";
import { After, Before, Given } from "@cucumber/cucumber";
import { getDriver } from "./setup";
import { PRODUCT_LIST_PAGE, URL } from "./constants";
import { WebDriver } from "selenium-webdriver";
import { waitForURL } from "./helpers";

export let driver: WebDriver;

Before(async () => {
  driver = await getDriver();
});

After(async () => {
  await driver.quit();
});

Given(
  "the user is on page {int} of the product list",
  async function (page: number) {
    const pageUrl = `${URL}/${PRODUCT_LIST_PAGE}/${page}`;
    await driver.get(pageUrl);

    await waitForURL(pageUrl, driver);
  }
);
