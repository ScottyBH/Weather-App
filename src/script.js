let now = new Date();

let today = document.querySelector("#today-date");

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satruday",
];
let day = days[now.getDay()];

today.innerHTML = `${day} ${hours}:${minutes}`;

function forcastFormatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
  <div class="col-sm">
    <div class="card">
      <div class="card-body">
        <p class="card-text">  
            ${forcastFormatDay(forecastDay.dt)}
        </br>
         <img src="https://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png" alt="Deg" id="icon">
    </br>
        <span class="weather-forcast-min">${Math.round(
          forecastDay.temp.min
        )}&deg;</span><span class="weather-forcast-max"> ${Math.round(
          forecastDay.temp.max
        )}&deg;</span>
    </p>
      </div>
    </div>
  </div>
`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = `894a2e7aa7f46eeca5d8778f6faa5a5b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperature = document.querySelector("#today-temp");
  let cityElement = document.querySelector("#city");
  let todayElement = document.querySelector("#now-weather");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemp = response.data.main.temp;

  temperature.innerHTML = Math.round(fahrenheitTemp);
  cityElement.innerHTML = response.data.name;
  todayElement.innerHTML = response.data.weather[0].main;
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = `894a2e7aa7f46eeca5d8778f6faa5a5b`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(url).then(displayTemperature);
}

function handleSumbit(event) {
  event.preventDefault();
  let cityImputElement = document.querySelector("#city-search");
  search(cityImputElement.value);
}

function convertToCelcius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#today-temp");
  let celciusTemp = ((fahrenheitTemp - 32) * 5) / 9;
  tempElement.innerHTML = Math.round(celciusTemp);
}

function convertToFehrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#today-temp");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

search("Phoenix");

let fahrenheitTemp = null;

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSumbit);
