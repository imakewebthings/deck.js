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
	
	describe('initial settings', function() {
		it('should start with the scale class applied', function() {
			expect($.deck('getContainer').toHaveClass(defaults.classes.scale));
		});
	});
	
	describe('removeScale()', function() {
		it('should remove the scale class from the container', function() {
			$.deck('removeScale');
			expect($.deck('getContainer').not.toHaveClass(defaults.classes.scale));
		});
	});
	
	describe('scale()', function() {
		it('should add the scale class to the container', function() {
			$.deck('removeScale');
			$.deck('scale');
			expect($.deck('getContainer').toHaveClass(defaults.classes.scale));
		});
	});
	
	describe('toggleScale()', function() {
		it('should toggle between adding and removing the scale class', function() {
			$.deck('toggleScale');
			expect($.deck('getContainer').not.toHaveClass(defaults.classes.scale));
			$.deck('toggleScale');
			expect($.deck('getContainer').toHaveClass(defaults.classes.scale));
		});
	});
	
	describe('key bindings', function() {
		var e;

		beforeEach(function() {
			e = jQuery.Event('keydown.deck');
		});
		
		it('should toggle scaling if the specified key is pressed', function() {
			e.which = 83; // s
			$d.trigger(e);
			expect($.deck('getContainer').not.toHaveClass(defaults.classes.scale));
			$d.trigger(e);
			expect($.deck('getContainer').toHaveClass(defaults.classes.scale));
		});
	});
});