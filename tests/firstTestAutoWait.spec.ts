import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('https://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})


test('AutoWait', async({page}) => {
const successButton = page.locator('.bg-success')

await successButton.click()

//const text = await successButton.textContent()
//await successButton.waitFor({state: "attached"})
//const text = await successButton.allTextContents()

//expect(text).toEqual('Button Triggering AJAX Request')

await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

})


test('Alternative waits', async({page}) => {
    const successButton = page.locator('.bg-success')

    //____ wait for element
    await page.waitForSelector('.bg-success')

    //____ wait for particular response
    await page.waitForResponse('https://uitestingplayground.com/ajax')

    //____ wait for network calls to be completed ('Not recommended')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(50000)

    const text = await successButton.allTextContents()
    expect(text).toEqual('Button Triggering AJAX Request')
    })