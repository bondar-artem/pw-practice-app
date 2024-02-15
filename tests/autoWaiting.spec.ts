import { test, expect } from '@playwright/test'
import { time } from 'console'
import { switchAll } from 'rxjs/operators'

test.beforeEach(async ({ page },testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout+2000)

})

test('auto waiting', async ({ page }) => {
    const succesButton = page.locator('.bg-success')
    //  await succesButton.click()

    //  const text =await succesButton.textContent()
    //await succesButton.waitFor({ state: "attached" })
    // const text = await succesButton.allTextContents()
    // expect(text).toContain('Data loaded with AJAX get request.')

    await expect(succesButton).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })
})

test('alternative waits', async ({ page }) => {
    const succesButton = page.locator('.bg-success')

    //  __wait for element
    await page.waitForSelector('.bg-success')

    // __wait for particular response
    //  await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // wait for network calls to be competed ('NOT RECOMMENED')
    //  await page.waitForLoadState('networkidle')


    const text = await succesButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})

test('timeout', async ({ page }) => {
    //  test.setTimeout(20000)
    test.slow()
    const succesButton = page.locator('.bg-success')
    await succesButton.click()

})
