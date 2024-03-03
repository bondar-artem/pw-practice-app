import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ browser }) => {
//   page = await browser.newPage();
// });


test('Login',async ({ page }) => {
  await page.goto('https://stg-marketplace-shell.npa.kar-services.io/')
  await page.locator('#okta-signin-username').click()
  await page.locator('#okta-signin-username').fill('ompoltestuser1@outlook.com')
  await page.locator('#okta-signin-password').fill('Traderev1!')
  await page.locator('#okta-signin-submit').click()
  await page.waitForLoadState("load")
  //await page.waitForTimeout(10000)
  //await page.reload()
  await page.locator(':text("Browse")').nth(1).click();
  await expect(page.locator(':text("Browse")').nth(1)).toBeVisible();
  //await page.locator(':text("Browse")').getByTestId('header-heading').click();
  //await expect(page.getByTestId('header-heading')).toBeVisible();
});


// test('Login verification', async ({ page }) => {
//   await page.goto('https://app.stg.openlane.ca/?tab=active')
  
// });

// test('auto-wait', async ({ page }) => {
//   await page.goto('http://uitestingplayground.com/ajax')
//   const text= await page.locator('.bg-success').textContent()
//   expect(text).toContain('Data loaded')

// });

