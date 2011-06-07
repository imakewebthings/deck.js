describe('Deck JS Menu', function() {
	beforeEach(function() {
		loadFixtures('standard.html');
		$.deck('.slide');
	});
	
	describe('showMenu', function() {
		it('should show the menu', function() {
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.menu);
			$.deck('showMenu');
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.menu);
		});
	});
	
	describe('hideMenu', function() {
		it('should hide the menu', function() {
			$.deck('showMenu');
			$.deck('hideMenu');
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.menu);
		});
	});
	
	describe('toggleMenu', function() {
		it('should toggle menu on and off', function() {
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.menu);
			$.deck('toggleMenu');
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.menu);
			$.deck('toggleMenu');
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.menu);
		});
	});
});