import {  type Page , type Locator, expect } from "@playwright/test";


export class HomePage{
//varibales
readonly page : Page;
readonly profilePicture_img:Locator
readonly logout_btn:Locator;


//constructor
constructor(page :Page){
    this.page = page;
    this.profilePicture_img = page.getByAltText('profile picture');
    this.logout_btn = page.getByText('Logout');
}

//methods actions
async logout(){
   await this.profilePicture_img.click();
   await this.logout_btn.click();
}

//validations
async validateProfilePictureVisible(){
   await expect(this.profilePicture_img).toBeVisible();
}

async validateHomePageUrl(url:string){
   await expect(this.page).toHaveURL(url);
}





}
