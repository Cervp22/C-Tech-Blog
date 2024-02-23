const joke = document.getElementById("norrisjoke");

const url = "https://api.chucknorris.io/jokes/random";

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    joke.textContent = data.value;
  });
