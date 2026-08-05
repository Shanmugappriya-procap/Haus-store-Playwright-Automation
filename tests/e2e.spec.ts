import { test } from '@playwright/test';
import { Login } from './pages/Login';
import { Logout } from './pages/Logout';
import { Products } from './pages/Products';
import { Filter } from './pages/Filter';
import { Cart } from './pages/AddProducts';
import { CheckOut } from './pages/Checkout';

test.describe('E2E: Full Purchase Flow', () => {
  test('completes login, browse, add-to-cart, checkout and order confirmation', async ({ page }) => {
    const login = new Login(page);
    const logout = new Logout(page);
    const checkout = new CheckOut(page);
    const products = new Products(page);
    const filter = new Filter(page);
    const cart = new Cart(page);

    await login.gotoUrl();
    await login.gotoLogin();
    await login.performInvalidLogin();
    await login.performLogin();

    await products.gotoShopNow();

    // Navigate to PDP and verify heading + image are visible
    await products.gotoProductDetail();

    // Add to cart from PDP and verify cart count increments
    await cart.addToCartFromPDP();
    await products.returnToShop();

    await filter.applyAllFilter();
    await cart.addProductsDynamically();
    await cart.gotoCart();
    await cart.verifyCartPricing();

    await cart.applyPromoCode('HAUS20');
    await cart.verifyHaus20Discount();

    await cart.applyPromoCode('FREESHIP');
    await cart.verifyFreeShipping();

    await cart.applyPromoCode('INVALID');

    await cart.proceedToCheckout();
    await checkout.fillContactInformation();
    await checkout.chooseShippingMethod();
    await checkout.fillPaymentDetails();
    await checkout.placeOrder();

    // Assert confirmation page shows order number and summary
    await checkout.verifyOrderConfirmation();

    // Navigate to order history and verify recent order is listed
    await checkout.gotoOrderHistory();
    await checkout.verifyRecentOrderVisible();

    await logout.performLogout();
  });
});
