import{test , expect} from '@playwright/test';
import {describe } from 'node:test';


test.beforeEach('navigate to url',async({page},testinfo)=>{
   console.log(`Starting test: ${testinfo.title}`);
   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
});




test.describe('auth',async()=>{


   test('valid login',async({page})=>{
    await page.locator('[name="username"]').fill('Admin');
    await page.locator('[name="password"]').fill('admin123');
    await page.locator('[type="submit"]').click();
    await expect(page.getByAltText('profile picture')).toBeVisible();
    await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

   });



   test('invalidLogin',async({page})=>{
    await page.locator('[name="username"]').fill('Admin1');
    await page.locator('[name="password"]').fill('admin1234');
    await page.locator('[type="submit"]').click();

await expect(page.getByText("Invalid credentials")).toBeVisible();
await expect(page.locator("//p[.='Invalid credentials']")).toContainText('Invalid credentials');
   });

});

