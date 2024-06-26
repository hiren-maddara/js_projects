// https://type.fit/api/quotes
// https://jacintodesign.github.io/quotes-api/data/quotes.json

const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = []

//spinner
function loading(){
    loader.hidden = false
    quoteContainer.hidden = true
}

function complete(){
    loader.hidden = true
    quoteContainer.hidden = false
}

// show new quote
function newQuote(arr){
    //pick a random from the array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    console.log(quote)
    const parsedAuthor = quote.author?.split(',')[0]
    parsedAuthor === 'type.fit' ? authorText.textContent = 'Unknown' : authorText.textContent = parsedAuthor;

    quote.text.length > 50 ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote')
    quoteText.textContent = quote.text

    complete()
}

// get quotes form api
async function getQuotes (){
    loading()
    const apiURL = "https://type.fit/api/quotes"
    // const apiURL = "https://jacintodesign.github.io/quotes-api/data/quotes.json"

    try{
        const res = await fetch(apiURL)
        apiQuotes = await res.json()
        newQuote()
    } catch(err){
        //catch the error your way
    }
}


//tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - 
    ${authorText.textContent}`

    // open it in a new window
    window.open(twitterUrl, '_blank')
}


//event listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)

//on load
getQuotes()


