$.waypoints.scrollThrottle = 50;

// Expand and collapse navigation as we scroll
$(function() {
	var $navPoints = $(),
	$nav = $('.docs > article > nav > div > ul');
	
	$nav.find('a').each(function() {
		$navPoints = $navPoints.add($(this).attr('href'));
	});
	
	$navPoints.waypoint(function(event, direction) {
		var $current = $(this),
		that = this;
		event.stopPropagation();
		
		if (direction === 'up') {
			$navPoints.each(function(i, el) {
				if (el === that) {
					$current = i ? $($navPoints[i-1]) : null;
					return false;
				}
			});
		}
		
		$nav.find('.selected').removeClass('selected');
		
		if (Modernizr.history) {
			window.history.replaceState({}, "", $current ?
				'#' + $current.attr('id') :
				window.location.href.split('#')[0]);
		}
		
		if (!$current) return;
		
		$nav.find('a[href="#' + $current.attr('id') + '"]')
			.parentsUntil($nav, 'li')
			.addClass('selected');
	}, {
		continuous: false // Address bar DOES look cool on nav clicks if true
	});
});


// Sticky headers
$(function() {
	var $topLevels = $('.docs > article > section'),
	$level2 = $topLevels.find('> section');
	
	$topLevels.waypoint(function(event, direction) {
		var current = $(this);
		event.stopPropagation();
		
		if (direction === 'up') {
			current = current.prev();
			$('#sticky-wrapper').find('h3').text(current.find('h3').last().text());
		}
		else {
			$('#sticky-wrapper').find('h3').text('');
		}

		$('#sticky-wrapper')
			.toggleClass('hidden', !current.is($topLevels))
			.find('h2').text(current.find('h2').text());
	});
	
	$level2.waypoint(function(event, direction) {
		var current = $(this);
		event.stopPropagation();
		
		if (direction === 'up') {
			current = current.prev();
		}
		
		$('#sticky-wrapper')
			.find('h3').text(current.find('h3').text());
	});
});
