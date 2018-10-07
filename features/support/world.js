const { setWorldConstructor } = require('cucumber');
const { expect } = require('chai');
const puppeteer = require('puppeteer');

const PAGE = "http://redux-yummy.herokuapp.com/login"

class World {
  constructor(){
    this.credentials = ['admin','admin']
    this.message = "Logged in as Admin"
  }

  async openLoginPage(){
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
    await this.page.goto(PAGE);
  }

  async fillLoginForm(){
    const inputSelectors = ["#username","#password"];
    for(let i in inputSelectors){
      await this.page.waitForSelector(inputSelectors[i]);
      this.inputElement = await this.page.$(inputSelectors[i])
      await this.inputElement.type(this.credentials[i])
    }
  }

  async submit(){
    await this.inputElement.press('Enter')
  }

  async showDashboard(){

    const messageSelector = "#basic-nav-dropdown"
    await this.page.waitForSelector(messageSelector);
    const message = await this.page.evaluate((messageSelector) =>
      document.querySelector(messageSelector).innerText,messageSelector
    )
    expect(this.message).to.eql(message);
    expect(this.page.url()).to.eql("http://redux-yummy.herokuapp.com/dashboard")
  }

  async closeLoginPage(){
    await this.browser.close();
  }
}
setWorldConstructor(World)
