import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200')
})

test('extracting values', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    // single text value
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // all text values
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonLabels).toContain('Option 1')

    // input field value
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})
    await emailField.fill('test@test.com')
    const emailInputValue = await emailField.inputValue()
    expect(emailInputValue).toEqual('test@test.com')

    // attributes values
    const placeHolderValueEmail = await emailField.getAttribute('placeholder')
    expect(placeHolderValueEmail).toEqual('Email')
})