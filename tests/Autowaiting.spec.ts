import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax');
    await page.getByText('Button Triggering AJAX Request').click();
    testInfo.setTimeout(testInfo.timeout+2000) // this will set the timeout for this particular test to 40 seconds, it will override the global timeout set in the playwright.config.ts file
})

test('Autowaiting', async ({ page }) => {

    const successButton = page.locator(".bg-success")
    await successButton.click()
    //const text = await successButton.textContent()
   // await successButton.waitFor({state: 'attached'})
   // const text = await successButton.allTextContents()
   // expect(text).toContain('Data loaded with AJAX get request.')
    await expect(successButton).toHaveText('Data loaded with AJAX get request.')

})

test('alternative waits', async ({ page }) => {
    //__wait for element
const successButton = page.locator(".bg-success")
//await page.waitForSelector(".bg-success")

// wait for particular response

//await page.waitForResponse("https://uitestingplayground.com/ajaxdata")

//wait for network call to be completed('Not Recommended')
await page.waitForLoadState('networkidle')

//await page.waitForTimeout(5000) // this is not recommended, it will wait for 5 seconds regardless of whether the element is visible or not, it will slow down the test execution

})

test('Timeouts', async ({ page }) => {
   // test.setTimeout(40000) // this will set the timeout for this particular test to 40 seconds, it will
test.slow() // this will mark the test as slow, it will increase the timeout for this test to 60 seconds
const successButton = page.locator(".bg-success")
await successButton.click({timeout: 16000})


})