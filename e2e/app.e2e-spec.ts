import { MeanStartPage } from './app.po';

describe('luvaas App', function() {
	let page: MeanStartPage;

	beforeEach(() => {
		page = new MeanStartPage();
	});

	it('should display message saying app works', () => {
		page.navigateTo();
		expect(page.getParagraphText()).toEqual('app works!');
	});
});
