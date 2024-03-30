function updateWeather(response) {
  let temp = document.querySelector("#temp-value");
  temp.innerHTML = Math.round(response.data.temperature.current);
  let city = document.querySelector("#city");
  city.innerHTML = response.data.city;
  let condition = document.querySelector("#weather-condition");
  condition.innerHTML = response.data.condition.description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity + "%";
  let wind = document.querySelector("#wind");
  wind.innerHTML = response.data.wind.speed + "km/h";
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  let icon = document.querySelector("#temp-icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class = "temp-icon" />`;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
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

function displayforecast() {
  let forecast = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `<div class="forecast-col">
        <div class="forecast-day">${day}</div>
        <div class="forecast-icon">☀️</div>
        <div class="forecast-temp">
              <span class="temp-max">18°</span>
              <span class="temp-min">12°</span>
        </div>
        </div>`;
  });

  forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", showWeather);

searchCity("Vienna");

displayforecast();
