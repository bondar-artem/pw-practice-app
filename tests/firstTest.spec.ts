import {test} from '@playwright/test';

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('suite1', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Charts').click();
    })
    test('the first test', async ({page}) => {
        await page.getByText('Form Layouts').click();
    })
    test('navigate to datapicker page', async ({page}) => {
        await page.getByText('Datapicker').click();
    })
})

test.describe('suite2', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click();
    })
    test('the first test2', async ({page}) => {
        await page.getByText('Form Layouts').click();
    })
    test('navigate to datapicker page', async ({page}) => {
        await page.getByText('Datapicker').click();
    })
})