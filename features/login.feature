Feature: Login
  If I submit with my login credentials
  As I user
  I should be redirected to the dashboard

  Scenario: Login
    Given I fill the login form with my credentials
    When I hit enter
    Then I expect to be redirected to the dashboard