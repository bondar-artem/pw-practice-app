import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}, testInfo) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.locator('#ajaxButton').click()

    // we increased test timeout for this test suite for 2 sec
    testInfo.setTimeout(testInfo.timeout + 2000)
})

test('auto waiting', async ({page}) => {
    // default timeout is 30 sec
    const successButton = page.locator('.bg-success')
    await successButton.click()

    const successMessage = await successButton.textContent()
    expect(successMessage).toEqual('Data loaded with AJAX get request.')
})

test.describe('auto waiting - alltextContent() method and Locator Assertion', () => {

    test('auto waiting - example with alltextContent() method FAIL', async ({page}) => {
        // default timeout is 30 sec
        const successMessage = page.locator('.bg-success')

        // allTextContents() method do not have auto-waiting mechnism!!!!!!!!!!!!!!!!!!!!!
        const successMessageText= await successMessage.allTextContents()
        // below assertion will fail cause allTextContents DID NOT WAIT FOR A TEXT TO SHOW UP!!!!!!!!!!
        expect(successMessageText).toContain('Data loaded with AJAX get request.')
    })

    test('auto waiting - example with alltextContent() method PASS', async ({page}) => {
        // default timeout is 30 sec
        const successMessage = page.locator('.bg-success')

        // we create addition waiting mechnism
        await successMessage.waitFor({state: 'attached'})

        const successMessageText= await successMessage.allTextContents()
        // below assertion will now pass
        expect(successMessageText).toContain('Data loaded with AJAX get request.')
    })

    test('auto waiting - example with alltextContent() method PASS alternative ways to fix', async ({page}) => {
        // default timeout is 30 sec
        const successMessage = page.locator('.bg-success')

        //___________ wait for element
        //await page.waitForSelector('.bg-success')

        //____________wait for a particular response
        await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

        //___________wait for all network calls to be completed NOT RECCOMMENDED!!!!!!!!!!!!
        // if some of the api calls that perhaps are not important for this particular functionality will be stuck test will fail
        //await page.waitForLoadState('networkidle')

        // ____________there are other waits available e.g. timeout but it is cardcoded NOT RECCOMMENDED!!!!!!!!!!!!!!
        //await page.waitForTimeout(25000)

        // allTextContents() method do not have auto-waiting mechnism!!!!!!!!!!!!!!!!!!!!!
        const successMessageText= await successMessage.allTextContents()

        expect(successMessageText).toContain('Data loaded with AJAX get request.')
    })

    test('auto waiting - default locator assertion is 5 sec FAIL', async ({page}) => {
        // default timeout is 30 sec
        const successMessage = page.locator('.bg-success')

        //default locator assertion is 5 sec so below assertion will fail
        await expect(successMessage).toHaveText('Data loaded with AJAX get request.', {timeout: 9000})
    })

    test('auto waiting - overwrite default locator assertion timeout PASS', async ({page}) => {
        // default timeout is 30 sec
        const successMessage = page.locator('.bg-success')

        //default locator assertion is 5 sec so below assertion will fail
        await expect(successMessage).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
    })

})

test('timeouts', async ({page}) => {
    // default test timeout is 30 sec
    // to overwrite test timeout for a particular test
    test.setTimeout(18000)

    // to increase test timeout by three times add test.slow()
    // test.slow() 

    const successButton = page.locator('.bg-success')
    await successButton.click({timeout: 17000})

    const successMessage = await successButton.textContent()
    expect(successMessage).toEqual('Data loaded with AJAX get request.')
})

test('waiting for page elements: el exist / visible', async ({page}) => {
    // our application “signals” the loaded state by setting a class name on the <BODY> element
    // nb-theme-default pace-done pace-done

    // confirm the app has loaded when the app sets the “pace-done” class on the body element 
    // el is visible
    // By default PW waitFor command checks if the element is visible
    await page.locator('body.pace-done').waitFor()

    await expect(page.locator('body.pace-done')).toBeVisible()

    // el is attached to the dom / check if element exists 
    await page.locator('body.pace-done').waitFor({state: 'attached'})
})