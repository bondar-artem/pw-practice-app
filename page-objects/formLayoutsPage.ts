import { Locator, Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class FormLayoutsPage extends HelperBase {
    //private readonly page: Page

    constructor(page: Page) {
        //this.page = page
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridCard = this.page.locator('nb-card', {hasText: 'Using the Grid'})
        await usingTheGridCard.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingTheGridCard.getByPlaceholder('Password').fill(password)
        await usingTheGridCard.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridCard.getByRole('button').click()
    }

    /**
     * Fill out inline form with user details
     * @param name - should be first and last name
     * @param email - valid email address
     * @param rememberMe - true or false for a user session to be saved
     */
    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineFormCard = this.page.locator('nb-card', {hasText: 'Inline form'})
        await inlineFormCard.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
        await inlineFormCard.getByPlaceholder('Email').fill(email)
        if(rememberMe) {
            await inlineFormCard.getByRole('checkbox', {name: 'Remember me'}).check({force: true})
        }
        await inlineFormCard.getByRole('button').click()

    }
}