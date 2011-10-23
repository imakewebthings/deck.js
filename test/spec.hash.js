describe('Deck JS Hash Extension', function() {
	beforeEach(function() {
		loadFixtures('standard.html');
		if (Modernizr.history) {
			history.replaceState({}, "", "#")
		}
		else {
			window.location.hash = '#';
		}
		$.deck('.slide');
	});
	
	it('should assign ids to slides that do not have them', function() {
		var slides = $.deck('getSlides');
		$.each(slides, function(i, $e) {
			expect($e.attr('id')).toBeTruthy();
		});
	});
	
	it('should reassign ids on reinitialization', function() {
		var $firstSlide = $.deck('getSlide', 0),
		firstID = $firstSlide.attr('id');
		
		$firstSlide.before('<div class="slide"></div>');
		$.deck('.slide');
		expect($firstSlide).not.toHaveId(firstID);
	});
	
   it('should update container with a state class including the slide id', function() {
      var $c = $.deck('getContainer'),
      osp = defaults.classes.onPrefix;
      
      expect($c).toHaveClass(osp + $.deck('getSlide', 0).attr('id'));
      $.deck('next');
      expect($c).toHaveClass(osp + $.deck('getSlide', 1).attr('id'));
      $.deck('next');
      expect($c).not.toHaveClass(osp + $.deck('getSlide', 1).attr('id'));
      expect($c).toHaveClass(osp + $.deck('getSlide', 2).attr('id'));
   });
	
	it('should update the href on slide change', function() {
		var $hashLink = $(defaults.selectors.hashLink);
		$.deck('go', 3);
		expect($hashLink).toHaveAttr('href', '#slide-3');
	});
	
	it('should use existing ids if they exist', function() {
		var $hashLink = $(defaults.selectors.hashLink);
		$.deck('go', 1);
		expect($hashLink).toHaveAttr('href', '#custom-id');
	});
	
	it('should update the URL on slide change (if supported)', function() {
		if (Modernizr.history) {
			$.deck('go', 3);
			expect(window.location.hash).toEqual('#slide-3');
		}
	});
	
	it('should deep link to slide on deck init', function() {
		window.location.hash = "#slide-3";
		$.deck('.slide');
		expect($.deck('getSlide')).toHaveId('slide-3');
	});
	
	it('should follow internal hash links using hashchange (if supported)', function() {
		if (Modernizr.hashchange) {
			window.location.hash = "#slide-3";
			
			// Hashchange event doesn't fire right when the hash changes?
			waitsFor(function() {
				return $.deck('getSlide').attr('id') === 'slide-3';
			}, 'hash to change to slide-3', 2000);
		}
	});
	
	it('should follow internal hash links on click', function() {
		/* Triggered clicks dont generate hashchanges, so until I find
		a way to do this in an automated fashion, needs to be hand tested. */
	});
});