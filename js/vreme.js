const API_KEY = 'a4da8be64be49ffca203d5f1010128bb';
let unit = 'metric';
let shortUnit = '°C';
let API_URL = `https://api.openweathermap.org/data/2.5/weather?lang=sl&appid=${API_KEY}&units=${unit}&`;

async function getWeather(city, displayOnPage = true) {
    const url = `${API_URL}q=${city}&appid=${API_KEY}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const weatherData = {
            name: data.name,
            temp: `${Math.round(data.main.temp)}${shortUnit}` ,
            weather: data.weather[0].description,
            icon: data.weather[0].icon
        };
        if (displayOnPage) {
            try {
                displayWeather(weatherData);
            } catch (error) {}
        }
        return weatherData;
    } catch (error) {
        alert('Napaka pri pridobivanju vremenskih podatkov');
    }
}

async function getWeatherByCoords(lat, lon, displayOnPage = true) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lang=sl&lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}&`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const weatherData = {
            name: data.name,
            temp: `${Math.round(data.main.temp)}${shortUnit}` ,
            weather: data.weather[0].description,
            icon: data.weather[0].icon
        };
        if (displayOnPage) {
            try {
                displayWeather(weatherData);
            } catch (error) {}
        }
        return weatherData;
    } catch (error) {
        alert('Napaka pri pridobivanju vremenskih podatkov');
    }
}