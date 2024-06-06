const translations = {
  en: {
    'global-date': '15–20 July 2024',
    'are-getting-married': 'are getting married!',
    'date-15-jul': 'Mon 15 July 2024',
    'date-20-jul': 'Sat 20 July 2024',
    'whats-on': "What's on",
    'accommodations': 'Accommodations',
    'questions': 'Questions?',
    'still-questions': 'I still have questions',
    'chatbot-button': 'Ask',
    'rsvp-button': 'RSVP',
    'rsvp': 'RSVP',
    'phone-label': 'Phone number(s)',
    'music-suggestions-label': 'Music suggestions',
    'comments-label': 'Comments',
    'rsvp-submit': 'Submit',
    'source-code-link': 'Source code'
  },
  fr: {
    'global-date': '15–20 juillet 2024',
    'are-getting-married': 'se marient!',
    'date-15-jul': 'Lun 15 juillet 2024',
    'date-20-jul': 'Sam 20 juillet 2024',
    'whats-on': 'Au programme',
    'accommodations': 'Logements',
    'questions': 'Questions ?',
    'still-questions': "J'ai encore des questions",
    'chatbot-button': 'Demander',
    'rsvp-button': 'Réponse',
    'rsvp': 'Réponse',
    'phone-label': 'Numéro(s) de téléphone',
    'music-suggestions-label': 'Suggestions musicales',
    'comments-label': 'Commentaires',
    'rsvp-submit': 'Répondre',
    'source-code-link': 'Code source'
  }
};


/**
 * Detect a language matching our translations.
 */
function detectLanguage() {
  const lang = (navigator.language || navigator.userLanguage).split('-')[0];
  if (lang in translations)
    return lang;
  for (const fullLang of navigator.languages) {
    const lang = fullLang.split('-')[0];
    if (Object.keys(translations).includes(lang))
      return lang;
  }
  return null;
}


function translate(lang) {
  const trans = translations[lang];
  for (let key in trans) {
    let elem = document.getElementById(key);
    if (elem !== null)
      elem.textContent = trans[key];
  }
}


document.addEventListener('DOMContentLoaded', function() {
  const lang = detectLanguage();
  translate(lang);
});
