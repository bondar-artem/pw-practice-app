import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layout').click()
})


test('assertions', async({page}) => {

    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    //General Assertions
    const value = 5
    expect (value).toEqual(5)

    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    //Locator assertion
    await expect(basicFormButton).toHaveText('Submit')

    //Soft assertion
    await expect.soft(basicFormButton).toHaveText('Submitr')
    await basicFormButton.click()

})