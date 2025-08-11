import { expect, Page } from "@playwright/test";

export class DatePickerPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    const datePickerInputField = this.page.getByPlaceholder("Form Picker");
    await datePickerInputField.click();
    const dateToAssert = await this.selectDateInTheCalendar(
      numberOfDaysFromToday
    );

    await expect(datePickerInputField).toHaveValue(dateToAssert);
  }

  async selectDatePickerWithRangeFromToday(
    startDayFromToday: number,
    endDayFromToday: number
  ) {
    const datePickerInputField = this.page.getByPlaceholder("Range Picker");
    await datePickerInputField.click();
    const dateToAssertStart = await this.selectDateInTheCalendar(
      startDayFromToday
    );

    const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday);

    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;

    await expect(datePickerInputField).toHaveValue(dateToAssert);
  }

  private async selectDateInTheCalendar(numberOfDaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);
    const expectDate = date.getDate().toString();
    const expectMonthShort = date.toLocaleString("En-US", { month: "short" });
    const expectMonthLong = date.toLocaleString("En-US", { month: "long" });
    const expectYear = date.getFullYear();
    const dateToAssert = `${expectMonthShort} ${expectDate}, ${expectYear}`;
    console.log("dateToAssert", dateToAssert);
    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMonthAndYear = ` ${expectMonthLong} ${expectYear} `;

    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page.locator('nb-icon [data-name="chevron-right"]').click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    await this.page
      .locator(".day-cell.ng-star-inserted:not(.bounding-month)")
      .getByText(expectDate, { exact: true })
      .click();

    return dateToAssert;
  }
}
