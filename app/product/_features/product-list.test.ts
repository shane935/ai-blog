// Import necessary modules and constants
import { Given, When, Then } from "@cucumber/cucumber";
import { By } from "selenium-webdriver";
import { expect } from "chai";
import { driver } from "./setup.ts";
import {
  PRODUCT_LIST_SELECTOR,
  PRODUCT_NAME_SELECTOR,
  PRODUCT_VOLUME_SELECTOR,
  PRODUCT_COST_SELECTOR,
  PRODUCT_DETAIL_SELECTOR,
  RIGHT_ARROW_SELECTOR,
  LEFT_ARROW_SELECTOR,
  PRODUCT_SELECTOR,
} from "./constants.ts";

Then(
  "the user is presented with a paginated list of all available products",
  async function () {
    const productList = await driver.findElement(By.css(PRODUCT_LIST_SELECTOR));
    expect(productList).to.exist;
  }
);

Then("each of the products has a name, a volume and a cost", async function () {
  const productNames = await driver.findElements(By.css(PRODUCT_NAME_SELECTOR));
  productNames.forEach((name) => {
    expect(name.getText()).to.not.be.empty;
  });

  const productVolumes = await driver.findElements(
    By.css(PRODUCT_VOLUME_SELECTOR)
  );
  productVolumes.forEach((volume) => {
    expect(volume.getText()).to.not.be.empty;
  });

  const productCosts = await driver.findElements(By.css(PRODUCT_COST_SELECTOR));
  productCosts.forEach((cost) => {
    expect(cost.getText()).to.not.be.empty;
  });
});

When("the user clicks on a product in the list", async function () {
  const product = await driver.findElement(By.css(PRODUCT_SELECTOR));
  await product.click();
});

Then(
  "they are redirected to the details page for that product",
  async function () {
    const productDetail = await driver.findElement(
      By.css(PRODUCT_DETAIL_SELECTOR)
    );
    expect(productDetail).to.exist;
  }
);

Given("the user is on the first page of the product list", function () {
  // Assumed as part of the test setup
});

Then("the right pagination arrow is visible", async function () {
  const rightArrow = await driver.findElement(By.css(RIGHT_ARROW_SELECTOR));
  expect(rightArrow.isDisplayed()).to.be.true;
});

Given("the user is on the second page of the product list", function () {
  // Needs implementation. You would need to navigate to the second page here.
});

Then("the left pagination arrow is visible", async function () {
  const leftArrow = await driver.findElement(By.css(LEFT_ARROW_SELECTOR));
  expect(leftArrow.isDisplayed()).to.be.true;
});

Given("the user is on page {int} of the product list", function (page: number) {
  // Needs implementation. You would need to navigate to the corresponding page here.
});

When(
  "the user clicks the {string} pagination arrow",
  async function (arrow: string) {
    const arrowSelector =
      arrow === "left" ? LEFT_ARROW_SELECTOR : RIGHT_ARROW_SELECTOR;
    const arrowElement = await driver.findElement(By.css(arrowSelector));
    await arrowElement.click();
  }
);

Then(
  "the user is moved to page {int} of the product list",
  async function (expectedPage: number) {
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).to.include(expectedPage.toString());
  }
);