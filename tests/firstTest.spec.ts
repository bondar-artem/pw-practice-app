import {test} from '@playwright/test'

// test.beforeAll(() => {
// })

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Test suite 1', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Charts').click()
    })

    test('Suite 1 Test 1', async ({page}) => {
        await page.getByText('Form Layouts').click()
    })
    
    test('Suite 1 Test 2', async ({page}) => {
        await page.getByText('Datepicker').click()
    })
})

test.describe('Test suite 2', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })

    test('Suite 1 Test 1', async ({page}) => {
        await page.getByText('Form Layouts').click()
    })
    
    test('Suite 1 Test 2', async ({page}) => {
        await page.getByText('Datepicker').click()
    })
})

// test.afterEach(() => {
// })

// test.afterAll(() => {
// })