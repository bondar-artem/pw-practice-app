import{test, expect} from '@playwright/test'
import{PageManager} from '../page-objects/pageManager'
import{faker} from '@faker-js/faker'


test.beforeEach(async({page})=> {
    await page.goto('/')
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
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}@${faker.internet.domainName()}}`
    const randomPassword = faker.internet.password()
    const randomValue = faker.datatype.boolean()

    await pm.navigateTo().formLayoutsPage()
    
    await pm.onFormLayoutsPage().submitUsingTheGridFormWiothCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, "Option 2")
    console.log(process.env.PASSWORD)
 
    //await page.locator('nb-card').filter({hasText:"Using the Grid"}).screenshot({path: 'screenshots/usingTheGrid.png'})
    await pm.onFormLayoutsPage().submitUsingTheInlineFormWithCredentialsAndSelectOption(randomFullName, randomEmail, randomValue)
  
    // await pm.navigateTo().datePickerPage()
    // await pm.onDatePickerPage().dateRangePickerFunction(7,9)

})