describe('Deck JS Menu', function() {
	var $d = $(document);
	
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
	
	describe('showMenu()', function() {
		it('should show the menu', function() {
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.menu);
			$.deck('showMenu');
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.menu);
		});
	});
	
	describe('hideMenu()', function() {
		it('should hide the menu', function() {
			$.deck('showMenu');
			$.deck('hideMenu');
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.menu);
		});
	});
	
	describe('toggleMenu()', function() {
		it('should toggle menu on and off', function() {
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.menu);
			$.deck('toggleMenu');
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.menu);
			$.deck('toggleMenu');
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.menu);
		});
	});
	
	describe('key bindings', function() {
		var e;

		beforeEach(function() {
			e = jQuery.Event('keydown.deckmenu');
		});
		
		it('should toggle the menu if the specified key is pressed', function() {
			e.which = 77; // m
			$d.trigger(e);
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.menu);
			$d.trigger(e);
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.menu);
		});
	});
});