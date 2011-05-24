describe('PitchDeck', function() {
	describe('init(selector)', function() {
		it('should create slides', function() {
			
		});
	});
	
	describe('init([selectors])', function() {
		it('should create slides', function() {
			
		});
	});
	
	describe('navigation functions', function() {
		describe('go(i)', function() {
			it('should go to the i slide (0 based index)', function() {
				
			});
			
			it('should go nowhere if i is NaN', function() {
				
			});
			
			it('should go nowhere if i is out of bounds', function() {
				
			});
		});

		describe('next()', function() {
			it('should go to the next slide', function() {
				
			});
			
			it('should go nowhere if on the last slide', function() {
				
			});
		});

		describe('prev()', function() {
			it('should go to the previous slide', function() {
				
			});
			
			it('should go nowhere if on the first slide', function() {
				
			});
		});
	});
	
	describe('getters', function() {
		describe('getSlide()', function() {
			it('should get the current slide', function() {
				
			});
		});

		describe('getSlide(i)', function() {
			it('should get slide number i (0 based index)', function() {
				
			});
			
			it('should return null if i is NaN', function() {
				
			});
			
			it('should return null if i is out of bounds', function() {
				
			});
		});

		describe('getSlides()', function() {
			it('should return an array of jQuery objects for each slide', function() {
				
			});
		});
	});
	
	describe('menu functions', function() {
		describe('showMenu()', function() {
			it('should remove the hidden class from the slide menu', function() {
				
			});
		});

		describe('hideMenu()', function() {
			it('should add the hidden class to the slide menu', function() {
				
			});
		});
		
		describe('toggleMenu()', function() {
			it('should toggle the hidden class on the slide menu', function() {
				
			});
		});
	});
	
	describe('options object', function() {
		describe('classes', function() {
			it('should use the specified after class', function() {
				
			});
			
			it('should use the specified before class', function() {
				
			});
			
			it('should use the specified current class', function() {
				
			});
			
			it('should use the specified hidden class', function() {
				
			});
			
			it('should use the specified menu class', function() {
				
			});
			
			it('should use the specified next class', function() {
				
			});
			
			it('should use the specified previous class', function() {
				
			});
		});
		
		describe('key bindings', function() {
			it('should toggle the slide menu using the specified key', function() {
				
			});
			
			it('should go to the next slide using the specified key', function() {
				
			});
			
			it('should go to the previous slide using the specified key', function() {
				
			});
		});
	});
	
	describe('events', function() {
		describe('pitchdeck.change', function() {
			it('should fire on go(i)', function() {
				
			});
			
			it('should fire on next()', function() {
				
			});
			
			it('should fire on prev()', function() {
				
			});
			
			it('should pass parameters with from and to indices', function() {
				
			});
		});
	});
});