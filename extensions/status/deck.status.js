/*!
Deck JS - deck.status
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module adds a (current)/(total) style status indicator to the deck.
*/
(function($, deck, undefined) {
	var $d = $(document);
	
	/*
	Extends defaults/options.
	
	options.selectors.statusCurrent
		The element matching this selector displays the current slide number.
		
	options.selectors.statusTotal
		The element matching this selector displays the total number of slides.
	*/
	$.extend(true, $[deck].defaults, {
		selectors: {
			statusCurrent: '.deck-status-current',
			statusTotal: '.deck-status-total'
		}
	});
	
	$d.bind('deck.init', function() {
		// Start on first slide
		$($[deck]('getOptions').selectors.statusCurrent).text(1);
		// Set total slides once
		$($[deck]('getOptions').selectors.statusTotal).text($[deck]('getSlides').length);
	})
	/* Update current slide number with each change event */
	.bind('deck.change', function(e, from, to) {
		$($[deck]('getOptions').selectors.statusCurrent).text(to + 1);
	});
})(jQuery, 'deck');

