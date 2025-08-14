import{test, expect} from '@playwright/test'
import{PageManager} from '../page-objects/pageManager'


test.beforeEach(async({page})=> {
    await page.goto('http://localhost:4200/')
    })


test('navigate to form page', async({page})=>
{
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()


})

test('parametrized methods with page manager', async({page})=>{
    
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutsPage()
    
    await pm.onFormLayoutsPage().submitUsingTheGridFormWiothCredentialsAndSelectOption('test@test.com', "password", "Option 2")
    await pm.onFormLayoutsPage().submitUsingTheInlineFormWithCredentialsAndSelectOption('Name Surname', "test@test.com", true)
  
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().dateRangePickerFunction(7,9)

})