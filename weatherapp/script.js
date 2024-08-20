
const weatherForm = document.getElementById('weatherForm');
const weatherInfo = document.getElementById('weatherInfo');

const apiKey = 'excLvcVfwzlXWp28XRSJqwi2xwBRX6GI';
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json'
    }
};


function getWeather(location) {
    const apiUrl = `https://api.tomorrow.io/v4/weather/realtime?location=${location}&apikey=${apiKey}`;

    fetch(apiUrl, options)
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.values) {
                const weatherData = data.data.values;
                const temperature = weatherData.temperature.toFixed(1);
                const humidity = weatherData.humidity;
                const description = `Cloud Cover: ${weatherData.cloudCover}%`;
                displayWeather(location, temperature, humidity, description);
            } else {
                weatherInfo.innerHTML = `<p>Weather data not available. Please try again.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
        });
}


function displayWeather(location, temperature, humidity, description) {
    weatherInfo.innerHTML = `
        <div><strong>Location:</strong> ${location}</div>
        <div>Temperature: ${temperature}°C</div>
        <div>Humidity: ${humidity}%</div>
        <div>${description}</div>
    `;
}


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.getElementById('locationInput').value;
    getWeather(location);
});
