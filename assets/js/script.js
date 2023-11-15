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

// Search History
const searchHistory = document.getElementById("history-select");
let searchArray = [];
console.log(searchArray)

const searchFill = function() {
    if (JSON.parse(localStorage.getItem("searchArray")) !== null) {
        searchArray = JSON.parse(localStorage.getItem("searchArray"));
    }

    searchHistory.innerHTML = "";

    searchArray.forEach((search) => {
        const option = document.createElement('option');
        option.textContent = search;
        searchHistory.appendChild(option);
    });
}
// End of Search History

const apiKey = "4856cb3ea44c997053a0da94c20cc9f2"
const searchButton = document.querySelector('.city-search')

const callFiveDayApi = function() {
    const searchField = document.getElementById('city-input').value
    if (!searchArray.includes(searchField)) {
        searchArray.push(searchField);
    }
    localStorage.setItem('searchArray', JSON.stringify(searchArray))
    //console.log(searchField)
    const stateCode = document.getElementById('state-code').value
    //console.log(stateCode)

    const geoCall = `https://api.openweathermap.org/geo/1.0/direct?q=${searchField},${stateCode},USA&limit=1&appid=${apiKey}`

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
                    const timestamp = data.list[i].dt
                    const date = new Date(timestamp*1000)
                    dateEle.textContent = `${date.getMonth()}/${date.getDate()}`;
                    fiveDayBoxes[i].appendChild(dateEle);
                    // Temp
                    let tempEle = document.createElement('p');
                    tempEle.textContent = `${Math.round(data.list[i].main.temp)} Degrees`;
                    fiveDayBoxes[i].appendChild(tempEle);
                    // Wind Speed
                    let windEle = document.createElement('p');
                    windEle.textContent = `${Math.round(data.list[i].wind.speed)} mph`;
                    fiveDayBoxes[i].appendChild(windEle);
                    // Humidity
                    let humidEle = document.createElement('p');
                    humidEle.textContent = `${Math.round(data.list[i].main.humidity)}%`;
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
                    const timestamp = data.list[i*8].dt
                    const date = new Date(timestamp*1000)
                    dateEle.textContent = `${date.getMonth()}/${date.getDate()}`;
                    fiveDayBoxes[i].appendChild(dateEle);
                    // Temp
                    let tempEle = document.createElement('p');
                    tempEle.textContent = `${Math.round(data.list[i*8].main.temp)} Degrees`;
                    fiveDayBoxes[i].appendChild(tempEle);
                    // Wind Speed
                    let windEle = document.createElement('p');
                    windEle.textContent = `${Math.round(data.list[i*8].wind.speed)} mph`;
                    fiveDayBoxes[i].appendChild(windEle);
                    // Humidity
                    let humidEle = document.createElement('p');
                    humidEle.textContent = `${Math.round(data.list[i*8].main.humidity)}%`;
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

    const geoCall = `https://api.openweathermap.org/geo/1.0/direct?q=${searchField},${stateCode},USA&limit=1&appid=${apiKey}`

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
            const timestamp = data.dt
            const date = new Date(timestamp*1000)
            currentDate.textContent = `${date.getMonth()}/${date.getDate()}`

            const humidity = document.getElementById('humidity')
            humidity.textContent = Math.round(data.main.humidity)

            const windSpeed = document.getElementById('wind-speed')
            windSpeed.textContent = `${Math.round(data.wind.speed)} mph`

            const temp = document.getElementById('temp')
            temp.textContent = `${Math.round(data.main.temp)} Degrees`

            const icon = document.getElementById('icon')
            icon.setAttribute('src', "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png") 
        })
}

searchFill()

const finalApiCall = function() {
    callFiveDayApi()
    todayApi()
    searchFill()
}

searchButton.addEventListener('click', finalApiCall)
searchHistory.addEventListener('change', function () {
    document.getElementById('city-input').value = searchHistory.value
});