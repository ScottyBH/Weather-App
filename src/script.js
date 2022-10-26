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

function getForcast(coordinates) {
  let apiKey = `894a2e7aa7f46eeca5d8778f6faa5a5b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then();
  console.log;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
  <div class="col-sm">
    <div class="card">
      <div class="card-body">
        <p class="card-text">  
            ${day}
        </br>
         <img src="#" alt="Deg" id="icon">
    </br>
        <span class="weather-forcast-min">70&deg;</span><span class="weather-forcast-max"> 107&deg;</span>
    </p>
      </div>
    </div>
  </div>
`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

  getForcast(tresponse.data.cord);
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
displayForecast();

let fahrenheitTemp = null;

let form = document.querySelector("#search-bar");
form.addEventListener("submit", handleSumbit);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

let fehrenheitLink = document.querySelector("#fehrenheit-link");
fehrenheitLink.addEventListener("click", convertToFehrenheit);
