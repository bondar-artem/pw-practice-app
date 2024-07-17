import{test, expect} from "@playwright/test"


test("input fields", async({page}, testinfo) =>{
    await page.goto("http://localhost:4200/") 
    if(testinfo.project.name == "Mobile"){
        await page.locator(".sidebar-toggle").click()   //if project used is mobile device then click sidebar to open menu
    }
    await page.getByText("Forms").click() 
    await page.getByText("Form layouts").click() 
    await page.locator(".sidebar-toggle").click()

    const gridEmailInput = page.locator("nb-card", {hasText: 'Using the Grid'}).getByRole('textbox', {name: "email"})
    await gridEmailInput.fill("kelvin@test.com")
    await gridEmailInput.clear()   
    await gridEmailInput.pressSequentially("test2@test.com") 

})