/*
	Phantom by HTML5 UP
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
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch?
		if (browser.mobile)
			$body.addClass('is-touch');

	// Forms.
		var $form = $('form');

		// Auto-resizing textareas.
			$form.find('textarea').each(function() {

				var $this = $(this),
					$wrapper = $('<div class="textarea-wrapper"></div>'),
					$submits = $this.find('input[type="submit"]');

				$this
					.wrap($wrapper)
					.attr('rows', 1)
					.css('overflow', 'hidden')
					.css('resize', 'none')
					.on('keydown', function(event) {

						if (event.keyCode == 13
						&&	event.ctrlKey) {

							event.preventDefault();
							event.stopPropagation();

							$(this).blur();

						}

					})
					.on('blur focus', function() {
						$this.val($.trim($this.val()));
					})
					.on('input blur focus --init', function() {

						$wrapper
							.css('height', $this.height());

						$this
							.css('height', 'auto')
							.css('height', $this.prop('scrollHeight') + 'px');

					})
					.on('keyup', function(event) {

						if (event.keyCode == 9)
							$this
								.select();

					})
					.triggerHandler('--init');

				// Fix.
					if (browser.name == 'ie'
					||	browser.mobile)
						$this
							.css('max-height', '10em')
							.css('overflow-y', 'auto');

			});

	// Menu.
		var $menu = $('#menu');

		$menu.wrapInner('<div class="inner"></div>');

		$menu._locked = false;

		$menu._lock = function() {

			if ($menu._locked)
				return false;

			$menu._locked = true;

			window.setTimeout(function() {
				$menu._locked = false;
			}, 350);

			return true;

		};

		$menu._show = function() {

			if ($menu._lock())
				$body.addClass('is-menu-visible');

		};

		$menu._hide = function() {

			if ($menu._lock())
				$body.removeClass('is-menu-visible');

		};

		$menu._toggle = function() {

			if ($menu._lock())
				$body.toggleClass('is-menu-visible');

		};

		$menu
			.appendTo($body)
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				// Hide.
					$menu._hide();

				// Redirect.
					if (href == '#menu')
						return;

					window.setTimeout(function() {
						window.location.href = href;
					}, 350);

			})
			.append('<a class="close" href="#menu">Close</a>');

		$body
			.on('click', 'a[href="#menu"]', function(event) {

				event.stopPropagation();
				event.preventDefault();

				// Toggle.
					$menu._toggle();

			})
			.on('click', function(event) {

				// Hide.
					$menu._hide();

			})
			.on('keydown', function(event) {

				// Hide on escape.
					if (event.keyCode == 27)
						$menu._hide();

			});

})(jQuery);

/* ====================== start of jmac component scripts ================== */
/* tabs */
$(function () {

  var activeIndex = $('.active-tab').index(),
      $contentlis = $('.tabs-content li'),
      $tabslis = $('.tabs li');
  
  // Show content of active tab on loads
  $contentlis.eq(activeIndex).show();

  $('.tabs').on('click', 'li', function (e) {
    var $current = $(e.currentTarget),
        index = $current.index();
    
    $tabslis.removeClass('active-tab');
    $current.addClass('active-tab');
    $contentlis.hide().eq(index).show();
	 });
});
/* accordions */
$(function () {
  // Expand any panel that's open on page load
  $('.accordion-item.active-tab .accordion-panel').each(function () {
    var $panel = $(this);
    $panel.css('max-height', $panel.prop('scrollHeight') + 'px');
  });

  $('.accordion').on('click', '.accordion-header', function () {
    var $item = $(this).closest('.accordion-item');
    var isOpen = $item.hasClass('active-tab');
    var singleOpen = true;

    if (singleOpen) {
      $item.siblings().removeClass('active-tab').find('.accordion-panel').css('max-height', '');
    }

    $item.toggleClass('active-tab', !isOpen);

    var $panel = $item.find('.accordion-panel');
    if (!isOpen) {
      $panel.css('max-height', $panel.prop('scrollHeight') + 'px');
    } else {
      $panel.css('max-height', '');
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var dividerColours = [
    'divider-rose',
    'divider-sky',
    'divider-teal',
    'divider-orchid',
    'divider-lavender',
    'divider-periwinkle'
  ];

  var randomClass = dividerColours[Math.floor(Math.random() * dividerColours.length)];

  var divider = document.querySelector('.js-divider');
  if (divider) {
    divider.classList.add(randomClass);
  }
});
/* post meta (date + tags) — auto-shown on any page that has a post-date meta tag */
$(function () {
  var $dateMeta = $('meta[name="post-date"]');
  if ($dateMeta.length === 0)
    return;

  var dateStr = ($dateMeta.attr('content') || '').trim();
  if (!dateStr || dateStr.toUpperCase() === 'YYYY-MM-DD')
    return;

  var tagsStr = $('meta[name="post-tags"]').attr('content') || '';
  var tags = tagsStr.split(',').map(function (t) { return $.trim(t); }).filter(Boolean);

  var formatted = dateStr;
  var parts = dateStr.split('-');
  if (parts.length === 3) {
    var d = new Date(Date.UTC(+parts[0], +parts[1] - 1, +parts[2]));
    formatted = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
  }

  var $back = $('<p class="post-back"><a href="../blog.html">&larr; Back to Blog</a></p>');
  var $meta = $('<p class="post-meta"></p>').text('Posted on ' + formatted + (tags.length ? ' \u00b7 ' + tags.join(', ') : ''));

  var $h1 = $('#main .inner h1').first();
  $h1.before($back);
  $h1.after($meta);
});
/* lightbox — click any .lightbox-trigger to view a larger version.
   Add class="lightbox-trigger" to an <a href="[full-size image]"> that
   wraps a thumbnail <img>. Give a set of related links the same
   data-lightbox-group="name" attribute to get prev/next navigation
   between them; leave it off for a single stand-alone image. */
$(function () {
  var $lightbox, $lbImage, $lbCaption, $currentGroup = $(), currentIndex = 0;

  function buildLightbox() {
    if ($lightbox) return;

    $lightbox = $(
      '<div id="lightbox" class="lightbox" aria-hidden="true">' +
        '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
        '<button type="button" class="lightbox-prev" aria-label="Previous image">&#10094;</button>' +
        '<button type="button" class="lightbox-next" aria-label="Next image">&#10095;</button>' +
        '<div class="lightbox-content">' +
          '<img src="" alt="" />' +
          '<p class="lightbox-caption"></p>' +
        '</div>' +
      '</div>'
    ).appendTo('body');

    $lbImage = $lightbox.find('img');
    $lbCaption = $lightbox.find('.lightbox-caption');

    $lightbox.on('click', function (e) {
      if (e.target === this) closeLightbox();
    });
    $lightbox.find('.lightbox-close').on('click', closeLightbox);
    $lightbox.find('.lightbox-prev').on('click', function () { show(currentIndex - 1); });
    $lightbox.find('.lightbox-next').on('click', function () { show(currentIndex + 1); });
  }

  function show(index) {
    if (!$currentGroup.length) return;
    currentIndex = ((index % $currentGroup.length) + $currentGroup.length) % $currentGroup.length;

    var $item = $currentGroup.eq(currentIndex);
    var caption = $item.attr('data-caption') || $item.find('img').attr('alt') || '';

    $lbImage.attr('src', $item.attr('href'));
    $lbImage.attr('alt', caption);
    $lbCaption.text(caption);
    $lightbox.find('.lightbox-prev, .lightbox-next').toggle($currentGroup.length > 1);
  }

  function openLightbox($trigger) {
    buildLightbox();

    var group = $trigger.attr('data-lightbox-group');
    $currentGroup = group ?
      $('.lightbox-trigger[data-lightbox-group="' + group + '"]') :
      $trigger;

    show($currentGroup.index($trigger));
    $lightbox.addClass('active').attr('aria-hidden', 'false');
    $('body').addClass('lightbox-open');
  }

  function closeLightbox() {
    if (!$lightbox) return;
    $lightbox.removeClass('active').attr('aria-hidden', 'true');
    $('body').removeClass('lightbox-open');
  }

  $(document).on('click', '.lightbox-trigger', function (e) {
    e.preventDefault();
    openLightbox($(this));
  });

  $(document).on('keydown', function (e) {
    if (!$lightbox || !$lightbox.hasClass('active')) return;
    if (e.keyCode === 27) closeLightbox();
    if (e.keyCode === 37) show(currentIndex - 1);
    if (e.keyCode === 39) show(currentIndex + 1);
  });
});
/* ====================== end of jmac component scripts ================== */
