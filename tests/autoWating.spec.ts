import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    const requestButton = page.getByRole('button', {name: 'Button Triggering AJAX Request'})
    await requestButton.click()
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto waiting', async ({page}) => {
    const successMessage = page.locator('.bg-success')

    await successMessage.waitFor({state: "attached"})
    const text = await successMessage.allTextContents()

    await expect(text).toContain('Data loaded with AJAX get request.')
})

test('alternative waiting', async ({page}) => {
    const successMessage = page.locator('.bg-success')
    // ___wait for element
    // await page.waitForSelector('.bg-success')

    // ___wait for particular response:
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // ___wait for network calls to be complete (NOT RECOMMEND)
    await page.waitForLoadState('networkidle')

    await expect(successMessage).toHaveText('Data loaded with AJAX get request.')
})

test('timeouts', async ({page}) => {
    // test.setTimeout(10000)
    test.slow()
    const successMessage = page.locator('.bg-success')
    await successMessage.click()
})