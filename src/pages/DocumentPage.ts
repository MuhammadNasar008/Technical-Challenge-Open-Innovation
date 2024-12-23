import { Page, Locator } from '@playwright/test';

// Class to interact with the Document-related UI components
export class DocumentPage {
  private page: Page;

  // Locators for various elements in the document page
  private fileInput: Locator;
  private uploadButton: Locator;
  private processPlayButton: Locator;
  public processedLbl: Locator;
  private deleteButton: Locator;
  private queryInput: Locator;
  private askQuestionButton: Locator;
  public answerSection: Locator;
  private referenceRow: Locator;
  private referenceExpandButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.fileInput = page.locator('input[type="file"]'); // File input field
    this.uploadButton = page.locator('input[type="file"] + button'); // Upload button
    this.processPlayButton = page.locator('[aria-label="Process file"]'); // Process (play icon) button
    this.processedLbl = page.locator('text=Processed'); // Processed label
    this.deleteButton = page.locator('//button[contains(@aria-label,"Delete")]'); // Delete button
    this.queryInput = page.locator('textarea'); // Query input box
    this.askQuestionButton = page.locator('button:has-text("Ask Question")'); // "Ask Question" button
    this.answerSection = page.locator('.bg-secondary.rounded-md>p'); // Answer section
    this.referenceRow = page.locator('[data-orientation="vertical"]'); // References section
    this.referenceExpandButton = page.locator('.referenceRow button'); // Expand references button
  }

  /**
   * Uploads a document to the application.
   * @param filePath - The full path of the document to upload
   */
  async uploadDocument(filePath: string): Promise<void> {
    await this.fileInput.setInputFiles(filePath); // Set the file in the file input field
    await this.uploadButton.click(); // Click the upload button (if necessary)
  }

  /**
   * Processes a document by clicking the play (process) button.
   */
  async processDocument(): Promise<void> {
    await this.processPlayButton.last().click(); // Click the last play button to process the document
  }

  /**
   * Asks a question related to the uploaded document.
   * @param query - The question to be asked
   */
  async askQuestion(query: string): Promise<void> {
    await this.queryInput.fill(query); // Fill the query input field with the provided question
    await this.askQuestionButton.click(); // Click the "Ask Question" button to submit the question
  }

  /**
   * Expands all reference rows if any exist.
   */
  async expandReferencesIfExisit(): Promise<void> {
    const expandButtons = this.referenceRow.locator('button'); // Locate all reference expand buttons

    // Check if any expand buttons exist
    if (await expandButtons.count() === 0) {
      console.log('No reference expand buttons found.'); // Log if no buttons are found
      return; // Exit the method
    } else {
      // Click all visible expand buttons
      await expandButtons.click();
    }
  }

  /**
   * Deletes the last uploaded document.
   */
  async deleteDocument(): Promise<void> {
    await this.deleteButton.last().click(); // Click the last delete button to remove the last uploaded document
  }

  /**
   * Deletes all uploaded documents.
   */
  async deleteAllDocuments(): Promise<void> {
    const buttonCount = await this.deleteButton.count(); // Count the number of delete buttons available

    // Check if there are any delete buttons
    if (buttonCount === 0) {
      console.log('No documents to delete.'); // Log if no delete buttons are found
      return; // Exit the method
    }

    // Iterate through all delete buttons and click each one
    for (let i = 0; i < buttonCount; i++) {
      await this.deleteButton.nth(i).click(); // Click the i-th delete button
      await this.deleteButton.nth(i).isHidden(); // Ensure the delete button is hidden after clicking
      console.log(`Deleted document ${i + 1}`); // Log the deletion
    }
    console.log('All documents have been deleted.'); // Log after all documents are deleted
  }
}
