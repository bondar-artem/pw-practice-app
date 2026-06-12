import { test, expect } from "@playwright/test";
test.beforeEach(async ({ page }, testInfo) => {
  await page.goto("http://localhost:4200/");
});
test.describe("Forms Layout Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("input fields", async ({ page }) => {
    const usingGridEMailInput = page
      .locator("nb-card", { hasText: "using the grid" })
      .getByRole("textbox", { name: "Email" });
    await usingGridEMailInput.fill("test@test.com");
    await usingGridEMailInput.clear();
    await usingGridEMailInput.pressSequentially("test2@test.com", {
      delay: 200,
    });

    //generic assertion
    const inputValue = await usingGridEMailInput.inputValue();
    expect(inputValue).toEqual("test2@test.com");

    //Locator assertion
    await expect(usingGridEMailInput).toHaveValue("test2@test.com");
  });

  test("radio buttons", async ({ page }) => {
    const usingGridEMailInput = page.locator("nb-card", {
      hasText: "using the grid",
    });

    // await usingGridEMailInput.getByLabel("Option 1").check({ force: true })
    await usingGridEMailInput
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });
    const radioStatus = await usingGridEMailInput
      .getByRole("radio", { name: "Option 1" })
      .isChecked();
    expect(radioStatus).toBeTruthy();
    await expect(
      usingGridEMailInput.getByRole("radio", { name: "Option 1" }),
    ).toBeChecked();
    await usingGridEMailInput
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });
    expect(
      await usingGridEMailInput
        .getByRole("radio", { name: "Option 2" })
        .isChecked(),
    ).toBeTruthy();
    expect(
      await usingGridEMailInput
        .getByRole("radio", { name: "Option 1" })
        .isChecked(),
    ).toBeFalsy();
  });
});

test("checkboxes", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();
  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .uncheck({ force: true });
  await page
    .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
    .check({ force: true });

  const allboxes = page.getByRole("checkbox");
  for (const box of await allboxes.all()) {
    await box.uncheck({ force: true });
    expect(await box.isChecked()).toBeFalsy();
  }
});

test("list amd dropdowns", async ({ page }) => {
  const dropdownMenu = page.locator("ngx-header nb-select");
  await dropdownMenu.click();
  page.getByRole("list"); //when list has a UL tag
  page.getByRole("listitem"); //when list has a LI tag

  //const optionList =page.getByRole('list').locator('nb-option')
  const optionList = page.locator("nb-option-list nb-option");
  await expect(optionList).toHaveText(
    ["light", "Dark", "cosmic", "Corporate"],
    { ignoreCase: true },
  );
  await optionList.filter({ hasText: "Cosmic" }).click();
});
test("Dialog box test", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");
    dialog.accept();
  });
  await page
    .getByRole("table")
    .locator("tr", { hasText: "mdo@gmail.com" })
    .locator(".nb-trash")
    .click();
});

test("web tables test", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  // 1. Get the row by any text in the row
  const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
  await targetRow.locator(".nb-edit").click();
  await page.locator("input-editor").getByPlaceholder("Age").clear();
  await page.locator("input-editor").getByPlaceholder("Age").fill("35");
  await page.locator(".nb-checkmark").click();

  // 2. Get the row based on the value in the specific column
  await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
  const targetRowById = page
    .getByRole("row", { name: "11" })
    .filter({ has: page.locator("td").nth(1).getByText("11") });
  await targetRowById.locator(".nb-edit").click();
  await page.locator("input-editor").getByPlaceholder("E-mail").clear();
  await page
    .locator("input-editor")
    .getByPlaceholder("E-mail")
    .fill("test@test.com");
  await page.locator(".nb-checkmark").click();
  await expect(targetRowById.locator("td").nth(5)).toHaveText("test@test.com");

  // 3. Test filter of the table
  const ages = ["20", "30", "40", "200"];
  for (const age of ages) {
    await page.locator("input-filter").getByPlaceholder("Age").clear();
    await page.locator("input-filter").getByPlaceholder("Age").fill(age);
    await page.waitForTimeout(500);
    const ageRows = page.locator("tbody tr");

    for (let row of await ageRows.all()) {
      const cellValue = await row.locator("td").last().textContent();
      if (age == "200") {
        expect(await page.getByRole("table").textContent()).toContain(
          "No data found",
        );
      } else {
        expect(cellValue).toEqual(age);
      }
    } // Closes: for (let row of ...)
  } // Closes: for (const age of ...)
}); // Closes: test("web tables test", ...)

test("Date picker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const calendarinput = page.getByPlaceholder("Form Picker");
  await calendarinput.click();

  let date = new Date();
  date.setDate(date.getDate() + 27);
  const expectedDate = date.getDate().toString();
  const expectedMonthShot = date.toLocaleString("EN-US", { month: "short" });
  const expectedMonthLong = date.toLocaleString("EN-US", { month: "long" });
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`;

  let calendarMonthandYear =
    (await page.locator("nb-calendar-view-mode").textContent()) || "";
  const expectedMonthandYear = `${expectedMonthLong} ${expectedYear}`;

  while (!calendarMonthandYear.includes(expectedMonthandYear)) {
    await page
      .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
      .click();
    calendarMonthandYear =
      (await page.locator("nb-calendar-view-mode").textContent()) || "";
  }
  await page
    .locator(".day-cell.ng-star-inserted")
    .getByText(expectedDate, { exact: true })
    .click();
  await expect(calendarinput).toHaveValue(dateToAssert);
});
