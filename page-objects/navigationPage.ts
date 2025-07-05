import { Page } from "@playwright/test";
// This file defines a NavigationPage class that encapsulates navigation methods for a web application.

export class NavigationPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;

    }
    async formLayoutsPage(page: Page) {
        await this.selectgroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
    }
    async datepickerPage() {
        await this.selectgroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
    }
    async smartTablePage() {

        await this.selectgroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }
    async toasttrPage() {
        await this.selectgroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()

    }
    async tooltipPage() {
        await this.page.getByText('Modal & Overlays').click()
        await this.page.getByText('Tooltip').click()

    }
    private async selectgroupMenuItem(groupItemTitle : string) {
        const menuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await menuItem.getAttribute('aria-expanded')
        if (expandedState == "false")
            await menuItem.click()
    }
}