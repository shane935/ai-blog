import { Given } from "@cucumber/cucumber";
import { driver } from "./setup.ts";
import { PRODUCT_LIST_PAGE, URL } from "./constants.ts";

Given("the user navigates to the product page", async function () {
  await driver.get(URL + PRODUCT_LIST_PAGE);
});
