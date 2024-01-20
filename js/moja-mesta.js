myCities = JSON.parse(localStorage.getItem('myCities')) || [];

window.addEventListener('load', () => {
    if (myCities.length === 0) {
        document.getElementById('clearAll').style.display = 'none';
        document.getElementById('niMest').style.display = 'block';
    } else {
        document.getElementById('clearAll').style.display = 'block';
        document.getElementById('niMest').style.display = 'none';

        const myCitiesElement = document.getElementById('mojaMesta');
        myCities.forEach(async (city) => {
            const weatherData = await getWeather(city);
            const cityElement = document.createElement('div');
            
            cityElement.textContent = `${weatherData.name} ${weatherData.temp}`;
            cityElement.innerHTML += `<img src="http://openweathermap.org/img/w/${weatherData.icon}.png" alt="Ikona vreme" width="50px" class="ms-4">`;
            cityElement.innerHTML += `<button class="ms-4 btn btn-secondary" onclick="clearCity('${weatherData.name}')">Odstrani mesto</button>`;
    
            myCitiesElement.appendChild(cityElement);
        });
    }
});

function clearCities() {
    localStorage.clear();
    location.reload();
}

function clearCity(city) {
    myCities = myCities.filter((item) => item !== city);
    localStorage.setItem('myCities', JSON.stringify(myCities));
    location.reload();
}