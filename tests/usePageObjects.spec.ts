import { test, expect } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { formLayoutsPage } from '../page-objects/formLayoutsPage'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})
test('navigate to form page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage(page) //can be called again in other test
    await navigateTo.datepickerPage()
})
test('parametrized methods', async ({ page }) => {
    // Navigate to Form Layouts page
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new formLayoutsPage(page)
    navigateTo.formLayoutsPage(page)
    await expect(page.locator('text=Form Layouts')).toBeVisible();  // Add assertion 
    await onFormLayoutsPage.submitFormWithCredentials('tesdt@test.com', 'Welcome1', 'Option 1')
    await expect(page.locator('text= Inline Form')).toBeVisible();
    await onFormLayoutsPage.submitInlineFormsWithEmailAndCheckbox ('Job', 'John@test.com', true )
})