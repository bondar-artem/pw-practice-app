import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('General assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    const text = await basicFormButton.textContent()
    expect(text).toEqual('Submit')
})

test('Locator assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    await expect(basicFormButton).toHaveText('Submit')
})

// soft assertion will continue running test after assertion validation fails 
test('Soft assertions', async({page}) => {
    const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
    await expect.soft(basicFormButton).toHaveText('Submit')
    await basicFormButton.click()
})