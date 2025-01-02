const apiKey = "5247dd726c5649dab83121925250201";

async function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherInfo = document.getElementById("weatherInfo");

  // Clear previous weather information
  weatherInfo.innerHTML = "";

  if (!city) {
    weatherInfo.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    // Fetch weather data
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    );

    if (!response.ok) {
      throw new Error("City not found or API error.");
    }

    const data = await response.json();

    // Display weather information
    weatherInfo.innerHTML = `
      <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
      <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${data.current.condition.text}</p>
      <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
      <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.current.wind_kph} km/h</p>
    `;
  } catch (error) {
    weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
