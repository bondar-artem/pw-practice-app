//command to ui test: npx playwright test --ui
//command to launch the server: npm start

import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://legnet.com.br/");
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "ACESSE O LEGNET 🔒" }).click();
  const page1 = await page1Promise;
  await page1.getByRole("textbox", { name: " CÓDIGO DO CLIENTE" }).click();
  await page1
    .getByRole("textbox", { name: " CÓDIGO DO CLIENTE" })
    .fill("2106");
  await page1.getByRole("textbox", { name: " NOME DO USUÁRIO" }).click();
  await page1
    .getByRole("textbox", { name: " NOME DO USUÁRIO" })
    .fill("juridico");
  await page1.getByPlaceholder("Insira sua senha").click();
  await page1.getByPlaceholder("Insira sua senha").fill("Legnet123!*");
  await page1.getByRole("button", { name: "ENTRAR" }).click();
  await page1
    .getByRole("button", { name: "ESTATÍSTICAS DE ATENDIMENTO" })
    .click();
  const page2Promise = page1.waitForEvent("popup");
  await page1.getByText("Imprimir Relatório").first().click();
  const page2 = await page2Promise;
});
