import {test} from "@playwright/test"

test.beforeEach(async({page}) =>{   //used for repetative code on each test eg opening url  /* test.beforeAll can be used for all tests */
    await page.goto("http://localhost:4200/")
    await page.getByText("Forms").click() 
}) 

test("First Test", async({page}) =>{
    //await page.goto("http://localhost:4200/") -- already on beforeEach method
   // await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
})

test("Open Datepicker range", async({page}) =>{
   // await page.goto("http://localhost:4200/")  ---- already on beforeEach method 
    // await page.getByText("Forms").click()
    await page.getByText("Datepicker").click()
})


test.describe('Suite1', () => { // using test Suite to add before Each for a group of tests with a silar dependancy
    test.beforeEach(async({page}) =>{   // required by all the tests in this suite
        await page.goto("http://localhost:4200/")
        await page.getByText("Forms").click() 
    })
    test("Test1", async({page}) =>{
    await page.getByText("Form Layouts").click()
        })
    test("Test2", async({page}) =>{
            await page.getByText("Datepicker").click()
        })
    })

    test.describe.only('SuiteTwo', () => {   //using .only will execute just this test suite when the tests are run
        test.beforeEach(async({page}) =>{   // required by all the tests in this suite
            await page.goto("http://localhost:4200/")
            await page.getByText("Modal & Overlays").click() 
        })
        test("TestOne", async({page}) =>{
        await page.getByText("Dialog").click()
            })
        test("TestTwo", async({page}) =>{
                await page.getByText("Window").click()
             })
     })
