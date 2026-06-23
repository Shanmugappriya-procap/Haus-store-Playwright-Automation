import { test } from "@playwright/test";
import { Login } from "../pages/Login";
import { Logout } from "../pages/Logout";
import { SearchProducts } from "../pages/SearchProducts";
import { JiraClient } from "../../jira/JiraClient";

test.describe("E2E: Product Search", () => {
  test("performs search and verifies results", async ({ page }) => {
    const login = new Login(page);
    const searchProducts = new SearchProducts(page);
    const logout = new Logout(page);
    const jiraClient = new JiraClient();

    try {
      await login.gotoUrl();
      await login.gotoLogin();
      await login.performLogin();
      await searchProducts.performSearch();
      await logout.performLogout();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      const screenshotPath = `test-results/failure-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      await jiraClient.reportFailure("E2E: Product Search", message, screenshotPath);
      throw error;
    }
  });
});
