import { test } from '@playwright/test';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';
import { SearchProducts } from './pages/SearchProducts';

test.describe('E2E: Product Search', () => {
  test('performs search and verifies results', async ({ page }) => {
    const login = new Login(page);
    const searchProducts = new SearchProducts(page);
    const logout = new Logout(page);

    await login.gotoUrl();
    await login.gotoLogin();
    await login.performLogin();
    await searchProducts.performSearch();
    await logout.performLogout();
  });
});
