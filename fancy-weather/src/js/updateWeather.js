/* eslint-disable no-undef */
const searchButton = document.querySelector('.searchButton');
const keyWord = document.querySelector('.keyWord');
const Skycons = require('../../node_modules/skycons/skycons')(window);


searchButton.addEventListener("click", function s() {
  const celsius = document.querySelector('.celsius');

  function searchWord() {
    return keyWord.value.split(' ').join('-').trim();
  }
  
  const value = searchWord();
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${value}&key=be1c3f93d8bb439cb2c898167c6967be&pretty=1&no_annotations=1`;

  fetch(url)
  .then(res => res.json())
  .then(data => {
    const lat = data.results[0].geometry.lat;
    const long = data.results[0].geometry.lng;

    document.querySelector('.searchButton').textContent = 'Search';
    // eslint-disable-next-line no-undef
    const mapboxgl = require('mapbox-gl');

    function success() {
      mapboxgl.accessToken = 'pk.eyJ1IjoieXVsaWFndXNoY2hhIiwiYSI6ImNrM3l6eXFxcTBxazUzZ3A2eGFheDh2dDMifQ.CkbN64r5oWl8yDnK7pNhfQ';
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [`${long}`, `${lat}`],
        zoom: 12
      });

      return map;
    }
    navigator.geolocation.getCurrentPosition(success);

    const degr = Math.trunc(`${lat}`);
    const min = Math.ceil((`${lat}` % Math.trunc(`${lat}`)) * 60);
    const newGeo =  `${degr}°${min}'`;
    document.querySelector('.latitude').textContent = `Latitude: ${newGeo}`;

    const degr2 = Math.trunc(`${long}`);
    const min2 = Math.ceil((`${long}` % Math.trunc(`${long}`)) * 60);
    const newGeo2 =  `${degr2}°${min2}'`;
    document.querySelector('.longitude').textContent = `Longitude: ${newGeo2}`;
    
    const urlCity = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/22fa3da0269ba82ddef2cb6e295cc40d/${lat},${long}`;

    fetch(urlCity, {
      method: 'GET'
    }).then(function(response) {
      response.json().then(function(data) {
        
        const humid = Math.ceil(data.currently.humidity * 100);
        const summary = data.currently.summary;
        const windSpeed = data.currently.windSpeed;

        let feelsLike, temp, tempFirstDay, tempSecondDay, tempThirdDay;

        if (celsius.classList.contains('active')) {
          feelsLike = Math.ceil((data.currently.apparentTemperature - 32) * 5 / 9);
          temp = Math.ceil((data.currently.temperature - 32) * 5 / 9);
          tempFirstDay = Math.ceil((((data.daily.data[0].temperatureMax + data.daily.data[0].temperatureMin) / 2) - 32) * 5 / 9);
          tempSecondDay = Math.ceil((((data.daily.data[1].temperatureMax + data.daily.data[1].temperatureMin) / 2) - 32) * 5 / 9);
          tempThirdDay = Math.ceil((((data.daily.data[2].temperatureMax + data.daily.data[2].temperatureMin) / 2) - 32) * 5 / 9);
        } else {
          feelsLike = Math.ceil(data.currently.apparentTemperature);
          temp = Math.ceil(data.currently.temperature);
          tempFirstDay = Math.ceil((data.daily.data[0].temperatureMax + data.daily.data[0].temperatureMin) / 2);
          tempSecondDay = Math.ceil((data.daily.data[1].temperatureMax + data.daily.data[1].temperatureMin) / 2);
          tempThirdDay = Math.ceil((data.daily.data[2].temperatureMax + data.daily.data[2].temperatureMin) / 2);
        }

        localStorage.setItem("temperature", temp);
        document.querySelector('.temp').textContent = `${temp}°`;
        document.querySelector('.humidity').textContent = `Humidity: ${humid}%`;
        document.querySelector('.overcast').textContent = `${summary}`;
        document.querySelector('.feelsLike').textContent = `Feels like: ${feelsLike}°`;
        document.querySelector('.wind').textContent = `Wind: ${windSpeed} m/s`;

        document.querySelector('.tempFirstDay .tempDay').textContent = `${tempFirstDay}°`;
        document.querySelector('.tempSecondDay .tempDay').textContent = `${tempSecondDay}°`;
        document.querySelector('.tempThirdDay .tempDay').textContent = `${tempThirdDay}°`;

        const iconFirst = data.daily.data[0].icon;
        const iconSecond = data.daily.data[1].icon;
        const iconThird = data.daily.data[2].icon;
        const iconCurrent = data.currently.icon;

        const tempFirstDayIcon = document.querySelector('#tempFirstDay');
          const tempSecondDayIcon = document.querySelector('#tempSecondDay');
          const tempThirdDayIcon = document.querySelector('#tempThirdDay');
          const tempCurrentDayIcon = document.querySelector('#iconClouds');
          
          let skycons = new Skycons({"color": "steelblue"}, {"resizeClear": true});
          skycons.add(tempFirstDayIcon, `${iconFirst}`);
          skycons.add(tempSecondDayIcon, `${iconSecond}`);
          skycons.add(tempThirdDayIcon, `${iconThird}`);
          skycons.add(tempCurrentDayIcon, `${iconCurrent}`);

        skycons.play();
      });
    })
  })
});

document.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    if (keyWord.value.length === 0) {
      alert('Search field is empty');
    } else {
      if (/[A-Z]{1}[a-z' -]+/.test(keyWord.value) === false) {
        alert("City name must begin with a capital letter")
      } else { 
        const celsius = document.querySelector('.celsius');

        function searchWord() {
          return keyWord.value.split(' ').join('-').trim();
        }
        
        const value = searchWord();
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${value}&key=be1c3f93d8bb439cb2c898167c6967be&pretty=1&no_annotations=1`;

        fetch(url)
        .then(res => res.json())
        .then(data => {
          const lat = data.results[0].geometry.lat;
          const long = data.results[0].geometry.lng;

          document.querySelector('.searchButton').textContent = 'Search';
          // eslint-disable-next-line no-undef
          const mapboxgl = require('mapbox-gl');

          function success() {
            mapboxgl.accessToken = 'pk.eyJ1IjoieXVsaWFndXNoY2hhIiwiYSI6ImNrM3l6eXFxcTBxazUzZ3A2eGFheDh2dDMifQ.CkbN64r5oWl8yDnK7pNhfQ';
            const map = new mapboxgl.Map({
              container: 'map',
              style: 'mapbox://styles/mapbox/streets-v11',
              center: [`${long}`, `${lat}`],
              zoom: 12
            });

            return map;
          }
          navigator.geolocation.getCurrentPosition(success);

          const degr = Math.trunc(`${lat}`);
          const min = Math.ceil((`${lat}` % Math.trunc(`${lat}`)) * 60);
          const newGeo =  `${degr}°${min}'`;
          document.querySelector('.latitude').textContent = `Latitude: ${newGeo}`;

          const degr2 = Math.trunc(`${long}`);
          const min2 = Math.ceil((`${long}` % Math.trunc(`${long}`)) * 60);
          const newGeo2 =  `${degr2}°${min2}'`;
          document.querySelector('.longitude').textContent = `Longitude: ${newGeo2}`;
          
          const urlCity = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/22fa3da0269ba82ddef2cb6e295cc40d/${lat},${long}`;

          fetch(urlCity, {
            method: 'GET'
          }).then(function(response) {
            response.json().then(function(data) {
              
              const humid = Math.ceil(data.currently.humidity * 100);
              const summary = data.currently.summary;
              const windSpeed = data.currently.windSpeed;

              let feelsLike, temp, tempFirstDay, tempSecondDay, tempThirdDay;

              if (celsius.classList.contains('active')) {
                feelsLike = Math.ceil((data.currently.apparentTemperature - 32) * 5 / 9);
                temp = Math.ceil((data.currently.temperature - 32) * 5 / 9);
                tempFirstDay = Math.ceil((((data.daily.data[0].temperatureMax + data.daily.data[0].temperatureMin) / 2) - 32) * 5 / 9);
                tempSecondDay = Math.ceil((((data.daily.data[1].temperatureMax + data.daily.data[1].temperatureMin) / 2) - 32) * 5 / 9);
                tempThirdDay = Math.ceil((((data.daily.data[2].temperatureMax + data.daily.data[2].temperatureMin) / 2) - 32) * 5 / 9);
              } else {
                feelsLike = Math.ceil(data.currently.apparentTemperature);
                temp = Math.ceil(data.currently.temperature);
                tempFirstDay = Math.ceil((data.daily.data[0].temperatureMax + data.daily.data[0].temperatureMin) / 2);
                tempSecondDay = Math.ceil((data.daily.data[1].temperatureMax + data.daily.data[1].temperatureMin) / 2);
                tempThirdDay = Math.ceil((data.daily.data[2].temperatureMax + data.daily.data[2].temperatureMin) / 2);
              }

              localStorage.setItem("temperature", temp);
              document.querySelector('.temp').textContent = `${temp}°`;
              document.querySelector('.humidity').textContent = `Humidity: ${humid}%`;
              document.querySelector('.overcast').textContent = `${summary}`;
              document.querySelector('.feelsLike').textContent = `Feels like: ${feelsLike}°`;
              document.querySelector('.wind').textContent = `Wind: ${windSpeed} m/s`;

              document.querySelector('.tempFirstDay .tempDay').textContent = `${tempFirstDay}°`;
              document.querySelector('.tempSecondDay .tempDay').textContent = `${tempSecondDay}°`;
              document.querySelector('.tempThirdDay .tempDay').textContent = `${tempThirdDay}°`;

              const iconFirst = data.daily.data[0].icon;
              const iconSecond = data.daily.data[1].icon;
              const iconThird = data.daily.data[2].icon;
              const iconCurrent = data.currently.icon;

              const tempFirstDayIcon = document.querySelector('#tempFirstDay');
                const tempSecondDayIcon = document.querySelector('#tempSecondDay');
                const tempThirdDayIcon = document.querySelector('#tempThirdDay');
                const tempCurrentDayIcon = document.querySelector('#iconClouds');
                
                let skycons = new Skycons({"color": "steelblue"}, {"resizeClear": true});
                skycons.add(tempFirstDayIcon, `${iconFirst}`);
                skycons.add(tempSecondDayIcon, `${iconSecond}`);
                skycons.add(tempThirdDayIcon, `${iconThird}`);
                skycons.add(tempCurrentDayIcon, `${iconCurrent}`);

              skycons.play();
            });
          })
        })
      }
    }
  }
})