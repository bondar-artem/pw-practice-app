import { test } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:4200/");
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});

test('Locator syntax rules', async ({page}) => {
    // By Tag name - find all inputs
    await page.locator('input').first().click();

    // By Id
    await page.locator('#inputEmail').click();

    // By Class Value
    await page.locator('.shape-rectangle').nth(22).click();

    // By Attribute
    await page.locator('[placeholder="Email"]').nth(1).click();

    // By Full Class Value
    await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]').first().click();

    // By combination
    await page.locator('input[placeholder="Email"][nbinput]').first().click();

    // By XPath (NOT RECOMMENDED)
    await page.locator('//input[@id="inputEmail"]').click();

    // By Partial Text
    await page.locator(':text("Using")').click();

    // By Exact Text
    await page.locator(':text-is("Using the Grid")').click();
});

test('User facing locators', async({page}) => {
    await page.getByRole('textbox', {name: "Email"}).nth(1).click();
    await page.getByRole('button', {name: "Sign in"}).first().click();

    await page.getByLabel('Email').first().click();

    await page.getByPlaceholder('Jane Doe').click();

    await page.getByText('Using the Grid').click();

    await page.getByTestId('SignIn').click();

    await page.getByTitle('IoT Dashboard').click();
});
