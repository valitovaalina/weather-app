const latitudeValue = document.getElementById('latitude');
const longitudeValue = document.getElementById('longitude');
const getWeatherButton = document.getElementById('weather-button');
const weatherWidgetsBlock = document.getElementById('weather-widgets');
let map;

function createMap() {
  map = L.map('map').setView([0, 0], 2);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);
}

function createWeatherWidget(data) {
  const widget = document.createElement('div');
  widget.classList.add('weather__widget');
  widget.innerHTML = `
      <h2 class="weather__info">Погода в ${data.name}</h2>
      <p class="weather__info">Температура: ${getCelsius(data.main.temp)}°C</p>
      <p class="weather__info">Описание: ${data.weather[0].description}</p>
      <p class="weather__info">Скорость ветра: ${data.wind.speed} м/с</p>
  `;
  return widget;
}

function getCelsius(kelvin) {
  return (kelvin - 273.15).toFixed(2);
}

function getWeatherButtonHandler() {
  const latitude = parseFloat(latitudeValue.value);
  const longitude = parseFloat(longitudeValue.value);
  if (isNaN(latitude) || isNaN(longitude) || latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    alert('Введите корректные координаты.');
    return;
  }

  const apiKey = 'eb2e627dc88f9cce403037ae26a8c9e5';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const widget = createWeatherWidget(data);
      weatherWidgetsBlock.appendChild(widget);
      latitudeValue.value = '';
      longitudeValue.value = '';
      map.setView([latitude, longitude], 10);
    })
    .catch(error => {
      console.error('Ошибка при получении данных о погоде:', error);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  getWeatherButton.addEventListener('click', getWeatherButtonHandler);
  createMap();
});
