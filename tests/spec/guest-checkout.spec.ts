import { test } from "@playwright/test";
import { Login } from "../pages/Login";
import { Products } from "../pages/Products";
import { Cart } from "../pages/AddProducts";
import { CheckOut } from "../pages/Checkout";

test.describe("Guest Checkout", () => {
  test("completes purchase without an account", async ({ page }) => {
    const login = new Login(page);
    const products = new Products(page);
    const cart = new Cart(page);
    const checkout = new CheckOut(page);

    // Navigate to shop without logging in
    await login.gotoUrl();
    await products.gotoShopNow();

    // Add first visible product to cart via quick-add
    await cart.addProductsDynamically();
    await cart.gotoCart();

    // Proceed to checkout as guest (bypasses login requirement)
    await checkout.proceedAsGuest();

    // Fill contact and payment details
    await checkout.fillContactInformation();
    await checkout.chooseShippingMethod();
    await checkout.fillPaymentDetails();
    await checkout.placeOrder();

    // Assert confirmation page
    await checkout.verifyOrderConfirmation();
  });
});
