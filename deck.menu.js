(function($, pd, undefined) {
	var $d = $(document);
	
	// Extend defaults/options
	$[pd].defaults.classes.menu = 'deck-menu';
	$[pd].defaults.keys.menu = 77; // m

	$[pd]('extend', 'showMenu', function() {
		$[pd]('getContainer').addClass($[pd]('getOptions').classes.menu);
	});

	$[pd]('extend', 'hideMenu', function() {
		$[pd]('getContainer').removeClass($[pd]('getOptions').classes.menu);
	});

	$[pd]('extend', 'toggleMenu', function() {
		$[pd]('getContainer').toggleClass($[pd]('getOptions').classes.menu);
	});

	// Bind key events
	$d.bind('deck.init', function() {
		$d.bind('keydown.deck', function(e) {
			if (e.which == $[pd]('getOptions').keys.menu) {
				$[pd]('toggleMenu');
			}
		});
	});
})(jQuery, 'deck');

