import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }
  async selectCommonDatePickerFromToday(numberofDaysFromToday: number) {
    const calendarinput = this.page.getByPlaceholder("Form Picker");
    await calendarinput.click();
    const dateToAssert = await this.selectDateInTheCalendar(
      numberofDaysFromToday,
    );
    await expect(calendarinput).toHaveValue(dateToAssert);
  }

  async selectDatepickerWithRangeFromToday(
    startDayFromToday: number,
    endDayFromToday: number,
  ) {
    const calendarinput = this.page.getByPlaceholder("Range Picker");
    await calendarinput.click();
    const dateToAssertStart =
      await this.selectDateInTheCalendar(startDayFromToday);
    const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday);
    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;

    await expect(calendarinput).toHaveValue(dateToAssert);
  }

  private async selectDateInTheCalendar(numberofDaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberofDaysFromToday);
    const expectedDate = date.getDate().toString();
    const expectedMonthShot = date.toLocaleString("EN-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("EN-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShot} ${expectedDate}, ${expectedYear}`;

    let calendarMonthandYear = (await this.page
      .locator("nb-calendar-view-mode")
      .textContent())!;
    const expectedMonthandYear = `${expectedMonthLong} ${expectedYear}`;

    while (!calendarMonthandYear.includes(expectedMonthandYear)) {
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      calendarMonthandYear = (await this.page
        .locator("nb-calendar-view-mode")
        .textContent())!;
    }
    await this.page
      .locator(".day-cell.ng-star-inserted")
      .getByText(expectedDate, { exact: true })
      .click();
    return dateToAssert;
  }
}
