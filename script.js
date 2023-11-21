let search = document.querySelector("#search")
let wind_speed = document.querySelector('#wind')
let temprature = document.querySelector('#temp')
let humidity = document.querySelector('#humidity')
let locationInput = document.querySelector("#location")
let cloud = document.querySelector('#cloud')
let Error_prompt = document.querySelector('#ERROR')
let City = document.querySelector('#city')
let your_location = document.querySelector('#your_location')
let data = document.querySelector('#data')

//186a9e5c9550b150104da99fc4bf6b06
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

async function checkWeather(city){
    const api_key = "186a9e5c9550b150104da99fc4bf6b06";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
    const weather_data = await fetch(`${url}`).then(responce=>responce.json());
    if(weather_data.cod===`400`)
    {
        Error_prompt.textContent = "Location is not Valid"
        Error_prompt.style.cssText = "color:white"
        data.style.cssText = "visibility:hidden"
        return;
    }
    else if(weather_data.cod===`404`)
    {
        Error_prompt.textContent = "Location is not Valid"
        Error_prompt.style.cssText = "color:white"
        data.style.cssText = "visibility:hidden"
        return;
    }
    else
    {
        console.log(weather_data)
        data.style.cssText = "visibility:visible"  
        Error_prompt.style.cssText = "visibility:hidden" 
        temprature.textContent = Math.floor(weather_data.main.temp - 273)+`°C`;
        cloud.textContent = weather_data.weather[0].main;
        City.textContent = weather_data.name;
        humidity.textContent = weather_data.main.humidity
        wind_speed.textContent = weather_data.wind.speed +"mph"
        // wind.textContent = 
    }
        
    console.log(weather_data)
   // humidity.textContent = weather_data.weather[0].main
}

async function defaultWeather(latitude,longitude)
{
    const url = `http://api.weatherapi.com/v1/current.json?key=d4327b442bd74e8185b45518232111&q=${latitude},${longitude}&aqi=yes`;
    let w_data = fetch(url).then(responce=>responce.json())
    console.log(w_data)
    return w_data

}

async function gotLocation(position){
    
    let weatherdata = await defaultWeather(position.coords.latitude,position.coords.longitude)
    locationInput.value=""
    data.style.cssText = "visibility:visible"  
    Error_prompt.style.cssText = "visibility:hidden" 
    temprature.textContent = weatherdata.current.temp_c+`°C`;
    cloud.textContent = weatherdata.current.condition.text;
    City.textContent = weatherdata.location.name;
    humidity.textContent = weatherdata.current.humidity
    wind_speed.textContent = weatherdata.current.wind_mph +"mph"
    
    
}

function failedLocation(){
    locationInput.value=""
    Error_prompt.textContent = "Location is not Valid"
    Error_prompt.style.cssText = "color:white"
    data.style.cssText = "visibility:hidden"
}

your_location.addEventListener('click',()=>{
    const weatherLocation = navigator.geolocation.getCurrentPosition(gotLocation,failedLocation)
})

search.addEventListener('click',()=>{
    checkWeather(locationInput.value)
})
