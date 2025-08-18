import{expect} from '@playwright/test'
import{test} from '../test_options'


test.beforeEach(async({page, globalsQaURL})=> {
    await page.goto(globalsQaURL)
    await page.getByRole('button', {name:'Consent'}).click()
    })


test('drag & drops with iframes', async({page})=> {

     const frame =  page.frameLocator('[rel-title="Photo Manager"] iframe')
    const trash =  frame.locator('#trash')
    let photoToTrash = await frame.locator('li', {hasText:'High Tatras 4'})
    await photoToTrash.dragTo(trash)

    //more precies control
    let photoToTrash2 = await frame.locator('li', {hasText:'High Tatras 2'}).hover()
    await page.mouse.down()
    await trash.hover()
    await page.mouse.up()


    await expect(frame.locator('#trash li h5')).toHaveText(['High Tatras 4', 'High Tatras 2'])
})