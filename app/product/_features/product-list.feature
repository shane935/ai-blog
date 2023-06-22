@product @product-list
Feature: Product List
  As a small business owner placing an order
  I want to view and navigate the product list
  So that I can see all available products and their details

  Background:
    Given the user navigates to the product page

  @now
  Scenario: User can view the product page
    Then the user is presented with a paginated list of all available products
    And each of the products has a name, a volume and a cost

  Scenario: User can view product details
    When the user clicks on a product in the list
    Then they are redirected to the details page for that product

  Scenario: User sees the right pagination arrow if there is a next page
    Given the user is on the first page of the product list
    Then the right pagination arrow is visible

  Scenario: User sees the left pagination arrow if there is a previous page
    Given the user is on the second page of the product list
    Then the left pagination arrow is visible

  Scenario Outline: User can navigate the paginated list
    Given the user is on page <current_page> of the product list
    When the user clicks the <arrow> pagination arrow
    Then the user is moved to page <expected_page> of the product list

    Examples:
      | arrow | current_page | expected_page |
      | left  | 2            | 1             |
      | right | 1            | 2             |
