// Import necessary modules and constants
import { When, Then } from "@cucumber/cucumber";
import { By, until } from "selenium-webdriver";
import chai, { expect } from "chai";
import chaiAsPromised from "chai-as-promised";
import { driver } from "./shared.test";
import {
  URL,
  PRODUCT_LIST_SELECTOR,
  PRODUCT_NAME_SELECTOR,
  PRODUCT_VOLUME_SELECTOR,
  PRODUCT_COST_SELECTOR,
  PRODUCT_DETAIL_SELECTOR,
  RIGHT_ARROW_SELECTOR,
  LEFT_ARROW_SELECTOR,
  PRODUCT_SELECTOR,
  PRODUCT_LIST_PAGE,
} from "./constants";
import { waitForURL } from "./helpers";

chai.use(chaiAsPromised);

Then(
  "the user is presented with a paginated list of all available products",
  async function () {
    const productList = await driver.findElement(By.css(PRODUCT_LIST_SELECTOR));
    expect(productList, "Product list should exist").to.exist;
  }
);

Then("there are no more then 20 products on the page", async function () {
  const productElements = await driver.findElements(By.css(PRODUCT_SELECTOR));
  expect(
    productElements.length,
    "There should not be more than 20 products on the page"
  ).to.be.at.most(20);
});

Then("each of the products has a name, a volume and a cost", async function () {
  const productNames = await driver.findElements(By.css(PRODUCT_NAME_SELECTOR));
  const productVolumes = await driver.findElements(
    By.css(PRODUCT_VOLUME_SELECTOR)
  );
  const productCosts = await driver.findElements(By.css(PRODUCT_COST_SELECTOR));

  const names = await Promise.all(
    productNames.map(async (name) => name.getText())
  );
  const volumes = await Promise.all(
    productVolumes.map(async (volume) => volume.getText())
  );
  const costs = await Promise.all(
    productCosts.map(async (cost) => cost.getText())
  );

  const allNamesNotEmpty =
    names.every((nameText) => nameText !== "") && names.length > 0;
  const allVolumesNotEmpty =
    volumes.every((volumeText) => volumeText !== "") && volumes.length > 0;
  const allCostsNotEmpty =
    costs.every((costText) => costText !== "") && costs.length > 0;

  expect(allNamesNotEmpty, "Not all products have a name").to.be.true;
  expect(allVolumesNotEmpty, "Not all products have a volume").to.be.true;
  expect(allCostsNotEmpty, "Not all products have a cost").to.be.true;
});

When("the user clicks on a product in the list", async function () {
  const product = await driver.findElement(By.css(PRODUCT_SELECTOR));
  await product.click();
});

Then(
  "they are redirected to the details page for that product",
  async function () {
    const productDetail = await driver.wait(
      until.elementLocated(By.css(PRODUCT_DETAIL_SELECTOR)),
      3000
    );
    expect(
      productDetail,
      "User should be redirected to the product details page"
    ).to.exist;
  }
);

Then("the right pagination arrow is visible", async function () {
  const rightArrow = await driver.wait(
    until.elementLocated(By.css(RIGHT_ARROW_SELECTOR)),
    3000
  );
  expect(
    await rightArrow.isDisplayed(),
    "Right pagination arrow should be visible"
  ).to.be.true;
});

Then("the left pagination arrow is visible", async function () {
  const leftArrow = await driver.wait(
    until.elementLocated(By.css(LEFT_ARROW_SELECTOR)),
    3000
  );
  expect(
    await leftArrow.isDisplayed(),
    "Left pagination arrow should be visible"
  ).to.be.true;
});

When(
  "the user clicks the {word} pagination arrow",
  async function (arrow: string) {
    const arrowSelector =
      arrow === "left" ? LEFT_ARROW_SELECTOR : RIGHT_ARROW_SELECTOR;
    const arrowElement = await driver.findElement(By.css(arrowSelector));
    return await arrowElement.click();
  }
);

Then(
  "the user is moved to page {int} of the product list",
  async function (expectedPage: number) {
    await waitForURL(`${URL}/${PRODUCT_LIST_PAGE}/${expectedPage}`, driver);
    const currentUrl = await driver.getCurrentUrl();
    expect(
      currentUrl,
      `User should be moved to page ${expectedPage} of the product list`
    ).to.include(expectedPage.toString());
  }
);

Then(
  "the {word} pagination arrow is not visible",
  async function (arrow: "left" | "right") {
    const ARROW_SELECTOR =
      arrow === "left" ? LEFT_ARROW_SELECTOR : RIGHT_ARROW_SELECTOR;

    const arrowGetter = driver.wait(
      driver.findElement(By.css(ARROW_SELECTOR)),
      5000
    );
    return await expect(
      arrowGetter,
      `the ${arrow} pagination arrow shouldn't be visible`
    ).to.eventually.be.rejected;
  }
);
