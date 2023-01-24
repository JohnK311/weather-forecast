
const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "459fe78c900986dc14120406ac850b48",
}

let citySelect = document.querySelector('#city');
let btn = document.querySelector('button');
let selectedCity = '';
let cityName = document.querySelector('.cityName');
let temp = document.querySelector('.temp');
let wind = document.querySelector('.windStatCount');
let humidity = document.querySelector('.humidityStatCount');
let pressure = document.querySelector('.pressureStatCount');
let visibility = document.querySelector('.visibilityStatCount');
let weatherStatus = document.querySelector('.weatherStatus');
let time = document.querySelector('.date');

window.addEventListener('load', (e) => {
    selectedCity = citySelect.value;
    getWeather();
})

btn.addEventListener('click', (e) => {
    e.preventDefault();
    selectedCity = citySelect.value;
    getWeather();
})


function getWeather() {
    fetch(`${param.url}weather?q=${selectedCity}&appid=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}

function getWeatherPosition(position) {
    fetch(`${param.url}weather?lat=${position.latitude}&lon=${position.longitude}&appid=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}


function showWeather(data) {
    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temp.innerHTML = `Temp: ${Math.floor(data.main.temp - 273.15)}&deg;`;
    wind.innerHTML = `<span>${data.wind.speed}</span> m/s`;
    humidity.innerHTML = `<span>${data.main.humidity}</span>%`;
    pressure.innerHTML = `<span>${Math.round(data.main.pressure / 1.33322)}</span> mmHg.`;
    visibility.innerHTML = `<span> ${(data.visibility) / 1000}</span> km`;
    weatherStatus.innerHTML= `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].main}">`;
}

navigator.geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true
  })

  function success({ coords }) {
    getWeatherPosition(coords)

  }
  function error({ message }) {
    console.log(message)
  }
