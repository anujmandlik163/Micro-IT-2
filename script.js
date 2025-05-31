const apiKey = 'fe7618df96f8907552830dafbc337926'; 

function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showWeather, showError);
  } else {
    document.getElementById('weatherResult').innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      document.getElementById('weatherResult').innerHTML = `
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
        <p><strong>Weather:</strong> ${data.weather[0].description}</p>
        <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      `;
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      document.getElementById('weatherResult').innerHTML = "Could not retrieve weather data.";
    });
}

function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      document.getElementById('weatherResult').innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.getElementById('weatherResult').innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      document.getElementById('weatherResult').innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      document.getElementById('weatherResult').innerHTML = "An unknown error occurred.";
      break;
  }
}
