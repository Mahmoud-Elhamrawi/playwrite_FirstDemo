import { type Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePages";

export class PoManager{
   private readonly page : Page;
   private readonly loginPage:LoginPage;
   private readonly homePage:HomePage;

  constructor(page:Page){
    this.page = page;
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
  }
 
  getLoginPage(){
    return this.loginPage;
  }

  getHomePage(){
    return this.homePage;
  } 









}