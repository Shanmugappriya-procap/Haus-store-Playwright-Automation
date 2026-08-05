import { Page, expect } from '@playwright/test';
import testData from '../data/test-data.json';

export class Filter {
    readonly page: Page;
    readonly filterButton;
    readonly filterButtonClothing;
    readonly productCount;

    constructor(page: Page) {
        this.page = page;
        this.filterButton = page.locator('//button[@class="filter-btn"]');
        this.filterButtonClothing = page.getByRole('button', { name: 'Clothing' });
        this.productCount = page.getByTestId('product-count');
    }

    // Apply all filter and verify the product count and active state of filter button
    async applyAllFilter() {
        const f = testData.filters.all;
        await expect(this.productCount.nth(0)).toContainText(String(f.expectedCountText));
        await expect(this.page.getByTestId(f.testId).nth(0)).toHaveClass(/active/);
    }

    // Apply clothing filter and verify the product count and active state of filter button
    async applyClothingFilter() {
        const f = testData.filters.clothing;
        await this.filterButtonClothing.click();
        await expect(this.productCount.nth(0)).toContainText(String(f.expectedCountText));
        await expect(this.page.getByTestId(f.testId).nth(1)).toHaveClass(/filter-btn/);
    }

    // Apply accessories filter and verify the product count and active state of filter button
    async applyAccessoriesFilter() {
        const f = testData.filters.accessories;
        await this.filterButton.nth(1).click();
        await expect(this.productCount.nth(2)).toContainText(String(f.expectedCount));
        await expect(this.page.getByTestId(f.testId).nth(2)).toHaveClass(/filter-btn/);
    }

    // Apply home filter and verify the product count and active state of filter button
    async applyHomeFilter() {
        const f = testData.filters.beauty;
        await this.filterButton.nth(2).click();
        await expect(this.productCount.nth(3)).toContainText(String(f.expectedCount));
        await expect(this.page.getByTestId(f.testId).nth(3)).toHaveClass(/filter-btn/);
    }

    // Apply beauty filter and verify the product count and active state of filter button
    async applyBeautyFilter() {
        const f = testData.filters.beauty;
        await this.filterButton.nth(3).click();
        await expect(this.productCount.nth(4)).toContainText(String(f.expectedCount));
        await expect(this.page.getByTestId(f.testId).nth(3)).toHaveClass(/filter-btn/);
    }
}
