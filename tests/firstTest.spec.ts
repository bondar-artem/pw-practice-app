import { test } from "@playwright/test";

test.beforeEach(async({page})=>{
    await page.goto('http://localhost:4200')
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click()
})

test('locator syntax rules', async({page})=>{ 
    //note that the locators are useless without an action and await 'cause an action is a promise, a locator is not

    //by tag name
   //await page.locator('input').click() //return all inputs so the click will return an error, but...

   await page.locator('input').first().click() //will return ok

    //by ID
     page.locator('#inputEmail1')

    //by class
    page.locator('.shape-rectangle')//return all inputs with this class

    //by atribute
    page.locator('[placeholder="Email"]')

    //by full class value
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //combine different selectors. no space between selectors
    page.locator('input[placeholder="Email"][nbinput]')

    //by xpath (not recommended)
    page.locator('//*[@id="inputEmail1"]')

    //parcial text match
    page.locator(':text("Using")')

    //by exact text match
    page.locator(':text-is("Using the Grid")')

})

test('user facing locators',async ({page}) => {
    await page.getByRole('textbox', {name:"Email"}).first().click()
})