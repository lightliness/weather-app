let now = new Date();
let currentTime = document.querySelector("#date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

currentTime.innerHTML = `${day} ${hour}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    let maxTemp = Math.round(forecastDay.temp.max);
    let minTemp = Math.round(forecastDay.temp.min);

    let iconElement = forecastDay.weather[0].icon;

    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
                    <div class="weatehrForecastPreview">
                    <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
                    <img src="./images/${iconElement}.svg" alt="" class="forecast-icon" />
                    <div class="forecast-temperature">
                    <strong>
                    <span class="forecast-temperature-max temp">${maxTemp}°</span>
                    <span class="forecast-temperature-min temp">${minTemp}°</span>
                    </strong>
                    </div>
                    </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "77dbf80276516e7cdd4c6541fdc947ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;

  tempC = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(tempC);

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  let iconElementAPI = response.data.weather[0].icon;

  if (iconElementAPI === "01d") {
    document.querySelector("#icon").setAttribute("src", `./images/01d.svg`);
  } else if (iconElementAPI === "02d") {
    document.querySelector("#icon").setAttribute("src", `./images/02d.svg`);
  } else if (iconElementAPI === "03d") {
    document.querySelector("#icon").setAttribute("src", `./images/03d.svg`);
  } else if (iconElementAPI === "04d") {
    document.querySelector("#icon").setAttribute("src", `./images//04d.svg`);
  } else if (iconElementAPI === "09d") {
    document.querySelector("#icon").setAttribute("src", `./images/09d.svg`);
  } else if (iconElementAPI === "10d") {
    document.querySelector("#icon").setAttribute("src", `./images/10d.svg`);
  } else if (iconElementAPI === "11d") {
    document.querySelector("#icon").setAttribute("src", `./images/11d.svg`);
  } else if (iconElementAPI === "13d") {
    document.querySelector("#icon").setAttribute("src", `./images/13d.svg`);
  } else if (iconElementAPI === "50d") {
    document.querySelector("#icon").setAttribute("src", `./images/50d.svg`);
  } else if (iconElementAPI === "01n") {
    document.querySelector("#icon").setAttribute("src", `./images/01n.svg`);
  } else if (iconElementAPI === "02n") {
    document.querySelector("#icon").setAttribute("src", `./images/02n.svg`);
  } else if (iconElementAPI === "03n") {
    document.querySelector("#icon").setAttribute("src", `./images/03n.svg`);
  } else if (iconElementAPI === "04n") {
    document.querySelector("#icon").setAttribute("src", `./images/04n.svg`);
  } else if (iconElementAPI === "09n") {
    document.querySelector("#icon").setAttribute("src", `./images/09n.svg`);
  } else if (iconElementAPI === "10n") {
    document.querySelector("#icon").setAttribute("src", `./images/10n.svg`);
  } else if (iconElementAPI === "11n") {
    document.querySelector("#icon").setAttribute("src", `./images/11n.svg`);
  } else if (iconElementAPI === "13n") {
    document.querySelector("#icon").setAttribute("src", `./images/13n.svg`);
  } else if (iconElementAPI === "50n") {
    document.querySelector("#icon").setAttribute("src", `./images/50n.svg`);
  }

  document
    .querySelector("#icon")
    .setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "77dbf80276516e7cdd4c6541fdc947ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputSearch").value;
  if (city.length <= 0) {
    alert(
      `Oops, looks like there is no city name... Please, type the city name again🔍`
    );
  }
  searchCity(city);
}

function findLocation(position) {
  let apiKey = "77dbf80276516e7cdd4c6541fdc947ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

//--------------
function showFTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");
  let tempF = (tempC * 9) / 5 + 32;

  let forTemp = document.querySelector(".temp");
  forTemp.innerHTML = `${tempF}`;

  buttonC.classList.remove("active");
  buttonF.classList.add("active");
  tempElement.innerHTML = Math.round(tempF);
}

let tempC = null;

let buttonF = document.querySelector("#fahrenheit-btn");
buttonF.addEventListener("click", showFTemp);

function showCTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");

  let forTemp = document.querySelector(".temp");
  forTemp.innerHTML = `${tempC}`;

  buttonC.classList.add("active");
  buttonF.classList.remove("active");
  tempElement.innerHTML = Math.round(tempC);
}

let buttonC = document.querySelector("#celsius-btn");
buttonC.addEventListener("click", showCTemp);

//---------

let searchForm = document.querySelector("form");
searchForm.addEventListener("submit", submit);

let currentLocationButton = document.querySelector("#locationButton");
currentLocationButton.addEventListener("click", currentLocation);

searchCity("New York");
