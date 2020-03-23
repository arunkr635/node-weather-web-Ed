// fetch("http://puzzle.mead.io/puzzle").then(response => {
//   response.json().then(data => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:3000/weather?address=boston").then(response => {
//   response.json().then(data => {
//     console.log(data);
//   });
// });

const result = document.querySelector(".result");

const weatherForm = document.querySelector("form");
weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = document.querySelector("input").value;
  if (!location) {
    return (result.textContent = `Enter a Place name`);
  }
  const url = `/weather?address=${location}`;
  console.log(url);
  fetch(url).then(response => {
    response.json().then(data => {
      if (data.error) {
        return (result.textContent = data.error);
      }
      result.textContent = `location : ${data.location}, Temperature :  ${data.Data.temperature},  Humidity: ${data.Data.humidity}`;
      console.log(data);
    });
  });
});
