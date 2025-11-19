import {test } from '../test-options'
import { PageManager } from '../pageobjects/pageManager'
import {faker} from '@faker-js/faker'



test('parameterized method', async({pageManager}) => {
    //const pm = new PageManager(page) enable for scenario 1
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    //scenario 1 using page in the async
    await pageManager.onFormLayoutsPage().usingtheGridForm(process.env.USERNAME,process.env.PASSWORD, 'Option 2')
    await pageManager.onFormLayoutsPage().InlineForm(randomFullName, randomEmail, false)
})