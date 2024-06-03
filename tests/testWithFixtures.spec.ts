import { test } from '../test-options';
// import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker';

// test.beforeEach(async ({ page }) => {
//   await page.goto('/');
// })

// test('Parametrized methods, option 1', async ({ page }) => {
//   const pm = new PageManager(page);

//   await pm.navigateTo().formLayoutsPage();
//   await pm.onFormLayoutPage().submitUsinTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 2');
//   await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox('Jon Smith', 'jon@test.com', false);
//   await pm.navigateTo().datepickerPage();
//   // await onDatepickerPage.selectCommonDatePickerDateFromToday(10);
//   await pm.onDatepickerPage().selectdatePickerWithRangeFromToday(6, 15);
// })

test('Parametrized methods, option 2', async ({ pageManager }) => {
  // const pm = new PageManager(page);
  const randomFullName = faker.person.fullName();
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`;

  // await pm.navigateTo().formLayoutsPage();
  await pageManager.onFormLayoutPage().submitUsinTheGridFormWithCredentialsAndSelectOption('tesdt@test.com', 'Welcome1', 'Option 2');
  // await page.screenshot({ path: `screenshots/${randomEmail}.png` });
  // const buffer = await page.screenshot();
  // console.log(buffer.toString('base64'));
  await pageManager.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, false);
  // await page.locator('nb-card', { hasText: "Inline form" }).screenshot({ path: `screenshots/InlineForm${randomEmail}.png` });
  // await pm.navigateTo().datepickerPage();
  // await pm.onDatepickerPage().selectCommonDatePickerDateFromToday(10);
  // await pm.onDatepickerPage().selectdatePickerWithRangeFromToday(6, 10);
})



