import { Page, expect } from '@playwright/test';

export class Products {
    readonly page: Page;
    readonly logo;
    readonly shopNowButton;
    readonly assertion;
    readonly firstProductCard;
    readonly pdpHeading;
    readonly pdpImage;

    constructor(page: Page) {
        this.page = page;
        this.logo = page.locator('//div[@data-testid="logo"]').first();
        this.shopNowButton = page.getByRole('button', { name: 'Shop Now →' });
        this.assertion = page.getByRole('heading', { name: 'Shop All' });

        this.firstProductCard = page.locator('#page-products .product-card').first();
        this.pdpHeading = page.locator('#page-product h1').first();
        this.pdpImage = page.locator('#page-product img').first();
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
        await this.page.goBack();
        await expect(this.assertion).toBeVisible();
    }
}
