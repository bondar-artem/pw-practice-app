import { Page } from '@playwright/test';
export class formLayoutsPage {

    readonly page: Page
    public constructor(page: Page) {
        this.page = page

    }
    async submitFormWithCredentials (email: string, password  : string, optionalText: string) {
        const usingTheGridFrom = this.page.locator ('nb-card', {hasText: "Using the Grid" })
        await usingTheGridFrom.getByLabel('Email').fill (email)
        //await page.getByLabel('Email').first().click();
        await usingTheGridFrom.getByRole('textbox', { name: 'Password' }).fill (password)
        await usingTheGridFrom.getByRole('radio', { name: optionalText }).check ({force:true})
        await usingTheGridFrom.getByRole('button').click()
    }
    async submitInlineFormsWithEmailAndCheckbox (name:string, email:string, rememberMe: boolean) {
        const usingTheInLineForm = this.page.locator ('nb-card', {hasText: "Inline form"})
        await usingTheInLineForm.getByRole ('textbox', {name: 'Jane Doe'}).fill (name);
        await usingTheInLineForm.getByRole ('textbox', {name: 'Email'}).fill (email);
        if (rememberMe)
            await usingTheInLineForm.getByRole('checkbox').check ({force:true})
        await usingTheInLineForm.getByRole('button').click()


    } 

}