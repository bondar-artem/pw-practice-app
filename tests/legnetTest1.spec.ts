//command to ui test: npx playwright test --ui
//command to launch the server: npm start

import { expect, test } from "@playwright/test";

test("Login", async ({ page }) => {
  await page.goto("https://www.legnet.com.br/legnet/login.php");
  const cod_cli = page.locator("#login_cod_cliente");
  await cod_cli.fill("1");

})

