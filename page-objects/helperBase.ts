// now all the methods from this class will be availble if we expend our class with HelperBbase class
// INHERITANCE

import { Page } from '@playwright/test'

export class HelperBase {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    // create a function that we can use across the project
    // thai waiter function is for demo purpose only
    async waitForNumberOfSeconds(timeInSec: number) {
        // how many milisec timeInSec * 1000
        await this.page.waitForTimeout(timeInSec * 1000)
    }
}