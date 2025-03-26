import {test as base, expect} from "@playwright/test"
import {TemperaturePage} from "../pages/dashboard/temperaturePage";

type MyFixtures = {
  temperaturePage: TemperaturePage,
}

export const test = base.extend<MyFixtures>({
  temperaturePage: async ({page}, use) => {
    await page.goto('');
    await expect(page).toHaveTitle("playwright-test-admin Demo Application");
    await use(new TemperaturePage(page))
  },
})

export {expect} from "@playwright/test"
