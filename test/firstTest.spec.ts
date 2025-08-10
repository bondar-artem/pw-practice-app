import { state } from '@angular/animations';
import {expect, test} from '@playwright/test';

test.beforeEach( async({page}) => {

    await page.goto('http://localhost:4200/');
    await page.waitForTimeout(1000); // Pequena espera para o menu expandir
    await page.locator('g[data-name="menu-2"]').click()
    await page.locator('a[title="Forms"]').waitFor({state: 'visible'})
    await page.locator('a[title="Forms"]').click();
    await page.locator('a[title= "Form Layouts"]').click()


   
})


test('Preenchendo formulário', async ({page}) => {

    //localizando pelo Label "Email" e por ser o primeiro card com o primeiro campo "Email"
    await page.getByLabel('Email').first().click()
    await page.getByLabel('Email').first().fill('seuemail@example.com')
    //localizando o Email pelo nome do Card
    //await page.locator('nb-card', {hasText: "Using the Grid"}).getByLabel('textbox', {name: "Email"}).click()
    

    await page.getByLabel('Password').first().click()
    await page.getByLabel('Password').first().fill('seuemail@example.com')

    //localizando pelo elemento filho

    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    //await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 1")').click()


    //usando o status do botão do Sign In 
    await page.click('button[status="primary"]:has-text("Sign in")');

    //localizando o botão Sign in pelo filho
   // await page.locator('nb-card').getByRole('button', {name: "Sign in"}).first().click()


})

//Reduzindo a duplicação de código
test('Reutilizando Locator', async ({page}) => {

    const BasicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const emailField = BasicForm.getByRole('textbox', {name: "Email"})
    const passowordField = BasicForm.getByRole('textbox', {name: "Password"})



    await emailField.fill("text@test.com")
    await passowordField.fill("123")
    await BasicForm.locator('nb-checkbox').click()
    await BasicForm.locator('button').click()

    await expect(emailField).toHaveValue('text@test.com')

})

test('extracting value', async ({page}) => {

    //single test values
    const BasicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await BasicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')


    //all test value
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents([])
    expect(allRadioButtonsLabels).toContain("Option 1")

   //input value

   const emailField = BasicForm.getByRole('textbox', {name: "Email"})
   await emailField.fill("text@test.com")
   const emailVaue = await emailField.inputValue()
   expect(emailVaue).toEqual("text@test.com")

})

