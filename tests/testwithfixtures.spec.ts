import{test} from '../test_options'
import{PageManager} from '../page-objects/pageManager'
import{faker} from '@faker-js/faker'


// test.beforeEach(async({page})=> {
//     await page.goto('/')
//     })




test('parametrized methods with page manager', {tag: ['@param', '@login']}, async({pageManager})=>{
    

    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ','')}@${faker.internet.domainName()}}`
    const randomPassword = faker.internet.password()
    const randomValue = faker.datatype.boolean()

    // await pm.navigateTo().formLayoutsPage()
    
    await pageManager.onFormLayoutsPage().submitUsingTheGridFormWiothCredentialsAndSelectOption(process.env.USERNAMES, process.env.PASSWORD, "Option 2")

    await pageManager.onFormLayoutsPage().submitUsingTheInlineFormWithCredentialsAndSelectOption(randomFullName, randomEmail, randomValue)

})