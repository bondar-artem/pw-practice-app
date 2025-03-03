import {  Page } from "@playwright/test";
import { HelperBase } from "./helper-base";

export class FormLayoutsPage extends HelperBase{

    constructor(page: Page){
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption (email: string, password: string, optionText: string){
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: "Email"}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: "Password"}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }

    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean){
        const inlineform = this.page.locator('nb-card', {hasText: "Inline form"})
        await inlineform.getByRole('textbox', {name: "Jane Doe"}).fill(name)
        await inlineform.getByRole('textbox', {name: "Email"}).fill(email)
        if(rememberMe)
            await inlineform.getByRole('checkbox').check({force: true})
        await inlineform.getByRole('button').click()
    }

}