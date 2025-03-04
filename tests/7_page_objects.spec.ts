import {test, expect} from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';
import {faker} from '@faker-js/faker';

test.beforeEach(async({page}, testInfo) => {
    await page.goto('/')
})

test('Navigate to page', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('Parametrized fillin methods', async({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(100)}@test.com`
    
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome', 'Option 1')
    // await page.screenshot({path: 'screenshots/formsLayoutsPage.png'}) // create screenshot 
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true) 
    // await page.locator('nb-card', {hasText: "Inline form"}).screenshot({path: 'screenshots/inlineForm.png'}) // creates a screenshot of particular area
})

test('Parametrized datepicker', {tag: '@cal'}, async({page}) => {
    const pm = new PageManager(page)

    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(10)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15)
})