import {test, expect} from '@playwright/test';

test('has title', async ({page}) => {
    await page.goto('');

    await expect(async () => {
        expect(page).toHaveTitle("playwright-test-admin Demo Application");
    }).toPass();
});


