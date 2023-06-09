@product @search-product
Feature: Search

  Background:
    Given the user navigates to the product page
    And a search bar

  Scenario Outline: Search for a product
    When the user enters <searchText> into the search bar
    Then the paginated list shows the corrosponding <title>

    Examples:
      | searchText | title  |
      | roll       | Roll   |
      | scroll     | Scroll |

  Scenario Outline: Partial search for a product
    When the user enters <partialText> into the search bar
    Then the user is provided a list with multiple <returnedEntries>

    Examples:
      | partialText | returnedEntries                |
      | dough       | Sourdough,  Dough              |
      | scroll      | Caramel Scroll, Vanilla Scroll |

  Scenario Outline: Failed search for a product
    When the user enters <failedText> into the search bar
    Then the user is provided with an error message <message>

    Examples:
      | failedText | message                                           |
      | missing    | we couldnt find any products matching that search |
      | not here   | we couldnt find any products matching that search |
