import {test, expect} from '@playwright/test';


test.beforeEach(async({page}, testInfo)=>{
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
    testInfo.setTimeout(testInfo.timeout +20000)
  })

  test ('auto waiting', async({page}) =>  {
    const successButton = page.locator('.bg-success')

    /* methods with wait
   //await successButton.click()
   //const text =  await successButton.textContent()
   //await successButton.waitFor({state:"attached"})
   //const text =  await successButton.allTextContents()
   //expect(text).toEqual('Data loaded with AJAX get request.')
   //expect(text).toContain('Data loaded with AJAX get request.')
   */

   await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
  })

  test ('alternative waits', async({page}) =>  {
    const successButton = page.locator('.bg-success')

    //___wait for element
    await page.waitForSelector('.bg-success')

    //____wait for particular responce
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //___wait for network call to be completed(not reccomended)
    await page.waitForLoadState('networkidle')


    const text =  await successButton.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

  })

  test ('timeouts', async({page}) =>  {
    //test.setTimeout(10000)
    test.slow()

    const successButton = page.locator('.bg-success')
    await successButton.click({timeout: 10000})

  })