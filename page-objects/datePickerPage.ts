import{ Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatePicker extends HelperBase{

    constructor(page: Page) {
        super(page)
    }
async datePickerFunctionCommon(numberOfDaysfromToday: number){
    const calendarInputField = this.page.getByPlaceholder('Form Picker')
    await calendarInputField.click()
    const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysfromToday)
  
    await expect(calendarInputField).toHaveValue(dateToAssert);
}


async dateRangePickerFunction(numberOfDaysfromToday: number, endDatefromToday: number){
    const calendarInputField = this.page.getByPlaceholder('Range Picker')
    await calendarInputField.click()
    const dateToAssertStart = await this.selectDateInTheCalendar(numberOfDaysfromToday)
    const dateToAssertEnd = await this.selectDateInTheCalendar(endDatefromToday)
    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
    await expect(calendarInputField).toHaveValue(dateToAssert);
}



private async selectDateInTheCalendar(numberOfDaysfromToday: number) {
     let date = new Date()
    date.setDate(date.getDate() +numberOfDaysfromToday)
    const expectedDAte = date.getDate().toString()
    const expectedMonthshort = date.toLocaleString('En-US', { month: 'short'})
    const expectedYear = date.getFullYear().toString()

    const dateToAssert = `${expectedMonthshort} ${expectedDAte}, ${expectedYear}`

    const expectedMonthLong = date.toLocaleDateString('EN-us', {month: 'long'})

    let calendarMonthAndYear = await this.page.locator('[class="appearance-ghost size-medium shape-rectangle icon-end status-basic nb-transition"]').textContent()

    const expecteMonthandYear = ' ' + expectedMonthLong+ ' '+ expectedYear + ' '

    while(expecteMonthandYear != calendarMonthAndYear) {
        await this.page.locator('[class="next-month appearance-ghost size-medium shape-rectangle icon-start icon-end status-basic nb-transition"]').click();
        calendarMonthAndYear =  await this.page.locator('[class="appearance-ghost size-medium shape-rectangle icon-end status-basic nb-transition"]').textContent()
    } 
    await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDAte, {exact: true}).click();
    return dateToAssert
}
}