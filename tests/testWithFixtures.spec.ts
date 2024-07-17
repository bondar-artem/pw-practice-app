import {test} from "../test-options"
import { PageManager } from "../page-objects/pageManager"
import { faker } from "@faker-js/faker"


// test.beforeEach(async({page}) =>{   
//     await page.goto("http://localhost:4200/")
    
// }) 

test("parametrized objects", async({pageManager}) =>{ //from test-options pageManager fixture
  
    const fullRandomName = faker.person.fullName()
    const randomEmail = `${fullRandomName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    //await pm.navigateTo().formLayoutsPage()
    await pageManager.onFormLayoutsPage().submitUsingGridFormandCredentialWithSelectOption(process.env.USERNAME, process.env.PASSWORD, "option 1")  //from .env file

    await pageManager.onFormLayoutsPage().submitUsingInlineFormandCredentialWithCheck(fullRandomName, randomEmail, false)  //from faker
   

})


