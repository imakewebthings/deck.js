//SETTINGS, VARS, UTILITY FUNCTIONS
jasmine.getFixtures().fixturesPath = 'fixtures';
var defaults = $.pitchdeck.defaults;

// Go tests, go
describe('PitchDeck', function() {
	beforeEach(function() {
		loadFixtures('standard.html');
	});
	
	describe('init(selector)', function() {
		it('should create slides', function() {
			$.pitchdeck('.slide');
			expect($.pitchdeck('getSlides').length).toEqual($('.slide').length);
		});
	});
	
	describe('init([selectors])', function() {
		it('should create slides', function() {
			$.pitchdeck([
				'.slide1',
				'.slide2',
				'.slide3',
				'.slide4',
				'.slide5'
			]);
			expect($.pitchdeck('getSlides').length).toEqual($('.slide').length);
		});
	});
	
	describe('navigation functions', function() {
		beforeEach(function() {
			$.pitchdeck('.slide');
		});
		
		describe('go(i)', function() {
			it('should go to the i slide (0 based index)', function() {
				$.pitchdeck('go', 3);
				expect($.pitchdeck('getSlide')).toHaveClass('slide4');
			});
			
			it('should go nowhere if i is NaN', function() {
				$.pitchdeck('go', 'foobar');
				expect($.pitchdeck('getSlide')).toHaveClass('slide1');
			});
			
			it('should go nowhere if i is out of bounds', function() {
				$.pitchdeck('go', 5);
				expect($.pitchdeck('getSlide')).toHaveClass('slide1');
			});
		});

		describe('next()', function() {
			it('should go to the next slide', function() {
				$.pitchdeck('next');
				expect($.pitchdeck('getSlide')).toHaveClass('slide2');
			});
			
			it('should go nowhere if on the last slide', function() {
				$.pitchdeck('go', 4);
				$.pitchdeck('next');
				expect($.pitchdeck('getSlide')).toHaveClass('slide5');
			});
		});

		describe('prev()', function() {
			it('should go to the previous slide', function() {
				$.pitchdeck('go', 2);
				$.pitchdeck('prev');
				expect($.pitchdeck('getSlide')).toHaveClass('slide2');
			});
			
			it('should go nowhere if on the first slide', function() {
				$.pitchdeck('prev');
				expect($.pitchdeck('getSlide')).toHaveClass('slide1');
			});
		});
	});
	
	describe('getters', function() {
		beforeEach(function() {
			$.pitchdeck('.slide');
		});
		
		describe('getSlide()', function() {
			it('should get the current slide', function() {
				expect($.pitchdeck('getSlide')).toHaveClass('slide1');
				$.pitchdeck('go', 2);
				expect($.pitchdeck('getSlide')).toHaveClass('slide3');
			});
		});

		describe('getSlide(i)', function() {
			it('should get slide number i (0 based index)', function() {
				expect($.pitchdeck('getSlide', 1)).toHaveClass('slide2');
				expect($.pitchdeck('getSlide', 3)).toHaveClass('slide4');
			});
			
			it('should return null if i is NaN', function() {
				expect($.pitchdeck('getSlide', 'barfoo')).toBeNull();
			});
			
			it('should return null if i is out of bounds', function() {
				expect($.pitchdeck('getSlide', 6)).toBeNull();
			});
		});

		describe('getSlides()', function() {
			it('should return an array of jQuery objects for each slide', function() {
				var expectation = [];
				$('.slide').each(function() {
					expectation.push($(this));
				});
				slides = $.pitchdeck('getSlides');
				expect(slides).toEqual(expectation);
			});
		});
	});
	
	describe('container states', function() {
		beforeEach(function() {
			$.pitchdeck('.slide');
		});
		
		it('should start at state 0', function() {
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.onPrefix + '0');
		});
		
		it('should change states with the slide number', function() {
			$.pitchdeck('next');
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.onPrefix + '1');
			$.pitchdeck('go', 3);
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.onPrefix + '3');
			$.pitchdeck('prev');
			expect($(defaults.selectors.container)).toHaveClass(defaults.classes.onPrefix + '2');
		});
	});

	describe('options object', function() {
		var $d = $(document);
		
		beforeEach(function() {
			$d.unbind('keydown');
			$.pitchdeck('.alt-slide', {
				classes: {
					after: 'alt-after',
					before: 'alt-before',
					current: 'alt-current',
					onPrefix: 'alt-on-',
					next: 'alt-next',
					previous: 'alt-prev'
				},
				
				selectors: {
					container: '.alt-container'
				},
				
				keys: {
					next: 87,
					previous: 69
				}
			});
		});
		
		describe('classes', function() {
			it('should use the specified after class', function() {
				expect($('.alt-slide3, .alt-slide4, .alt-slide5')).toHaveClass('alt-after');
			});
			
			it('should use the specified before class', function() {
				$.pitchdeck('go', 4);
				expect($('.alt-slide1, .alt-slide2, .alt-slide3')).toHaveClass('alt-before');
			});
			
			it('should use the specified container class', function() {
				$.pitchdeck('go', 2);
				expect($('.alt-container')).toHaveClass('alt-on-2');
			});
			
			it('should use the specified current class', function() {
				expect($.pitchdeck('getSlide')).toHaveClass('alt-current');
			});
			
			it('should use the specified next class', function() {
				expect($('.alt-slide2')).toHaveClass('alt-next');
			});
			
			it('should use the specified previous class', function() {
				$.pitchdeck('next');
				expect($('.alt-slide1')).toHaveClass('alt-prev');
			});
		});
		
		describe('key bindings', function() {
			var e;
			
			beforeEach(function() {
				e = jQuery.Event('keydown');
			});
			
			it('should go to the next slide using the specified key', function() {
				e.which = 87; // 'w'
				$d.trigger(e);
				expect($.pitchdeck('getSlide')).toHaveClass('alt-slide2');
			});
			
			it('should go to the previous slide using the specified key', function() {
				$.pitchdeck('next');
				e.which = 69; // 'e'
				$d.trigger(e);
				expect($.pitchdeck('getSlide')).toHaveClass('alt-slide1');
			});
		});
	});
	
	describe('events', function() {
		var $d = $(document);
		
		beforeEach(function() {
			$.pitchdeck('.slide');
			$.pitchdeck('go', 1);
			spyOnEvent($d, 'pitchdeck.change');
		});
		
		describe('pitchdeck.change', function() {
			it('should fire on go(i)', function() {
				$.pitchdeck('go', 3);
				expect('pitchdeck.change').toHaveBeenTriggeredOn($d);
			});
			
			it('should fire on next()', function() {
				$.pitchdeck('next');
				expect('pitchdeck.change').toHaveBeenTriggeredOn($d);
			});
			
			it('should fire on prev()', function() {
				$.pitchdeck('prev');
				expect('pitchdeck.change').toHaveBeenTriggeredOn($d);
			});
			
			it('should pass parameters with from and to indices', function() {
				$d.bind('pitchdeck.change', function(e, from, to) {
					expect(from).toEqual(1);
					expect(to).toEqual(3);
				});
				$.pitchdeck('go', 3);
			});
		});
	});
});