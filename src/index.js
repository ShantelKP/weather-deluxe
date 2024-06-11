function refreshWeather(response){
    let temperatureElement= document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let forecastElement = document.querySelector("#forecast");
    let detailsElement = document.querySelector("#details");
    let windspeedElement = document.querySelector("#windspeed");
    let timeElement = document.querySelector("#time");
    let date = new Date (response.data.time * 1000);
    let iconElement =document.querySelector("#icon");


    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" /> `;
    forecastElement.innerHTML = response.data.condition.description;
    temperatureElement.innerHTML = Math.round(temperature);
    detailsElement.innerHTML = response.data.temperature.humidity;
    windspeedElement.innerHTML = response.data.wind.speed;
    timeElement.innerHTML = formatdate(date);

    getForecast(response.data.city);

}
function formatdate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    let day = days[date.getDay()];
    if (minutes < 10) {
    minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`
    
}
function searchCity (city) {
    let apiKey ="t747cb5b53edd3a43fa908f29cfeo25a";
    let apiUrl= `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`
    axios.get(apiUrl).then(refreshWeather);
    
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector ("#search-text-input");
   let cityElement= document.querySelector("#city");
    cityElement.innerHTML= searchInput.value;
    searchCity(searchInput.value);
}
let searchFormElement= document.querySelector("#search-form");
searchFormElement.addEventListener("submit",handleSearchSubmit);
searchCity("pretoria");

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    return days [date.getDay()];
}

function getForecast(city) {
    let apiKey = "t747cb5b53edd3a43fa908f29cfeo25a";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`
      axios(apiUrl).then(displayForecast);
}


function displayForecast(response) {
console.log(response.data);




    let forecast= document.querySelector ("#forecasts");


    
    let forecastHtml = "";

     response.data.daily.forEach(function(day, index){
        if (index < 4){
        forecastHtml =
        forecastHtml +`
        <div class="weather-forecast-temperature-icon"><img src ="${day.condition.icon_url}" /> </div>
       <div> <div class="weather-forecast" id="weather-forecast">
            <strong class="weather-forecast-date">${formatDay(day.time)}</strong>
            <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
            </div>
        </div>
        </div>
        `;
        }
    });

        forecast.innerHTML= forecastHtml
     }

   


       