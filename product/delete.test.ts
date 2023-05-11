import { Given, When, Then } from '@cucumber/cucumber';
import { By, WebElement } from 'selenium-webdriver';
import { expect } from 'chai';
import { getDriver, getElement, getElements, waitElementClickable } from './utils';

interface State {
    paginatedList: WebElement[];
    deleteButton: WebElement;
    checkboxes: WebElement[];
    massDeleteButton: WebElement;
}

const state: State = {
    paginatedList: [],
    deleteButton: null,
    checkboxes: [],
    massDeleteButton: null,
};

Given('a paginated list of available products', async function () {
    state.paginatedList = await getElements(By.css('.product'));
});

Given('a delete button represented by a cross icon for each product', async function () {
    state.deleteButton = await getElement(By.css('.delete-button'));
});

Given('a checkbox next to each product', async function () {
    state.checkboxes = await getElements(By.css('.product-checkbox'));
});

Given('a mass delete button', async function () {
    state.massDeleteButton = await getElement(By.id('mass-delete-button'));
});

When('the user clicks the delete button for a specific product', async function () {
    await state.deleteButton.click();
});

When('the user selects at least one product checkbox', async function () {
    await state.checkboxes[0].click();
});

When('the user selects multiple product checkboxes', async function () {
    for (let checkbox of state.checkboxes.slice(0, 2)) {
        await checkbox.click();
    }
});

When('the user clicks the mass delete button', async function () {
    await waitElementClickable(state.massDeleteButton);
    await state.massDeleteButton.click();
});

Then('the specific product is removed from the paginated list', async function () {
    const updatedList = await getElements(By.css('.product'));
    expect(updatedList.length).to.equal(state.paginatedList.length - 1);
});

Then('the mass delete button becomes clickable', async function () {
    const isClickable = await state.massDeleteButton.isEnabled();
    expect(isClickable).to.be.true;
});

Then('the selected products are removed from the paginated list', async function () {
    const updatedList = await getElements(By.css('.product'));
    expect(updatedList.length).to.equal(state.paginatedList.length - 2);
});
