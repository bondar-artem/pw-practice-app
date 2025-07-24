import { test, expect } from '@playwright/test';
import { NavigationPage } from '../pages/navigationPage';
import { ForLayoutsPage } from '../pages/formLayoutsPage';

test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:4200")
})

test('navigate to Form Layout', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.FormLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('method parameterized', async ({page}) => {
    const formLayoutsPage = new ForLayoutsPage(page)
    const navigateTo = new NavigationPage(page)

    await navigateTo.FormLayoutsPage()
    await formLayoutsPage.inputFormUsingGridsWithCredentials('test@gamil.com', 'myPassword', 'Option 1')
    await formLayoutsPage.inputFormUsingInlineForm('Minh', 'masson@gmail.com', true)
})