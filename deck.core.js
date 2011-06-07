(function($, pd, document, undefined) {
	'$:nomunge';
	
	var slides,
	$d = $(document),
	current,
	events = {
		change: 'deck.change',
		initialize: 'deck.init'
	},
	options = {},
	updateStates = function() {
		var oc = options.classes,
		osc = options.selectors.container,
		$container = $(osc),
		old = $container.data('onSlide'),
		$all = $();
		
		// Container state
		$container.removeClass(oc.onPrefix + old)
			.addClass(oc.onPrefix + current)
			.data('onSlide', current);
		
		// Remove and re-add child-current classes for nesting
		$('.' + oc.current).parentsUntil(osc).removeClass(oc.childCurrent);
		slides[current].parentsUntil(osc).addClass(oc.childCurrent);
		
		// Remove previous states
		$.each(slides, function(i, el) {
			$all = $all.add(el);
		});
		$all.removeClass([
			oc.before,
			oc.previous,
			oc.current,
			oc.next,
			oc.after
		].join(" "));
		
		// Add new states back in
		slides[current].addClass(oc.current);
		if (current > 0) {
			slides[current-1].addClass(oc.previous);
		}
		if (current + 1 < slides.length) {
			slides[current+1].addClass(oc.next);
		}
		if (current > 1) {
			$.each(slides.slice(0, current - 1), function(i, el) {
				el.addClass(oc.before);
			});
		}
		if (current + 2 < slides.length) {
			$.each(slides.slice(current+2), function(i, el) {
				el.addClass(oc.after);
			});
		}
	},
	methods = {
		init: function(elements, opts) {
			$.extend(options, $[pd].defaults, opts);
			slides = [];
			current = 0;
			
			if ($.isArray(elements)) {
				$.each(elements, function(i, e) {
					slides.push($(e));
				});
			}
			else {
				$(elements).each(function(i, e) {
					slides.push($(e));
				});
			}
			
			$d.bind('keydown.deck', function(e) {
				switch (e.which) {
					case options.keys.next:
						methods.next();
						break;
					case options.keys.previous:
						methods.prev();
						break;
				}
			});
			
			updateStates();
			$d.trigger('deck.init');
		},
		
		go: function(index) {
			if (typeof index != 'number' || index < 0 || index >= slides.length) return;
			
			$d.trigger(events.change, [current, index]);
			current = index;
			updateStates();
		},
		
		next: function() {
			methods.go(current+1);
		},
		
		prev: function() {
			methods.go(current-1);
		},
		
		getSlide: function(index) {
			var i = index ? index : current;
			if (typeof i != 'number' || i < 0 || i >= slides.length) return null;
			return slides[i];
		},
		
		getSlides: function() {
			return slides;
		},
		
		getContainer: function() {
			return $(options.selectors.container);
		},
		
		getOptions: function() {
			return options;
		},
		
		extend: function(name, f) {
			methods[name] = f;
		}
	};
	
	$[pd] = function(method, arg) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else {
			return methods.init(method, arg);
		}
	};
	
	$[pd].defaults = {
		classes: {
			after: 'deck-after',
			before: 'deck-before',
			childCurrent: 'deck-child-current',
			current: 'deck-current',
			next: 'deck-next',
			onPrefix: 'on-slide-',
			previous: 'deck-previous'
		},
		
		selectors: {
			container: '.deck-container'
		},
		
		keys: {
			next: 39, // right arrow key
			previous: 37 // left arrow key
		}
	};
})(jQuery, 'deck', document);