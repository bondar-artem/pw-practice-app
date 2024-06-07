import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('suite1', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })
    
    test ('the first test', async ({page}) => {
        await page.getByText('Form Layouts').click()
    })
    
    test('navigate to datepicker page',async ({page}) =>{
        await page.getByText('Datepicker').click()
    })
})

test.describe('suite2', () => {
    test.beforeEach(async({page}) => {
        await page.getByText ('Charts').count()
    })
    
    test ('the first test1', async ({page}) => {
        await page.getByText('Echarts').click()
    })
    
    test('navigate to datepicker page1',async ({page}) =>{
        await page.getByText('Datepicker').click()
    })
})