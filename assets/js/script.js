// API Key: 4856cb3ea44c997053a0da94c20cc9f2
// API Call: api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// Geocoder Call - http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// Current - https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

// Dynamically creates State Code list
    var optionsList = [
        "AL",
        "AK",
        "AZ",
        "AR",
        "CA",
        "CO",
        "CT",
        "DE",
        "DC",
        "FL",
        "GA",
        "HI",
        "ID",
        "IL",
        "IN",
        "IA",
        "KS",
        "KY",
        "LA",
        "ME",
        "MD",
        "MA",
        "MI",
        "MN",
        "MS",
        "MO",
        "MT",
        "NE",
        "NV",
        "NH",
        "NJ",
        "NM",
        "NY",
        "NC",
        "ND",
        "OH",
        "OK",
        "OR",
        "PA",
        "RI",
        "SC",
        "SD",
        "TN",
        "TX",
        "UT",
        "VT",
        "VA",
        "WA",
        "WV",
        "WI",
        "WY"
    ];

    var selectTag = document.createElement("select");
    selectTag.id = "state-code"

    for (let opt of optionsList) {
        let optEle = document.createElement("option");
        optEle.text = opt;
        selectTag.add(optEle);
    }

    var div = document.getElementById("state-code-container");
    div.appendChild(selectTag);
// End of State Codes

const apiKey = "4856cb3ea44c997053a0da94c20cc9f2"
const searchButton = document.querySelector('.city-search')

const callFiveDayApi = function() {
    const searchField = document.getElementById('city-input').value
    //console.log(searchField)
    const stateCode = document.getElementById('state-code').value
    //console.log(stateCode)

    const geoCall = `http://api.openweathermap.org/geo/1.0/direct?q=${searchField},${stateCode},USA&limit=1&appid=${apiKey}`

    fetch(geoCall)
        .then(function(res) {
            return res.json()
        })
        .then(function(data) {
            console.log(data)

            const lat = data[0].lat
            const long = data[0].lon
            //console.log(lat, long)

            const weatherCall = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`

            return fetch(weatherCall)
        })
        .then(function(res) {
            return res.json()
        })
        .then(function(data) {
            console.log(data)

            const fiveDayBoxes = document.getElementsByClassName('5-day')
            
            //console.log(fiveDayBoxes)
            for (let i = 0; i < fiveDayBoxes.length; i++) {
                if (i === 0) {
                    // Clears content
                    while (fiveDayBoxes[i].firstChild) {
                        fiveDayBoxes[i].removeChild(fiveDayBoxes[i].lastChild);
                    }
                    // Date
                    let dateEle = document.createElement('p');
                    dateEle.textContent = data.list[i].dt_txt;
                    fiveDayBoxes[i].appendChild(dateEle);
                    // Temp
                    let tempEle = document.createElement('p');
                    tempEle.textContent = Math.round(data.list[i].main.temp);
                    fiveDayBoxes[i].appendChild(tempEle);
                    // Wind Speed
                    let windEle = document.createElement('p');
                    windEle.textContent = Math.round(data.list[i].wind.speed);
                    fiveDayBoxes[i].appendChild(windEle);
                    // Humidity
                    let humidEle = document.createElement('p');
                    humidEle.textContent = Math.round(data.list[i].main.humidity);
                    fiveDayBoxes[i].appendChild(humidEle);
                    // Icon
                    let iconEle = document.createElement('img');
                    iconEle.setAttribute('src', "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                    fiveDayBoxes[i].appendChild(iconEle);

                } else {
                    // Clears content
                    while (fiveDayBoxes[i].firstChild) {
                        fiveDayBoxes[i].removeChild(fiveDayBoxes[i].lastChild);
                    }
                    //Date
                    let dateEle = document.createElement('p');
                    dateEle.textContent = data.list[i*8].dt_txt;
                    fiveDayBoxes[i].appendChild(dateEle);
                    // Temp
                    let tempEle = document.createElement('p');
                    tempEle.textContent = Math.round(data.list[i*8].main.temp);
                    fiveDayBoxes[i].appendChild(tempEle);
                    // Wind Speed
                    let windEle = document.createElement('p');
                    windEle.textContent = Math.round(data.list[i*8].wind.speed);
                    fiveDayBoxes[i].appendChild(windEle);
                    // Humidity
                    let humidEle = document.createElement('p');
                    humidEle.textContent = Math.round(data.list[i*8].main.humidity);
                    fiveDayBoxes[i].appendChild(humidEle);
                    // Icon
                    let iconEle = document.createElement('img');
                    iconEle.setAttribute('src', "https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png")
                    fiveDayBoxes[i].appendChild(iconEle);
                    
                }
            }
        })
}

const todayApi = function() {
    const searchField = document.getElementById('city-input').value
    const stateCode = document.getElementById('state-code').value

    const geoCall = `http://api.openweathermap.org/geo/1.0/direct?q=${searchField},${stateCode},USA&limit=1&appid=${apiKey}`

    document.getElementById('city-input').value = ''

    fetch(geoCall)
        .then(function(res) {
            return res.json()
        })
        .then(function(data) {
            console.log(data)

            const lat = data[0].lat
            const long = data[0].lon
            //console.log(lat, long)

            const weatherCall = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`

            return fetch(weatherCall)
        })
        .then(function(res) {
            return res.json()
        })
        .then(function(data) {
            console.log(data)

            const cityName = document.getElementById('city-name')
            cityName.textContent = data.name

            const currentDate = document.getElementById('current-date')
            currentDate.textContent = data.dt

            const humidity = document.getElementById('humidity')
            humidity.textContent = Math.round(data.main.humidity)

            const windSpeed = document.getElementById('wind-speed')
            windSpeed.textContent = Math.round(data.wind.speed)

            const temp = document.getElementById('temp')
            temp.textContent = Math.round(data.main.temp)

            const icon = document.getElementById('icon')
            icon.setAttribute('src', "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png") 
        })
}

const finalApiCall = function() {
    callFiveDayApi()
    todayApi()
}

searchButton.addEventListener('click', finalApiCall)