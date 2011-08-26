/*!
Deck JS - deck.scale - v1.0
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*

*/
(function($, deck, window, undefined) {
	var $d = $(document),
	$w = $(window),
	baseHeight,
	didResize,
	
	scaleDeck = function() {
		var obh = $[deck]('getOptions').baseHeight,
		container = $[deck]('getContainer'),
		height = $w.height(),
		slides = $[deck]('getSlides'),
		scale;
		
		// Use tallest slide as base height if not set manually
		baseHeight = obh ? obh : (function() {
			var greatest = 0;
			
			$.each(slides, function(i, $slide) {
				greatest = Math.max(greatest, $slide.outerHeight());
			});
			
			return greatest;
		})();
		
		scale = height / baseHeight;
		
		if (!$[deck]('getOptions').scaleUp && scale > 1) {
			scale = 1;
		}
		
		$.each('Webkit Moz O ms Khtml'.split(' '), function(i, prefix) {
			container.css(prefix + 'Transform', 'scale(' + scale + ')');
		});
	};

	/*
	Extends defaults/options.
	
	
	*/
	$.extend(true, $[deck].defaults, {
		classes: {
			scale: 'deck-scale'
		},
		baseHeight: 0,
		scaleThrottle: 500,
		scaleUp: false
	});

	$d.bind('deck.init', function() {
		// Only care about scaling non-embedded presentations
		if (!$[deck]('getContainer').is('body')) return;
		
		$[deck]('getContainer').addClass($[deck]('getOptions').classes.scale);
		
		// Throttle scaling on resize
		$w.unbind('resize.deckscale').bind('resize.deckscale', function() {
			if (!didResize) {
				didResize = true;
				window.setTimeout(function() {
					scaleDeck();
					didResize = false;
				}, $[deck]('getOptions').scaleThrottle);
			}
		})
		// Scale once on load, in case images or something change layout
		.unbind('load.deckscale').bind('load.deckscale', scaleDeck);
		
		// Scale once on init
		scaleDeck();
	});
	
	// Scale again on load, in case images or anything else changed layout
})(jQuery, 'deck', this);

