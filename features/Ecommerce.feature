Feature: Ecommere validations

  Scenario: Placing the order
    
    Given a login  to E commerce application with "tkishor@gmail.com" and "Tell@555"
    When Add "ZARA COAT 3" to Cart
    Then Verify "ZARA COAT 3" displayed in Cart
    When Enter Valid details and Place the order
    Then Verify Order in the Order History page
    