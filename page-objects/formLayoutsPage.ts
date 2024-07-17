import{Page} from "@playwright/test"
import { HelperBase } from "./helperbase"

export class FormLayoutsPage extends HelperBase{   //always export class and start Class names by capital letters

    constructor(page: Page){
        super(page)
    }

    async submitUsingGridFormandCredentialWithSelectOption(email: string, password: string, optionText: string){
        const usingGridForm = this.page.locator("nb-card", {hasText: 'Using the Grid'})
        await usingGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingGridForm.getByRole('radio', {name: optionText}).check({force:true})
        await usingGridForm.getByRole('button').click()
    }
        /**
         * this method will fill out user details on Inline form
         * @param name -first and last name
         * @param email  - valid email address
         * @param rememberMe - true or false
         */
    async submitUsingInlineFormandCredentialWithCheck(name: string, email: string, rememberMe: boolean){
        const usingInlineForm = this.page.locator("nb-card", {hasText: 'Inline Form'})
        await usingInlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await usingInlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe)
           await usingInlineForm.getByRole('checkbox', {name: "Remember Me"}).check({force:true})
        await usingInlineForm.getByRole('button').click()
    }
}
