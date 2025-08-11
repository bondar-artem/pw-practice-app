import { Page } from "@playwright/test";

export class NavigationPage {
    readonly page : Page;
    constructor(page : Page) {
        this.page = page;
    }

    async FormLayoutsPage() {
        await this.selectMenuTitle('Forms')
        await this.page.getByText('Form Layouts').click()
    }

    async datePickerPage() {
        await this.selectMenuTitle('Forms')
        await this.page.getByText('Datepicker').click()
    }

    async smartTablePage() {
        await this.selectMenuTitle('Tables & Data')
        await this.page.getByText('Smart Table').click()
    }

    async toastrPage() {
        await this.selectMenuTitle('Modal & Overlays')
        await this.page.getByText('Toastr').click()
    }

    async tooltipPage() {
        await this.selectMenuTitle('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
    }

    private async selectMenuTitle(menuTitle: string) {
        const groupMenuItem = this.page.getByTitle(menuTitle)
        const expandStatus = await groupMenuItem.getAttribute('aria-expanded')

        if (expandStatus == "false") {
            await groupMenuItem.click()
        }
    }
}

