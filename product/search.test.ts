import { Builder, By, until, WebElement } from 'selenium-webdriver';
import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { searchProducts, SearchResult } from './search';

interface State {
  driver: any;
  products: SearchResult[];
  searchBar: WebElement;
  result: SearchResult[];
}

const withState = (fn: (state: State) => void) => {
  const state: State = {
    driver: new Builder().forBrowser('chrome').build(),
    products: [],
    searchBar: {} as WebElement,
    result: [],
  };

  return () => {
    fn(state);
  };
};

Given('a paginated list of available products', withState(state => {
  state.products = [
    { title: 'Roll' },
    { title: 'Scroll' },
    { title: 'Sourdough' },
    { title: 'Dough' },
    { title: 'Caramel Scroll' },
    { title: 'Vanilla Scroll' }
  ];
}));

Given('a search bar', withState(async state => {
  // Navigate to your application and locate the search bar element
  await state.driver.get('http://localhost:3000');
  state.searchBar = await state.driver.findElement(By.css('#search-bar'));
}));

When('the user enters {string} into the search bar', withState(async state => async (input: string) => {
  await state.searchBar.sendKeys(input);
  const searchText = await state.searchBar.getAttribute('value');
  state.result = searchProducts(searchText, state.products);
}));

Then('the paginated list shows the corresponding {string}', withState(async state => async (title: string) => {
  const searchResult: WebElement = await state.driver.findElement(By.css('.search-result'));
  const resultText = await searchResult.getText();
  expect(resultText).to.equal(title);
}));

Then('the user is provided a list with multiple {string}', withState(async state => async (returnedEntries: string) => {
  const entries = returnedEntries.split(', ');
  const searchResults: WebElement[] = await state.driver.findElements(By.css('.search-result'));
  const resultTexts: string[] = await Promise.all(searchResults.map(result => result.getText()));
  expect(resultTexts).to.deep.equal(entries);
}));

Then('the user is provided with a {string}', withState(async state => async (message: string) => {
  const errorMessage: WebElement = await state.driver.findElement(By.css('.error-message'));
  const errorMessageText = await errorMessage.getText();
  expect(errorMessageText).to.equal(message);
}));
