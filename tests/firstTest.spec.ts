import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

})

test('Locator syntax rules', async ({ page }) => {

    //tag name
    page.locator('input')

    //by ID
    await page.locator('#inputEmail1').click()

    //by class value
    page.locator('.shape-rectangle')

    // by attribute
    page.locator('[placeholder="Email"]')

    //by Class value(full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by XPath = >(NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')

})

test('User facing locators', async ({ page }) => {
    await page.getByRole('textbox', { name: "Email" }).first().click()
    await page.getByRole('button', { name: "Sign in" }).first().click()
    await page.getByLabel('Email').first().click()
    await page.getByPlaceholder('Jane Doe').click()
    await page.getByText('Using the Grid').click()
    await page.getByTestId('SignIn').click()
    await page.getByTitle('IoT Dashboard').click()

})

test('Locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click()

})

test('locating parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click()
    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: "Email" }).click()

    await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Email" }).click()
    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: "Password" }).click()

    await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: "Sign in" }).getByRole('textbox', { name: "Password" }).click()

    await page.locator(':text-is("Using the Grid)').locator('..').getByRole('textbox', { name: "Email" }).click()

})

test('Reusing the locators', async ({ page }) => {
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    // await page.locator('nb-card').filter({hasText: "Basic form"}).getByRole('textbox', {name:"Email"}).fill('test@test.com')

    const emailField = basicForm.getByRole('textbox', { name: "Email" })
    const passwordField = basicForm.getByRole('textbox', { name: "Password" })

    // await basicForm.getByRole('textbox', {name:"Email"}).fill('test@test.com')
    await emailField.fill('test@test.com')

    // await basicForm.getByRole('textbox', { name: "Password" }).fill('Welcome123')
    await passwordField.fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue("test@test.com")
})

test('extracting values', async ({ page }) => {
    // single test value
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // get all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    // input value
    const emailField = basicForm.getByRole('textbox', { name: "Email" })
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions', async ({ page }) => {

    const basicFormButton = page.locator('nb-card').filter({ hasText: "Basic form" }).locator('button')
    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    // general assertions
    const value = 5
    expect(value).toEqual(5)

    //Locator assertion
   await expect(basicFormButton).toHaveText('Submit')

   //Soft Assertion
   await expect.soft(basicFormButton).toHaveText('Submit')
   await basicFormButton.click()
})





/*
test('the first test', async ({ page }) => {
    await page.getByText('Form Layouts').click()
})

// hooks and control flow

test('navigate to datepicker page', async ({ page }) => {
    await page.getByText('Datepicker').click()
})



test.describe(" suite1 ", () => {

    test.beforeEach(async({page}) =>{
        await page.goto('http://localhost:4200/')
        await page.getByText('Charts').click()
    })

    test('the first test', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })
    
    // hooks and control flow
    
    test('navigate to datepicker page', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })


    test.describe(" suite2 ", () => {

        test.beforeEach(async({page}) =>{
            await page.goto('http://localhost:4200/')
            await page.getByText('Charts').click()
        })
    
        test('the first test', async ({ page }) => {
            await page.getByText('Form Layouts').click()
        })
        
        // hooks and control flow
        
        test('navigate to datepicker page', async ({ page }) => {
            await page.getByText('Datepicker').click()
        })
        
    })

   */
