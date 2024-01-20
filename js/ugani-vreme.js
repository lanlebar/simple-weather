unit = 'metric';
let temperture;

document.getElementById('generatedCity').style.display = 'none';
document.getElementById('help').style.display = 'none';
document.getElementById('result').style.display = 'none';
document.getElementById('guessButton').disabled = true;
document.getElementById('helpButton').disabled = true;

function showInfo() {
    const infoElement = document.getElementById('infoWindow');
    infoElement.style.display = 'block';
}
function hideInfo() {
    const infoElement = document.getElementById('infoWindow');
    infoElement.style.display = 'none';
}

function changeUnit() {
    let unit = document.getElementById('unitSelect').value;
    unit = unit;
    API_URL = `https://api.openweathermap.org/data/2.5/weather?lang=sl&appid=${API_KEY}&units=${unit}&`;
}

async function getRandomWeather(area, level) {
    const world100 = [
        'Tokyo', 'Delhi', 'Shanghai', 'São Paulo', 'Mumbai', 'Beijing', 'Cairo', 'Dhaka', 'Osaka', 'Chongqing',
        'Istanbul', 'Karachi', 'Paris', 'Shenzhen', 'Lahore', 'Jakarta', 'Moscow', 'Manila', 'Tianjin', 'Mumbai',
        'Lima', 'Bangkok', 'New York City', 'Chengdu', 'Nairobi', 'Hong Kong', 'Wuhan', 'Hangzhou', 'Ahmedabad',
        'Kuala Lumpur', 'Bogotá', 'Riyadh', 'Santiago', 'Alexandria', 'Los Angeles', 'Beijing', 'Shijiazhuang',
        'Yangon', 'Riyadh', 'Bengaluru', 'Shenzhen', 'Istanbul', 'Jakarta', 'Manila', 'Tianjin', 'Lima', 'Bangkok',
        'Chengdu', 'Nairobi', 'Wuhan', 'Hangzhou', 'Ahmedabad', 'Kuala Lumpur', 'Bogotá', 'Riyadh', 'Santiago',
        'Alexandria', 'Los Angeles', 'Chittagong', 'Chengdu', 'Baghdad', 'Nanjing', 'Shijiazhuang', 'Cairo', 'Tehran',
        'Riyadh', 'Miami', 'Hanoi', 'Kuala Lumpur', 'Pune', 'Riyadh', 'Lima', 'Singapore', 'Kuala Lumpur', 'Santiago',
        'Johannesburg', 'Ahmedabad', 'Wuhan', 'Hangzhou', 'Chengdu', 'Riyadh', 'Alexandria', 'Moscow', 'Los Angeles',
        'Chittagong', 'Tehran', 'Shijiazhuang', 'Baghdad', 'Nanjing', 'Riyadh', 'Cairo', 'Hanoi', 'Chengdu', 'Pune',
        'Singapore', 'Santiago', 'Kuala Lumpur', 'Johannesburg', 'Ahmedabad', 'Wuhan'
    ];

    const slovenia20 = [
        'Ljubljana', 'Maribor', 'Celje', 'Kranj', 'Velenje', 'Koper', 'Novo Mesto', 'Ptuj', 'Trbovlje', 'Kamnik', 'Jesenice', 'Nova Gorica', 'Domžale', 'Izola', 'Krško', 'Postojna', 'Ravne na Koroškem', 'Škofja Loka', 'Kočevje', 'Murska Sobota'
    ];
    const europe100 = [
        'Paris', 'Berlin', 'London', 'Madrid', 'Rome', 'Amsterdam', 'Vienna', 'Prague', 'Athens', 'Lisbon',
        'Budapest', 'Warsaw', 'Copenhagen', 'Stockholm', 'Oslo', 'Helsinki', 'Brussels', 'Dublin', 'Zurich', 'Munich',
        'Barcelona', 'Milan', 'Geneva', 'Hamburg', 'Frankfurt', 'Lyon', 'Manchester', 'Edinburgh', 'Bucharest', 'Sofia',
        'Belgrade', 'Bratislava', 'Vilnius', 'Riga', 'Tallinn', 'Reykjavik', 'Luxembourg City', 'Ljubljana', 'Valletta', 'Tirana',
        'Skopje', 'Sarajevo', 'Podgorica', 'Prishtina', 'Tbilisi', 'Yerevan', 'Baku', 'Astana', 'Tashkent', 'Ashgabat',
        'Bishkek', 'Chisinau', 'Vatican City', 'Monaco', 'Andorra la Vella', 'San Marino', 'Vaduz', 'Nicosia', 'St. Petersburg',
        'Barcelona', 'Berlin', 'Budapest', 'Copenhagen', 'Dublin', 'Helsinki', 'Krakow', 'Lisbon', 'Prague', 'Reykjavik',
        'Sofia', 'Stockholm', 'Vienna', 'Warsaw', 'Zurich', 'Amsterdam', 'Athens', 'Belgrade', 'Bratislava', 'Brussels',
        'Bucharest', 'Frankfurt', 'Hamburg', 'Lyon', 'Manchester', 'Milan', 'Oslo', 'Riga', 'Tallinn', 'Valletta', 'Vilnius'
    ];

    let city, weatherData;
    const currentCity = document.getElementById('cityName').textContent;
    switch (area) {
        case 'world':
            city = world100[Math.floor(Math.random() * world100.length)];
            if (city === currentCity) {
                getRandomWeather(area, level);
                return;
            }
            weatherData = await getWeather(city);
            temperture = weatherData.temp;
            displayWeather(weatherData, level);
            break;
        case 'slovenia':
            city = slovenia20[Math.floor(Math.random() * slovenia20.length)];
            if (city === currentCity) {
                getRandomWeather(area, level);
                return;
            }
            weatherData = await getWeather(city);
            temperture = weatherData.temp;
            displayWeather(weatherData, level);
            break;
        case 'europe':
            city = europe100[Math.floor(Math.random() * europe100.length)];
            if (city === currentCity) {
                getRandomWeather(area, level);
                return;
            }
            weatherData = await getWeather(city);
            temperture = weatherData.temp;
            displayWeather(weatherData, level);
            break;
        case 'mojaMesta':
            myCities = JSON.parse(localStorage.getItem('myCities')) || [];
            if (myCities.length === 0) {
                alert('Seznam mest je prazen. Dodajte vsaj eno mesto v seznam.');
                return;
            }
            city = myCities[Math.floor(Math.random() * myCities.length)];
            if (city === currentCity) {
                getRandomWeather(area, level);
                return;
            }
            weatherData = await getWeather(city);
            temperture = weatherData.temp;
            displayWeather(weatherData, level);
            break;
    }
}

function displayWeather(data, level) {
    const generatedWeatherElement = document.getElementById('generatedCity');
    const cityNameElement = document.getElementById('cityName');
    const descriptionElement = document.getElementById('description');
    const iconElement = document.getElementById('icon');

    generatedWeatherElement.style.display = 'block';
    document.getElementById('help').style.display = 'none';
    document.getElementById('guessButton').disabled = false;
    document.getElementById('helpButton').disabled = false;
    document.getElementById('guessInput').value = '';

    switch (level) {
        case 'easy':
            cityNameElement.style.display = 'block';
            descriptionElement.style.display = 'block';
            iconElement.style.display = 'block';

            cityNameElement.textContent = data.name;
            descriptionElement.textContent = data.weather;
            iconElement.innerHTML = `<img src="http://openweathermap.org/img/w/${data.icon}.png" alt="Weather Icon" width="150px">`;
            break;
        case 'medium':
            cityNameElement.style.display = 'block';
            descriptionElement.style.display = 'none';
            iconElement.style.display = 'block';

            cityNameElement.textContent = data.name;
            iconElement.innerHTML = `<img src="http://openweathermap.org/img/w/${data.icon}.png" alt="Weather Icon" width="150px">`;
            break;
        case 'hard':
            cityNameElement.style.display = 'block';
            descriptionElement.style.display = 'none';
            iconElement.style.display = 'none';

            cityNameElement.textContent = data.name;
            break;
        default:
            break;
    }
}

function win() {
    const shortUnit = document.getElementById('unitSelect').value === 'metric' ? '°C' : '°F';
    document.getElementById('help').style.display = 'none';
    document.getElementById('helpButton').disabled = true;
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').innerHTML = `
        <p class="win blink">Pravilno! Temperatura je ${parseInt(temperture)}${shortUnit}</p>
        <button class="btn btn-primary" onclick="location.reload()">Nova igra</button>
    `;
}

function lose() {
    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block';
    resultElement.innerHTML = `
        <p class="lose blink">Napačno! Klikni na gumb pomoč ali ugibaj ponovno!</p>
    `;
}

function guess() {
    document.getElementById('helpButton').disabled = false;
    const userGuess = document.getElementById('guessInput').value;
    if (userGuess === '') {
        alert('Vnesite temperaturo');
        return;
    }

    if (userGuess == parseInt(temperture)) {
        win();
    } else if (userGuess > parseInt(temperture)) {
        lose();
        imageHelp.src = 'slike/dol.png';
    } else if (userGuess < parseInt(temperture)) {
        lose();
        imageHelp.src = 'slike/gor.png';
    }
}

function help() {
    const userGuess = document.getElementById('guessInput').value;
    const helpElement = document.getElementById('help');
    const imageHelp = document.getElementById('imageHelp');

    if (userGuess === '') {
        alert('Vnesite temperaturo');
        return;
    }

    helpElement.style.display = 'inline';
    if (userGuess > parseInt(temperture)) {
        imageHelp.src = 'slike/dol.png';
    } else if (userGuess < parseInt(temperture)) {
        imageHelp.src = 'slike/gor.png';
    } else if (userGuess == parseInt(temperture)) {
        win();
    }
}

