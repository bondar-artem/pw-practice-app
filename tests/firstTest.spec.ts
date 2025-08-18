import {test, expect} from  '@playwright/test'

test.beforeEach(async({page})=> {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test.skip('Locator syntax rules', async({page}) => {
    //by tag name
    await page.locator('input').first().click()

    //by ID #
    page.locator('#inputEmail1')

    //by Class value .
    page.locator('.shape-rectangle')

    //by Attribute

    page.locator('[placeholder="Email"]')

    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors
    page.locator('input[placeholder="Email"] [nbinput]')

    //by Xpath (not recommended)
    page.locator('//*[@id="inputEmail1"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')
})

test.skip('user facing locators', async({page}) => {
    await page.getByRole('textbox', {name:'email'}).first().click()
    await page.getByRole('button', {name:'Sign in'}).first().click()

    await page.getByLabel('Email').first().click()

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Nick Jones').first().click()

    await page.getByTitle('Form Layouts').click()

    await page.getByTestId('signIn').click()
})

test('locating child elements', async({page}) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', {name:'Sign In'}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click()
})


test('locating parent elements', async({page}) => {
    await page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox', {name:"Email"}).click()
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole('textbox', {name:"Email"}).click()

    await page.locator('nb-card').filter({hasText:"Basic Form"}).getByRole('textbox', {name:"Email"}).click()
    await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name:"Password"}).click()

    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: "Submit"}).filter({hasText: "Remember me"}).getByRole('textbox', {name:"Email"}).click()

    //not recommended xpath usage
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name:"Email"}).click()

})


test('Reusing locators', async({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText:"Basic Form"})
    const emailInput = basicForm.getByRole('textbox', {name:"Email"})
    var password = "Welcome123"
    var email = "test@test.com"

    await emailInput.fill(email)
    await basicForm.getByRole('textbox', {name:"Password"}).fill(password)
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailInput).toHaveValue(email)
})


test('Extracting values', async({page}) => {
    //single text value
    const basicForm = page.locator('nb-card').filter({hasText:"Basic Form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')


    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    console.log(allRadioButtonsLabels)
    expect(allRadioButtonsLabels).toContain('Option 1')

    //input value
    const emailInput = basicForm.getByRole('textbox', {name:"Email"})
    var email = "test@test.com"
    emailInput.fill(email)
    const emailValue =await emailInput.inputValue()
    expect(emailValue).toEqual(email) 
    //placeholder value
    const placeholderValue = await emailInput.getAttribute('placeholder')
    expect(placeholderValue).toEqual('Email')
})

test('Assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText:"Basic Form"}).locator('button')
    //general assertions
    const value = 5
    expect(value).toBe(5)
    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //locator assertions
    await expect(basicFormButton).toHaveText('Submit')

    //soft assertion - does not fail the next steps (not a good practice, better to split into separate test cases)

    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()
})
