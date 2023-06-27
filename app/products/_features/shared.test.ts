import { Given } from "@cucumber/cucumber";
import { driver } from "./setup";
import { PRODUCT_LIST_PAGE, URL } from "./constants";

Given("the user navigates to the product page", async function () {
  await driver.get(URL + PRODUCT_LIST_PAGE);
});
