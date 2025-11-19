import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async usingtheGridForm(email: string, passowrd: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(passowrd)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }

    /**
     * This method will out the Inline form with the user details
     * @param name - should be first and last name
     * @param email - should be email address
     * @param rememberMe - true or false
     */
    
    async InlineForm(name: string, email: string, rememberMe: boolean) {
        const InlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await InlineForm.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await InlineForm.getByRole('textbox', {name: "Email"}).fill(email)
        if (rememberMe)
            await InlineForm.getByRole('checkbox').check({force: true})
        await InlineForm.getByRole('button').click()
    }
}