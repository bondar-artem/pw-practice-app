import {test} from '@playwright/test';


test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/');
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
});

test('Locator syntax rules', async ({page}) => {
  //by tag name
  await page.locator('input').first().click();

  //by id
  await page.locator('#inputEmail1').click();

  //by class name
  page.locator('.shape-rectangle');

  //by attribute name
  page.locator('[placeholder="Email"]');

  //by Class value (full)
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]');

  //combine different selectors
  page.locator('input[placeholder="Email"].shape-rectangle');

  //By xpath (NOT RECOMENDADO)
  page.locator('//*[@id="inputEmail"]');

  //By partial text match
  page.locator(':text{"Using"}');

  //By text exact match
  page.locator(':text-is{"Using the Grid"}')
});