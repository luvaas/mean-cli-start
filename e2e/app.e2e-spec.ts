import { MeanStartPage } from './app.po';

describe('mean-cli-start App', function() {
	let page: MeanStartPage;

	beforeEach(() => {
		page = new MeanStartPage();
	});

	it('should display message saying app works', () => {
		page.navigateTo();
		expect(page.getParagraphText()).toContain('app works!');
	});
});
