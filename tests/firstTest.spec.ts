import {test} from  '@playwright/test'

test.beforeEach(async({page})=> {
    await page.goto('http://localhost:4200/')
})

//test.beforeAll(() => {

//})
//test.afterEach( () => {

//}) - not recommended
test.describe('test suite 1', () => {
test('the first test', async({page}) => {

    await page.getByText('Form Layouts').click()
})

test('navigate to Date Picker', async({page}) => {
    await page.getByText('Datepicker').click()
    })
})

test.describe('test suite 2', () => {
        test.beforeEach('go to charts', async({page}) => {
           await page.getByText('Charts').click() 
        })
        
    test('the second test', async({page}) => {
        await page.getByText('Echarts').click() 
        
    })

    test('navigate to Date Picker', async({page}) => {
        await page.getByText('Datepicker').click()
        })
})