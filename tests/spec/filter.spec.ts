import { test } from "@playwright/test";
import { Login } from "../pages/Login";
import { Logout } from "../pages/Logout";
import { Products } from "../pages/Products";
import { Filter } from "../pages/Filter";
import { JiraClient } from "../../jira/JiraClient";

test.describe("E2E: Product Filter", () => {
  test("applies all category filters and verifies product counts", async ({ page }) => {
    const login = new Login(page);
    const logout = new Logout(page);
    const products = new Products(page);
    const filter = new Filter(page);
    const jiraClient = new JiraClient();

    try {
      await login.gotoUrl();
      await login.gotoLogin();
      await login.performLogin();
      await products.gotoShopNow();

      await filter.applyAllFilter();
      await filter.applyClothingFilter();
      await filter.applyAccessoriesFilter();
      await filter.applyHomeFilter();
      await filter.applyBeautyFilter();
      await logout.performLogout();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      const screenshotPath = `test-results/failure-${Date.now()}.png`;
      await page.screenshot({ path: screenshotPath, fullPage: true });
      await jiraClient.reportFailure("E2E: Product Filter", message, screenshotPath);
      throw error;
    }
  });
});
