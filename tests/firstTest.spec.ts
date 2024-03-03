import { test, expect } from '@playwright/test';

test.beforeEach( async ({ page }) => {
  await page.goto('http://localhost:4200/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
});

/*
test('Locator syntax rules', async ({ page }) => {
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
*/

test('User facing locators', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Email' }).first().click();
  // await page.getByTestId('HC').first().click();
  // await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click() 
  // await page.locator('nb-card').getByRole('button',{name:"Sign in"}).first()
  await page.locator('nb-card',{hasText:"Using"}).getByRole('textbox',{name:"Email"}).click()
  //await page.getByRole('button', { name: "Sign in" }).first().click();

});


