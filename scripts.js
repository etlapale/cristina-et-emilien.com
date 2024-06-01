document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling to sections when scroll or rsvp buttons are pressed
  const smoothScrollLinks = document.querySelectorAll('.scroll-arrow, .rsvp-button');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      document.querySelector(link.getAttribute('href')).scrollIntoView({
	behavior: 'smooth'
      });
    });
  });

  // Smooth scrolling down if on top in the image
  const mainContent = document.querySelector("#main");
  document.addEventListener('keydown', function(event) {
    const scrolledPastMain = window.scrollY >= mainContent.offsetTop;
    if (! scrolledPastMain && [' ', 'ArrowDown', 'PageDown'].includes(event.key)) {
      event.preventDefault();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    };
  });
});
