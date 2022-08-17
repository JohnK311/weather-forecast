
const param = {
    "url": "https://api.openweathermap.org/data/2.5/",
    "appid": "f1479a906a9a4d13cd63b398fbd33481"
}

let citySelect = document.querySelector('#city');
const cities = {
    703448: "Kyiv",
    472045: "Voronezh",
    524901: "Moscow",
    625144: "Minsk",
}

function addingСities() {
    let option;
    for (let key in cities) {
        option += `<option value="${key}">${cities[key]}</option>`;
    }
    citySelect.insertAdjacentHTML('afterbegin', option);
}
addingСities();

let city = document.querySelector('.cityName');
let temp = document.querySelector('.temp');
let wind = document.querySelector('.wind');
let humidity = document.querySelector('.humidity');
let pressure = document.querySelector('.pressure');
let visibility = document.querySelector('.visibility');



function getWeather() {
    const cityId = document.querySelector('#city').value;
    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
        .then(weather => {
            return weather.json();
        }).then(showWeather);
}

function showWeather(data) {
    console.log(data);
    city.innerHTML = `${data.name}`;
    temp.innerHTML = `Температура: ${Math.floor(data.main.temp)}&deg;`;
    wind.innerHTML = `Скорость ветра: ${data.wind.speed} м/с`;
    humidity.innerHTML = `Влажность: ${data.main.humidity}%`;
    pressure.innerHTML = `Давление: ${data.main.pressure} мм рт. ст.`;
    visibility.innerHTML = `Видимость: ${(data.visibility) / 1000} км`;
}

getWeather();
citySelect.onchange = getWeather;