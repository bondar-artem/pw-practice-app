import { Locator, Page, expect } from '@playwright/test'
import { HelperBase } from './helperBase'

export class DatePickerPage extends HelperBase {
    
    //private readonly page: Page
    
    constructor(page: Page) {
        //this.page = page
        super(page)
    }

    async selectFromCommonDatePickertFromToday(numberOfDaysFromToday: number) {
        const commonDatePickerInput = this.page.getByPlaceholder('Form Picker')
        await commonDatePickerInput.click()
        const dateToAssert = await this.selectDateInTheCalender(numberOfDaysFromToday)

        await expect(commonDatePickerInput).toHaveValue(dateToAssert)
    }

    async selectDatePickerWithRangeFromToday(startDateFromToday: number, endDateFromToday: number) {
        const rangeDatePickerInput = this.page.getByPlaceholder('Range Picker')
        await rangeDatePickerInput.click()
        const startDate = await this.selectDateInTheCalender(startDateFromToday)
        const endDate = await this.selectDateInTheCalender(endDateFromToday)
        const rangeDateToAssert = `${startDate} - ${endDate}`
        await expect(rangeDatePickerInput).toHaveValue(rangeDateToAssert)
    }

    private async selectDateInTheCalender(numberOfDaysFromToday : number) {
        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromToday)

        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode button').textContent()
        
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`

        while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode button').textContent()
        }
        await this.page.locator('[class*="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
        return dateToAssert
    }
}