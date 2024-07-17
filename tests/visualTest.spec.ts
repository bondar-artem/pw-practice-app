import { APP_ID } from "@angular/core"
import{test, expect} from "@playwright/test"
import { delay } from "rxjs-compat/operator/delay"

test.beforeEach(async({page}, testInfo) => {
    await page.goto("http://localhost:4200/")  
})

test.describe("Form Layouts Page", () =>{
    test.describe.configure({retries:0})  //number of retries to failed tests

        test.beforeEach(async({page}) =>{   
            await page.getByText("Forms").click() 
            await page.getByText("Form layouts").click() 
        })


test.only ("Radio buttons",  async({page}) =>{
    const useGridForm  = page.locator("nb-card", {hasText: 'Using the Grid'})

   
    await useGridForm.getByRole("radio",{name: 'Option 2'}).check({force:true}) 

    const radioStatus = await useGridForm.getByRole("radio",{name: 'Option 1'}).isChecked() 
    await expect(useGridForm).toHaveScreenshot()

    //expect(radioStatus).toBeTruthy()   
    //await expect(useGridForm.getByRole("radio",{name: 'Option 1'})).toBeChecked()  

})
})