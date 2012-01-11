describe('Deck JS Quick Go-To', function() {
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
	
	describe('showGoTo()', function() {
		it('should show the go-to helper', function() {
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.goto);
			$.deck('showGoTo');
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.goto);
		});
		
		it('should focus the go-to input', function() {
			$.deck('showGoTo');
			expect($(defaults.selectors.gotoInput)[0]).toEqual(document.activeElement);
		});
	});
	
	describe('hideGoTo()', function() {
		beforeEach(function() {
			$.deck('showGoTo');
			$.deck('hideGoTo');
		});
		
		it('should hide the go-to helper', function() {
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.goto);
		});
		
		it('should blur the go-to input', function() {
			expect($(defaults.selectors.gotoInput)[0]).not.toEqual(document.activeElement);
		});
	});
	
	describe('toggleGoTo()', function() {
		it('should toggle the go-to helper on and off', function() {
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.goto);
			$.deck('toggleGoTo');
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.goto);
			$.deck('toggleGoTo');
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.goto);
		});
	});
	
	describe('Go-To submit', function() {
		beforeEach(function() {
			$.deck('showGoTo');
		});
		
		it('should hide the go-to helper', function() {
			$(defaults.selectors.gotoInput).val('3');
			$(defaults.selectors.gotoForm).submit();
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.goto);
		});
		
		it('should go to the slide number entered', function() {
			$(defaults.selectors.gotoInput).val('3');
			$(defaults.selectors.gotoForm).submit();
			expect($.deck('getSlide')).toEqual($.deck('getSlide'), 2);
		});
		
		it('should go to the slide id entered', function() {
			$(defaults.selectors.gotoInput).val('custom-id');
			$(defaults.selectors.gotoForm).submit();
			expect($.deck('getSlide')).toEqual($.deck('getSlide'), 1);
		});
		
		it('should go nowhere if the number is negative', function() {
			$(defaults.selectors.gotoInput).val('-2');
			$(defaults.selectors.gotoForm).submit();
			expect($.deck('getSlide')).toEqual($.deck('getSlide'), 0);
		});
		
		it('should go nowhere if the number is greater than the number of slides', function() {
			$(defaults.selectors.gotoInput).val('9');
			$(defaults.selectors.gotoForm).submit();
			expect($.deck('getSlide')).toEqual($.deck('getSlide'), 0);
		});
		
		it('should go nowhere if the id does not exist', function() {
			$(defaults.selectors.gotoInput).val('do-not-exist');
			$(defaults.selectors.gotoForm).submit();
			expect($.deck('getSlide')).toEqual($.deck('getSlide'), 0);
		});
	});
	
	describe('Datalist population', function() {
		it('should fill in options with all the slide ids', function() {
			var $dataOptions = $(defaults.selectors.gotoDatalist).find('option');
			expect($dataOptions.length).toEqual(5);
			expect($dataOptions.eq(0).attr('value')).toEqual('slide-0');
			expect($dataOptions.eq(1).attr('value')).toEqual('custom-id');
		});
	});
	
	describe('key bindings', function() {
		var e;

		beforeEach(function() {
			e = jQuery.Event('keydown.deckgoto');
		});
		
		it('should toggle the go-to helper if the specified key is pressed', function() {
			e.which = 71; // g
			$d.trigger(e);
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.goto);
			$d.trigger(e);
			expect($(defaults.selectors.container)).not.toHaveClass(defaults.classes.goto);
		});
	});
	
	describe('countNested false', function() {
	  beforeEach(function() {
	    loadFixtures('nesteds.html');
			$.deck('.slide', {
				countNested: false
			});
			$.deck('showGoTo');
	  });
	  
		it('should ignore nested slides when given a slide number', function() {
			$(defaults.selectors.gotoInput).val('4');
			$(defaults.selectors.gotoForm).submit();
			expect($.deck('getSlide')).toHaveId('after');
		});
		
		it('should respect top side of new slide range', function() {
		  $.deck('go', 0);
			$(defaults.selectors.gotoInput).val('6');
			$(defaults.selectors.gotoForm).submit();
			expect($.deck('getSlide')).toHaveId('slide-0');
		});
	});
});