import { Page, expect } from '@playwright/test';

export class Products {
    readonly page: Page;
    readonly logo;
    readonly shopNowButton;
    readonly assertion;
    readonly firstProductCard;
    readonly pdpHeading;
    readonly pdpImage;
    readonly shopNavLink;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('//div[@data-testid="logo"]').first();
        this.shopNowButton = page.getByRole('button', { name: 'Shop Now →' });
        this.assertion = page.getByRole('heading', { name: 'Shop All' });
        this.shopNavLink = page.getByRole('listitem').filter({ hasText: 'Shop' }).first();

        this.firstProductCard = page.locator('#page-products .product-card').first();
        this.pdpHeading = page.getByTestId('detail-title').first();
        this.pdpImage = page.locator('#detail-content img').first();
    }

    async gotoShopNow() {
        await this.logo.click();
        await this.shopNowButton.click();
        await expect(this.assertion).toBeVisible();
    }

    async gotoProductDetail() {
        await this.firstProductCard.click();
        await expect(this.pdpHeading).toBeVisible();
        await expect(this.pdpImage).toBeVisible();
    }

    async returnToShop() {
        await this.shopNavLink.click();
        await expect(this.assertion).toBeVisible();
    }
}
