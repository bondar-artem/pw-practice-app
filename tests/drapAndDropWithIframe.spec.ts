import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop/')
})

test('Drag & Drop with Iframe', async ({page}) => {
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator('li', {hasText: 'High Tatras 2'}).dragTo(frame.locator('trash'))
    await expect(frame.locator('trash li h5')).toHaveText('High Tatras 2')
})

test('Drag & Drop with Iframe: more precise control over mouse', async ({page}) => {
    const frame = page.frameLocator('[rel-title="Photo Manager"] iframe')
    await frame.locator('li', {hasText: 'High Tatras 4'}).hover()
    // call the mouse abouv this el
    await page.mouse.down()
    // move the mouse into the direction where we want to drop the el
    await frame.locator('#trash').hover()
    // release mouse button
    await page.mouse.up()

    await expect(frame.locator('trash li h5')).toHaveText('High Tatras 4')
})