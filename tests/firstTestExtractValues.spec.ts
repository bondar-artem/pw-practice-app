import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layout').click()
})


test('extracting values', async({page}) => {
  //single test value
  const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
  const buttonText = await basicForm.locator('button').textContent()
  expect (buttonText).toEqual('Submit')

  //all text values
  const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonLabels).toContain("Option 1")

  //input value
  const emailField = basicForm.getByRole('textbox', {name: "Email"})
  await emailField.fill('test@test.com')
  const emailValue = await emailField.inputValue()
  expect (emailValue).toEqual('test@test.com')

  const placeholderValue = await emailField.getAttribute('placeholder')
  expect(placeholderValue).toEqual('Email')
})