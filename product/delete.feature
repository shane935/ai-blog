Feature: Delete

    Background:
        Given a paginated list of available products

    Scenario Outline: Delete a product
        Given a button with a cross
        When the user presses the cross
        Then the product is removed from the paginated list

    Scenario: Enable mass delete button
        Given a checkbox next too each product
        When a checkbox is selected
        Then the delete button is clickable

    Scenario: Delete multiple products
        Given a checkbox next too each product
        When multiple products checkboxs are selected
        And the delete button is clicked
        Then the products are removed from the paginated list
