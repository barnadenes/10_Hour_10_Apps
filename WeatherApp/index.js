const placeEl = document.querySelector('.place');
const temperatureEl = document.querySelector('.temperature');
const weatherEl = document.querySelector('.weather');
const searchEl = document.querySelector('.search');
const apikey = "3265874a2c77ae4a04bb96236a642d2f";

const url = (city) =>
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeather(place) {
    const response = await fetch(url(place), {
        origin: "cors"
    });
    const resp = await response.json();
    console.log(resp);
    addToPage(resp);
}

function addToPage(resp) {    
    placeEl.textContent = searchEl.value;
    temperatureEl.textContent = getCelsius(resp.main.temp) + "C°";
    weatherEl.textContent = resp.weather[0].description;
}

function getCelsius(kelvin) {

    return (kelvin - 273.15).toFixed(1);
}

searchEl.addEventListener('keypress', (e) => {

    if(e.key == 'Enter') {
        const place = searchEl.value;
        if(place){
            getWeather(place);
        }
    }
})