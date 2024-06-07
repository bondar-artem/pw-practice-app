import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:57729/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layout').click()
})


test('locating Child elements', async({page}) => {
    // There are two way to select a child
    // First mode: It is compact using space
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    // Second mode: It splits 
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button',{name: "Sign in"}).first().click()

    await page.locator('nb-card').nth(3).getByRole('button').click() // better to avoid it because the index can change
})