import {test, expect} from "@playwright/test"
import { PageManager } from "../page-objects/pageManager"
import { faker } from "@faker-js/faker"


test.beforeEach(async({page}) =>{   
    await page.goto("http://localhost:4200/")
    
}) 
test("navigate to form page", async({page}) =>{
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().SmartTablePage()
    await pm.navigateTo().toolTipsPage()
    await pm.navigateTo().toastrPage()
})

test("parametrized objects", async({page}) =>{
    const pm = new PageManager(page)
    const fullRandomName = faker.person.fullName()
    const randomEmail = `${fullRandomName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingGridFormandCredentialWithSelectOption(process.env.USERNAME, process.env.PASSWORD, "option 1")  //from .env file
    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})                         //creates scereenshots on folder gien with given filename
    await pm.onFormLayoutsPage().submitUsingInlineFormandCredentialWithCheck(fullRandomName, randomEmail, false)  //from faker
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerFromToday(30)
    await pm.onDatePickerPage().selectDatePickerwithRangefromToday(10, 23)

})


