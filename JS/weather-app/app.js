const errorMsg = document.getElementById("errorMsg");
const loadingMsg = document.getElementById("loadingMsg");
const currentLocation = document.getElementById("locationName");
const temperature = document.getElementById("temperature");
const conditionText = document.getElementById("conditionText");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const forecastList = document.getElementById("forecastList");
const locationBtn = document.getElementById("locationBtn");
const searchIcon = document.getElementById("searchIcon");
const cityInput = document.getElementById("cityInput");

const weatherInfo = {
  0: { condition: "Clear sky", icon: "01d" },
  1: { condition: "Mainly clear", icon: "01d" },
  2: { condition: "Partly cloudy", icon: "02d" },
  3: { condition: "Overcast", icon: "04d" },
  45: { condition: "Foggy", icon: "50d" },
  48: { condition: "Icy fog", icon: "50d" },
  51: { condition: "Light drizzle", icon: "09d" },
  53: { condition: "Drizzle", icon: "09d" },
  55: { condition: "Heavy drizzle", icon: "09d" },
  61: { condition: "Light rain", icon: "10d" },
  63: { condition: "Moderate rain", icon: "10d" },
  65: { condition: "Heavy rain", icon: "10d" },
  71: { condition: "Light snow", icon: "13d" },
  73: { condition: "Moderate snow", icon: "13d" },
  75: { condition: "Heavy snow", icon: "13d" },
  80: { condition: "Rain showers", icon: "09d" },
  81: { condition: "Heavy showers", icon: "09d" },
  95: { condition: "Thunderstorm", icon: "11d" },
  96: { condition: "Thunderstorm + hail", icon: "11d" },
  99: { condition: "Thunderstorm + hail", icon: "11d" },
};

function getUserLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      },
      () => {
        reject(new Error("Location access denied. Please search manually."));
      },
    );
  });
}

async function fetchWeatherByCoord(lat, lon) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=relativehumidity_2m,surface_pressure&daily=temperature_2m_max,weathercode&timezone=auto&forecast_days=5`,
  );

  if (!response.ok) {
    throw new Error(`Weather API error! Status: ${response.status}`);
  }

  return await response.json();
}

async function getCityCoordinates(cityName) {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`,
  );

  if (!response.ok) {
    throw new Error("Could not search for city");
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found");
  }

  return {
    lat: data.results[0].latitude,
    lon: data.results[0].longitude,
    name: data.results[0].name,
    country: data.results[0].country,
  };
}

async function showUserLocation() {
  errorMsg.textContent = "";
  loadingMsg.classList.remove("hidden");

  try {
    const location = await getUserLocation();
    const weatherData = await fetchWeatherByCoord(location.lat, location.lon);
    displayWeatherData(weatherData, "My Location");
  } catch (error) {
    errorMsg.textContent = error.message;
    errorMsg.classList.remove("hidden");
  } finally {
    loadingMsg.classList.add("hidden");
  }
}

async function searchByCity() {
  const cityName = cityInput.value.trim();
  if (cityName === "") return;

  errorMsg.textContent = "";
  loadingMsg.classList.remove("hidden");

  try {
    const coords = await getCityCoordinates(cityName);
    const weatherData = await fetchWeatherByCoord(coords.lat, coords.lon);
    displayWeatherData(weatherData, `${coords.name}, ${coords.country}`);
  } catch (error) {
    errorMsg.textContent = error.message;
    errorMsg.classList.remove("hidden");
  } finally {
    loadingMsg.classList.add("hidden");
  }
}

function displayWeatherData(data, locationName) {
  const current = data.current_weather;
  const daily = data.daily;
  const hourly = data.hourly;

  const code = current.weathercode;
  const info = weatherInfo[code] || { condition: "Unknown", icon: "sunny" };

  currentLocation.textContent = locationName;
  temperature.textContent = `${Math.round(current.temperature)}°C`;
  conditionText.textContent = info.condition;
  document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${info.icon}@2x.png`;
    
  humidity.textContent = `${hourly.relativehumidity_2m[0]}%`;
  wind.textContent = `${current.windspeed} km/h`;
  pressure.textContent = `${hourly.surface_pressure[0]} hPa`;

  forecastList.innerHTML = "";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  daily.time.forEach((dateStr, index) => {
    const date = new Date(dateStr);
    const dayName = days[date.getDay()];
    const maxTemp = Math.round(daily.temperature_2m_max[index]);
    const dayCode = daily.weathercode[index];
    const dayInfo = weatherInfo[dayCode] || {
      condition: "Unknown",
      icon: "sunny",
    };

    const li = document.createElement("li");
    li.innerHTML = `
    <span class="forecast-day">${dayName}</span>
    <img src="https://openweathermap.org/img/wn/${dayInfo.icon}@2x.png" alt="${dayInfo.condition}">
    <span class="forecast-temp">${maxTemp}°</span>
`;
    forecastList.appendChild(li);
  });

  document.getElementById("currentWeatherContainer").classList.remove("hidden");
}

locationBtn.addEventListener("click", showUserLocation);
searchIcon.addEventListener("click", searchByCity);
cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") searchByCity();
});
