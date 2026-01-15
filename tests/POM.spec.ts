import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate thru the menu', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('Parametrized methods - Using the grid form', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome123', 'Option 1')
})

test('Parametrized methods - Unline form', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('jane kale', 'testanetest.com', true)
})

test('Common datePicker', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().datePickerPage()
    await pm.ondatePickerPage().selectFromCommonDatePickertFromToday(1)
})

test('Range datePicker', async ({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().datePickerPage()
    await pm.ondatePickerPage().selectDatePickerWithRangeFromToday(1, 4)
})