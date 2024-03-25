function updateWeather(response) {
  let temp = document.querySelector("#temp-value");
  temp.innerHTML = Math.round(response.data.temperature.current);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
}

function searchCity(city) {
  let apiKey = "o0d0713230t29ff3bf6accc034c782b3";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(url).then(updateWeather);
}

function showWeather(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");

  searchCity(cityInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", showWeather);

searchCity("Vienna");
