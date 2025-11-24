/**
 * @file
 * Sass Theme Start behaviors.
 */
(function ($, Drupal) {
	Drupal.behaviors.toggleMenu = {
		attach(context, settings) {
			const hamburgerToggleMenu = document.querySelector(".hamburger");
			const slideMenu = document.querySelector(".menu-main-block");
			const hamburgerOpen = document.querySelector(".hamburger-open");
			const hamburgerClose = document.querySelector(".hamburger-close");
			const body = document.querySelector("body");
			hamburgerToggleMenu?.addEventListener("click", (e) => {
				e.preventDefault();
				slideMenu?.classList.toggle("menu-opened");
				hamburgerClose?.classList.toggle("d-none");
				hamburgerOpen?.classList.toggle("d-none");
				body?.classList.toggle("overflow-hidden");
				body?.classList.toggle("overlay");
			});
		},
	};
})(jQuery, Drupal);
