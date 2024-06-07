import { expect, test } from '@playwright/test'
import { PageManager } from '../POM/pageManager'


test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
    
})

test('navigate to form page', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datepickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized method', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().formLayoutsPage();
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('tesdt@test.com', 'Welcome1', 'Option 2');
    await pm.onFormLayoutsPage().submitInLineFormWithNameEmailAndCheckBox('John Smith', 'John@test.com', true);
    await pm.navigateTo().datepickerPage();
    await pm.onDatePickerPage().selectCommandDatePickerDateFromToday(5);
    await pm.onDatePickerPage().selectDatePickerWithRangeFromToday(6, 15);
});



