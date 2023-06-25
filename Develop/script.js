requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=';
var inputCity = document.querySelector('#userCity');
var currentWeather = document.querySelector('.card');
var Submit = document.querySelector('#submitBtn');
var listsearch = document.querySelector('.recentlySearched');
var cityforStoring = '';
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
var getSaved = JSON.stringify(usercity);
localStorage.setItem("City searched: ", getSaved);
getRecentSearch();
    } else {
      alert('Please enter a City');
    }
  };

  var getUserCity = function (city) {
    var apiUrl = requestUrl + city + '&appid=5047f7b10a087045ce4a8642196cccd4';
    fetch(apiUrl)
    .then(function (response) {
      if (response.status === 200) {
        console.log(response);
        return response.json()
        
        .then(function (data) {
          console.log(data);
          console.log(data.city.coord.lat);
          console.log(data.city.coord.lon);
          //displayCity(data, city);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    });
};

function getRecentSearch() {
        
    var citystore = localStorage.getItem("City searched: ");
    var cityArray;
    if (citystore === null) {
        cityArray= [];
    }
    else {
        cityArray = JSON.parse(citystore)
        for(i=0; i<cityArray.length; i++) {
            var eachSearch = document.createElement("li");
            
            eachSearch.innerText = cityArray;
            listsearch.appendChild(eachSearch);
        };
    }
};
getRecentSearch();
  Submit.addEventListener('click', submitcity);
