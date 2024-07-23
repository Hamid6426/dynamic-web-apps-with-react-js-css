import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

const quoteData = [
  {text: "When the sun came up… I couldn’t tell where heaven stopped and the Earth began.", author: "Tom Hanks"},
  {text: "Every morning is a beautiful morning.", author: "Terri Guillemets"},
  {text: "The morning was full of sunlight and hope.", author: "Kate Chopin"},
  {text: "Make each day your masterpiece.", author: "John Wooden"},
  {text: "The sun is new each day.", author: "Heraclitus"},  
];

const QuoteBox = ({ quote, handleNewQuote }) => (
  <div id='quote-box'>
    <p id='text'>{quote.text}</p>
    <h2 id='author'>{quote.author}</h2>
    <div class='actions'>
      <button id='new-quote' class='button' onClick={handleNewQuote}>New Quote</button>
      <a href='https://twitter.com/intent/tweet' id="tweet-quote" target='_blank'>Tweet</a>
    </div>
  </div>
);

const getRandomIndex = () => Math.round(Math.random() * (quoteData.length - 1));

const App = () => {
  const [quote, setQuote] = React.useState(quoteData[getRandomIndex()]);
  const handleNewQuote = () => {
    setQuote(quoteData[getRandomIndex()]);
  }
  
  return (
    <div class='main'>
      <QuoteBox quote={quote} handleNewQuote={handleNewQuote}/>  
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector("#app"));