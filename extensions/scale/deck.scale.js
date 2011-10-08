/*!
Deck JS - deck.scale
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module adds automatic scaling to the deck.  It should only be used on
standalone decks where the body is the deck container. Slides are scaled down
using CSS transforms to fit within the browser window. If the browser window
is big enough to hold the slides without scaling, no scaling occurs. The user
can disable and enable scaling with a keyboard shortcut.

Note: CSS transforms make Flash videos render incorrectly.  Presenters that
need to use video will want to disable scaling to play them.  HTML5 video
works fine.
*/
(function($, deck, window, undefined) {
	var $d = $(document),
	$w = $(window),
	baseHeight, // Value to scale against
	timer, // Timeout id for debouncing
	
	/*
	Internal function to do all the dirty work of scaling the deck container.
	*/
	scaleDeck = function() {
		var obh = $[deck]('getOptions').baseHeight,
		$container = $[deck]('getContainer'),
		height = $w.height(),
		slides = $[deck]('getSlides'),
		scale,
		transform;
		
		// Don't scale if scaling disabled
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
		
		// Scale, but don't scale up
		transform = scale >= 1 ? 'none' : 'scale(' + scale + ')';
		$.each('Webkit Moz O ms Khtml'.split(' '), function(i, prefix) {
			$container.css(prefix + 'Transform', transform);
		});
	};

	/*
	Extends defaults/options.
	
	options.classes.scale
		This class is added to the deck container when scaling is enabled.
		It is enabled by default when the module is included.
	
	options.keys.scale
		The numeric keycode used to toggle enabling and disabling scaling.
	
	options.baseHeight
		When baseheight is falsy, as it is by default, the deck is scaled
		in proportion to the height of the slides.  You may instead specify
		a height, and the deck will be scaled against this height regardless
		of the actual content height.
	
	options.scaleDebounce
		Scaling on the browser resize event is debounced. This number is the
		threshold in milliseconds. You can learn more about debouncing here:
		http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	
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
	
	/*
	jQuery.deck('disableScale')
	
	Disables scaling and removes the scale class from the deck container.
	*/
	$[deck]('extend', 'disableScale', function() {
		$[deck]('getContainer').removeClass($[deck]('getOptions').classes.scale);
		scaleDeck();
	});
	
	/*
	jQuery.deck('enableScale')
	
	Enables scaling and adds the scale class to the deck container.
	*/
	$[deck]('extend', 'enableScale', function() {
		$[deck]('getContainer').addClass($[deck]('getOptions').classes.scale);
		scaleDeck();
	});
	
	/*
	jQuery.deck('toggleScale')
	
	Toggles between enabling and disabling scaling.
	*/
	$[deck]('extend', 'toggleScale', function() {
		var $c = $[deck]('getContainer');
		$[deck]($c.hasClass($[deck]('getOptions').classes.scale) ?
			'disableScale' : 'enableScale'); 
	});

	$d.bind('deck.init', function() {
		var opts = $[deck]('getOptions');
		
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
			if (e.which === opts.keys.scale || $.inArray(e.which, opts.keys.scale) > -1) {
				$[deck]('toggleScale');
				e.preventDefault();
			}
		});
		
		// Scale once on init
		scaleDeck();
	});
})(jQuery, 'deck', this);

