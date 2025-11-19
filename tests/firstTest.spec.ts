import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('/')
})

test.describe('suite1', () => {
    test.beforeEach(async({page}) => {
    await page.getByText('Charts').nth(0).click();
})

test('the first test', async({page}) => {  
    await page.getByText('ECharts').click()
})

})

test.describe('suite2', () => {
    test.beforeEach(async({page}) => {
    await page.getByText('Forms').click()
})

test('the first test2', async({page}) => {  
    await page.getByText('Form Layouts').click()
})

test('navigate to date picker page2', async({page}) => {
    await page.getByText('Datepicker').click()
})

})