import { test, expect } from '@playwright/test';
import { DocumentPage } from '../pages/DocumentPage';
import { getFilePath } from '../utils/testHelpers';
import { BASE_URL } from '../utils/config';

test.describe('Document Upload and Query Workflow', () => {
  const fileName = 'Sample Test Document.pdf'; 
  const filePath = getFilePath(fileName); 
  const secondFileName = 'Sample Test Document Second.pdf'; 
  const secondFilePath = getFilePath(secondFileName); 

  let documentPage: DocumentPage;

  test.beforeEach(async ({ page }) => {
    documentPage = new DocumentPage(page);

    await test.step('Navigate to the application', async () => {
      await page.goto(BASE_URL);
    });
  });

  test('should upload, process, query, and validate references', async ({ page }) => {
    await test.step('Upload the first document', async () => {
      await documentPage.uploadDocument(filePath);
      await expect(page.locator(`xpath=//span[text()='${fileName}']`).last()).toBeVisible();
    });

    await test.step('Process the first document', async () => {
      await documentPage.processDocument();
      await expect(page.locator('text=Processed').first()).toBeVisible();
    });

    await test.step('Ask a question', async () => {
      const question = 'Give me more details?';
      await documentPage.askQuestion(question);
    });

    await test.step('Validate the answer', async () => {
      await expect(documentPage.answerSection).toBeVisible({ timeout: 35000 });
    });

    await test.step('Expand and validate references', async () => {
      await documentPage.expandReferencesIfExisit();
    });

    await test.step('Delete the first document', async () => {
      await documentPage.deleteDocument();
      await expect(page.locator(`xpath=//span[text()='${fileName}']`).last()).toBeHidden();
    });

    await test.step('Upload the new document', async () => {
      await documentPage.uploadDocument(secondFilePath);
      await expect(page.locator(`xpath=//span[text()='${secondFileName}']`).last()).toBeVisible();
    });
  });

  test.afterEach(async ({ page }) => {
    await test.step('Clean up: Delete all documents', async () => {
      await documentPage.deleteAllDocuments();
    });
  });
});
