//Datepicker object page
import{Page, expect} from "@playwright/test"
import { HelperBase } from "./helperbase"

export class DatePickerPage extends HelperBase {   

    constructor(page: Page){
        super(page)  
    }

    async selectCommonDatePickerFromToday(numberOfDaysFromToday: number){
        const calendarInput =  this.page.getByPlaceholder("Form Picker")
        await calendarInput.click()
        const dateToCheck = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(calendarInput).toHaveValue(dateToCheck)
    }

    async selectDatePickerwithRangefromToday(startDayfromToday:number, endDateFromToday: number){
        const calendarInput =  this.page.getByPlaceholder("Range Picker")
        await calendarInput.click()
        const dateCheckStart = await this.selectDateInTheCalendar(startDayfromToday)
        const dateCheckEnd = await this.selectDateInTheCalendar(endDateFromToday)
        const dateToCheck = `${dateCheckStart} - ${dateCheckEnd}`
        await expect(calendarInput).toHaveValue(dateToCheck)
    }


    private async selectDateInTheCalendar(numberOfDaysFromToday: number){
        let date = new Date()   
        date.setDate(date.getDate() + numberOfDaysFromToday)
        const expectedDate =  date.getDate().toString()  //get current date as a string
        const expectedMonth =  date.toLocaleString("En-US", {month: 'short'})   //get Month as a string and short format
        const expectedYear =  date.getFullYear()  //get current year
    
        const dateToCheck = `${expectedMonth} ${expectedDate}, ${expectedYear}`   //const for whole date
    
        let calendarMonthYear = await this.page.locator("nb-calendar-view-mode").textContent()
        const expectMonthLong = date.toLocaleString("En-US", {month:"long"})   //get full month
        const expectedMonthandYear = `${expectMonthLong} ${expectedYear}`  //get month and year
    
        while(!calendarMonthYear.includes(expectedMonthandYear)){   
            await this.page.locator('[class="next-month appearance-ghost size-medium shape-rectangle icon-start icon-end status-basic nb-transition"]').click()
            calendarMonthYear = await this.page.locator("nb-calendar-view-mode").textContent()
        }
    
        await this.page.locator(".day-cell.ng-star-inserted").getByText(expectedDate, {exact:true}).click()
        return dateToCheck
    }

}