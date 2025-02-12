import {test} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
})

test('Navigate to Form Layouts page', async ({page}) => {
    await page.getByText('Form Layouts').click()
})

test('Navigate to Datepicker page', async ({page}) => {
    await page.getByText('Datepicker').click()
})

test.describe('suite1', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:4200/')
        await page.getByText('Forms').click()
    })
    
    test('Navigate to Form Layouts page1', async ({page}) => {
        await page.getByText('Form Layouts').click()
    })
    
    test('Navigate to Datepicker page1', async ({page}) => {
        await page.getByText('Datepicker').click()
    })
})