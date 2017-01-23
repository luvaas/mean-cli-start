import { LuvaasPage } from './app.po';

describe('luvaas App', function() {
  let page: LuvaasPage;

  beforeEach(() => {
    page = new LuvaasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
