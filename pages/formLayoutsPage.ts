import { Page } from "@playwright/test";

export class ForLayoutsPage {
    private readonly page: Page

    constructor (page: Page) {
        this.page = page
    }

    async inputFormUsingGridsWithCredentials (email: string, password: string, option: string) {
        const usingTheGridEmailInput = this.page.locator('nb-card').filter({hasText: "Using the Grid"})
        await usingTheGridEmailInput.getByRole("textbox", {name: 'Email'}).fill(email)
        await usingTheGridEmailInput.getByRole("textbox", {name: 'Password'}).fill(password)
        await usingTheGridEmailInput.getByLabel(option).check({force:true})
        await usingTheGridEmailInput.getByRole('button', {name: 'Sign in'}).click()
    }

    async inputFormUsingInlineForm (name: string, email: string, rememberMe: boolean) {
        const usingInlineForm = this.page.locator('nb-card').filter({hasText: "Inline form"})
        await usingInlineForm.getByPlaceholder('Jane Doe').fill(name)
        await usingInlineForm.getByPlaceholder("Email").fill(email)
        if (rememberMe)
            usingInlineForm.getByRole('checkbox').check({force: true})
            
        await usingInlineForm.getByRole('button', {name: 'Submit'}).click()
    }
}