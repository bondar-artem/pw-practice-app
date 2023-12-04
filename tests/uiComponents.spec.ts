import { expect, test } from "@playwright/test";

test.describe("test suite 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:4200/");
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").first().click();
  });
  test("Input fields test", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("demo@email.com");
    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("test@new.com", {
      delay: 500,
    });

    // generic assertions
    const inputValue = await usingTheGridEmailInput.inputValue();
    expect(inputValue).toEqual("test@new.com");

    // locator assertions
    await expect(usingTheGridEmailInput).toHaveValue("test@new.com");
  });
});
