import { expect, test } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormnLayoutsPage } from "../page-objects/formLayoutPage";
import { DatePickerPage } from "../page-objects/datepickerPage";

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('navigate to form page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datepickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('parametrized methods', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormnLayoutsPage(page)
    const onDatepickerPage = new DatePickerPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelecOption("test@test.com", "Welcome1", "Option 1")
    await onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('Johnt Smith','joht@test.com', true)

    await navigateTo.datepickerPage()
    await onDatepickerPage.selectCommonDatePickerDateFromToday(5)
    await onDatepickerPage.SelectDatePickerWithRangeFromToday(6,10)
})



