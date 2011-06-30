(function($, pd, undefined) {
	var $d = $(document);
	
	// Extend defaults/options
	$[pd].defaults.classes.goto = 'deck-goto';
	$[pd].defaults.selectors.gotoForm = '.goto-form';
	$[pd].defaults.selectors.gotoInput = '#goto-slide';
	$[pd].defaults.keys.goto = 71; // g

	$[pd]('extend', 'showGoTo', function() {
		$[pd]('getContainer').addClass($[pd]('getOptions').classes.goto);
		$($[pd]('getOptions').selectors.gotoInput).focus();
	});

	$[pd]('extend', 'hideGoTo', function() {
		$[pd]('getContainer').removeClass($[pd]('getOptions').classes.goto);
		$($[pd]('getOptions').selectors.gotoInput).blur();
	});

	$[pd]('extend', 'toggleGoTo', function() {
		$[pd]($[pd]('getContainer').hasClass($[pd]('getOptions').classes.goto) ? 'hideGoTo' : 'showGoTo');
	});

	// Bind key events
	$d.bind('deck.keysbound', function() {
		$d.bind('keydown.deck', function(e) {
			if (e.which == $[pd]('getOptions').keys.goto) {
				e.preventDefault();
				$[pd]('toggleGoTo');
			}
		});
	});
	
	// Goto form handler
	$d.bind('deck.init', function() {
		$($[pd]('getOptions').selectors.gotoForm).submit(function(e) {
			var $field = ($($[pd]('getOptions').selectors.gotoInput)),
			i = parseInt($field.val(), 10);
			
			if (!($.isNaN(i) || i < 1 || i > $[pd]('getSlides').length)) {
				$[pd]('go', i - 1);
				$[pd]('hideGoTo');
				$field.val('');
			}
			
			e.preventDefault();
		});
	});
})(jQuery, 'deck');

