let myCities = JSON.parse(localStorage.getItem('myCities')) || [];

window.addEventListener('load', () => {
    document.getElementById('weatherInfo').style.display = 'none';
    getLocalWeather();
});

function getLocalWeather() {
    navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        getWeatherByCoords(lat, lon);
    }, () => {
        animate('noGeolocation');
    });
}

function animate(elementId) {
    const element = document.getElementById(elementId);
    element.style.display = 'block';
    element.offsetHeight;
    element.style.opacity = 1;
    setTimeout(() => {
        element.style.opacity = 0;
        setTimeout(() => {
            element.style.display = 'none';
        }, 1000);
    }, 4000);
}

function displayWeather(data) {
    const weatherInfoElement = document.getElementById('weatherInfo');
    const cityNameElement = document.getElementById('cityName');
    const temperatureElement = document.getElementById('temperature');
    const descriptionElement = document.getElementById('description');
    const iconElement = document.getElementById('icon');
    const inputCityElement = document.getElementById('cityInput');

    weatherInfoElement.style.display = 'block';
    cityNameElement.textContent = data.name;
    temperatureElement.textContent = data.temp;
    descriptionElement.textContent = data.weather;
    iconElement.innerHTML = `<img src="http://openweathermap.org/img/w/${data.icon}.png" alt="Weather Icon" width="150px">`;
    inputCityElement.value = data.name;

    const weatherColors = {
        'megla': 'lightgrey',
        'megleno': 'lightgrey',
        'oblačno': 'lightgrey',
        'delno oblačno': 'lightgrey',
        'pretežno oblačno': 'lightgrey',
        'pretrgana oblačnost': 'lightgrey',
        'sneženje': 'lightgrey',
        'jasno': 'lightblue',
        'pretežno jasno': 'lightblue',
        'dež': 'lightskyblue',
        'rahel dež': 'lightskyblue',
    };

    weatherInfoElement.style.backgroundColor = weatherColors[data.weather] || 'white';
}

function changeUnit() {
    let unit = document.getElementById('unitSelect').value;
    unit = unit;
    shortUnit = unit === 'metric' ? '°C' : '°F';
    API_URL = `https://api.openweathermap.org/data/2.5/weather?lang=sl&appid=${API_KEY}&units=${unit}&`;
    getWeather(document.getElementById('cityInput').value);
}

function addCity(mesto) {
    if (myCities.includes(mesto)) {
        alert('Mesto je že na seznamu mojih mest!');
    } else {
        myCities.push(mesto);
        localStorage.setItem('myCities', JSON.stringify(myCities));
        animate('dodanoMesto');
    }
}
