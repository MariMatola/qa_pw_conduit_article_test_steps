import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page
      .getByPlaceholder('What\'s this article about?');
    this.bodyField = page.getByPlaceholder('Write your article (in');
    this.tagsField = page.getByPlaceholder('Enter tags');
    
  }

  async fillInTitle(title) {
    await test.step(`Fill in title`, async () => {
      await  this.titleField.fill(title);
    });
  }

  async fillInDescription(description) {
    await test.step(`Fill in description`, async () => {
      await  this.descriptionField.fill(description);
    });
  }

  async fillInBody(body) {
    await test.step(`Fill in body`, async () => {
      await  this.bodyField.fill(body);
    });
  }

  async fillInTags(tags, page) {
    await test.step(`Fill in tags`, async () => {
      for (let tag of tags) {
        await this.tagsField.fill(tag);
        await page.keyboard.press('Enter');
      }
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.page.getByText(messageText)).toBeVisible();
    });
  }

  async assertErrorMessageIsNotVisible(messageText) {
    await test.step(
      `Assert the '${messageText}' error is not displayed`, 
      async () => {
      await expect(this.page.getByText(messageText)).toBeHidden();
    });
  }
}
