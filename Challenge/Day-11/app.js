const api = {
    key: "ddaa6157db2a32fc903901aa575cb4fe",
    base: "https://api.openweathermap.org/data/2.5/",
    lang: "pt_br",
    city: "Niterói",
    units: "metric"
}


// Start project with data
function search() {
    fetch(`${api.base}weather?q=${api.city}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            console.log(error.message)
        })
        .then(response => {
            displayResults(response)
        });
}
search()


// Geo Location
    if ("geolocation" in navigator){
        window.addEventListener('load', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(setPosition);
            }
            function setPosition(position) {
                let lat = position.coords.latitude;
                let long = position.coords.longitude;
                coordResults(lat, long);
            }
        })
    }

function coordResults(lat, long) {
    fetch(`${api.base}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`http error: status ${response.status}`)
            }
            return response.json();
        })
        .catch(error => {
            alert(error.message)
        })
        .then(response => {
            displayResults(response)
        });
} // End Geo Location

// display the results
function displayResults(weather) {

    // Infos
    const city = document.querySelector('.city');
    const date = document.querySelector('.date');
    const temp_number = document.querySelector('.temperature');
    const temp_max = document.querySelector('.temMax');
    const temp_min = document.querySelector('.tempMin');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.Humidity');
    const description = document.querySelector('.description')  

    let infoCity = weather.name;
    city.innerText = infoCity;

    let descriptionInfo = weather.weather[0].description;
    description.innerText = capitalizeFirstLetter(descriptionInfo);

    let now = new Date();
    date.innerText = dateBuilder(now);

    let temperature = `${Math.round(weather.main.temp)}`;
    temp_number.innerHTML = `${temperature} °c`;

    let temperature_Max = `${Math.round(weather.main.temp_max)}`;
    temp_max.innerHTML = `${temperature_Max} °c`;

    let temperature_Min = `${Math.round(weather.main.temp_min)}`;
    temp_min.innerHTML = `${temperature_Min} °c`;

    let infoWind = weather.wind.speed;
    wind.innerHTML = `${(infoWind * 3.6).toFixed(1)} km/h`;

    let infoHumidity = weather.main.humidity;
    humidity.innerHTML = `${infoHumidity}%`;

    // day or night colors
    let moon = document.querySelector('.moon');
    let sun = document.querySelector('.sun');
    let frame = document.querySelector('.frame');
    let cloudBg = document.querySelectorAll('.cloud-bg');
    let hillBack = document.querySelectorAll('.hill-bg-color');
    let hillFront = document.querySelectorAll('.hill-fg-color');

    let hours = now.getHours();
    if(hours >= 6 && hours <= 18){
        sun.style.display = "block";
        frame.style.background = "#2EB5E5";

        cloudBg.forEach(element => {
            element.style.background = "#FFF";
        });
        
        hillBack.forEach(element => {
            element.style.background = "#378258";
        });

        hillFront.forEach(element => {
            element.style.background = "#229756";
        });
    } else {
        moon.style.display = "block";
    }

    // animation events weather status
    const rain = document.querySelector('.rainNone');
    const clound = document.querySelector('.cloundNone');
    const thunder = document.querySelector('.thunderNone');

    let animation = weather.weather[0].main;
    if(animation == "Rain" || animation == "Drizzle"){
        rain.classList.remove('rainNone');
        clound.classList.remove('cloundNone');
    } else if (animation == "Clouds"){
        clound.classList.remove('cloundNone');
    } else if (animation == "Thunderstorm"){
        rain.classList.remove('rainNone');
        clound.classList.remove('cloundNone');
        thunder.classList.remove('thunderNone');
    } else {
        return;
    }

}

// format the date
function dateBuilder(d) {

    let MyDateString = ('0' + d.getDate()).slice(-2) + '/' + ('0' + (d.getMonth() + 1)).slice(-2) + '/' + d.getFullYear();

    return MyDateString;
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}