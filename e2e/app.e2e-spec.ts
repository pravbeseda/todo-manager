import { TodoManagerPage } from './app.po';

describe('todo-manager App', () => {
  let page: TodoManagerPage;

  beforeEach(() => {
    page = new TodoManagerPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
