import { test, expect } from "@playwright/test";
import { Login } from "../pages/Login";

test.describe("Registration", () => {
  test("happy path: new account creation redirects and shows confirmation", async ({ page }) => {
    const login = new Login(page);

    await login.gotoUrl();
    await login.gotoRegister();
    await login.performRegistration(
      `testuser+${Date.now()}@haus.com`,
      "SecurePass123!",
      "Test",
      "User"
    );
    // After successful registration the success toast is asserted inside performRegistration.
    // Verify the user is now signed in (profile visible or redirect to home).
    await expect(page.locator('#profile-email').first()).toBeVisible();
  });

  test("validation: duplicate email surfaces an error", async ({ page }) => {
    const login = new Login(page);

    await login.gotoUrl();
    await login.gotoRegister();
    await login.verifyDuplicateEmailError();
  });

  test("validation: empty required fields surface an error", async ({ page }) => {
    const login = new Login(page);

    await login.gotoUrl();
    await login.gotoRegister();
    await login.verifyEmptyFieldsError();
  });

  test("validation: weak password surfaces an error", async ({ page }) => {
    const login = new Login(page);

    await login.gotoUrl();
    await login.gotoRegister();
    await login.verifyWeakPasswordError();
  });
});
