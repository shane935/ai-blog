@product @product-list
Feature: Product List
  As a small business owner placing an order
  I want to view and navigate the product list
  So that I can see all available products and their details

  @developed
  Scenario: User can view the product page
    Given the user is on page 1 of the product list
    Then the user is presented with a paginated list of all available products
    And there are no more then 20 products on the page
    And each of the products has a name, a volume and a cost

  @developed
  Scenario: User can view product details
    Given the user is on page 1 of the product list
    When the user clicks on a product in the list
    Then they are redirected to the details page for that product

  @developed
  Scenario: User sees the right pagination arrow if there is a next page
    Given the user is on page 1 of the product list
    Then the right pagination arrow is visible

  @developed
  Scenario: User sees the left pagination arrow if there is a previous page
    Given the user is on page 2 of the product list
    Then the left pagination arrow is visible

  @developed
  Scenario: The user wont see the left pagination arrow if they are on the first page
    Given the user is on page 1 of the product list
    Then the left pagination arrow is not visible

  @developed
  Scenario Outline: User can navigate the paginated list
    Given the user is on page <current_page> of the product list
    When the user clicks the <arrow> pagination arrow
    Then the user is moved to page <expected_page> of the product list

    Examples: 
      | arrow | current_page | expected_page |
      | left  |            2 |             1 |
      | right |            1 |             2 |
