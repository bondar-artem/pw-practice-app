import {expect, test} from '@playwright/test'
import { using } from 'rxjs'

test.describe.configure({mode: 'parallel'})


test.beforeEach(async({page}) => {
    await page.goto('/')
})

//lesson 33

test.describe.only('Form layouts page', () => {
    test.describe.configure({retries: 0})
    test.beforeEach( async ({page}) => {
    
    await page.getByText('Forms').click()
    await page.getByText('Form Layout').click()
    
})

test ('input fields', async ({page}, testInfo) => {
    if(testInfo.retry) {
        //do something
    }

    const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})

    await usingTheGridEmailInput.fill('test@test.com')
    await usingTheGridEmailInput.clear()
    await usingTheGridEmailInput.pressSequentially('test2@test.com')

    //assertions in input field -- generic assertions

    const inputValue = await usingTheGridEmailInput.inputValue()
    expect(inputValue).toEqual('test2@test.com')

    //locator assertions
    await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')

})

//lesson 34

test.only('radio buttons', async ({page}) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})

    // await usingTheGridForm.getByLabel('Option 1').check({force: true})

    await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})

    //generic assertion
    const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked() //generic assertion
    await expect(usingTheGridForm).toHaveScreenshot({maxDiffPixels: 250})
    
    // expect (radioStatus).toBeTruthy()
    // await expect (usingTheGridForm.getByRole('radio', {name: "Option 2"})).toBeChecked() //locator assertions
    
    // await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
    // expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy() //tobefalsy
    // expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy() //tobetruthy
})

//lesson 35

test ('checkboxes', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name:'Hide on click'}).uncheck({force: true}) //use the method for unchecked
    await page.getByRole('checkbox', {name:'Prevent arising of duplicate toast'}).check({force: true}) //use the method for checked

   //unchecked or checked all the boxes depending on line 67 and then dont forget to change 68 to be truthy or falsy
    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()) {
        await box.uncheck({force: true})
        expect(await box.isChecked()).toBeFalsy()

    }
})

//lesson 36

test ('lists and dropdown', async ({page}) => {
    const dropdownMenu =  page.locator('ngx-header nb-select')
    await dropdownMenu.click()

    page.getByRole('list') //when the list has UL tags
    page.getByRole('listitem') //when the list has LI tags

    //scenario 1
    //const optionList = page.getByRole('list').locator('nb-option')
    
    //scenario 2
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({hasText: 'Cosmic'}).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)", 
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": ("rgb(255, 255, 255)")
    }

    await dropdownMenu.click()
    for (const color in colors) {
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != "Corporate")
            await dropdownMenu.click()

    }
})

//lesson 37

test ('tooltips', async ({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await toolTipCard.getByRole('button', {name: "Top"}).hover()

    page.getByRole('tooltip') //if you have a role tooltip created

    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

//lesson 38

test ('dialogs boxes', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //method when calling prompt on browser
    
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()
})
        
    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText("mdo@gmail.com")

    //dealing with regular dialog boxes, inspect element, find the element, interact with this
})

//lesson 39
test ('web tables 1', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //1 get the role by any test in this row
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"}) //example of row using
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    // 2 get the row based on the value in the specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowById = page.getByRole('row', {name: "11"}).filter ({has: page.locator('td').nth(1).getByText('11')}) // capture the first row that has 11
    await targetRowById.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowById.locator('td').nth(5)).toHaveText('test@test.com')



//lesson 40

    // 3 test with filters of the table

    const ages = ["20", "30", "40", "200"]

    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')
        for (let row of await ageRows.all()){
            const cellValue = await row.locator('td').last().textContent()
            if (age == "200") {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }
           

        }
    }
})

// lesson 41 -- date picker part 1

test.skip('datepicker', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    await page.locator('[class="day-cell ng-star-inserted"]').getByText('1', {exact: true}).click()
    await expect(calendarInputField).toHaveValue('Aug 1, 2025')
})

//lesson 42 -- date picker part 2

test('datepicker 2', async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    let date = new Date() // see link/documentation to use date
    date.setDate(date.getDate() + 200)
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthandYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
    while(!calendarMonthandYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthandYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    await expect(calendarInputField).toHaveValue(dateToAssert)

})

//lesson 43 - temperature gauge change

test.skip('sliders', async ({page}) => {
    //Update attribute

    //part 1
    
    // const tempGauge = page.locator('[tabletitle="Temperature"] ngx-temperature-dragger circle')
    // await tempGauge.evaluate( node =>{
    //     node.setAttribute('cx', '232.630')
    //     node.setAttribute('cy', '232.630')
    // })

    // await tempGauge.click()

    //mouse movement - part 2

    const tempBox = page.locator('[tabletitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    const x = box.x + box.width /2
    const y = box.y + box.height / 2

    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x + 100, y)
    await page.mouse.move(x + 100, y + 100)
    await page.mouse.up()
    await expect(tempBox).toContainText('30')
})

})