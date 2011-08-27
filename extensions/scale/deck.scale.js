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
	timer, // Timeout id for debouncing
	
	scaleDeck = function() {
		var obh = $[deck]('getOptions').baseHeight,
		$container = $[deck]('getContainer'),
		height = $w.height(),
		slides = $[deck]('getSlides'),
		scale,
		transform;
		
		if (!$container.hasClass($[deck]('getOptions').classes.scale)) {
			scale = 1;
		}
		else {
			// Use tallest slide as base height if not set manually
			baseHeight = obh ? obh : (function() {
				var greatest = 0;

				$.each(slides, function(i, $slide) {
					greatest = Math.max(greatest, $slide.outerHeight());
				});

				return greatest;
			})();
			
			scale = height / baseHeight;
		}
		
		transform = scale >= 1 ? 'none' : 'scale(' + scale + ')';
		$.each('Webkit Moz O ms Khtml'.split(' '), function(i, prefix) {
			$container.css(prefix + 'Transform', transform);
		});
	};

	/*
	Extends defaults/options.
	
	
	*/
	$.extend(true, $[deck].defaults, {
		classes: {
			scale: 'deck-scale'
		},
		
		keys: {
			scale: 83 // s
		},
		
		baseHeight: null,
		scaleDebounce: 200
	});
	
	$[deck]('extend', 'removeScale', function() {
		$[deck]('getContainer').removeClass($[deck]('getOptions').classes.scale);
		scaleDeck();
	});
	
	$[deck]('extend', 'scale', function() {
		$[deck]('getContainer').addClass($[deck]('getOptions').classes.scale);
		scaleDeck();
	});
	
	$[deck]('extend', 'toggleScale', function() {
		var $c = $[deck]('getContainer');
		$[deck]($c.hasClass($[deck]('getOptions').classes.scale) ?
			'removeScale' : 'scale'); 
	});

	$d.bind('deck.init', function() {
		var opts = $[deck]('getOptions');
		
		// Only care about scaling in modern browsers
		if (!Modernizr.csstransforms) return;
		
		// Scaling enabled at start
		$[deck]('getContainer').addClass(opts.classes.scale);
		
		// Debounce the resize scaling
		$w.unbind('resize.deckscale').bind('resize.deckscale', function() {
			window.clearTimeout(timer);
			timer = window.setTimeout(scaleDeck, opts.scaleDebounce);
		})
		// Scale once on load, in case images or something change layout
		.unbind('load.deckscale').bind('load.deckscale', scaleDeck);
		
		// Bind key events
		$d.unbind('keydown.deckscale').bind('keydown.deckscale', function(e) {
			if (e.which === opts.keys.scale) {
				$[deck]('toggleScale');
			}
		});
		
		// Scale once on init
		scaleDeck();
	});
})(jQuery, 'deck', this);

