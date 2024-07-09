import{test, expect} from "@playwright/test"

test.beforeEach(async({page}, testInfo) => {
    await page.goto("http://localhost:3000/ajax")
    await page.getByText("Button Triggering AJAX Request").click()
    testInfo.setTimeout(testInfo.timeout + 10000)  // Adds 10 secs timeout for each tests int his suite
})

test("Timeouts", async({page}) =>{
    test.setTimeout(10000)  //Timeout for the whole test---will fail since the timeout for whole test is lower than action timeout

    const suceessButton  = page.locator("#content > p")
    await suceessButton.click({timeout: 16000})  //Action Timeout for this click  -overides setting on configs

})

test("Slow timeouts", async({page}) =>{

    test.slow()                                        //SLOW() multiples default Action timeout on configs *3 ie if set 10secs on config then it will be 30secs
    const suceessButton  = page.locator("#content > p")
    await suceessButton.click()                         //Action Timeout for this click  -overides setting on configs
})