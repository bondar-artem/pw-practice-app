import { APP_ID } from "@angular/core"
import{test, expect} from "@playwright/test"
import { delay } from "rxjs-compat/operator/delay"

test.beforeEach(async({page}, testInfo) => {
    await page.goto("http://localhost:4200/")  //url can be put on use in baseurl under use on playwriht config file and replaced here with forward slash /
})

test.describe("Form Layouts Page", () =>{
    test.describe.configure({retries:0})  //number of retries to failed tests

        test.beforeEach(async({page}) =>{   
            await page.getByText("Forms").click() 
            await page.getByText("Form layouts").click() 
        })

test("input fields", async({page}) =>{
            //if(testInfo.retry){}  -when you need to add a condition before retring test
            const gridEmailInput = page.locator("nb-card", {hasText: 'Using the Grid'}).getByRole('textbox', {name: "email"})

            await gridEmailInput.fill("kelvin@test.com")
            await gridEmailInput.clear()   //clearinput filed
            await gridEmailInput.pressSequentially("test2@test.com",  {delay: 200})  //type input and delay type strokes
        
            //generic assertion
            const emailValue = await gridEmailInput.inputValue()  //reads textbox input value
            expect(emailValue).toEqual("test2@test.com")

            //locator assertion
            await expect(gridEmailInput).toHaveValue("test2@test.com")
        })

        test("Radio buttons",  async({page}) =>{
            const useGridForm  = page.locator("nb-card", {hasText: 'Using the Grid'})

            //await useGridForm.getByLabel("Option 1").check({force:true})  //check force:true since the radio button is visually hidden -same as below
            await useGridForm.getByRole("radio",{name: 'Option 1'}).check({force:true}) //get by Role of the button

            const radioStatus = await useGridForm.getByRole("radio",{name: 'Option 1'}).isChecked() //check if the radio button is checked
            expect(radioStatus).toBeTruthy()   //check if rcondition is true
            await expect(useGridForm.getByRole("radio",{name: 'Option 1'})).toBeChecked()  //locator assertion for checked radio button 


            await useGridForm.getByRole("radio",{name: 'Option 2'}).check({force:true})
            expect(await useGridForm.getByRole("radio",{name: 'Option 1'}).isChecked()).toBeFalsy()  //checking Option 1 is not checked
            expect(await useGridForm.getByRole("radio",{name: 'Option 2'}).isChecked()).toBeTruthy()  //check if option 2 is checked
        })
})

test("checkboxes",async({page}) =>{
        await page.getByText("Modal & Overlays").click() 
        await page.getByText("Toastr").click() 

        await page.getByRole('checkbox', {name: "Hide on click"}).uncheck({force:true})    
        await page.getByRole('checkbox', {name: "Hide on click"}).check({force:true})//check confirms if the checkbox is already checked and if checked does not uncheck(done by click)

       //await page.locator("nb-checkbox").filter({hasText: 'Hide on click'}).click({force:true})   //works with just click?
       const allBoxes = page.getByRole("checkbox")
       for (const ckbox of await allBoxes.all()){          // .all meaning it will be an array
        await ckbox.check({force: true})                   //force checking all boxes
        expect(await ckbox.isChecked()).toBeTruthy()         // asserting all boxes are checked

        await ckbox.uncheck({force: true})                   // unchecking all boxes
        expect(await ckbox.isChecked()).toBeFalsy()         // asserting all boxes are unchecked

       }
})

test("lists and dropdowns", async({page}) =>{
    const dropDownMenu = page.locator("ngx-header nb-select")
    await dropDownMenu.click()

    page.getByRole('list')  //used whne list has a UL(unordered list) tag
    page.getByRole("listitem")  //used whne list has a IL(order list) tag

    const optionList = page.locator("nb-option-list nb-option")
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({hasText: "Cosmic"}).click()

    const header = page.locator("nb-layout-header")
    await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)")

  //check all colours matches selected themes
    const backColors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }
    await dropDownMenu.click()    //loop via differnt themes
    for(const color in backColors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS("background-color", backColors[color])  //ensure selected theme has the correct colour as on array above
            if(color != "Corporate")
            await dropDownMenu.click()    //loop continues until last  theme is selected
    }
})
test("tooltips test", async({page}) =>{
    await page.getByText("Modal & Overlays").click() 
    await page.getByText("Tooltip").click() 

    const topToolTip = page.locator("nb-card", {hasText: "Tooltip Placements"}) 
    await topToolTip.getByRole("button", {name: "Top"}).hover()

    const tooltip = await page.locator("nb-tooltip").textContent() //locator assertion
    expect(tooltip).toEqual("This is a tooltip")
})

test("dialogue boxes", async({page}) =>{
    await page.getByText("Tables & Data").click() 
    await page.getByText("Smart Table").click() 
   
    page.on("dialog", dialog =>{   //listener to listen to browser pop-up/dialog
        expect(dialog.message()).toEqual("Are you sure you want to delete?")
        dialog.accept()   //accept the pop-up as by default Playwright will cancel such dialogs/pop-ups from browser
    })

    await page.getByRole("table").locator("tr",{hasText: '@mdo'}).locator(".nb-trash").click()
    await expect(page.locator("table tr").first()).not.toHaveText("@mdo") //confirm if the entry above is deleted from the table
    
})
test("web tables", async({page}) =>{
    await page.getByText("Tables & Data").click() 
    await page.getByText("Smart Table").click() 

    //Updating age on one row with a specif name
    const targetRow =  page.getByRole("row", {name: "@twitter"})
    await targetRow.locator(".nb-edit").click()
    await page.locator("input-editor").getByPlaceholder("Age").clear()        //clear placeholder age
    await page.locator("input-editor").getByPlaceholder("Age").fill("22")     //update age
    await page.locator(".nb-checkmark").click()                               //confirm via checkmark

    //get row based on a column value
    await page.locator(".ng2-smart-pagination-nav").getByText("2").click()
    const targetRowID = page.getByRole("row", {name:"11"}).filter({has: page.locator("td").nth(1).getByText("11")})
    await targetRowID.locator(".nb-edit").click()
    await page.locator("input-editor").getByPlaceholder("E-mail").clear()        //clear placeholder age
    await page.locator("input-editor").getByPlaceholder("E-mail").fill("Kelvin@test.com")     //update age
    await page.locator(".nb-checkmark").click()                               //confirm via checkmark
    await expect(targetRowID.locator("td").nth(5)).toHaveText("Kelvin@test.com")


    //test filter on the table
    const ages = ["20", "30", "38", "40", "200"]
    for(let age of ages){
        await page.locator("input-filter").getByPlaceholder("Age").clear()        //clear placeholder age
        await page.locator("input-filter").getByPlaceholder("Age").fill(age) 
        
        await page.waitForTimeout(1000)
        const AgeRows = page.locator("tbody tr")

            for(let row of await AgeRows.all()){
             const cellValue = await row.locator("td").last().textContent()
             if(age == "200"){
                expect(await page.getByRole("table").textContent()).toContain("No data found")
             }else{
             expect(cellValue).toEqual(age)
             }
            }
    }

})
test('Datepicker', async({page}) =>{   //Not dynamic as dates keeps changing
    await page.getByText("Forms").click() 
    await page.getByText("Datepicker").click() 

    const calendarInput =  page.getByPlaceholder("Form Picker")
    await calendarInput.click()

    await page.locator("[class ='day-cell ng-star-inserted']").getByText("1", {exact:true}).click()  //exact true checks the locator string matches exactly what has bee passed

    await expect(calendarInput).toHaveValue("Jul 1, 2024")
})

test('Date picking for Dynamic Dates', async({page}) =>{   
    await page.getByText("Forms").click() 
    await page.getByText("Datepicker").click() 

    const calendarInput =  page.getByPlaceholder("Form Picker")
    await calendarInput.click()

    let date = new Date()   //Documentaion here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date. Without arguments returns today's date
    date.setDate(date.getDate() + 364)
    const expectedDate =  date.getDate().toString()  //get current date
    const expectedMonth =  date.toLocaleString("En-US", {month: 'short'})   //get Month as a string and short format
    const expectedYear =  date.getFullYear()  //get current year

    const dateToCheck = `${expectedMonth} ${expectedDate}, ${expectedYear}`   //const for whole date

    let calendarMonthYear = await page.locator("nb-calendar-view-mode").textContent()
    const expectMonthLong = date.toLocaleString("En-US", {month:"long"})   //get full month
    const expectedMonthandYear = `${expectMonthLong} ${expectedYear}`  //get month and year

    while(!calendarMonthYear.includes(expectedMonthandYear)){   //loop if displayed month and year does not match then click the next month nav icon
        await page.locator('[class="next-month appearance-ghost size-medium shape-rectangle icon-start icon-end status-basic nb-transition"]').click()
        calendarMonthYear = await page.locator("nb-calendar-view-mode").textContent()
    }

    await page.locator("[class ='day-cell ng-star-inserted']").getByText(expectedDate, {exact:true}).click()  //exact true checks the locator string matches exactly what has bee passed

    await expect(calendarInput).toHaveValue(dateToCheck)
})

test("sliders test", async({page}) =>{
    //update attributes
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempGauge.evaluate( node =>{
        node.setAttribute( 'cx', '228.5763')
        node.setAttribute( 'cy', '228..5763')
    })
    await tempGauge.click()

    //mouse movements
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()  
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2

    await page.mouse.move(x, y)
    await page.mouse.down()  //simulate clicking of mouse once on x and y coordinates needed
    await page.mouse.move(x +100, y)
    await page.mouse.move(x+100, y+100)
    await page.mouse.up()

    await expect(tempBox).toContainText("30")  //assertion of temparture displayed

})