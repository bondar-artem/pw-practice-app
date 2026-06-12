import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();


})

test('first test', async ({ page }) => {


    await page.getByText('Forms').click();

})

test('Locator Syntax rules', async ({ page }) => {
    //by Tag name
    page.locator("input")
    //by id
    page.locator("#inputEmail1")
    //by class name
    page.locator(".shape-rectangle")
    // by attribute name
    page.locator("[placeholder ='Email']")

    //by Class value(full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selector
    page.locator("input[placeholder ='Email'] [nbinput]")

    //by Xpath(not recommended)
    page.locator("//input[@id='inputEmail1']")

    //partial text match
    page.locator(':text=("Using")')
})

test('User facing locators', async ({ page }) => {

    await page.getByRole('textbox', { name: 'Email' }).first().click()
    await page.getByText(('Using the Grid')).click()
    await page.getByPlaceholder("Jane Doe").click()

})

test('locating child elements', async ({ page }) => {

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').filter({ hasText: 'Sign in' }).first().click()

})

test('locating parent elements', async ({ page }) => {

    await page.locator("nb-card", { hasText: 'Using the Grid' }).getByRole('textbox', { name: 'Email' }).click()
    //await page.locator("nb-card", {has : page.locator('#inputEMail2')}).getByRole('textbox', { name: 'Email' }).click()
    await page.locator("nb-card", { hasText: 'Basic form' }).getByRole('textbox', { name: 'Email' }).click()

    await page.locator("nb-card").filter({ has: page.locator('nb-checkbox') }).filter({ hasText: 'Sign in' }).getByRole('textbox', { name: "Email" }).click()

    await page.pause();

})

test("Reusing the locators", async ({ page }) => {

    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
    const emailField = basicForm.getByRole('textbox', { name: 'Email' })

    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', { name: 'Password' }).fill('Welcome123')
    await basicForm.locator("nb-checkbox").click()
    await basicForm.getByRole('button', { name: 'Submit' }).click()
    await expect(emailField).toHaveValue('test@test.com')
})

test('extracting values', async ({ page }) => {

    //single test value
    const basicForm = page.locator('nb-card').filter({ hasText: 'Basic form' })
    const buttonText = await basicForm.getByRole('button', { name: 'Submit' }).textContent()
    expect(buttonText).toEqual("Submit")

    //all text values

    const allradioButons = await page.locator('nb-radio').allTextContents()
    expect(allradioButons).toContain('Option 2')

    //input value
    const emailInput = basicForm.getByRole('textbox', { name: 'Email' })
    await emailInput.fill('testa@test.com')
    const emailValue = await emailInput.inputValue()
    expect(emailValue).toEqual('testa@test.com')

    const placeholderValue = await emailInput.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test.only('assertions', async ({ page }) => {

    const basicFormButton = page.locator('nb-card').filter({ hasText: 'Basic form' }).locator('button')
    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    //General assertions
    const value = 5
    expect(value).toEqual(5)

    //Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //soft asserion
    await expect.soft(basicFormButton).toHaveText('Submit') // this will not fail the test immediately, it will continue to execute the rest of the test and at the end it will report all the failed assertions
    basicFormButton.click()
})




