import { Page, expect } from "@playwright/test";
import { NavigationPage } from '../page-objects/navigationPage';
import { FormLayoutPage } from '../page-objects/formLayoutsPage';
import { DatepickerPage } from '../page-objects/datePickerPage';

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formLayoutPage: FormLayoutPage;
  private readonly datepickerPage: DatepickerPage;

  constructor(page: Page) {
      this.page = page;
      this.navigationPage = new NavigationPage(this.page);
      this.formLayoutPage = new FormLayoutPage(this.page);
      this.datepickerPage = new DatepickerPage(this.page);
    }

    navigateTo() {
      return this.navigationPage;
    }

    onFormLayoutPage() {
      return this.formLayoutPage;
    }

    onDatepickerPage() {
      return this.datepickerPage;
    }
}
