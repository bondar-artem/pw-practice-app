import { test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/pages/iot-dashboard');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
});
test('Locator syntax rule', async ({ page }) => {
    //by tag name
    await page.locator('input').first().click();
    //by Id
    await page.locator('#inputEmail1');
    //by class value
    await page.locator('.shape-rectangle');
    //by attribute
    await page.locator('[placeholder="Email"]');
    //by Class value (full)
    await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');
    //by different attributes
    await page.locator('input[placeholder="Email"][nbinput]');
    //by xpath (NOt recommended)
    await page.locator('//input[@placeholder="Email"]');
    //by partial text
    await page.locator(':text("Using")');
    //by text
    await page.locator('text=Using the Grid');

});
test('user interface actions', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Email' }).first().click();
    
    await page.getByRole('button', { name: 'Sign in' }).first().click();

    await page.getByLabel('Email').first().click();

    await page.getByPlaceholder('Jane Doe').click();

    await page.getByText('Using the Grid').click();

    await page.getByTestId('Signin').click()

    await page.getByTitle('IoT Dashboard').click();

});
test('locator child', async ({ page }) => {
 await page.locator('nb-card nb-radio :text-is("Option 1")').click();
});
