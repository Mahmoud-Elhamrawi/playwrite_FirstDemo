import { type Locator , type Page ,expect} from "@playwright/test";



export class LoginPage{
//variables
readonly page : Page;
readonly userName_tb:Locator ;
readonly userPassword_tb:Locator ;
readonly login_btn:Locator;
readonly invalidCredentials_msg:Locator;
readonly required_Msg:Locator;
readonly Url:string = '/web/index.php/auth/login';
readonly errorMsg:string = 'Invalid credentials';
readonly requiredMsg:string = 'Required';



//constructor
constructor(page:Page){
    this.page = page;
    this.userName_tb = page.locator('[name="username"]');
    this.userPassword_tb = page.locator('[name="password"]');
    this.login_btn = page.locator('[type="submit"]');
    this.invalidCredentials_msg = page.getByText(this.errorMsg);
    this.required_Msg = page.getByText(this.requiredMsg);


}

//methods Actions

async open(){
    await this.page.goto(this.Url);
}

async login(username:string , password:string){
  await this.userName_tb.fill(username);
  await this.userPassword_tb.fill(password);
  await this.login_btn.click();
  
}

//validations
async validateInvalidLoginMessage(){
   await expect(this.invalidCredentials_msg).toBeVisible();
}

async validateRequiredMessage(){
   await expect(this.required_Msg).toBeVisible();
}

async validateLoginPageUrl(url:string){
   await expect(this.page).toHaveURL(url);  
}


}

