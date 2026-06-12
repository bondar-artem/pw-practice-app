import { test, expect } from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("navigate to form page", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await pm.navigateTo().datePickerPage();
  await pm.navigateTo().smartTablePage();
  await pm.navigateTo().toastrPage();
  await pm.navigateTo().tooltipPage();
});

test("parametrized methods", async ({ page }) => {
  const pm = new PageManager(page);
  await pm.navigateTo().formLayoutsPage();
  await pm
    .onformLayoutPage()
    .submitUsingTheGridWithCreadentialsAndSelectOption(
      "Test@test.com",
      "Welcome1",
      "Option 2",
    );
  /**
   * This method fill out for user details
   * @param name - should be first and last name
   * @param email - valid email for the test user
   *@param rememberMe -checkbox
   */
  await pm
    .onformLayoutPage()
    .submitInlineFormwithNameEmailAndCheckbox(
      "John Smith",
      "John@test.com",
      true,
    );

  await pm.navigateTo().datePickerPage();
  await pm.ondatepickerPage().selectCommonDatePickerFromToday(30);
  await pm.ondatepickerPage().selectDatepickerWithRangeFromToday(6, 6);
});
