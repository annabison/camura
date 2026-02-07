/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

	// Lightbox
		var $lightbox = $('<div id="lightbox-overlay"></div>').appendTo($body),
			$lightboxImage = $('<img id="lightbox-image">').appendTo($lightbox);

		$lightbox.on('click', function() {
			$lightbox.removeClass('visible');
		});

		// Use event delegation for robust handling
		// Note: Target the span.image container because the template adds a :before overlay 
		// that covers the img element, blocking clicks on the img itself.
		$('body').on('click', '.box.alt .image.fit', function(e) {
			e.preventDefault();
			e.stopPropagation();
			var $img = $(this).find('img');
			if ($img.length > 0) {
				$lightboxImage.attr('src', $img.attr('src'));
				$lightbox.addClass('visible');
			}
		});

		// Add cursor style to the container
		$('.box.alt .image.fit').css('cursor', 'zoom-in');

})(jQuery);

// Simple Cookie Consent Banner
(function($) {
    $(function() {
        if (!localStorage.getItem('cookieConsent')) {
            // Determine language based on URL or HTML lang attribute
            var path = window.location.href.toLowerCase();
            var lang = 'it'; // default
            if (path.indexOf('-en.html') > -1 || path.indexOf('/en/') > -1 || $('html').attr('lang') === 'en') {
                lang = 'en';
            } else if (path.indexOf('-es.html') > -1 || path.indexOf('/es/') > -1 || $('html').attr('lang') === 'es') {
                lang = 'es';
            }

            // Text content per language
            var content = {
                'it': {
                    text: 'Questo sito utilizza cookie per migliorare l\'esperienza e servizi terzi come Google Maps.',
                    linkText: 'Leggi di più',
                    linkUrl: 'privacy.html',
                    btnText: 'Accetto'
                },
                'en': {
                    text: 'This website uses cookies to improve the experience and third-party services like Google Maps.',
                    linkText: 'Read more',
                    linkUrl: 'privacy-en.html',
                    btnText: 'Accept'
                },
                'es': {
                    text: 'Este sitio utiliza cookies para mejorar la experiencia y servicios de terceros como Google Maps.',
                    linkText: 'Leer más',
                    linkUrl: 'privacy-es.html',
                    btnText: 'Aceptar'
                }
            };

            var t = content[lang];
            
            var $banner = $('<div id="cookie-banner" style="position:fixed; bottom:0; left:0; right:0; background:#333; color:#fff; padding:1em; text-align:center; z-index:10001; box-shadow:0 -2px 10px rgba(0,0,0,0.2);">' + 
                t.text + ' <a href="' + t.linkUrl + '" style="color:#739c7f; text-decoration:underline;">' + t.linkText + '</a>.' +
                ' <button id="accept-cookies" style="margin-left:1em; background:#739c7f; border:none; color:#fff; padding:0.5em 1em; cursor:pointer; border-radius:4px;">' + t.btnText + '</button>' +
                '</div>').appendTo('body');
            
            $('#accept-cookies').on('click', function() {
                localStorage.setItem('cookieConsent', 'true');
                $banner.fadeOut();
            });
        }
    });
})(jQuery);

// Click-to-Load Map Integration
(function($) {
    $(function() {
        $('body').on('click', '.map-placeholder', function(e) {
            e.preventDefault();
            var $this = $(this);
            var src = $this.data('src');
            var $iframe = $('<iframe>')
                .attr('src', src)
                .attr('width', '100%')
                .attr('height', '100%')
                .css('border', '0')
                .attr('allowfullscreen', '')
                .attr('loading', 'lazy')
                .attr('referrerpolicy', 'no-referrer-when-downgrade');
            $this.replaceWith($iframe);
        });
    });
})(jQuery);