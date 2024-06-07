import {test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:57729/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layout').click()
})

test('Locator syntax rules',async({page}) => {
    // by tag name
    await page.locator('input').first().click ()

    //by ID
    page.locator('#inputEmail').click()

    //by Class value
    page.locator('.shape-rectangle') //looking by class using the . at begin

    //by attribute
    page.locator('[placeholder="Email"]')

    //by Class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"')

    //combine different selectors
    page.locator('input[placeholder="Email"]')

    //by XPath
    page.locator('//*[@id="inputEmail"]')

    //by partial text match
    page.locator(':text("Using")')

    //by exact text
    page.locator(':text("Using the Grid"')
})

test('User facing locator', async({page}) => {
    // by role
    await page.getByRole('textbox', {name:"Email"}).first().click()
    await page.getByRole('button', {name:"Sign in"}).first().click() 

    //by label
    await page.getByLabel('Email').first().click()

    //by Placeholder
    await page.getByPlaceholder('Jane Doe').click()

    //by text
    await page.getByText('Using the Grid').click()

    //by Title
    await page.getByTitle('IoT Dashboard').click()

    await page.getByTestId('SignIn').click()
})