import { Page, expect } from '@playwright/test';
import checkOutDetails from '../data/checkout-details.json';

export class CheckOut {
    readonly page: Page;
    readonly emailInput;
    readonly PhoneInput;
    readonly firstNameInput;
    readonly lastNameInput;
    readonly addressInput;
    readonly cityInput;
    readonly postalCodeInput;
    readonly countryInput;
    readonly cardnumberInput;
    readonly expiryInput;
    readonly cvvInput;
    readonly nameOnCardInput;
    readonly placeOrderBtn;
    readonly orderConfirmation;
    readonly shippingType;
    readonly successfulOrderMessage;
    readonly orderNumber;
    readonly guestCheckoutBtn;
    readonly orderHistoryHeading;
    readonly orderHistoryList;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByTestId('co-email').first();
        this.PhoneInput = page.getByTestId('co-phone').first();
        this.firstNameInput = page.getByTestId('co-firstname').first();
        this.lastNameInput = page.getByTestId('co-lastname').first();
        this.addressInput = page.getByTestId('co-address1').first();
        this.cityInput = page.getByTestId('co-city').first();
        this.postalCodeInput = page.getByTestId('co-zip').first();
        this.countryInput = page.locator('#co-country').first();
        this.cardnumberInput = page.getByTestId('co-card').first();
        this.expiryInput = page.getByTestId('co-expiry').first();
        this.cvvInput = page.getByTestId('co-cvv').first();
        this.nameOnCardInput = page.getByTestId('co-cardname').first();
        this.placeOrderBtn = page.getByRole('button', { name: 'Place Order →' }).first();
        this.orderConfirmation = page.locator('#order-confirmation').first();
        this.shippingType = page.locator('//label[@class="radio-item selected"]').first();
        this.successfulOrderMessage = page.getByText("Placed Order!").first();
        this.orderNumber = page.locator('#order-confirmation [data-testid="order-number"]').first();
        this.guestCheckoutBtn = page.getByTestId('guest-checkout').first();
        this.orderHistoryHeading = page.getByRole('heading', { name: /orders/i }).first();
        this.orderHistoryList = page.locator('[data-testid="order-history-item"]');
    }

    async fillContactInformation() {
        const c = checkOutDetails.CheckoutDetails.ContactInfo;
        await this.emailInput.fill(c.email);
        await this.PhoneInput.fill(c.phone);
        await this.firstNameInput.fill(c.firstName);
        await this.lastNameInput.fill(c.lastName);
        await this.addressInput.fill(c.address);
        await this.cityInput.fill(c.city);
        await this.postalCodeInput.fill(c.zip);
        await this.countryInput.selectOption(c.country);
    }

    async chooseShippingMethod() {
        await this.shippingType.click();
        await expect(this.shippingType).toBeChecked();
    }

    async fillPaymentDetails() {
        const p = checkOutDetails.CheckoutDetails.PaymentInfo;
        await this.cardnumberInput.fill(p.cardNumber);
        await this.expiryInput.fill(p.expiry);
        await this.cvvInput.fill(p.cvv);
        await this.nameOnCardInput.fill(p.nameOnCard);
    }

    async placeOrder() {
        await this.placeOrderBtn.click();
        await expect(this.successfulOrderMessage).toBeVisible();
    }

    async verifyOrderConfirmation() {
        await expect(this.orderConfirmation).toBeVisible();
        await expect(this.successfulOrderMessage).toBeVisible();
        await expect(this.orderNumber).toBeVisible();
        const orderNum = await this.orderNumber.textContent();
        expect(orderNum?.trim().length).toBeGreaterThan(0);
    }

    async proceedAsGuest() {
        await this.guestCheckoutBtn.click();
    }

    async gotoOrderHistory() {
        await this.page.locator('#profile-email').first().click();
        await this.page.getByRole('link', { name: /orders/i }).first().click();
        await expect(this.orderHistoryHeading).toBeVisible();
    }

    async verifyRecentOrderVisible() {
        await expect(this.orderHistoryList.first()).toBeVisible();
    }
}
