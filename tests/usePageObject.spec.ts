import { test, expect } from '@playwright/test';
import { NavigationPage } from '../pages/navigationPage';

test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:4200")
})

test('navigate to Form Layout', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.FormLayoutsPage()
})