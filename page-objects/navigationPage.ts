import { Locator, Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class NavigationPage extends HelperBase {
    
    //readonly page: Page
    readonly formLayoutsMenuItem: Locator 
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly tooltipMenuItem: Locator
    readonly toasterMenuItem: Locator


    constructor(page: Page) {
        //this.page = page
        super(page)
        this.formLayoutsMenuItem = page.getByText('Form Layouts')
        this.datePickerMenuItem = page.getByText('Datepicker')
        this.smartTableMenuItem = page.getByText('Smart Table')
        this.toasterMenuItem = page.getByText('Toastr')
        this.tooltipMenuItem = page.getByText('Tooltip')
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')
        await this.formLayoutsMenuItem.click()
        //now this method from the HelperBase is available
        await this.waitForNumberOfSeconds(2)  
    }

    async datePickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.datePickerMenuItem.click()
    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.smartTableMenuItem.click()
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.toasterMenuItem.click()
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.tooltipMenuItem.click()
    }

    private async selectGroupMenuItem(groupItemtitle: string) {
        const groupmenuItem = this.page.getByTitle(groupItemtitle)
        const expandedState = await groupmenuItem.getAttribute('aria-expanded')
        if(expandedState === 'false') {
            await groupmenuItem.click()
        }
    }
}