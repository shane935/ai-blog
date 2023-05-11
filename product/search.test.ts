import { Builder, By, WebElement } from 'selenium-webdriver';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';

// Define constants for the URLs and CSS selectors
const PRODUCTS_PAGE_URL = 'http://localhost:3000/products';
const SEARCH_BAR_SELECTOR = '#search-bar';
const SEARCH_RESULT_SELECTOR = '.search-result';
const ERROR_MESSAGE_SELECTOR = '.error-message';

interface State {
  driver: any;
  searchBar: WebElement;
}

const withState = (fn: (state: State) => void) => {
  const state: State = {
    driver: new Builder().forBrowser('chrome').build(),
    searchBar: {} as WebElement,
  };

  return () => {
    fn(state);
  };
};

Given('a paginated list of available products', withState(async state => {
  // Navigate to the page with the product list
  await state.driver.get(PRODUCTS_PAGE_URL);
}));

Given('a search bar', withState(async state => {
  // Locate the search bar element
  state.searchBar = await state.driver.findElement(By.css(SEARCH_BAR_SELECTOR));
}));

When('the user enters {string} into the search bar', withState(async state => async (input: string) => {
  await state.searchBar.sendKeys(input);
}));

Then('the paginated list shows the corresponding {string}', withState(async state => async (title: string) => {
  const searchResult: WebElement = await state.driver.findElement(By.css(SEARCH_RESULT_SELECTOR));
  const resultText = await searchResult.getText();
  expect(resultText).to.equal(title);
}));

Then('the user is provided a list with multiple {string}', withState(async state => async (returnedEntries: string) => {
  const entries = returnedEntries.split(', ');
  const searchResults: WebElement[] = await state.driver.findElements(By.css(SEARCH_RESULT_SELECTOR));
  const resultTexts: string[] = await Promise.all(searchResults.map(result => result.getText()));
  expect(resultTexts).to.deep.equal(entries);
}));

Then('the user is provided with an error message {string}', withState(async state => async (message: string) => {
  const errorMessage: WebElement = await state.driver.findElement(By.css(ERROR_MESSAGE_SELECTOR));
  const errorMessageText = await errorMessage.getText();
  expect(errorMessageText).to.equal(message);
}));
