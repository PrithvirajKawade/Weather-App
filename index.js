//api key
let apiKey = "657a4cde7cff5070e6845a6356c91c13";

const searchValue = document.querySelector(".search-bar");
const findWeather = document.querySelector("#submit");

findWeather.addEventListener("click", (e) => {
  e.preventDefault();
  parameters(searchValue.value);
});

//get latitude and longitude of the city
async function parameters(city) {
  //   try {
  const getData = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`
  );
  const mainData = await getData.json();
  const latitude = mainData[0].lat;
  const longitude = mainData[0].lon;

  weather(latitude, longitude);
  //   } catch {
  //     alert("Something Went Wrong! Try Again!");
  //   }
}

//find weather

async function weather(lat, lon) {
  //   try {
  const getWeatherData = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`,
    { mode: "cors" }
  );
  const mainWeatherData = await getWeatherData.json();

  const city = mainWeatherData.name;
  const temperature = mainWeatherData.main.temp;
  const description = mainWeatherData.weather[0].main;
  const humidity = mainWeatherData.main.humidity;
  const wind = mainWeatherData.wind.speed;
  const icon = mainWeatherData.weather[0].icon;

  updateDisplay(city, temperature, description, humidity, wind, icon);
  //   } catch {
  //     alert("Something Went Wrong! Try Again!");
  //   }
}

const displayCity = document.querySelector(".city");
const displayTemp = document.querySelector(".temp");
const displayDescription = document.querySelector(".description");
const displayHumidity = document.querySelector(".humidity");
const displayWind = document.querySelector(".wind");
const displayIcon = document.querySelector(".icon");
const loading = document.querySelector(".weather");

//display results
function updateDisplay(city, temp, description, humidity, wind, icon) {
  resetDisplay();
  displayCity.innerText = `Weather in ${city}`;
  displayTemp.innerText = `${Math.round(temp - 273.15)}°C`;
  displayDescription.innerText = description;
  displayHumidity.innerText = `Humidity: ${humidity}%`;
  displayWind.innerText = `Wind Speed: ${wind}km/h`;
  displayIcon.src = `https://openweathermap.org/img/wn/${icon}.png`;
  document.body.style.backgroundImage =
    "url('https://source.unsplash.com/1600x900/?" + city + "')";
  loading.classList.remove("loading");
}

function resetDisplay() {
  displayCity.innerText = "";
  displayTemp.innerText = "";
  displayDescription.innerText = "";
  displayHumidity.innerText = "";
  displayWind.innerText = "";
  displayIcon.src = "";
}

parameters("Delhi");
