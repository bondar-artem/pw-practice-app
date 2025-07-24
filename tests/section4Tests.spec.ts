import {test, expect} from '@playwright/test'

test.beforeEach(async({page})=> {
    await page.goto('http://localhost:4200')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax Rules', async ({page}) => {
    // by Tag name
    page.locator('input')

    // by ID
    page.locator('#inputEmail1')

    // by class
    page.locator('.hape-rectangle')

    // by attribute
    page.locator('[placeholder="Email"]')

})

test('User facing locator', async ({page}) => {
    await page.getByRole('textbox', {name: "Email"}).first().click()
    await page.getByRole('button', {name: "Sign in"}).first().click()
})

test('locating child elements', async ({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()
    await page.locator('nb-card').nth(3).getByRole('button').click() // not recommend
})

test('locating parent elements', async ({page}) => {
    // await page.locator("nb-card", {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator("nb-card", {has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()
    await page.locator("nb-card").filter({hasText: "Basic form"}).getByRole('textbox', {name: "Email"}).click()
    await page.locator("nb-card").filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: "Email"}).click()
    await page.locator("nb-card").filter({has: page.locator('.nb-checkbox')}).filter({hasText: 'Sign in'}).getByRole('textbox', {name: "Email"}).click()
    await page.locator('"text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "Email"}).click() // not recommend
})

test('reusing locator', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button', {name: "Submit"}).click()
    await expect(emailField).toHaveValue('test@test.com')
})

test('extracting value', async ({page}) => {
    // single test value
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all test values
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonLabels).toContain("Option 1")

    // input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    // value of attribute
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('assertions', async ({page}) => {
    //general assertion
    const value = 5
    expect(value).toEqual(6)

    //locator assertion
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    await expect(basicFormButton).toHaveText('Submit')

    //soft assertion ---> continue the test script
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
    
})

