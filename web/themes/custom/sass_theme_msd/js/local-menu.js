/**
 * @file
 * Sass Theme Start behaviors.
 */
(function ($, Drupal) {
  Drupal.behaviors.localTaskMenu = {
    attach(context, settings) {
      // REMOVING THE STATUS MESSAGE ON CLICKING THE CROSS BUTTON
      const messageCrossBtns = document.querySelectorAll(
        ".message-body .cross"
      );
      const messageBodies = document.querySelectorAll(".message-body");
      if (messageCrossBtns.length > 0 || messageBodies.length > 0) {
        messageCrossBtns.forEach((btn, index) => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();
            // console.log(`clicked button ${index}`);
            messageBodies[index].style.display = "none";
          });
        });
      } // END - REMOVING THE STATUS MESSAGE ON CLICKING THE CROSS BUTTON
    },
  };
})(jQuery, Drupal);
