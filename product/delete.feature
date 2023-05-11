Feature: Product Deletion

    Background:
        Given a paginated list of available products

    Scenario: Delete a product
        Given a delete button represented by a cross icon for each product
        When the user clicks the delete button for a specific product
        Then the specific product is removed from the paginated list

    Scenario: Enable mass delete button
        Given a checkbox next to each product
        And a mass delete button
        When the user selects at least one product checkbox
        Then the mass delete button becomes clickable

    Scenario: Delete multiple products
        Given a checkbox next to each product
        And a clickable mass delete button
        When the user selects multiple product checkboxes
        And the user clicks the mass delete button
        Then the selected products are removed from the paginated list
