import {test, expect} from '@playwright/test'

test.beforeEach(async({page}, testInfo) => {
    await page.goto(process.env.URL)
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout + 2000) // modifies default timeout for +2 sec
})

test('Auto waiting', async({page}) => {
    const successButton = page.locator(':text-is("Data loaded with AJAX get request.")')
    //await successButton.click()
    //const text = await successButton.textContent()

    // await successButton.waitFor({state: "attached"})
    // const text = await successButton.allTextContents()
    // expect (text).toContain("Data loaded with AJAX get request.")

    await expect(successButton).toHaveText("Data loaded with AJAX get request.", {timeout: 20000})
})

test.skip('Alternative waits', async({page}) => {
    const successButton = page.locator(':text-is("Data loaded with AJAX get request.")')

    // wait for element
    await page.waitForSelector(':text-is("Data loaded with AJAX get request.")')

    // wait for particular responce (API)
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //wait for ALL network calls to be completed (not recomendet)
    //await page.waitForLoadState('networkidle')

    const text = await successButton.allTextContents()
    expect (text).toContain("Data loaded with AJAX get request.")
})

test.skip('Timeouts', async ({page}) => {
    //test.setTimeout(10000)
    test.slow() //multiply test timeout for 3
    const successButton = page.locator(':text-is("Data loaded with AJAX get request.")')
    await successButton.click({timeout: 16000})
})