// Import the necessary modules
import { Given, When, Then, After } from '@cucumber/cucumber';
import { expect } from 'chai';
import { Builder, By, until, WebDriver } from 'selenium-webdriver';

// Import our constants
import { 
  DELETE_BUTTON_SELECTOR, 
  PRODUCT_LIST_SELECTOR, 
  CHECKBOX_SELECTOR, 
  MASS_DELETE_BUTTON_SELECTOR, 
  URL 
} from './constants';

let driver: WebDriver = new Builder().forBrowser('firefox').build();

Given('a paginated list of available products', async function() {
    await driver.get(URL);
});

// Scenario: Delete a product
Given('a delete button represented by a cross icon for each product', async function() {
    const deleteButtons = await driver.findElements(By.css(DELETE_BUTTON_SELECTOR));
    expect(deleteButtons.length).to.be.above(0);
});

When('the user clicks the delete button for a specific product', async function() {
    const deleteButton = await driver.findElement(By.css(DELETE_BUTTON_SELECTOR));
    await deleteButton.click();
});

Then('the specific product is removed from the paginated list', async function() {
    await driver.wait(until.elementIsNotVisible(driver.findElement(By.css(PRODUCT_LIST_SELECTOR + ':first-child'))));
});

// Scenario: Enable mass delete button
Given('a checkbox next to each product', async function() {
    const checkboxes = await driver.findElements(By.css(CHECKBOX_SELECTOR));
    expect(checkboxes.length).to.be.above(0);
});

Given('a mass delete button', async function() {
    const massDeleteButton = await driver.findElement(By.css(MASS_DELETE_BUTTON_SELECTOR));
    expect(massDeleteButton).to.not.be.null;
});

When('the user selects at least one product checkbox', async function() {
    const checkbox = await driver.findElement(By.css(CHECKBOX_SELECTOR));
    await checkbox.click();
});

Then('the mass delete button becomes clickable', async function() {
    const massDeleteButton = await driver.findElement(By.css(MASS_DELETE_BUTTON_SELECTOR));
    expect(await massDeleteButton.isEnabled()).to.be.true;
});

// Scenario: Delete multiple products
When('the user selects multiple product checkboxes', async function() {
    const checkboxes = await driver.findElements(By.css(CHECKBOX_SELECTOR));
    for (let i = 0; i < 2; i++) {
        await checkboxes[i].click();
    }
});

When('the user clicks the mass delete button', async function() {
    const massDeleteButton = await driver.findElement(By.css(MASS_DELETE_BUTTON_SELECTOR));
    await massDeleteButton.click();
});

Then('the selected products are removed from the paginated list', async function() {
    await driver.wait(until.elementsLocated(By.css(PRODUCT_LIST_SELECTOR)), 10000);
    const products = await driver.findElements(By.css(PRODUCT_LIST_SELECTOR));
    expect(products.length).to.be.below(2);
});

// Close the WebDriver instance
After(async function() {
    await driver.quit();
});
