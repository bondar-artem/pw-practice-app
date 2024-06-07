import {test} from '@playwright/test'



//single test
test('the first test',async ({page}) =>{
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('navigate to datepicker page',async ({page}) =>{
    await page.goto('http://localhost:4200/');
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()
})
/*
//test suite
test.describe('test suite',() =>{
    test('the first test',() =>{

    })
})
*/