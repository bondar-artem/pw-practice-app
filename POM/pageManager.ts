import { Page } from "@playwright/test";
import { NavigationPage } from '../POM/navigationPage';
import { FormLayoutsPage } from '../POM/formLayoutsPage';
import { DatepickerPage } from '../POM/datepickerPage';

export class PageManager {

    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly formLayoutsPage: FormLayoutsPage;
    private readonly datepickerPage: DatepickerPage;

    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(this.page);
        this.formLayoutsPage = new FormLayoutsPage(this.page);
        this.datepickerPage = new DatepickerPage(this.page);
    }

    navigateTo() {
        return this.navigationPage;
    }

    onFormLayoutsPage() {
        return this.formLayoutsPage;
    }

    onDatePickerPage() {
        return this.datepickerPage;
    }
}
