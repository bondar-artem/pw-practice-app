import {Locator, Page} from '@playwright/test';

export class NavigationPage{

    readonly page: Page
    readonly formLayoutsMenuItem : Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuItem: Locator
    readonly tooltipMenuItem: Locator


    constructor(page: Page){
        this.page = page
        this.formLayoutsMenuItem =page.getByText('Form Layouts')
    }

    async formLayoutsPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datepickerPage(){
        await this.selectGroupMenuItem('Forms')
        await this.page.waitForTimeout(1000)
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage(){
        await this.page.getByText('Tables & Data').click()
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        await this.page.getByText('Modal & Overlays').click()
        await this. page.getByText('Toastr').click()
    }

    async tooltipPage(){
        await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Tooltip').click()
    }

    private async selectGroupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState=="false"){
            await groupMenuItem.click()
        }
    }



}