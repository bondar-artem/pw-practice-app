import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto(process.env.URL!)
    await page.getByText('Button Triggering AJAX Request').click()
})

test('auto waiting', async({page}) => {
    const successButton = page.locator('.bg-success')
    
    //await successButton.click()

   //scenario 1
    // const text = await successButton.textContent()

    //scenario 2
    //const text = await successButton.allTextContents()

    //scenario 3
    await successButton.waitFor({state: "attached"})
    const text = await successButton.allTextContents()
    
    //scenario 1 and 2
    //expect(text).toEqual('Data loaded with AJAX get request.')

    //scenario 3
    //expect(text).toContain('Data loaded with AJAX get request.')

    //scenario 4
    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})

})

test.skip('alternative waits', async ({page}) => {
    const successButton = page.locator('.bg-success')
    
    //wait for element
    //await page.waitForSelector('.bg-success')

    //wait for particular response
    //await page.waitForResponse('https://uitestingplayground.com/ajaxdata')

    //wait for network call to be completed ('Not recommended)
    await page.waitForLoadState('networkidle')

   // await page.waitForTimeout(5000)

    const text = await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})

test.skip ('test timeouts lesson 32', async ({page}) => {
    const successButton = page.locator('.bg-success')
    await successButton.click()
})