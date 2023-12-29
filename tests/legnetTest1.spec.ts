//command to ui test: npx playwright test --ui
//command to launch the server: npm start

import { expect, test } from "@playwright/test";
const { chromium } = require('playwright');

test("Login", async ({ page }) => {
  await page.goto("https://www.legnet.com.br/legnet/login.php");
  const cod_cli = page.locator("#login_cod_cliente");
  await cod_cli.fill("2106");
  const user_name = page.locator("#login_usuario");
  await user_name.fill("juridico");
  const login_senha = page.locator("#login_senha");
  await login_senha.fill("Legnet123!*");
  await page.getByRole("button", { name: "ENTRAR" }).first().click();
  await page.click('.marcado');
  await page.click('.btn-success');
  await page.click('.btn-primary');//vai para relatório de obrigações
   
})


// test('dashboard-obrigaçoes-pdf', async () => {
//   const browser = await chromium.launch();
//   const context = await browser.newContext();
//   const page = await context.newPage();
  
//   // Navigate to the desired URL
//   await page.goto('https://www.legnet.com.br/app-web/relatorios/estatistica_obrigacoes.php?conexao={FB361AFD-C3C0-F3F6-C539-4D3DE21E9767}&cod_area=6&cod_setor=40&cod_ficha=&cod_modulo=&grupoobrigacoes=&origem=&cod_estado=&cod_municipio=&cod_atendimento=&to_nat=&to_at=&to_nav=&to_po=&to_to=');
  
//   // Wait for the page to load
//   await page.waitForLoadState();
  
//   // Save the page as a PDF
//   await page.pdf({ path: 'c:/playwrightFiles/pdf.pdf' });
  
//   // Close the browser
  
//   });

test("dashboard-obrigaçoes-excel", async ({ page }) => {
  await page.goto("https://www.legnet.com.br/app-web/relatorios/estatistica_obrigacoes.php?conexao={92A15473-CADD-B24B-AABF-6244FFBC235E}&cod_area=6&cod_setor=40&cod_ficha=&cod_modulo=&grupoobrigacoes=&origem=&cod_estado=&cod_municipio=&cod_atendimento=&to_nat=&to_at=&to_nav=&to_po=&to_to=");
  
  await page.click('#FormularioExportacao')
   
  
});

  test("dashboard-obrigaçoes-excel", async ({ page }) => {
    await page.goto("https://www.legnet.com.br/app-web/relatorios/estatistica_obrigacoes.php?conexao={92A15473-CADD-B24B-AABF-6244FFBC235E}&cod_area=6&cod_setor=40&cod_ficha=&cod_modulo=&grupoobrigacoes=&origem=&cod_estado=&cod_municipio=&cod_atendimento=&to_nat=&to_at=&to_nav=&to_po=&to_to=");
    
    await page.click('#FormularioExportacao')

   
       
    
  });
   