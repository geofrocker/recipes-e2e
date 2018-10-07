const { Given, When, Then, After, Before} = require('cucumber');


Before(async function () {
  return await this.openLoginPage();
});

After(async function () {
  return await this.closeLoginPage()
});

Given("I fill the login form with my credentials", { timeout: 1000000 }, function () {
  return this.fillLoginForm();
});

When("I hit enter", { timeout: 1000000 }, function () {
  return this.submit();
});

Then("I expect to be redirected to the dashboard", { timeout: 1000000 }, function(){
  return this.showDashboard();
})