    import { test ,expect } from "@playwright/test";
    // import { LoginPage } from "../pages/LoginPage";
    // import { HomePage } from "../pages/HomePages";
      import { PoManager } from "../pages/PoManager";
      import jsonData from "../../testData/ValidLoginTestData.json";

    //Variables
    // let loginPage:LoginPage;
    // let homePage:HomePage;

    let poManager:PoManager;

    //convrt json data to string and back to json to avoid typescript error
    const parseTestData = JSON.parse(JSON.stringify(jsonData));
    //Hooks
    test.beforeEach(async({page})=>{
        // loginPage = new LoginPage(page);
        poManager = new PoManager(page);
        // homePage = new HomePage(page);
        await poManager.getLoginPage().open();
    });

    test.afterEach(async({page},testinfo)=>{
        console.log(`Test completed: ${test}`);
    });



//Tests
test.describe('Login Functionality Tests',()=>{
     test("Validate login with valid username and Valid password",async({page})=>{
          await poManager.getLoginPage().login(parseTestData.validUserData[0].username , parseTestData.validUserData[0].password);
          await poManager.getHomePage().validateHomePageUrl('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
          await poManager.getHomePage().validateProfilePictureVisible();
        });
 

     test("Validate login with valid username and inValid password",async({page})=>{
          await poManager.getLoginPage().login(parseTestData.invalidUserData[0].username , parseTestData.invalidUserData[0].password);
          await poManager.getLoginPage().validateInvalidLoginMessage();
     });


         test("Validate login with inValid username and Valid password",async({page})=>{
          await poManager.getLoginPage().login(parseTestData.invalidUserData[1].username , parseTestData.invalidUserData[1].password);
          await poManager.getLoginPage().validateInvalidLoginMessage();
     });



           test("Validate logout the click on back button",async({page})=>{
            await poManager.getLoginPage().login(parseTestData.validUserData[0].username , parseTestData.validUserData[0].password);
            await poManager.getHomePage().logout();
            await page.goBack();
            await poManager.getLoginPage().validateLoginPageUrl('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
     });



         test("Validate login with Valid username and empty password",async({page})=>{
          await poManager.getLoginPage().login(parseTestData.invalidUserData[2].username,parseTestData.invalidUserData[2].password);
          await expect(poManager.getLoginPage().validateRequiredMessage());
     });

            test("Validate login with empty username and Valid password",async({page})=>{
              await poManager.getLoginPage().login(parseTestData.invalidUserData[3].username, parseTestData.invalidUserData[3].password);
              await expect(poManager.getLoginPage().validateRequiredMessage());
     });


});




