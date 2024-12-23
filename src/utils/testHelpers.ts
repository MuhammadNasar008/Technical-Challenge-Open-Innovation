import { Page } from '@playwright/test';
import path from 'path';

export const waitForElement = async (page: Page, selector: string, timeout = 5000) => {
  await page.waitForSelector(selector, { timeout });
};

export const clickElement = async (page: Page, selector: string) => {
  await waitForElement(page, selector);
  await page.click(selector);
};

export const getFilePath = (fileName: string): string => {
    return path.resolve(__dirname, '../../src/data/documents', fileName);
};

export const generateRandomString = (length: number): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return Array.from({ length }, () => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
};