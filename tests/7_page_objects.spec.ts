import {test, expect} from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';

test.beforeEach(async({page}, testInfo) => {
    await page.goto('http://localhost:4200/')
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
    
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome', 'Option 1')

    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('John Smith', 'john@test.com', true)  
})

test('Parametrized datepicker', {tag: '@cal'}, async({page}) => {
    const pm = new PageManager(page)

    await pm.navigateTo().datepickerPage()
    await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(10)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15)
})