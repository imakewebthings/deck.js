/*!
Deck JS - deck.goto
Copyright (c) 2011 Caleb Troughton
Dual licensed under the MIT license and GPL license.
https://github.com/imakewebthings/deck.js/blob/master/MIT-license.txt
https://github.com/imakewebthings/deck.js/blob/master/GPL-license.txt
*/

/*
This module adds the necessary methods and key bindings to show and hide a form
for jumping to any slide number in the deck (and processes that form
accordingly). The form-showing state is indicated by the presence of a class on
the deck container.
*/
(function($, deck, undefined) {
	var $d = $(document);
	
	/*
	Extends defaults/options.
	
	options.classes.goto
		This class is added to the deck container when showing the Go To Slide
		form.
		
	options.selectors.gotoForm
		The element that matches this selector is the form that is submitted
		when a user hits enter after typing a slide number in the gotoInput
		element.
	
	options.selectors.gotoInput
		The element that matches this selector is the text input field for
		entering a slide number in the Go To Slide form.
		
	options.keys.goto
		The numeric keycode used to toggle between showing and hiding the Go To
		Slide form.
	*/
	$.extend(true, $[deck].defaults, {
		classes: {
			goto: 'deck-goto'
		},
		
		selectors: {
			gotoForm: '.goto-form',
			gotoInput: '#goto-slide'
		},
		
		keys: {
			goto: 71 // g
		}
	});

	/*
	jQuery.deck('showGoTo')
	
	Shows the Go To Slide form by adding the class specified by the goto class
	option to the deck container.
	*/
	$[deck]('extend', 'showGoTo', function() {
		$[deck]('getContainer').addClass($[deck]('getOptions').classes.goto);
		$($[deck]('getOptions').selectors.gotoInput).focus();
	});

	/*
	jQuery.deck('hideGoTo')
	
	Hides the Go To Slide form by removing the class specified by the goto class
	option from the deck container.
	*/
	$[deck]('extend', 'hideGoTo', function() {
		$[deck]('getContainer').removeClass($[deck]('getOptions').classes.goto);
		$($[deck]('getOptions').selectors.gotoInput).blur();
	});

	/*
	jQuery.deck('toggleGoTo')
	
	Toggles between showing and hiding the Go To Slide form.
	*/
	$[deck]('extend', 'toggleGoTo', function() {
		$[deck]($[deck]('getContainer').hasClass($[deck]('getOptions').classes.goto) ? 'hideGoTo' : 'showGoTo');
	});
	
	$d.bind('deck.init', function() {
		// Bind key events
		$d.unbind('keydown.deckgoto').bind('keydown.deckgoto', function(e) {
			var key = $[deck]('getOptions').keys.goto;
			
			if (e.which === key ||$.inArray(e.which, key) > -1) {
				e.preventDefault();
				$[deck]('toggleGoTo');
			}
		});
		
		// Process form submittal, go to the slide entered
		$($[deck]('getOptions').selectors.gotoForm)
		.unbind('submit.deckgoto')
		.bind('submit.deckgoto', function(e) {
			var $field = ($($[deck]('getOptions').selectors.gotoInput)),
			i = parseInt($field.val(), 10);
			
			if (!($.isNaN(i) || i < 1 || i > $[deck]('getSlides').length)) {
				$[deck]('go', i - 1);
				$[deck]('hideGoTo');
				$field.val('');
			}
			
			e.preventDefault();
		});
		
		$($[deck]('getOptions').selectors.gotoInput)
		.unbind('keydown.deckgoto')
		.bind('keydown.deckgoto', function(e) {
			e.stopPropagation();
		});
	});
})(jQuery, 'deck');

