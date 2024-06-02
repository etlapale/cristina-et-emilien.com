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

  // Call the API for RSVP on form click
  document.getElementById('rsvp-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const resultMessage = document.getElementById('result-message');
    try {
      const response = await fetch('https://7qnuery4se.execute-api.eu-west-1.amazonaws.com/rsvp', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: JSON.stringify(data)
      });
      if (response.ok) {
	console.log('successful submission');
	resultMessage.style.display = 'block';
	resultMessage.style.color = 'green';
	resultMessage.textContent = 'We got your message!';
      } else {
	console.warn('failed rsvp submission');
	resultMessage.style.display = 'block';
	resultMessage.style.color = 'red';
	resultMessage.textContent = "We couldn't reach each other! Try again later";
      }
    } catch (error) {
      console.warn("error: " + error.message);
	console.warn('failed rsvp submission');
	resultMessage.style.display = 'block';
	resultMessage.style.color = 'red';
	resultMessage.textContent = "We couldn't reach each other! Try again later";
    }
  });
});
