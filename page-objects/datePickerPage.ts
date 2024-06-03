import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase  {

  constructor(page: Page) {
    super(page)
  }

  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    const calenderInputField = this.page.getByPlaceholder('Form Picker');
    await calenderInputField.click();
    const dateToAssert = await this.selectDatInTheCalendar(numberOfDaysFromToday);

    await expect(calenderInputField).toHaveValue(dateToAssert);
  }

  async selectdatePickerWithRangeFromToday(startDayFromToday: number, endDayFromToday: number) {
    const calenderInputField = this.page.getByPlaceholder('Range Picker');
    await calenderInputField.click();
    const dateToAssertStart = await this.selectDatInTheCalendar(startDayFromToday);
    const dateToAssertEnd = await this.selectDatInTheCalendar(endDayFromToday);

    const dateToAssert = 	`${dateToAssertStart} - ${dateToAssertEnd}`;
    await expect(calenderInputField).toHaveValue(dateToAssert);
  }

  private async selectDatInTheCalendar(numberOfDaysFromToday: number) {
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday);
    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString('En-Us', { month: 'short' });
    const expectedMonthLong = date.toLocaleString('En-Us', { month: 'long' });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page.locator('nb-calendar-view-node').textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
    while (!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
      calendarMonthAndYear = await this.page.locator('nb-calendar-view-node').textContent();
    }

    await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).click();
    return dateToAssert;
  }
}
