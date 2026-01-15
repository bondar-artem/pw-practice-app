import { test, expect } from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200')
})

test('type of assertions', async ({page}) => {

    // Generic assertions
    // values from the left are compared to the values on the right
    const value = 5
    expect(value).toEqual(5)

    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    const basicFormButton = page.locator('nb-card').filter({hasText: 'Basic Form'}).getByRole('button')
    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')

    // Locator assertions
    await expect(basicFormButton).toHaveText('Submit')    // default timeout up to 5 sec

    // Soft assertion NOT A GOOD PRACTICE!!!!!
    // here click will be done cause we applied soft assertion, it fails but we continue executing code 
    await expect.soft(basicFormButton).toHaveText('Submit5')
    await basicFormButton.click()
})