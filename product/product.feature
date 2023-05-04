Feature: Product Form
    As a bakery owner
    I want to keep track of the products I sell
    So that I can effectively create orders

  Scenario Outline: Create a product
    Given a form with the following fields product Name, product Price and Ingredients list
    When the user completes the form
    And presses the submit button
    Then the user is redirected back to a paginated list of avaliable products
    And the new product exists in the list

    Examples: 
      | url             |
      | www.test.com.au |

  Scenario Outline: Delete a product
    Given a paginated list of avaliable products
    And a button with a cross
    When the user presses the cross
    Then the application submits a request to delete the product to the "{url}"

    Examples: 
      | url             |
      | www.test.com.au |

  Scenario: Enable mass delete button

  Scenario: Delete Multiple products
    Given a paginated list of avaliable products
    And a checkbox next too each product
