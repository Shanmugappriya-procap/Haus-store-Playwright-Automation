import { Page, expect } from '@playwright/test';
import testData from '../data/test-data.json';

export class Logout {
    readonly page: Page;
    readonly profileIcon;
    readonly landingAssertion;

    constructor(page: Page) {
        this.page = page;
        this.landingAssertion = page.locator('#profile-email').first();
        this.profileIcon = page.locator('#auth-nav-btn').first();
    }

    async performLogout() {
        await this.profileIcon.click();
        await expect(this.page.locator('#toast').nth(0)).toContainText(testData.toastMessages.logout);
    }
}
