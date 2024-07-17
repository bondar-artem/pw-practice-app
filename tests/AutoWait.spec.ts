import {test, expect} from "@playwright/test"


test.beforeEach(async({page}) => {
    await page.goto(process.env.URL)
    await page.getByText("Button Triggering AJAX Request").click()
})

test("Auto Waiting", async({page}) =>{
    const suceessButton  = page.locator("#content > p")

    //await suceessButton.click() //fail if the timeout is set >15 seconds(on plywright.config.ts) while the elemnt takes 15seconds

    const text = await suceessButton.textContent()  //auto waiting
    expect(text).toEqual("Data loaded with AJAX get request.")

    //await expect(suceessButton).toHaveText("Data loaded with AJAX get request.", {timeout: 20000})  //overide timeout to 20secs
})

test("Alternative Waits", async({page}) =>{
    const suceessButton  = page.locator("#content > p")

        // ___wait for an element
   // await page.waitForSelector("#content > p")   //waiting until selector/locator is available

    //Wait for particular Reponse
    //await page. waitForResponse("http://localhost:3000/ajaxdata")   //waiting until network response url is aivalilable

    //wait for all network calls to be completed ie all API calls are complete(not recommended)
    await page.waitForLoadState("networkidle")

    const text = await suceessButton.textContent()  
    expect(text).toEqual("Data loaded with AJAX get request.")
})

