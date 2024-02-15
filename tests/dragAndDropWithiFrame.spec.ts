import {test,expect} from '@playwright/test'


test('drag and drop with iframe',async ({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
    const consetButton = page.getByText('Do not consent')
    await consetButton.click()

    const frame= page.frameLocator('[rel-title="Photo Manager"] iframe')

    await frame.locator('li', {hasText: "High Tatras 2 "}).dragTo(frame.locator('#trash'))

    //more precise  control
    await frame.locator('li', {hasText: "High Tatras 4 "}).hover()
    await page.mouse.down() //to click on left mouse
    await frame.locator('#trash').hover()
    await page.mouse.up()

    await expect(frame.locator('#trash li h5')).toHaveText([" High Tatras 2", "High Tatras 4"])
})