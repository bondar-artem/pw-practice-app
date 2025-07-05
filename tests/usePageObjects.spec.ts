import {test, expect} from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200/')
})
test ('navigate to form page', async ({page}) =>{
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage() //can be called again in other test
    await navigateTo.datepickerPage()
    

})