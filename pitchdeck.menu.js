(function($, pd, undefined) {
	var $d = $(document);
	
	// Extend defaults/options
	$[pd].defaults.classes.menu = 'pitchdeck-menu';
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
	$d.bind('pitchdeck.init', function() {
		$d.bind('keydown.pitchdeck', function(e) {
			if (e.which == $[pd]('getOptions').keys.menu) {
				$[pd]('toggleMenu');
			}
		});
	});
})(jQuery, 'pitchdeck');

