describe('Deck JS Navigation Buttons', function() {
	beforeEach(function() {
		loadFixtures('standard.html');
		$.deck('.slide');
	});
	
	it('should go to the next slide if next link is clicked', function() {
		$(defaults.selectors.nextLink).click();
		setTimeout(function() {
			expect($.deck('getSlide')).toHaveClass('slide2');
		}, 0);
	});
	
	it('should go to the previous slide if previous link is clicked', function() {
		$.deck('go', 2);
		$(defaults.selectors.previousLink).click();
		setTimeout(function() {
			expect($.deck('getSlide')).toHaveClass('slide2');
		}, 0);
	});
	
	it('should add the disabled class to the previous link if on first slide', function() {
		expect($(defaults.selectors.previousLink)).toHaveClass(defaults.classes.navDisabled);
		$(defaults.selectors.nextLink).click();
		setTimeout(function() {
			expect($(defaults.selectors.previousLink)).not.toHaveClass(defaults.classes.navDisabled);
			$(defaults.selectors.previousLink).click();
			setTimeout(function() {
				expect($(defaults.selectors.previousLink)).toHaveClass(defaults.classes.navDisabled);
			}, 0);
		}, 0);
	});
	
	it('should add the disabled class to the next link if on last slide', function() {
		expect($(defaults.selectors.nextLink)).not.toHaveClass(defaults.classes.navDisabled);
		$.deck('go', $.deck('getSlides').length - 1);
		setTimeout(function() {
			expect($(defaults.selectors.nextLink)).toHaveClass(defaults.classes.navDisabled);
		}, 0);
	});
});