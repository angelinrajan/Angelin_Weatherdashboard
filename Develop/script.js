requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
var inputCity = document.querySelector('#userCity');
var currentWeather = document.querySelector('.card');
var Submit = document.querySelector('#submitBtn');
var listsearch = document.querySelector('.recentlySearched');
var cname = document.querySelector('.cityNameDate');
var ctemp = document.querySelector('.cityTemp');
var cwind = document.querySelector('.cityWind');
var imgIcon = document.querySelector('.icon');
var todayBlock = document.querySelector('.card');
var chumidity = document.querySelector('.cityHumidity');
var fiveDayInfo = document.querySelector('.fiveDayblock');
var fiveBlock = document.querySelector('.five');
var cityforStoring = '';
var cityCoord;
/*
fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });
*/
//http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API key}



var submitcity = function (event) {
    event.preventDefault();
    console.log("Hello");
    var usercity = inputCity.value.trim();

    if (usercity) {
        getUserCity(usercity);
        clearBox(fiveDayInfo)
        //currentWeather.textContent = '';
        //inputCity.value = '';
        console.log(usercity);

        var storage = JSON.parse(localStorage.getItem("cities")) || [];
        storage.push(usercity)
        localStorage.setItem("cities", JSON.stringify(storage));
        getRecentSearch();
    } else {
        alert('Please enter a City');
    }
};


var getUserCity = function (city) {
    var apiUrl = requestUrl + 'q=' + city + '&appid=5047f7b10a087045ce4a8642196cccd4&units=imperial';
    fetch(apiUrl)
        .then(function (response) {
            if (response.status === 200) {
                console.log(response);
                return response.json()

                    .then(function (olddata) {
                        console.log(olddata);
                    //console.log(data.city.coord.lat)
                    var latitide = olddata.city.coord.lat;
                    var longitude = olddata.city.coord.lon;
                    

                   var newUrl = requestUrl + "lat=" + latitide + "&lon=" + longitude + "&appid=5047f7b10a087045ce4a8642196cccd4&units=imperial"
                    fetch(newUrl)
                    .then(function (response) {
                        if (response.status === 200) {
                            console.log(response);
                            return response.json()

                            .then(function (data) {
                                console.log(data);
                                todayBlock.style.visibility = 'visible'
                                fiveBlock.style.visibility = 'visible'
                                var today = data.list[0];
                                var todayDate = dayjs.unix(today.dt).format("M/D/YYYY");
                                var cityn = data.city.name;
                                cname.textContent = cityn + ":  " + todayDate;
                                console.log(cname)
                                var tempc = data.list[0].main.temp;
                                ctemp.textContent = "Temp : " + tempc + " °F";
                                console.log(ctemp)
                                var windc = data.list[0].wind.speed;
                                cwind.textContent = "Wind : " + windc + " MPH";
                                console.log(cwind)
                                var humidityc = data.list[0].main.humidity;
                                chumidity.textContent = "Humidity : " + humidityc + " %";
                                console.log(chumidity)
                                var todayIcon = data.list[0].weather[0].icon
                                imgIcon.src = "https://openweathermap.org/img/wn/" + todayIcon + ".png";
                                console.log(imgIcon)
                                //cdate.textContent = todayDate;
                                console.log(todayDate);
                                console.log(today);
                                for (var i = 7; i < data.list.length; i += 8) {
                                    var day = data.list[i]
                                    var fiveDate = dayjs.unix(day.dt).format("M/D/YYYY");
                                    console.log(fiveDate);
                                    console.log(day);
        
                                    var daySelection = document.createElement("div");
                                    daySelection.setAttribute("class", "daysInfo");
                                    var dateSection = document.createElement("h3");
                                    var iconSection = document.createElement("img")
                                    var temperatureSection = document.createElement("p")
                                    var windSection = document.createElement("p")
                                    var humiditySection = document.createElement("p")
        
                                    dateSection.textContent = fiveDate;
                                    iconSection.src = "https://openweathermap.org/img/wn/" + day.weather[0].icon + ".png";
                                    temperatureSection.textContent = "Temp : " + day.main.temp + " °F";
                                    windSection.textContent = "Wind : " + day.wind.speed + " MPH";
                                    humiditySection.textContent = "Humidity : " + day.main.humidity + " %";
        
                                    daySelection.appendChild(dateSection);
                                    daySelection.appendChild(iconSection);
                                    daySelection.appendChild(temperatureSection);
                                    daySelection.appendChild(windSection);
                                    daySelection.appendChild(humiditySection);
                                    console.log(daySelection.innerText)
                                    fiveDayInfo.appendChild(daySelection);
                                };
                                console.log(fiveDate)
                            });
                        } else {
                            alert('Error: ' + response.statusText);
                        }
                            });
                            })
                        } else {
                            alert('Could not find city name, please enter another city')
                        }
                    })
                };

function getRecentSearch() {

    var citystore = JSON.parse(localStorage.getItem("cities"));
    if (citystore === null) {
        citystore = [];
    }
    else {

        console.log(citystore);
        listsearch.innerHTML = "";
        for (i = 0; i < citystore.length; i++) {
            var eachSearch = document.createElement("button");

            eachSearch.innerText = citystore[i];
            eachSearch.setAttribute("class", "btnCity");
            eachSearch.addEventListener("click", function (event) {
                clearBox(fiveDayInfo)
                var city = event.target.innerText;
                getUserCity(city);
            })
            listsearch.appendChild(eachSearch);
        };
    }
};
function clearBox(fiveDayInfo) {
    fiveDayInfo.innerText="";
}
getRecentSearch();
Submit.addEventListener('click', submitcity);
