describe('Deck JS Status Indicator', function() {
	beforeEach(function() {
		loadFixtures('standard.html');
		if (Modernizr.history) {
			history.replaceState({}, "", "#")
		}
		else {
			window.location.hash = '#';
		}
		$.deck('.slide');
	});
	
	it('should show the correct total number of slides', function() {
		expect($(defaults.selectors.statusTotal)).toHaveText($.deck('getSlides').length);
	});
	
	it('should start at 1 of X', function() {
		expect($(defaults.selectors.statusCurrent)).toHaveText(1);
	});
	
	it('should update to the correct number on slide change', function() {
		$.deck('go', 2);
		expect($(defaults.selectors.statusCurrent)).toHaveText('3');
	});
});