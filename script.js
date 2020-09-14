const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// Get Quote From Api
// async function
async function getQuote() {
  loading();
  const proxyUrl = 'https://limitless-everglades-36779.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    // this constant will not be set until it finishes fetching
    const response = await fetch(proxyUrl + apiUrl);
    // this constant will not be set until it finishes returning the response in json
    const data = await response.json();
    if (data.quoteAuthor === '') {
      authorText.innerText = 'some one wiser than you and me';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    // Stop Loader, and show the quote
    complete();
  } catch (error) {
    console.log(error);
  }
}
// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}
// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
