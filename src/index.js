function refreshweather(response){
    let temperatureElement= document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let forecastElement = document.querySelector("#forecast");
    let detailsElement = document.querySelector("#details");
    let windspeedElement = document.querySelector("#windspeed");
    let timeElement = document.querySelector("#time");
    let date = new Date (response.data.time * 1000);
    let iconElement =document.querySelector("#icon");
console.log(response.data.condition.icon_url);

    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" /> `;
    forecastElement.innerHTML = response.data.condition.description;
    temperatureElement.innerHTML = Math.round(temperature);
    detailsElement.innerHTML = response.data.temperature.humidity;
    windspeedElement.innerHTML = response.data.wind.speed;
    timeElement.innerHTML = formatdate(date);

}
function formatdate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day = days[date.getDay()];
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`
    
}
function searchCity(city) {
   let apiKey = "t747cb5b53edd3a43fa908f29cfeo25a"
   let apiurl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
   axios.get(apiurl).then(refreshweather);

}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector ("#search-text-input");
   let cityElement= document.querySelector("#city");
    cityElement.innerHTML= searchInput.value;
    searchCity(searchInput.value);
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);

searchCity("pretoria");

