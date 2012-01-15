var started = false;
var previous = $();
var current = $();
var next = $();

var resizeEventHandler = function() {
	started = false;
	$('.slide .element').removeClass('anime');
	$('.slide').removeClass('anime');
	
	$('.slides').each(function() {
		$(this).width($(this).height() * 4 / 3);
	});
	$('.slide').each(function() {
		$(this).width($(this).parent().height() * 4 / 3);
		$(this).css('left', $(this).parent().position().left);
	});
	$('.slide').each(function() {
		$(this).css('font-size', $(this).parent().height() * 0.04 + 'px');
	});
};

var gotoAndPlay = function(hash) {
	if (!started) {
		started = true;
		$('.slide .element').addClass('anime');
		$('.slide').addClass('anime');
	}
	
	if (typeof hash === "number") {
		if (hash == -1) {
			if (!(current.find('.show:last').size())) {
				if (previous.size()) {
					next = current;
					current = previous;
					previous = previous.prev();
					next.removeClass('current').addClass('after');
					current.removeClass('before').addClass('current');
				}
			} else {
				$('.slide .show:last').removeClass('show').addClass('hide');
			}
			return;
		}
		
	}
	
	if (!(current.find('.hide:first').size())) {
		if (next.size()) {
			previous = current;
			current = next;
			next = next.next();
			previous.removeClass('current').addClass('before');
			current.removeClass('after').addClass('current');
		}
	} else {
		$('.slide .hide:first').removeClass('hide').addClass('show');
	}
};

$(document).ready(function() {
	$(window).resize(resizeEventHandler);

	$('.slide').each(function(index) {
		$(this).css('z-index', 65536 - index);
	});
	$('.slide .element').addClass('hide');
	
	if ($($.trim(location.hash)).size() == 0) {
		previous = $();
		current = $('.slide:eq(0)');
		next = $('.slide:eq(1)');
	} else {
		current = $(location.hash);
		next = current.next();
		previous = current.prev();
		var tmp_before = previous;
		while (tmp_before.size()) {
			tmp_before.addClass('before');
			tmp_before.find('.hide').removeClass('hide').addClass('show');
			tmp_before = tmp_before.prev();
		}
	}
	current.addClass('current');
	next.addClass('after');
	
	//Binding click event.
	$(document).click(gotoAndPlay);
	$(document).keydown(function(event) {
		if (event.which == 37 || event.which == 38) {
			gotoAndPlay(-1);
		} else if (event.which == 39 || event.which == 40 || event.which == 32 || event.which == 13) {
			gotoAndPlay();
		}
	});
	
	resizeEventHandler();
});