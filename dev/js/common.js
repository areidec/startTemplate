'use strict';

$(function() {
	var imgSvgArray = {};

	function imgSvg() {
		$('img.img-svg').each(function() {
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');
			var $svg;

			if (typeof imgSvgArray[imgURL] !== 'undefined') {
				$svg = $(imgSvgArray[imgURL]);
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}
				$img.replaceWith($svg);
			} else {
				$.ajax({
					url: imgURL,
					async: false,
					dataType: 'xml',
					success: function(data) {
						$svg = $(data).find('svg');

						if (typeof imgID !== 'undefined') {
							$svg = $svg.attr('id', imgID);
						}

						$svg = $svg.removeAttr('xmlns:a');

						if (
							!$svg.attr('viewBox') &&
							$svg.attr('height') &&
							$svg.attr('width')
						) {
							$svg.attr(
								'viewBox',
								'0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width')
							);
						}

						imgSvgArray[imgURL] = $svg[0].outerHTML;

						if (typeof imgClass !== 'undefined') {
							$svg = $svg.attr('class', imgClass + ' replaced-svg');
						}

						$img.replaceWith($svg);
					}
				});
			}
		});
	}

	imgSvg();

	$('.main').on('DOMNodeInserted', function() {
		imgSvg();
	});

	//popups
	$('.popup_auth').switchPopup({
		btnClass: 'js-tgl-popup_auth',
		displayClass: 'popup_display',
		visibleClass: 'popup_visible',
		duration: 300
	});

	$('.popup_restore-pass').switchPopup({
		btnClass: 'js-tgl-popup_restore-pass',
		displayClass: 'popup_display',
		visibleClass: 'popup_visible',
		duration: 300
	});

	$('.popup_new-user').switchPopup({
		btnClass: 'js-tgl-popup_new-user',
		displayClass: 'popup_display',
		visibleClass: 'popup_visible',
		duration: 300
	});

	$('.popup_verify-num').switchPopup({
		btnClass: 'js-tgl-popup_verify-num',
		displayClass: 'popup_display',
		visibleClass: 'popup_visible',
		duration: 300
	});

	$('.popup_info').switchPopup({
		btnClass: 'js-tgl-popup_info',
		displayClass: 'popup_display',
		visibleClass: 'popup_visible',
		duration: 300
	});

	$('.popup_thnx').switchPopup({
		btnClass: 'js-tgl-popup_thnx',
		displayClass: 'popup_display',
		visibleClass: 'popup_visible',
		duration: 300
	});

	$('.js-tgl-auth-reg-check').on('click', function() {
		if (getCookie('next_jwt') && $('.access-token').length) {
			$('.popup_regist-check').switchPopup('open');
		} else {
			$('.popup_auth').switchPopup('open');
		}
	})

	$('.js-open-popup_new-user').on('click', function() {
		$(this).closest('.popup').switchPopup('close');
		$('.popup_new-user').switchPopup('open');
	});

	$('.js-open-popup_restore-pass').on('click', function() {
		$(this).closest('.popup').switchPopup('close');
		$('.popup_restore-pass').switchPopup('open');
	});

	$('.btn.burger').on('click', function() {
		$(this).toggleClass('burger_opened');
		$('.menu-mob').toggleClass('menu-mob_opened');

		if($(this).hasClass('burger_opened')) {
			$('html').css('overflow', 'hidden');
		} else {
			$('html').css('overflow', 'auto');
		}
	});
});
