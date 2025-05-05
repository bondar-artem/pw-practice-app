import { test, expect } from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto("http://localhost:4200")
})

test.describe("Form Layouts page", ()=> {
    test.beforeEach(async ({page}) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({page}) => {
        const usingTheGridEmailInput = page.locator('nb-card').filter({hasText: "Using the Grid"}).getByRole("textbox", {name: 'Email'})
        await usingTheGridEmailInput.fill('test@test.com')
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially("test@test.com", {delay: 100})

        // generic assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('test@test.com')

        // locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('test@test.com')
    })

    test('radio buttons', async ({page}) => {
        const usingTheGridForm = page.locator('nb-card').filter({hasText: "Using the Grid"})
        await usingTheGridForm.getByLabel('Option 1').check({force:true})
        await usingTheGridForm.getByRole('radio', {name: "Option 1"}).check({force:true})

        // generic assertion
        const radioStatus = await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()
        expect(radioStatus).toBeTruthy()

        // locator assertion
        await expect(usingTheGridForm.getByRole('radio', {name: "Option 1"})).toBeChecked()
        await usingTheGridForm.getByRole('radio', {name: "Option 2"}).check({force:true})
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 1"}).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', {name: "Option 2"}).isChecked()).toBeTruthy()
    })

    test('checkboxes', async ({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Toastr').click()
        // await page.getByRole('checkbox', {name: 'Hide on click'}).click({force:true})
        await page.getByRole('checkbox', {name: 'Hide on click'}).check({force:true})
        await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force:true})
    
        const allBoxes = await page.getByRole('checkbox')
        for(const box of await allBoxes.all()) {
            await box.check({force:true})
            expect(await box.isChecked()).toBeTruthy()
        }
    }), 

    test('list', async ({page}) => {
        const listMenu = page.locator("nb-select button")
        await listMenu.click()
        const listItems = page.locator("ul nb-option")
        await expect(listItems).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
        await listItems.filter({hasText: 'Cosmic'}).click()

        const sidebar = page.locator("nb-sidebar")
        await expect(sidebar).toHaveCSS('background-color', 'rgb(50, 50, 89)')

        const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)",
        }

        for (const color in colors) {
            await listMenu.click()
            await listItems.filter({hasText: color}).click()
            await expect(sidebar).toHaveCSS('background-color', colors[color])
        } 
    })

    test('tooltips', async ({page}) => {
        await page.getByText('Modal & Overlays').click()
        await page.getByText('Tooltip').click()

        const tooltipCard = page.locator('nb-card', {hasText: 'Tooltip Placements'})
        await tooltipCard.getByRole('button', {name: 'top'}).hover()

        const tooltip = await page.locator('nb-tooltip').textContent()
        expect(tooltip).toEqual('This is a tooltip')
    })

    test('dialog', async ({page}) => {
        await page.getByText('Tables & Data').click()
        await page.getByText('Smart Table').click()

        await page.getByRole('table').locator('tr', {hasText: 'mdo@gmail.com'}).locator('.nb-trash').click()
        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })

        const allEmails: String[] = await page.locator('table > div > .ng-star-inserted').allTextContents()
        expect(allEmails.includes('mdo@gmail.com')).toBeFalsy()
    })
})