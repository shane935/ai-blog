import { Given, When, Then } from "@cucumber/cucumber";
import { Builder, By, until, WebDriver } from "selenium-webdriver";
import { expect } from "@jest/globals";
import {
  URL,
  PRODUCT_LIST_PAGE,
  PRODUCT_SELECTOR,
  PRODUCT_DETAIL_SELECTOR,
  RIGHT_ARROW_SELECTOR,
  LEFT_ARROW_SELECTOR,
} from "./constants";

let driver: WebDriver;

Given('the user navigates to "{string}"', async function () {
  driver = await new Builder().forBrowser("chrome").build();
  await driver.get(URL + PRODUCT_LIST_PAGE);
});

When("the user clicks on a product in the list", async function () {
  await driver.findElement(By.css(PRODUCT_SELECTOR)).click();
});

Then(
  "they are redirected to the details page for that product",
  async function () {
    let productDetail = await driver.wait(
      until.elementLocated(By.css(PRODUCT_DETAIL_SELECTOR)),
      10000
    );
    let isProductDetailDisplayed = await productDetail.isDisplayed();
    expect(isProductDetailDisplayed).toBeTruthy();
  }
);

Then("each of the products has a name, a volume and a cost", async function () {
  const productElements = await driver.findElements(By.className("product"));

  for (let productElement of productElements) {
    const nameElement = await productElement.findElement(By.className("name"));
    const volumeElement = await productElement.findElement(
      By.className("volume")
    );
    const costElement = await productElement.findElement(By.className("cost"));

    const name = await nameElement.getText();
    const volume = await volumeElement.getText();
    const cost = await costElement.getText();

    expect(name).not.toBe("");
    expect(volume).not.toBe("");
    expect(cost).not.toBe("");
  }
});

Then("the right pagination arrow is visible", async function () {
  let rightArrow = await driver.wait(
    until.elementLocated(By.css(RIGHT_ARROW_SELECTOR)),
    10000
  );
  let isRightArrowDisplayed = await rightArrow.isDisplayed();
  expect(isRightArrowDisplayed).toBeTruthy();
});

Then("the left pagination arrow is visible", async function () {
  let leftArrow = await driver.wait(
    until.elementLocated(By.css(LEFT_ARROW_SELECTOR)),
    10000
  );
  let isLeftArrowDisplayed = await leftArrow.isDisplayed();
  expect(isLeftArrowDisplayed).toBeTruthy();
});

When(
  "the user clicks the {string} pagination arrow",
  async function (arrow: string) {
    let arrowSelector =
      arrow === "left" ? LEFT_ARROW_SELECTOR : RIGHT_ARROW_SELECTOR;
    await driver.findElement(By.css(arrowSelector)).click();
  }
);

Then(
  "the user is moved to page {int} of the product list",
  async function (page: number) {
    let expectedUrl = `${URL}${PRODUCT_LIST_PAGE}/${page}`;
    await driver.wait(until.urlIs(expectedUrl), 10000);
    expect(await driver.getCurrentUrl()).toBe(expectedUrl);
  }
);
