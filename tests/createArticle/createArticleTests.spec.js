import { test } from '@playwright/test';
import { SignUpPage } from '../../src/pages/SignUpPage';
import { HomePage } from '../../src/pages/HomePage';
import { CreateArticlePage } from '../../src/pages/CreateArticlePage';
import { faker } from '@faker-js/faker';

let homePage;
let createArticlePage;

const articleTestData = {
  title: faker.hacker.phrase(),
  description: faker.hacker.phrase(),
  body: faker.lorem.sentence(5),
  tags: [ faker.lorem.word(), faker.lorem.word() ],
}

test.beforeEach(async ({ page }) => {
  const signUpPage = new SignUpPage(page);
  homePage = new HomePage(page);
  createArticlePage = new CreateArticlePage(page);

  const user = {
    username: `${faker.person.firstName()}_${faker.person.lastName()}`,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  await signUpPage.open();
  await signUpPage.fillUsernameField(user.username);
  await signUpPage.fillEmailField(user.email);
  await signUpPage.fillPasswordField(user.password);
  await signUpPage.clickSignUpButton();
  await homePage.assertYourFeedTabIsVisible();
});

test('Create an article with required and optional fields', async ({page}) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillInTitle(articleTestData.title);
  await createArticlePage.fillInDescription(articleTestData.description);
  await createArticlePage.fillInBody(articleTestData.body);
  await createArticlePage.fillInTags(articleTestData.tags, page);
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageIsNotVisible(
    'Article title cannot be empty',
  );
  await createArticlePage.assertErrorMessageIsNotVisible(
    'Article description cannot be empty',
  );
  await createArticlePage.assertErrorMessageIsNotVisible(
    'Article body cannot be empty',
  );
});

test('Create an article without article description', async ({page}) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillInTitle(articleTestData.title);
  await createArticlePage.fillInBody(articleTestData.body);
  await createArticlePage.fillInTags(articleTestData.tags, page);
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageIsNotVisible(
    'Article title cannot be empty',
  );
  await createArticlePage.assertErrorMessageContainsText(
    'Article description cannot be empty',
  );
  await createArticlePage.assertErrorMessageIsNotVisible(
    'Article body cannot be empty',
  );
});

test('Create an article without article text', async ({page}) => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillInTitle(articleTestData.title);
  await createArticlePage.fillInDescription(articleTestData.description);
  await createArticlePage.fillInTags(articleTestData.tags, page);
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageIsNotVisible(
    'Article title cannot be empty',
  );
  await createArticlePage.assertErrorMessageIsNotVisible(
    'Article description cannot be empty',
  );
  await createArticlePage.assertErrorMessageContainsText(
    'Article body cannot be empty',
  );
});

test('Create an article without article tag', async () => {
  await homePage.clickNewArticleLink();

  await createArticlePage.fillInTitle(articleTestData.title);
  await createArticlePage.fillInDescription(articleTestData.description);
  await createArticlePage.fillInBody(articleTestData.body);
  await createArticlePage.clickPublishArticleButton();

  await createArticlePage.assertErrorMessageIsNotVisible(
    'Article title cannot be empty',
  );
  await createArticlePage.assertErrorMessageIsNotVisible(
    'Article description cannot be empty',
  );
  await createArticlePage.assertErrorMessageIsNotVisible(
    'Article body cannot be empty',
  );
});
