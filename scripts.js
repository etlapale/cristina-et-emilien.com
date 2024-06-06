var dialogHistory = [];

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling to sections when scroll or rsvp buttons are pressed
  const smoothScrollLinks = document.querySelectorAll('.scroll-arrow, .rsvp-button, .chatbot-button');
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

  // Chatbot handler
  const inputElement = document.getElementById('chatbot-input');
  const chatbotForm = document.getElementById('chatbot-form');
  chatbotForm.addEventListener('submit', async function(event) {
    event.preventDefault();
    const query = inputElement.value;
    const body = JSON.stringify({'query': query, 'history': dialogHistory});
    dialogHistory.push(query);
    const discussion = document.getElementById('chatbot-discussion');

    // Create a new element for the question
    const questionElement = document.createElement('div');
    questionElement.classList.add('chatbot-question');
    questionElement.textContent = query;
    discussion.appendChild(questionElement);
    
    inputElement.value = '';

    console.log(body);
    try {
      const response = await fetch('https://aurhcexgg4.execute-api.eu-west-1.amazonaws.com/chatbot', {
	method: 'POST',
	headers: { 'Content-Type': 'application/json' },
	body: body,
      });
      if (response.ok) {
	const answer = await response.text();
	console.log('chatbot answer:');
	console.log(answer);

	const answerElement = document.createElement('div');
	answerElement.classList.add('chatbot-answer');
	answerElement.textContent = answer;
	discussion.appendChild(answerElement);
      } else {
	console.warn('failed rsvp submission');
	console.log(response);
	const answerElement = document.createElement('div');
	answerElement.classList.add('chatbot-error');
	answerElement.textContent = 'The chatbot is out-of-order!';
	discussion.appendChild(answerElement);
      }
    } catch (error) {
      console.warn("error: " + error.message);
      const answerElement = document.createElement('div');
      answerElement.classList.add('chatbot-error');
      answerElement.textContent = 'The chatbot is out-of-order!';
      discussion.appendChild(answerElement);
    }
  });

  // Make Enter trigger the submit
  inputElement.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      chatbotForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      event.preventDefault(); // Prevent the default action to avoid duplicate submissions
    }
  });
});
