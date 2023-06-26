requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?';
var inputCity = document.querySelector('#userCity');
var currentWeather = document.querySelector('.card');
var Submit = document.querySelector('#submitBtn');
var listsearch = document.querySelector('.recentlySearched');
var cname = document.querySelector('.cityName');
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

        currentWeather.textContent = '';
        inputCity.value = '';
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

                    .then(function (data) {
                        console.log(data);
                        var today = data.list[0];
                        var todayDate = dayjs.unix(today.dt).format("M/D/YYYY");
                        cname.setAttribute("value", data.city.name);
                        console.log(todayDate);
                        console.log(today);
                        for (var i = 7; i < data.list.length; i += 8) {
                            var day = data.list[i]
                            var fiveDate = dayjs.unix(day.dt).format("M/D/YYYY");
                            console.log(fiveDate);
                            console.log(day);
                        };
                    });
            } else {
                alert('Error: ' + response.statusText);
            }
        });
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
            eachSearch.addEventListener("click", function(event){
                var city = event.target.innerText;
                getUserCity(city);
            })
            listsearch.appendChild(eachSearch);
        };
    }
};
getRecentSearch();
Submit.addEventListener('click', submitcity);
