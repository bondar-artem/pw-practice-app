import {expect, test} from "@playwright/test"
import { constants } from "buffer"

test.beforeEach(async({page}) =>{   //used for repetative code on each test eg opening url  /* test.beforeAll can be used for all tests */
    await page.goto("http://localhost:4200/")
    await page.getByText("Forms").click()
    await page.getByText("Form Layouts").click() 
}) 

test("Locator syntax rules", async({page}) => {
    //locator by Tag name
    await page.locator("input").click()   //locator will find multiple input elements therefore will fail

    //locator by  Id
    page.locator("#") // # before Id means the locator will be idenfied by Id

    //by class value
    page.locator(".") // . before Id means the locator will be idenfied by class value

    //by attribute
    page.locator("[]") // [] means is locator will be idenfied by attribute

    //by full class value
    page.locator("[ ]") // full class with all class values

    //combine digfferent selectors
    page.locator("input[attribute]") //playwright finds the exact match with all the locators added. Do not add space between locators

    //by XPath  // not recomended
    page.locator("//*...")
})

test ("user facing roles", async({page}) =>{
   await page.getByRole("textbox",{name: "Email"}).first().click()
   await page.getByRole("button", {name: "SIGN IN"}).first().click()

   await page.getByLabel("Email").first().click()

   await page.getByPlaceholder("Jane Doe").first().click()

   await page.getByText("SEND").first().click()

   await page.getByTitle("Extra Components").click()
})

test("Locating Child Elements", async({page}) => { 
    await page.locator("nb-card nb-radio :text-is('Option 1')").click() //DOM elements digging
    await page.locator("nb-card").locator("nb-radio").locator(":text-is('Option 2')").click()

    await page.locator("nb-card").getByRole("button",{name: "SIGN IN"}).first().click()
})

test("Locating elements by Parent", async({page}) =>{
    await page.locator("nb-card", {hasText: 'Using the Grid'}).getByRole("textbox",{name: "Email"}).click()

    await page.locator("nb-card").filter({hasText: "Basic form"}).getByRole("textbox", {name: "Email"}).click()

    await page.locator("nb-card").filter({has: page.locator("nb-checkbox")}).filter({hasText: ("SIGN IN")})
        .getByRole("textbox", {name: 'Email'}).click()
})

test("Reusing locators", async({page}) =>{
    const basicForm = page.locator("nb-card").filter({hasText:"Basic form"}) //instead of repeating this locator multiple lines
    const emailField = basicForm.getByRole("textbox", {name:"Email"})

    await emailField.fill("test@test.com")
    await basicForm.getByRole("textbox", {name:"Password"}).fill("welcome1234")
    await basicForm.locator("nb-checkbox").click()
    await basicForm.getByRole("button").click()

    await  expect(emailField).toHaveValue("test@test.com") //assertion to check value
})

test("Extracting values", async({page}) =>{
    //single text value
    const basicForm = page.locator("nb-card").filter({hasText:"Basic form"}) 
    const buttonText = await basicForm.locator("button").textContent()  //text Content() extracts value of the locator
    expect(buttonText).toEqual("Submit")  //check if the value extracted is equal to expected value

    //All text values
    const alRadioButtons = await page.locator("nb-card").locator("nb-radio").textContent()
    expect(alRadioButtons).toContain("Option 1")
    expect(alRadioButtons).toContain("Option 2") 

    //input value
    const emailField = basicForm.getByRole("textbox", {name:"Email"})
    await emailField.fill("kelvin@test.com")
    const emailValue =  await emailField.inputValue() //fetches the value on the input field
    expect (emailValue).toEqual('Kelvin@test.com')
})

test("assertions", async({page}) =>{
    const basicFormButton = page.locator("nb-card").filter({hasText: "basic form"}).locator("button")
    //general assertions
    const value =5
    expect(value).toEqual(5)

    const textbutton =  await basicFormButton.textContent()
    expect(textbutton).toEqual("Submit")

    //locator asserion - requires await before expect method
    await expect(basicFormButton).toHaveText("Submit")

    //Soft assertion
    await expect.soft(basicFormButton).toHaveText("submits") //soft assertion means the execution continue to run if the check fails
    await basicFormButton.click()
})



