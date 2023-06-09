// Import necessary modules and constants
import { Given, When, Then } from "@cucumber/cucumber";
import { By } from "selenium-webdriver";
import { expect } from "chai";

import { driver } from "./shared.test";

import {
  SEARCH_BAR_SELECTOR,
  PRODUCT_TITLE_SELECTOR,
  SEARCH_RESULTS_SELECTOR,
  ERROR_MESSAGE_SELECTOR,
} from "./constants";

Given("a search bar", async function () {
  const searchBar = await driver.findElement(By.css(SEARCH_BAR_SELECTOR));
  expect(searchBar).to.exist;
});

// Scenario: Search for a product
When(
  "the user enters {string} into the search bar",
  async function (searchText) {
    const searchBar = await driver.findElement(By.css(SEARCH_BAR_SELECTOR));
    await searchBar.sendKeys(searchText);
  }
);

Then(
  "the paginated list shows the corresponding {string}",
  async function (title) {
    const productTitle = await driver.findElement(
      By.css(PRODUCT_TITLE_SELECTOR)
    );
    const productTitleText = await productTitle.getText();
    expect(productTitleText).to.equal(title);
  }
);

// Scenario: Partial search for a product
Then(
  "the user is provided a list with multiple {string}",
  async function (returnedEntries: string) {
    const searchResults = await driver.findElement(
      By.css(SEARCH_RESULTS_SELECTOR)
    );
    const searchResultsText = await searchResults.getText();
    const entries = returnedEntries.split(", ");
    entries.forEach((entry) => {
      expect(searchResultsText).to.contain(entry);
    });
  }
);

// Scenario: Failed search for a product
Then(
  "the user is provided with an error message {string}",
  async function (message) {
    const errorMessage = await driver.findElement(
      By.css(ERROR_MESSAGE_SELECTOR)
    );
    const errorMessageText = await errorMessage.getText();
    expect(errorMessageText).to.equal(message);
  }
);
