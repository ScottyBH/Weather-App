let now = new Date();

let today = document.querySelector("#today-date");

let hours = now.getHours();
let minutes = now.getMinutes();

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

function showCityForm(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#city-search");
  let displayCity = document.querySelector("#city");
  displayCity.innerHTML = `${searchCity.value}`;
}
let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", showCityForm);

let currentTemp = 108;
let displayedTemp = document.querySelector("#today-temp");

function convertToCelcius(event) {
  event.preventDefault();
  displayedTemp.innerHTML = `${Math.round(((currentTemp - 32) * 5) / 9)}°`;
}
let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", convertToCelcius);

function convertTofehrenheit(event) {
  event.preventDefault();
  displayedTemp.innerHTML = `${currentTemp}°`;
}
let fehrenheit = document.querySelector("#fehrenheit-link");
fehrenheit.addEventListener("click", convertTofehrenheit);

function currentPosition(response) {
  let currentCity = document.querySelector("#today-temp");
  let temperature = Math.round(response.data.main.temp);
  currentCity.innerHTML = `${temperature.value}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "894a2e7aa7f46eeca5d8778f6faa5a5b";
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(url).then(currentPosition);
}

function getCurrentPosition(position) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-temp");
button.addEventListener("click", getCurrentPosition);

function searchEngine(event) {
  event.preventDefault();
  let apiKey = `894a2e7aa7f46eeca5d8778f6faa5a5b`;
  let city = document.querySelector("#city-search").value;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  axios.get(url).then(currentWeather);
}

let searchButton = document.querySelector("#search-bar");
searchButton.addEventListener("submit", searchEngine);

function currentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureInfo = document.querySelector("#city");
  temperatureInfo.innerHTML = `${response.data.name}`;
  let temp = document.querySelector("#today-temp");
  temp.innerHTML = `${temperature}`;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#now-weather").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}

function displayPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "894a2e7aa7f46eeca5d8778f6faa5a5b";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(currentWeather);
}

function current(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayPosition);
}

let currentButton = document.querySelector("#current-temp");
currentButton.addEventListener("click", current);
