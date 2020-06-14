const url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

let quote = document.getElementById("text");
let author = document.getElementById("author");
let tweet = document.getElementById("tweet-quote");
let newQuote = document.getElementById("new-quote");

function getRandomIndex(range) {
  let index = Math.floor(Math.random() * range + 1);
  return index;
}

function getQuote() {
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.responseText);
      let saying = data.quotes[getRandomIndex(data.quotes.length)];
      let text = saying.quote;
      let saidBy = saying.author;
      quote.innerText = text;
      author.innerText = saidBy;
      tweet.setAttribute(
        "href",
        "https://twitter.com/intent/tweet?text=" +
          '"' +
          text +
          '"' +
          " - " +
          saidBy
      );
    }
  };
  request.open("GET", url, true);
  request.send();
}

window.onload = (event) => {
  getQuote();
};

function handleNewQuote(event) {
  event.preventDefault();
  getQuote();
}

newQuote.addEventListener("click", handleNewQuote);
