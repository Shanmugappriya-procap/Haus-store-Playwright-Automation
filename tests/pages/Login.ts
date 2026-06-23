import { Page, expect } from '@playwright/test';
import testData from '../Data/TestData.json';

export class Login {
    readonly page: Page;
    readonly homeLanding;
    readonly loginButton;
    readonly loginLanding;
    readonly emailInput;
    readonly passwordInput;
    readonly signInButton;
    readonly successfulLogin;
    readonly loginValidation;

    // Registration selectors
    readonly registerTab;
    readonly registerEmailInput;
    readonly registerPasswordInput;
    readonly registerConfirmPasswordInput;
    readonly registerFirstNameInput;
    readonly registerLastNameInput;
    readonly registerBtn;
    readonly registerError;
    readonly registerSuccessToast;

    constructor(page: Page) {
        this.page = page;
        this.homeLanding = page.getByRole('paragraph').filter({ hasText: 'New Collection — Spring' });
        this.loginButton = page.getByRole('button', { name: 'Sign In' }).first();
        this.loginLanding = page.getByText('Sign In').first();
        this.emailInput = page.getByPlaceholder('you@example.com').nth(1);
        this.passwordInput = page.locator('#login-password').first();
        this.signInButton = page.getByTestId('login-btn').first();
        this.successfulLogin = page.locator('#profile-email').first();
        this.loginValidation = page.locator('#login-error').first();

        this.registerTab = page.getByRole('tab', { name: /register/i }).first();
        this.registerEmailInput = page.getByPlaceholder('you@example.com').nth(0);
        this.registerPasswordInput = page.locator('#register-password').first();
        this.registerConfirmPasswordInput = page.locator('#register-confirm-password').first();
        this.registerFirstNameInput = page.getByPlaceholder('Jane').first();
        this.registerLastNameInput = page.getByPlaceholder('Smith').first();
        this.registerBtn = page.getByTestId('register-btn').first();
        this.registerError = page.locator('#register-error').first();
        this.registerSuccessToast = page.locator('#toast').first();
    }

    async gotoUrl() {
        await this.page.goto('/');
        await expect(this.homeLanding).toBeVisible();
    }

    async gotoLogin() {
        await this.loginButton.click();
        await expect(this.loginLanding).toBeVisible();
    }

    async gotoRegister() {
        await this.loginButton.click();
        await this.registerTab.click();
    }

    async performLogin() {
        await this.emailInput.fill(testData.users.validUser.email);
        await this.passwordInput.fill(testData.users.validUser.password);
        await this.signInButton.click();
        await expect(this.successfulLogin).toBeVisible();
    }

    async performInvalidLogin() {
        await this.emailInput.fill(testData.users.invalidUser.email);
        await this.passwordInput.fill(testData.users.invalidUser.password);
        await this.signInButton.click();
        await expect(this.loginValidation).toContainText(testData.toastMessages.invalidLogin);
    }

    async performRegistration(email: string, password: string, firstName: string, lastName: string) {
        await this.registerEmailInput.fill(email);
        await this.registerPasswordInput.fill(password);
        await this.registerConfirmPasswordInput.fill(password);
        await this.registerFirstNameInput.fill(firstName);
        await this.registerLastNameInput.fill(lastName);
        await this.registerBtn.click();
        await expect(this.registerSuccessToast).toContainText(testData.toastMessages.registerSuccess);
    }

    async verifyDuplicateEmailError() {
        await this.registerEmailInput.fill(testData.users.validUser.email);
        await this.registerPasswordInput.fill('SecurePass123!');
        await this.registerConfirmPasswordInput.fill('SecurePass123!');
        await this.registerBtn.click();
        await expect(this.registerError).toBeVisible();
    }

    async verifyEmptyFieldsError() {
        await this.registerBtn.click();
        await expect(this.registerError).toBeVisible();
    }

    async verifyWeakPasswordError() {
        await this.registerEmailInput.fill('weaktest@haus.com');
        await this.registerPasswordInput.fill('123');
        await this.registerConfirmPasswordInput.fill('123');
        await this.registerBtn.click();
        await expect(this.registerError).toBeVisible();
    }
}
