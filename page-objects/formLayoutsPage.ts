import{Page} from '@playwright/test'
import { HelperBase } from './helperBase'

export class FormLayoutsPage extends HelperBase{

    constructor(page: Page) {
        super(page)
    }

    async submitUsingTheGridFormWiothCredentialsAndSelectOption(email: string, password: string, option: string){
        const usingTheGridForm = this.page.locator('nb-card').filter({hasText:"Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name:"Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: option}).check({force: true})
        await usingTheGridForm.getByRole('button').click()

    }

    /**
     * 
     * @param name -should be first and last name
     * @param email - valid name for user
     * @param rememberMe - true or false, 1 or 0
     */

   async submitUsingTheInlineFormWithCredentialsAndSelectOption(name: string, email: string, rememberMe:boolean){
        const usingTheInlineForm = this.page.locator('nb-card').filter({hasText:"Inline form"})
        await usingTheInlineForm.getByPlaceholder('Jane Doe').fill(name)
        await usingTheInlineForm.getByPlaceholder("Email").fill(email)
        if(rememberMe){
            await usingTheInlineForm.getByRole('checkbox').check({force: true})
        }
        await usingTheInlineForm.getByRole('button').click()

    }

}