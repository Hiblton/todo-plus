import { AppPage } from './app.po';

describe('todo-plus App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display button', () => {
    page.navigateTo();
    expect(page.seeButton()).toBeTruthy();
  });
});
