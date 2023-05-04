import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { searchProducts, SearchResult } from './search';

interface State {
  products: SearchResult[];
  searchText: string;
  result: SearchResult[];
}

const withState = (fn: (state: State) => void) => {
  const state: State = {
    products: [],
    searchText: '',
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

Given('a search bar', withState(state => {
  state.searchText = '';
}));

When('the user enters {string}', withState(state => (input: string) => {
  state.searchText = input;
  state.result = searchProducts(state.searchText, state.products);
}));

Then('the paginated list shows the corresponding {string}', withState(state => (title: string) => {
  expect(state.result).to.deep.equal([{ title }]);
}));

Then('the user is provided a list with multiple {string}', withState(state => (returnedEntries: string) => {
  const entries = returnedEntries.split(', ').map(entry => ({ title: entry }));
  expect(state.result).to.deep.equal(entries);
}));

Then('the user is provided with a {string}', withState(state => (message: string) => {
  expect(state.result).to.deep.equal({ error: message });
}));
