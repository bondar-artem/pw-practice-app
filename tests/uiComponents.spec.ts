import{test, expect} from '@playwright/test'


test.beforeEach(async({page})=> {
    await page.goto('http://localhost:4200/')
    })

test.describe('Form Layouts Page', () =>{

    test.beforeEach(async({page})=> {
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
    })

    test('input fields', async({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card', {hasText:"Using the Grid"}).getByRole('textbox', {name: "email"})
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()

        //to emulate keystrokes:
        await usingTheGridEmailInput.pressSequentially('test2@test.com', {delay:500})

        //generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()

        expect(inputValue).toEqual('test2@test.com')

        //locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test2@test.com')

    })

    test('radio buttons', async({page}) => {
       const usingTheGrid = page.locator('nb-card', {hasText:"Using the Grid"}) 
       
       await usingTheGrid.getByLabel('Option 1').check({force: true})


       await usingTheGrid.getByRole('radio', {name: 'Option 2'}).check({force: true})
        //generic assertion
        const radioStatus = await usingTheGrid.getByRole('radio', {name: 'Option 2'}).isChecked()
        expect(radioStatus).toBeTruthy()
        //locator assertion

        await expect(usingTheGrid.getByLabel('Option 2')).toBeChecked()


        //generic assertion, whole locator + function to evaluate
        expect(await usingTheGrid.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeFalsy()
        expect(await usingTheGrid.getByRole('radio', {name: 'Option 1'}).isChecked()).toBeTruthy()

    })
})

test('checkboxes', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()
    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true})

    await page.getByLabel('Prevent arising of duplicate toast').check({force: true})

    //interacting with all checkboxes
    const allBoxes = page.getByRole('checkbox')
    for( const box of await allBoxes.all()) {
        await box.uncheck({force:true})
        expect(await box.isChecked()).toBeFalsy()
    }

})


test('Lists and dropdowns', async({page}) => {
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()


    page.getByRole('list') //when list has a UL tag
    page.getByRole('listitem') // when the list has LI tag

    //const optionList = page.getByRole('list').locator('nb-option')
    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate'])

    await optionList.filter({hasText: 'Cosmic'}).click()

    const header = page.locator('nb-layout-header')
    
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(34, 43, 69)',
        cosmic: 'rgb(50, 50, 89)',
        corporate: 'rgb(255, 255, 255)',    
    }

    await dropDownMenu.click()
    for(const color in colors){
        await optionList.filter({hasText: color}).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        await dropDownMenu.click()
    }



})


test('tooltips', async({page}) => {
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()
    const toolTipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
    await toolTipCard.getByRole('button', {name:'Top'}).hover()

    const toolTipText = await page.locator('nb-tooltip').textContent()
    await expect(toolTipText).toEqual('This is a tooltip')

    const buttonsToolTip = toolTipCard.getByRole('button')

    for(const button of await buttonsToolTip.all()){
        await button.hover()
        
    }

//    page.getByRole('tooltip') //if you have a role tooltip created

})


test('dialog boxes', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //browser dialog boxes
    page.on('dialog', dialog => {
        expect(dialog.message()).toBe('Are you sure you want to delete?')
        dialog.accept()
    })

    await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')
})

test('Web tabels', async({page}) => {
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    //get row by any test in this row
    const TargetRow = page.getByRole('row', {name:'twitter@outlook.com'})
    await TargetRow.locator('.nb-edit').click()
    await TargetRow.getByPlaceholder('Age').fill('11')
    await page.locator('.nb-checkmark').click()

    //get row based on the value in specific column
    await page.locator('.ng2-smart-pagination').getByText('2').click()

    const targetRowbyId = page.getByRole('row').filter({has: page.locator('td').nth(1).getByText('11')})
    await targetRowbyId.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
    await page.locator('.nb-checkmark').click()
    expect(targetRowbyId.locator('td').nth(5)).toHaveText('test@test.com')

    //test filter of the table

    const ages=['20', '30', '40', '200']
    for(const age of ages) {
            await page.locator('input-filter').getByPlaceholder('Age').clear() 
            await page.locator('input-filter').getByPlaceholder('Age').fill(age)
            await page.waitForTimeout(500)

            const ageRows = await page.locator('tbody tr')

            for(let row of await ageRows.all()) {
                const cellValue = await row.locator('td').last().textContent()
                if(age == "200") {
                    expect(page.locator('tbody')).toHaveText('No data found')
                }
            
                else{
                
                expect(cellValue).toEqual(age)
                }
            } 
        }

})


test('date picker', async({page}) => {

    await page.getByText('Forms').click()
    await page.getByText('Datepicker').click()

    const calendarInputField = await page.getByPlaceholder('Form Picker')
    await calendarInputField.click()

    let date = new Date()
    date.setDate(date.getDate() +50)
    const expectedDAte = date.getDate().toString()
    const expectedMonthshort = date.toLocaleString('En-US', { month: 'short'})
    const expectedYear = date.getFullYear().toString()

    const dateToAssert = `${expectedMonthshort} ${expectedDAte}, ${expectedYear}`

    const expectedMonthLong = date.toLocaleDateString('EN-us', {month: 'long'})

    let calendarMonthAndYear = await page.locator('[class="appearance-ghost size-medium shape-rectangle icon-end status-basic nb-transition"]').textContent()

    const expecteMonthandYear = ' ' + expectedMonthLong+ ' '+ expectedYear + ' '

    while(expecteMonthandYear != calendarMonthAndYear) {
        await page.locator('[class="next-month appearance-ghost size-medium shape-rectangle icon-start icon-end status-basic nb-transition"]').click();
        calendarMonthAndYear =  await page.locator('[class="appearance-ghost size-medium shape-rectangle icon-end status-basic nb-transition"]').textContent()
    } 
    await page.locator('[class ="day-cell ng-star-inserted"]').getByText(expectedDAte, {exact: true}).click();
    await expect(calendarInputField).toHaveValue(dateToAssert);
    

} )

test('Sliders', async({page}) => {
    const temperatureGauge = await page.locator('[Tabletitle="Temperature"] ngx-temperature-dragger circle')
    await temperatureGauge.evaluate ( node => {
           node.setAttribute('cx', '232')
          node.setAttribute('cy', '232')
    })
    await temperatureGauge.click()

    //mouse movement
        const tempBox = page.locator('ngx-temperature-dragger').first()
        tempBox.click()
        await tempBox.scrollIntoViewIfNeeded()


        const box = await tempBox.boundingBox()
        console.log(box)
        const x = box.x + box.width/2
        const y = box.y + box.height/2


        await page.mouse.move(x,y)
        await page.mouse.down()
        await page.mouse.move(x - 100,y)
        await page.mouse.move(x-100, y+100)
        await page.mouse.up()
        await expect(tempBox).toContainText('13')
        
})
