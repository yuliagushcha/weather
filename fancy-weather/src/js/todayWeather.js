/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const Skycons = require('../../node_modules/skycons/skycons')(window);

export default function getLoc () {
  const urlLoc = 'https://ipinfo.io/json?token=98ae5375abde6f';

  fetch(urlLoc)
  .then(res => res.json())
  .then(data => {
    const longLat = data.loc.split(',');
    const long = longLat[1];
    const lat = longLat[0];

    function getCurrentWeather() {
      const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/22fa3da0269ba82ddef2cb6e295cc40d/${lat},${long}`;

      fetch(url, {
        method: 'GET'
      }).then(function(response) {
        response.json().then(function(data) {
          
          const humid = data.currently.humidity * 100;
          const summary = data.currently.summary;
          
          const windSpeed = data.currently.windSpeed;

          let feelsLike, temp, tempFirstDay, tempSecondDay, tempThirdDay;
          const celsius = document.querySelector('.celsius');
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
          localStorage.setItem("CurrentTemperature", temp);
          
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
    }
    getCurrentWeather();
  })
}
getLoc();