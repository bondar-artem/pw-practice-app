//command to ui test: npx playwright test --ui
//command to launch the server: npm start

import { expect, test } from "@playwright/test";

test("Login", async ({ page }) => {
  await page.goto("https://www.legnet.com.br/app-web/relatorios/estatistica_obrigacoes.php?conexao={92A15473-CADD-B24B-AABF-6244FFBC235E}&cod_area=6&cod_setor=40&cod_ficha=&cod_modulo=&grupoobrigacoes=&origem=&cod_estado=&cod_municipio=&cod_atendimento=&to_nat=&to_at=&to_nav=&to_po=&to_to=");
  
  await page.click('#FormularioExportacao')
  
  
  
});
 
  


