import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200')
})

test.describe('User Fasing Locators', () => {
    test('User-facing locators', async ({page}) => {
        // by text (partial match)
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        // by text exact match  ==>  page.getByText('15', {exact: true}).click()

        // by Role
        await page.getByRole('textbox', {name: 'Email'}).first().click()
        await page.getByRole('button', {name: 'SUBMIT'}).first().click()
        // by Label
        await page.getByLabel('Email').first().click()
        // by placeholder
        await page.getByPlaceholder('Jane Doe').click()
        // by Test ID
        await page.getByTestId('signIn').click()
        // by title
        await page.getByTitle('IoT Dashboard').click()
    })
})

test.describe('Child-Parent Locators', () => {
    test('locating child elements', async ({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    // another way is to chain
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    // we also can mix methods
    // await page.locator('nb-card').getByText('Forms').click()

    // we also can use ind but try to avoid cause order can be changed
    await page.locator('nb-card').nth(3).getByRole('button').click()
    })

    test('locating parent elements', async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
        // filtering by text
        await page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'}).click()
        // filtering by locator
        await page.locator('nb-card', {has: page.locator('#inputPassword2')}).getByRole('textbox', {name: 'Password'}).click()
        // using filter method
        await page.locator('nb-card').filter({hasText: 'Basic form'}).getByRole('textbox', {name: 'Email'}).click()
        await page.locator('nb-card').filter({has: page.locator('.status-danger')}).getByRole('textbox', {name: 'Password'}).click()

        await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'SIGN IN'}).getByRole('textbox', {name: 'Password'}).click()
    })
})  

test('Reusing Locators', async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: 'Basic form'})
    const emailField = basicForm.getByRole('textbox', {name: 'Email'})

    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    await emailField.fill('test@test.com')
    await basicForm.getByRole('textbox', {name: 'Password'}).fill('2345pass')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('test@test.com')
})

