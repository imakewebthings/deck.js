describe('PitchDeck', function() {
	describe('init(selector)', function() {
		/*
		.pitchdeck('.slide');
		Each element that matches the selector is a slide.
		*/
	});
	
	describe('init([selectors])', function() {
		/*
		.pitchdeck([
			'#slide1',
			'#slide2 .step1',
			'#slide2 .step2',
			'#slide2 .step3',
			'#ending div'
		]);
		Each index of the array is a slide.  Every element of each selector
		constitutes that slide.  Allows more complex slide representations.
		*/
	});
	
	describe('go(i)', function() {
		/* Go to slide i */
	});

	describe('next()', function() {
		/* Go to the next slide */
	});

	describe('prev()', function() {
		/* Go to the previous slide */
	});

	describe('getSlide()', function() {
		/* Gets the active slide */
	});

	describe('getSlide(i)', function() {
		/* Get slide at index i */
	});

	describe('getSlides()', function() {
		/* Get all slides */
	});
	
	describe('showMenu()', function() {
		/* Show the slide menu */
	});

	describe('hideMenu()', function() {
		/* Hide the slide menu */
	});
	
	describe('toggleMenu()', function() {
		/* Toggle the slide menu show/hide */
	});
	
	describe('options object', function() {
		describe('classes', function() {
			/*
			active
			previous
			before
			next
			after
			hidden (menu)
			*/
		});
		
		describe('key bindings', function() {
			/*
			next
			previous
			slide menu toggle
			*/
		});
	});
	
	describe('events', function() {
		describe('pitchdeck.beforechange', function() {
			/* Fired right before a slide change */
		});
		
		describe('pitchdeck.afterchange', function() {
			/* Fired right after a slide change */
		});
	});
});