const [
  userInput,
  submitButton,
  weatherIcon,
  temperature,
  city,
  humidityValue,
  windValue,
] = document.querySelectorAll(
  "#userInput, #submit , #temperature, #city ,.humidityValue, .windValue , #weather_icon"
);

const API_KEY = `2d9381ce587282f7782caeca088794e7`;

function toCelsius(kelvinValue) {
  const celsiusValue = kelvinValue - 273.15;
  return celsiusValue.toFixed(2);
}

async function getWeatherData(cityName) {
  try {
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    const res = await fetch(API_URL);
    const data = await res.json();
    console.log(data);
    if (data.cod === 200) {
      const icon_code = data.weather[0].icon; // to get the icon
      const Icon_Url = `https://openweathermap.org/img/w/${icon_code}.png`;
      weatherIcon.setAttribute("src", Icon_Url); // set the icon
      temperature.innerText = `${toCelsius(data.main.temp)}°c`; // convert temperature into celsius
      city.innerText = data.name; // set the name of the city
      humidityValue.innerText = `${data.main.humidity}%`; // set the humidity value
      windValue.innerText = `${data.wind.speed}m/s`; // set the wind speed
    } else {
      console.log(data.message);
      throw new Error("You entered invalid city name");
    }
  } catch (err) {
    const infoSection = document.querySelector(".info");
    const div = document.createElement("div");
    div.setAttribute("id", "errorMsg");
    div.innerHTML = `<p>${err.message}</p>`;
    infoSection.appendChild(div);
    setTimeout(() => {
      infoSection.removeChild(div);
    }, 2000);
  }
}

getWeatherData("Muzaffarnagar");

submitButton.addEventListener("click", () => {
  const getCityName = userInput.value;
  if (getCityName == "null" || getCityName == undefined || getCityName == "") {
    alert("Please enter a city name");
  } else {
    getWeatherData(getCityName);
  }

  ////////////////////////////////
  userInput.value = "";
});
