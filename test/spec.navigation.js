describe('Deck JS Navigation Buttons', function() {
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
	
	it('should go to the next slide if next link is clicked', function() {
		$(defaults.selectors.nextLink).click();
		expect($.deck('getSlide')).toHaveClass('slide2');
	});
	
	it('should go to the previous slide if previous link is clicked', function() {
		$.deck('go', 2);
		$(defaults.selectors.previousLink).click();
		expect($.deck('getSlide')).toHaveClass('slide2');
	});
	
	it('should add the disabled class to the previous link if on first slide', function() {
		expect($(defaults.selectors.previousLink)).toHaveClass(defaults.classes.navDisabled);
		$(defaults.selectors.nextLink).click();
		expect($(defaults.selectors.previousLink)).not.toHaveClass(defaults.classes.navDisabled);
		$(defaults.selectors.previousLink).click();
		expect($(defaults.selectors.previousLink)).toHaveClass(defaults.classes.navDisabled);
	});
	
	it('should add the disabled class to the next link if on last slide', function() {
		expect($(defaults.selectors.nextLink)).not.toHaveClass(defaults.classes.navDisabled);
		$.deck('go', $.deck('getSlides').length - 1);
		expect($(defaults.selectors.nextLink)).toHaveClass(defaults.classes.navDisabled);
	});
	
	it('should not start disabled if deck initialized in the middle', function() {
		$.deck('go', 2);
		$.deck('.slide');
		expect($(defaults.selectors.previousLink)).not.toHaveClass(defaults.classes.navDisabled);
	});
	
	it('should update the links hrefs with real fragment ids', function() {
		expect($(defaults.selectors.previousLink).attr('href')).toMatch(/#$/);
		expect($(defaults.selectors.nextLink).attr('href')).toMatch('#custom-id');
		$.deck('go', 2);
		expect($(defaults.selectors.previousLink).attr('href')).toMatch('#custom-id');
		expect($(defaults.selectors.nextLink).attr('href')).toMatch('#slide-3');
	});
});