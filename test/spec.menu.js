describe('PitchDeck Menu', function() {
	beforeEach(function() {
		loadFixtures('standard.html');
		$.pitchdeck('.slide');
	});
	
	describe('showMenu', function() {
		it('should show the menu', function() {
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.menu);
			$.pitchdeck('showMenu');
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.menu);
		});
	});
	
	describe('hideMenu', function() {
		it('should hide the menu', function() {
			$.pitchdeck('showMenu');
			$.pitchdeck('hideMenu');
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.menu);
		});
	});
	
	describe('toggleMenu', function() {
		it('should toggle menu on and off', function() {
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.menu);
			$.pitchdeck('toggleMenu');
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.menu);
			$.pitchdeck('toggleMenu');
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.menu);
		});
	});
});