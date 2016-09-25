import { TwilioReactionsIpmPage } from './app.po';

describe('twilio-reactions-ipm App', function() {
  let page: TwilioReactionsIpmPage;

  beforeEach(() => {
    page = new TwilioReactionsIpmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
