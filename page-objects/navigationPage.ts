import { Page } from "@playwright/test";

export class NavigationPage {

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async formLayoutsPage(){
        await this.selectGoupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datepickerPage(){
        await this.selectGoupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage(){
        await this.selectGoupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage(){
        await this.selectGoupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage(){
        await this.selectGoupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectGoupMenuItem(groupItemTitle: string){
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if(expandedState == "false")
            await groupMenuItem.click()
    }

}