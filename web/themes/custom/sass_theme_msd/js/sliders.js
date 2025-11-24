(function ($, Drupal) {
	Drupal.behaviors.backgroundSlider = {
	  attach: function (context, settings) {
  
		// Generic helper
		function initSlick($carousel, options) {
		  if (!$carousel.length) return; // ✅ ensure element exists
		  if ($carousel.hasClass('slick-initialized')) {
			$carousel.slick('unslick');
		  }
		  try {
			$carousel.slick(options);
		  } catch (err) {
			console.error('Slick init failed for:', $carousel, err);
		  }
		}
  
		// carousel LTR
		once('mySlickReinit', '[dir="ltr"] .version-1', context).forEach((el) => {
		  initSlick($(el), {
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			infinite: true,
			autoplay: true,
			speed: 500,
			responsive: [
			  { breakpoint: 768, settings: { slidesToShow: 1, arrows:false } }
			]
		  });
		});


			once('mySlickReinit', '[dir="ltr"] .version-2', context).forEach((el) => {
		  initSlick($(el), {
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: true,
			infinite: true,
			autoplay: true,
			speed: 500,
			responsive: [
			  { breakpoint: 768, settings: { slidesToShow: 1, arrows: true } }
			]
		  });
		});
  
	  }
	};
  })(jQuery, Drupal);
  