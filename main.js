const url =
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";
let request = new XMLHttpRequest();

request.onload = function () {
  // begin accessing JSON data here
  var data = JSON.parse(this.responseText);
  getQuote(data);
};
request.open("GET", url, true);
request.send();

function getRandomIndex(range) {
  let index = Math.floor(Math.random() * range + 1);
  return index;
}

function getQuote(data) {
  let saying = data.quotes[getRandomIndex(data.quotes.length)];
  //   console.log(saying);
  let text = saying.quote;
  let author = saying.author;
  document.getElementById("text").innerText = text;
  document.getElementById("author").innerText = author;
  document
    .getElementById("tweet-quote")
    .setAttribute(
      "href",
      "https://twitter.com/intent/tweet?text=" +
        '"' +
        text +
        '"' +
        " - " +
        author
    );
}

function handleNewQuote(evt) {
  evt.preventDefault();
  let request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    var data = JSON.parse(this.responseText);
    getQuote(data);
  };
  request.open("GET", url, true);
  request.send();
}

function handleTweetButton(evt) {
  console.log("Tweet content");
}

document.getElementById("new-quote").addEventListener("click", handleNewQuote);
document
  .getElementById("tweet-quote")
  .addEventListener("click", handleTweetButton);
