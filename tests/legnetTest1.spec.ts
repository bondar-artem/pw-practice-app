//command to ui test: npx playwright test --ui
//command to launch the server: npm start

import { expect, test } from "@playwright/test";

test("Login", async ({ page }) => {
  await page.goto("https://www.legnet.com.br/legnet/login.php");
  const cod_cli = page.locator("#login_cod_cliente");
  await cod_cli.fill("2106");
  const user_name = page.locator("#login_usuario");
  await user_name.fill("juridico");
  const login_senha = page.locator("#login_senha");
  await login_senha.fill("Legnet123!");
  await page.getByRole("button", { name: "ENTRAR" }).first().click();
  // await page.click('#fa-plus-topo');
  // const fourthDiv = await page.$('#menubase > div:nth-child(3)');
  // await fourthDiv.hover();
  //await page.click(".space")
  
})


