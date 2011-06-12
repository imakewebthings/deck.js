(function($, pd, undefined) {
	var $d = $(document);
	
	// Extend defaults/options
	$[pd].defaults.selectors.statusTotal = '.deck-status-total';
	$[pd].defaults.selectors.statusCurrent = '.deck-status-current';
	
	$d.bind('deck.init', function() {
		$($[pd]('getOptions').selectors.statusCurrent).text(1);
		$($[pd]('getOptions').selectors.statusTotal).text($[pd]('getSlides').length);
	}).bind('deck.change', function(e, from, to) {
		$($[pd]('getOptions').selectors.statusCurrent).text(to + 1);
	});
})(jQuery, 'deck');

