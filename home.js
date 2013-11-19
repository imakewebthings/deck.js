$(function() {
	$.deck('.slide', {
		selectors: {
			container: 'body > article'
		},
		
		keys: {
			goto: -1 // No key activation
		}
	});
	
	Modernizr.addTest('pointerevents',function(){
		return document.documentElement.style.pointerEvents === '';
	});
});