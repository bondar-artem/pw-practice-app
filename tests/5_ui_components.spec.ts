import {test, expect} from '@playwright/test'
import { asyncScheduler } from 'rxjs'

test.describe.configure({mode: 'parallel'}) // all tests in file will be run in parallel

test.beforeEach(async({page}, testInfo) => {
    await page.goto('/')
})

test.describe('Form Layouts page', () => {
    test.describe.configure({retries: 2}) // retry setup inside test
    test.describe.configure({mode: 'serial'}) // tests will be run one by one


    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('Enter into input fields', async({page}, testInfo) => {
        if(testInfo.retry){
            //do something eg. clean db
        }
        const usingTheGridEmailInput = page.locator('nb-card', {hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"})
        await usingTheGridEmailInput.fill("test@test.com")
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially("test2@test.com", {delay: 500})

        // generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test2@test.com')

        // locator assertion 
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')
    })

    test ('Select radio buttons', async({page}) => {
    const usingTheGridForm = page.locator('nb-card', {hasText: "Using the Grid"})
    await usingTheGridForm.getByLabel('Option 1').check({force: true})
    await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force: true})
    const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
    expect(radioStatus).toBeTruthy()
    await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()

    await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force: true})
    expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
    expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
    })
})

test ('Select checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', {name: "Hide on click"}).click({force: true}) // performs a click - might uncheck if its checked
    await page.getByRole('checkbox', {name: "Hide on click"}).check({force: true}) // checks if it isn't checked and leave it as is if it is checked and .unchecked - unchecks 
    await page.getByRole('checkbox', {name: "Prevent arising of duplicate toast"}).check({force: true}) 

    // check or uncheck all checkboxes on a page
    const allBoxes = page.getByRole('checkbox')
    for(const box of await allBoxes.all()){
        await box.check({force: true})
        expect(await box.isChecked).toBeTruthy()
    }
})

test ('Select list and dropdowns', async({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') // when the list has a UL tag
    page.getByRole('listitem') // when the list has a LI tag

    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({hasText: "Cosmic"}).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)"
    }

    await dropDownMenu.click()
    for(const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if(color != "Corporate")
        await dropDownMenu.click()
    }
})

test('Tooltip', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', {hasText: "Tooltip Placements"})
    await toolTipCard.getByRole('button', {name: "Top"}).hover()
    page.getByRole('tooltip') // will work if a role tooltip is created
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test('Dialog box', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => {
       expect(dialog.message()).toEqual("Are you sure you want to delete?") 
       dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: "mdo@gmail.com"}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText("mdo@gmail.com")

})

test('Web tables', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // 1 get row by any text in this row
   
    const targetRow = page.getByRole('row', {name: "twitter@outlook.com"})
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click() 

    // 2 get by value in specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const rowByID = page.getByRole('row', {name: "11"}).filter({has: page.locator('td').nth(1).getByText('11')})
    await rowByID.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click() 
    await expect(rowByID.locator('td').nth(5)).toHaveText('test@test.com')

    // 3 test filter of the table

    const ages = ["20", "30", "40", "200"]

    for(let age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age) 
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')
        for(let row of await ageRows.all()){
            const cellValue = await row.locator('td').last().textContent()
            if(age == "200"){
                expect(await page.getByRole('table').textContent()).toContain('No data found')

            } else
            expect(cellValue).toEqual(age)
        }
    }
})

test('datepicker', {tag: '@cal'}, async({page}) => {
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    let date = new Date()
    date.setDate(date.getDate() + 300)

    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `

    while(!calendarMonthAndYear.includes(expectedMonthAndYear)){
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()
    await expect(calendarInputField).toHaveValue(dateToAssert) 
})

test('sliders', async({page}) => {
    // update attribute
    const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    await tempGauge.evaluate( node => {
        node.setAttribute('cx', '232.630')
        node.setAttribute('cy', '232.630')
    })
    await tempGauge.click()

    // mouth movement
    const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()
    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x,y)
    await page.mouse.down()
    await page.mouse.move(x +100, y)
    await page.mouse.move(x+100, y+100)
    await page.mouse.up()
    await expect(tempBox).toContainText('30')
})