import { Locator, Page } from "@playwright/test";
// This file defines a NavigationPage class that encapsulates navigation methods for a web application.

export class NavigationPage {
    private readonly page: Page;
    readonly fromLayoutsMenuItem: Locator
    readonly datePickerMenuItem: Locator
    readonly smartTableMenuItem: Locator
    readonly toastrMenuIteam: Locator
    readonly tooltipMenuItem: Locator

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
    async selectgroupMenuItem(groupItemTitle: string) {
        const menuItem = this.page.locator(`a[title="${groupItemTitle}"]`);

        // Ensure the element is visible and ready for interaction
        //await expect(menuItem).toBeVisible({ timeout: 10000 });  // Wait for visibility

        // Check if the menu is expanded, if not, click to expand
        const expandedState = await menuItem.getAttribute('aria-expanded');
        if (expandedState === "false") {
            await menuItem.click();
        }
    }


}

