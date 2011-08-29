/*!
Deck JS - deck.navigation - v1.0
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module adds clickable previous and next links to the deck.
*/
(function($, deck, undefined) {
	var $d = $(document);
	
	/*
	Extends defaults/options.
	
	options.classes.navDisabled
		This class is added to a navigation link when that action is disabled.
		It is added to the previous link when on the first slide, and to the
		next link when on the last slide.
		
	options.selectors.nextLink
		The elements that match this selector will move the deck to the next
		slide when clicked.
		
	options.selectors.previousLink
		The elements that match this selector will move to deck to the previous
		slide when clicked.
	*/
	$.extend(true, $[deck].defaults, {
		classes: {
			navDisabled: 'deck-nav-disabled'
		},
		
		selectors: {
			nextLink: '.deck-next-link',
			previousLink: '.deck-prev-link'
		}
	});

	$d.bind('deck.init', function() {
		var opts = $[deck]('getOptions'),
		nextSlide = $[deck]('getSlide', 1),
		nextId = nextSlide ? nextSlide.attr('id') : undefined;
		
		// Setup prev/next link events
		$(opts.selectors.previousLink)
		.unbind('click.decknavigation')
		.bind('click.decknavigation', function(e) {
			$[deck]('prev');
			e.preventDefault();
		});
		
		$(opts.selectors.nextLink)
		.unbind('click.decknavigation')
		.bind('click.decknavigation', function(e) {
			$[deck]('next');
			e.preventDefault();
		});
		
		// Start on first slide, previous link is disabled, set next link href
		$(opts.selectors.previousLink).addClass(opts.classes.navDisabled);
		$(opts.selectors.nextLink).attr('href', '#' + (nextId ? nextId : ''));
	})
	/* Updates link hrefs, and disabled states if last/first slide */
	.bind('deck.change', function(e, from, to) {
		var opts = $[deck]('getOptions'),
		last = $[deck]('getSlides').length - 1,
		prevSlide = $[deck]('getSlide', to - 1),
		nextSlide = $[deck]('getSlide', to + 1),
		prevId = prevSlide ? prevSlide.attr('id') : undefined;
		nextId = nextSlide ? nextSlide.attr('id') : undefined;
		
		$(opts.selectors.previousLink)
			.toggleClass(opts.classes.navDisabled, !to)
			.attr('href', '#' + (prevId ? prevId : ''));
		$(opts.selectors.nextLink)
			.toggleClass(opts.classes.navDisabled, to === last)
			.attr('href', '#' + (nextId ? nextId : ''));
	});
})(jQuery, 'deck');

