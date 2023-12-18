import { test } from "@playwright/test";

//testes unitários
test("some describing string", async({ page }) => {
    await page.goto('http://localhost:4200')
await page.getByText("Forms").click()
await page.getByText("Form Layouts").click()
});
