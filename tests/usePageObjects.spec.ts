import {test, expect} from '@playwright/test'
import { PageManager } from '../pageobjects/pageManager'
import {faker} from '@faker-js/faker'


test.beforeEach(async({page}) => {
    await page.goto('/')
})

test('navigate to form page @smoke @regression', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().toolTip()      
})

test('parameterized method @smoke', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`


    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().usingtheGridForm(process.env.USERNAME,process.env.PASSWORD, 'Option 2')
    await pm.onFormLayoutsPage().InlineForm(randomFullName, randomEmail, false)

    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'}) //how to take screenshot and create it in a file

    const buffer = await page.screenshot()
    console.log(buffer.toString('base64'))

    await pm.onFormLayoutsPage().InlineForm(randomFullName, randomEmail, true)

    await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inLineForm.png'})

    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommmonDatePickerDateFromToday(10)
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(6, 15)
})

test.only('testing with argos ci', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()  
})