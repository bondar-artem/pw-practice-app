import {test, expect} from '@playwright/test'

test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form Layouts Page', () => {
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layout').click()
    })

    test('Input Fields', async ({page}) => {
        const usingTheGridEmailInput  = page.locator('nb-card', {hasText: 'Using the Grid'}).getByRole('textbox', {name: 'Email'})
        await usingTheGridEmailInput.fill('test123@testemail.com')
        
        // chaining here not possible
        await usingTheGridEmailInput.clear()

        // keystroke simulation with a delay
        await usingTheGridEmailInput.pressSequentially('test456@testemail.com', {delay: 100, timeout: 20000})

        // generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test456@testemail.com')

        // locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test456@testemail.com')
    })

    test('Radio Buttons', async ({page}) => {
        const usingTheGridForm  = page.locator('nb-card', {hasText: 'Using the Grid'})
        // check() wont work here cause our el has class 'visually-hidden'
        // to bypass we add force true
        await usingTheGridForm.getByLabel('Option 1').check({force: true}) 
        await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).check({force: true})

        const radioStatus = await usingTheGridForm.getByRole('radio', {name: 'Option 2'}).isChecked()
        // generic assertion
        expect(radioStatus).toBeTruthy()
        expect(await usingTheGridForm.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
        // locator assertion
        await expect(usingTheGridForm.getByRole('radio', {name: 'Option 2'})).toBeChecked()
        await expect(usingTheGridForm.getByRole('radio', {name: 'Option 1'})).not.toBeChecked()
    })
})

test('Checkboxes', async ({page}) => {
    await page.getByRole('link', {name: 'Modal & Overlays'}).click()
    await page.getByRole('link', {name: 'Toastr'}).click()
    
    // wont work here cause our el has class 'visually-hidden'
    // to bypass we add force true
    // check() method wont do anything is checkbox is already checked (selected)
    // this is the main difference between click and check
    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true})

    // all() will create an array
    const allBoxes = page.getByRole('checkbox')
    for(const checkBox of await allBoxes.all()) {
        await checkBox.check({force: true})
        expect(await checkBox.isChecked()).toBeTruthy()
    }
})

test('Lists and dropdowns', async ({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    // RECCOMMENDED APPROACH
    // used when list has UL tag
    // page.getByRole('list')
    // used when list has LI tag 
    // page.getByRole('listitem')

    // option 1 to get the list of items
    // const optionList = page.getByRole('list').locator('nb-option')

    // option 2 to get the list of items
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])
    await optionList.filter({hasText: 'Cosmic'}).click()
    // now we vefiry that background color has been changed
    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')
})

test('Lists and dropdowns - loop thru the list', async ({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    const optionList = page.locator('nb-option-list nb-option')
    const header = page.locator('nb-layout-header')

    // now we will verify all the colors
    const colors = {
        'Light': 'rgb(255, 255, 255)',
        'Dark': 'rgb(34, 43, 69)',
        'Cosmic': 'rgb(50, 50, 89)',
        'Corporate': 'rgb(255, 255, 255)'
    }

    for( const theme in colors) {
        await dropDownMenu.click()
        await optionList.filter({hasText: theme }).click()
        await expect(header).toHaveCSS('background-color', colors[theme])
    }
})

test('Tooltips', async ({page}) => {
    // freese the browser to catch tooltip message
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    // freese the browser 
    // run in console settimeout(() => {debugger}, 2000)
    // or Emulate a focus page in Styles
    const tooltipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await tooltipCard.getByRole('button', {name: 'Top'}).hover()

    // this is how we usually identify tooltips
    // but only works if you have a role tooltip created
    // in our app such role was not assigned so we use another locator
    // page.getByRole('tooltip')
    const tooltipText = await page.locator('nb-tooltip').textContent()
    expect(tooltipText).toEqual('This is a tooltip')
})

test('Dialog Boxes browser generated', async ({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()
    
    // create a listener for a dialog event
    page.on('dialog', dialog => {
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        // we accept the dialog instead of cancelling
        dialog.accept()
    })

    // by default pw cancel the deletion so we need to add event listener (above)
    await page.getByRole('table').locator('tr',{hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
    
})

test('Dialog: add names', async ({page})=> {
    const userName = 'Tatiana'
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Dialog').click()

    const returnResultDialogCard = page.locator('nb-card').filter({hasText: 'Return Result From Dialog'})
    console.log(returnResultDialogCard)

    await expect(returnResultDialogCard.getByRole('listitem')).toHaveCount(0)

    await returnResultDialogCard.getByRole('button', {name: 'Enter Name'}).click()
    await page.getByPlaceholder('Name').fill(userName)
    // no need enter here cause we have submit 
    //await page.getByPlaceholder('Name').press('Enter')
    await page.getByRole('button', {name: 'Submit'}).click()
        
    await expect(returnResultDialogCard.getByRole('listitem')).toHaveCount(1)
    await expect(returnResultDialogCard.getByRole('listitem')).toHaveText(userName)
})

test.describe('web tables', () => {
    test('Web Tables - edit table cell value', async ({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()
        
        // get the row by text
        const targetRow = page.getByRole('row', {name: 'twitter@outlook.com'})
        await targetRow.locator('.nb-edit').click()
        await page.locator('input-editor').getByPlaceholder('Age').clear()
        await page.locator('input-editor').getByPlaceholder('Age').fill('21')
        await page.locator('.nb-checkmark').click()

        const ageValue =  await targetRow.locator('td:last-child').textContent()
        expect(ageValue).toEqual('21')
    })

    test('Web Tables - get the row by the specific column data', async ({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()
        
        // get data for the user with ID 11
        await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
        const targetRowById = page.getByRole('row', {name: '11'}).filter({has: page.locator('td').nth(1).getByText('11')})
        await targetRowById.locator('.nb-edit').click()
        await page.locator('input-editor').getByPlaceholder('E-mail').clear()
        await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
        await page.locator('.nb-checkmark').click()
        const email = await targetRowById.locator('td').nth(5).textContent()
        expect(email).toEqual('test@test.com')
    })

    test('Web Tables - table filter', async ({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        const ages = ['20', '30', '40', '200']

        for(const age of ages) {
            await page.locator('input-filter').getByPlaceholder('Age').click()
            await page.locator('input-filter').getByPlaceholder('Age').fill(age)
            // we need here a static waiter
            await page.waitForTimeout(500)
            // rows.all() create an array of web elements
            const rows = page.locator('tbody tr')
            for(const row of await rows.all()) {
                const cellValue = await row.locator('td').last().textContent()
                if (age === '200') {
                    expect((await row.locator('td').textContent()).trim()).toEqual('No data found')
                } else {
                    expect(cellValue).toEqual(age)
                }
                
            }
        }

    })
})

test('checking CSS classes', async ({page})=> {
    const temperatureHumidityList = page.locator('ngx-temperature li')

    // el has several class therefore i use regex /active/
    // cause toHaveClass is checking the entire string
    await expect(temperatureHumidityList.first()).toHaveClass(/active/)
    // toContainClass is cheking single class presence
    await expect(temperatureHumidityList.first()).toContainClass('active')

    await temperatureHumidityList.nth(1).click()
    await expect(temperatureHumidityList.nth(1)).toHaveClass(/active/)
    await expect(temperatureHumidityList.first()).not.toHaveClass(/active/)
})

test('Date pickers', async ({page})=> {
    let date = new Date()
    date.setDate(date.getDate() + 188)

    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear()
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    console.log(dateToAssert)
    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const commonDatepickerInput = page.getByPlaceholder('Form Picker')
    await commonDatepickerInput.click()

    let calendarMonthAndYear = await page.locator('nb-calendar-view-mode button').textContent()
    console.log(calendarMonthAndYear)
    
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`
    console.log(expectedMonthAndYear)

    while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear = await page.locator('nb-calendar-view-mode button').textContent()
    }

    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click()

    await expect(commonDatepickerInput).toHaveValue(dateToAssert)
})

test.describe('Sliders', () => {
    test('option 1', async ({page}) => {
        // update slider attribute 
        const temperatureGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
        await temperatureGauge.evaluate( node => {
            node.setAttribute('cx', '232.630')
            node.setAttribute('cy', '232.630')
        })
        await temperatureGauge.click()
    })

    test('option 2', async ({page}) => {
        // to simulate actual mouse movement
        const temperatureBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
        // to make sure box is displayed on the page
        await temperatureBox.scrollIntoViewIfNeeded()

        // pw will create coordinatets x and y, at top left corner by defining a bounding box
        const box = await temperatureBox.boundingBox()
        // now we set starting coordinates x ynd y at the center of bounding box
        const x = box.x + box.width / 2
        const y = box.y + box.height / 2

        await page.mouse.move(x, y)
        // mouse right click() hold
        await page.mouse.down()
        // we move mouse horizontally
        await page.mouse.move(x + 100, y)
        //  move mouse down
        await page.mouse.move(x+100, y+100)
        // release mouse button
        await page.mouse.up()

        await expect(temperatureBox).toContainText('30')
    })
})