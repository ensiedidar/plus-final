function dayFormat(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return `${day} ${hours}:${minutes}`;
}

let date = new Date();

// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#firstForeRow");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "ccf8e7c9ca1efbbf9e8d03fa2fdf555f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
// wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww

function getWeather(response) {
  document.querySelector("#date").innerHTML = dayFormat(date);
  document.querySelector("#cityInput").innerHTML = response.data.name;
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temperature").innerHTML = Math.round(
    (response.data.main.temp - 32) / 9.5
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#speed").innerHTML = response.data.wind.speed;
  cel = response.data.main.temp;
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  console.log(response);
  // wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww

  getForecast(response.data.coord);
  // wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
}

function toCel(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(
    (cel - 32) / 9.5
  );
  toCelsius.classList.add("active");
  toFaren.classList.remove("active");
}

function toFar(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML = Math.round(cel);
  toCelsius.classList.remove("active");
  toFaren.classList.add("active");
}
function getCity(city) {
  let apiKey = "ccf8e7c9ca1efbbf9e8d03fa2fdf555f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  axios.get(apiUrl).then(getWeather);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#input").value;
  getCity(city);
}
let cel = null;
let button = document.querySelector("#form");
button.addEventListener("submit", submit);
let toFaren = document.querySelector("#fahrenheit-link");
toFaren.addEventListener("click", toFar);
let toCelsius = document.querySelector("#celsius-link");
toCelsius.addEventListener("click", toCel);
