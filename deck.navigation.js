(function($, pd, undefined) {
	var $d = $(document);
	
	// Extend defaults/options
	$[pd].defaults.classes.navDisabled = 'deck-disabled';
	$[pd].defaults.selectors.nextLink = '.deck-next-link';
	$[pd].defaults.selectors.previousLink = '.deck-prev-link';
	$[pd].defaults.navDelay = 1000;

	// Bind key events
	$d.bind('deck.init', function() {
		var opts = $[pd]('getOptions');
		
		$(opts.selectors.previousLink).click(function(e) {
			$[pd]('prev');
			e.preventDefault();
		});
		
		$(opts.selectors.nextLink).click(function(e) {
			$[pd]('next');
			e.preventDefault();
		});
		
		$(opts.selectors.previousLink).addClass(opts.classes.navDisabled);
	}).bind('deck.change', function(e, from, to) {
		var opts = $[pd]('getOptions'),
		last = $[pd]('getSlides').length - 1;
		
		$(opts.selectors.previousLink).toggleClass(opts.classes.navDisabled, !to);
		$(opts.selectors.nextLink).toggleClass(opts.classes.navDisabled, to == last);
	});
})(jQuery, 'deck');

