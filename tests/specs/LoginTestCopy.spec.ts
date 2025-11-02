    import { test ,expect } from "@playwright/test";
      import { PoManager } from "../pages/PoManager";
      import inValidUserData from "../../testData/inavlidLoginTestData";
      import validloginTestData from "../../testData/validloginTestData";

 

    let poManager:PoManager;

    //Hooks
    test.beforeEach(async({page})=>{
        poManager = new PoManager(page);
        await poManager.getLoginPage().open();
    });

    test.afterEach(async({page},testinfo)=>{
        console.log(`Test completed: ${test}`);
    });



//Tests
test.describe('Login Functionality Tests',()=>{
   
  test(`Validate login with ${validloginTestData.type}`,async({page})=>{
          await poManager.getLoginPage().login(validloginTestData.username , validloginTestData.password);
          await poManager.getHomePage().validateHomePageUrl('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
          await poManager.getHomePage().validateProfilePictureVisible();
        });
 
inValidUserData.forEach( ({username , password , type}) =>{
 
      test(`inValid login for ${type} `,async({page})=>{
          await poManager.getLoginPage().login(username , password);
          await poManager.getLoginPage().validateInvalidLoginMessage();
     });
});

  test("Validate logout the click on back button",async({page})=>{
          await poManager.getLoginPage().login(validloginTestData.username , validloginTestData.password);
            await poManager.getHomePage().logout();
            await page.goBack();
            await poManager.getLoginPage().validateLoginPageUrl('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
     });


});




