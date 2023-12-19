//command to ui test: npx playwright test --ui
//command to launch the server: npm start 

import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("locator syntax rules", async ({ page }) => {
  //note that the locators are useless without an action and await 'cause an action is a promise, a locator is not

  //by tag name
  //await page.locator('input').click() //return all inputs so the click will return an error, but...

  await page.locator("input").first().click(); //will return ok

  //by ID
  page.locator("#inputEmail1");

  //by class
  page.locator(".shape-rectangle"); //return all inputs with this class

  //by atribute
  page.locator('[placeholder="Email"]');

  //by full class value
  page.locator(
    '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
  );

  //combine different selectors. no space between selectors
  page.locator('input[placeholder="Email"][nbinput]');

  //by xpath (not recommended)
  page.locator('//*[@id="inputEmail1"]');

  //parcial text match
  page.locator(':text("Using")');

  //by exact text match
  page.locator(':text-is("Using the Grid")');
});

test("user facing locators", async ({ page }) => {
  await page.getByRole("textbox", { name: "Email" }).first().click();
  await page.getByRole("button", { name: "Sign in" }).first().click();
  await page.getByLabel("email").first().click();
  await page.getByPlaceholder("jane doe").click();
  await page.getByText("using the grid").click();
  //await page.getByTitle('IoT Dashboard').click()
  await page.getByTestId("signIn").click();
});

test("locating child elements", async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    //é possível ainda encadear os filhos:
    await page.locator('nb-card').locator('nb-radio').locator (':text-is("Option 2")').click()
    //é possível ainda combinar regular locator com facing locator. Obs. o button abaixo poderia ser selecionado apenas com o método getByRole
    await page.locator('nb-card').getByRole('button', {name: "sign in"}).first().click()
    //selecionando pelo index
    await page.locator('nb-card').nth(3).getByRole('button').click() //elements are 0 index based so this is the fourth element from the top of the DOM
});

test('locating parents elements',async ({page}) => {
    await page.locator('nb-card', {hasText: "using the grid"}).getByRole("textbox", { name: "Email" }).click();
    await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByRole("textbox", { name: "Email" }).click();
    await page.locator('nb-card').filter({hasText: "basic form"}).getByRole('textbox', {name: "email"}).click()
    await page.locator("nb-card").filter({has: page.locator(".status-danger")}).getByRole('textbox', {name: "password"}).click()
    await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'sign in'}).getByRole('textbox', {name: "email"}).click()
    await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', {name: "email"}).click()
  })

  test( 'extracting values',async ({page}) => {
    const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    //all text values
    const allRadioButtonsLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonsLabels).toContain("Option 1")

    //input value
    const emailField = basicForm.getByRole('textbox', {name: "Email"})
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    //value from attributes
    const placeholderValue = await emailField.getAttribute('placeholder')
    expect (placeholderValue).toEqual('Email')
    })
