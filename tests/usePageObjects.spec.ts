import { expect, test } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
})

// To run several tests with different tags, type in Powershell:
// npx playwright test --project=chromium --grep --% "@block^|@smoke"

test('Navigate to form page @smoke @regression', async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datepickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastPage();
  await pm.navigateTo().tooltipPage();
});


test('Parametrized methods, option 1 @smoke', async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().formLayoutsPage();
  await pm.onFormLayoutPage().submitUsinTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2');
  await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox('Jon Smith', 'jon@test.com', false);
  await pm.navigateTo().datepickerPage();
  // await onDatepickerPage.selectCommonDatePickerDateFromToday(10);
  await pm.onDatepickerPage().selectdatePickerWithRangeFromToday(6, 15);
})

test('Parametrized methods, option 2', async ({ page }) => {
  const pm = new PageManager(page);
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`;

  await pm.navigateTo().formLayoutsPage();
  await pm.onFormLayoutPage().submitUsinTheGridFormWithCredentialsAndSelectOption('tesdt@test.com', 'Welcome1', 'Option 2');
  await page.screenshot({ path: `screenshots/${randomEmail}.png` });
  const buffer = await page.screenshot();
  console.log(buffer.toString('base64'));
  await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false);
  await page.locator('nb-card', { hasText: "Inline form" }).screenshot({ path: `screenshots/InlineForm${randomEmail}.png` });
  // await pm.navigateTo().datepickerPage();
  // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10);
  // await pm.onDatepickerPage().selectdatePickerWithRangeFromToday(6, 10);
})



