const celsius = document.querySelector('.celsius');
const fahrenheit = document.querySelector('.fahrenheit');

fahrenheit.addEventListener("click", function () {
    celsius.classList.remove("active");
    celsius.classList.add("inactive");
    fahrenheit.classList.add("active");
    fahrenheit.classList.remove("inactive");

    const values = document.querySelector('.cityAndCountry').textContent;
    const value = values.split(', ').join(',');
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${value}&key=be1c3f93d8bb439cb2c898167c6967be&pretty=1&no_annotations=1`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        const lat = data.results[0].geometry.lat;
        const long = data.results[0].geometry.lng;


        const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/22fa3da0269ba82ddef2cb6e295cc40d/${lat},${long}`;

        fetch(url, {
            method: 'GET'
        }).then(function(response) {
            response.json().then(function(data) {
                const feelsLike = Math.ceil(data.currently.apparentTemperature);
                const temp = Math.ceil(data.currently.temperature);
                const tempFirstDay = Math.ceil((data.daily.data[0].temperatureMax + data.daily.data[0].temperatureMin) / 2);
                const tempSecondDay = Math.ceil((data.daily.data[1].temperatureMax + data.daily.data[1].temperatureMin) / 2);
                const tempThirdDay = Math.ceil((data.daily.data[2].temperatureMax + data.daily.data[2].temperatureMin) / 2);

                document.querySelector('.temp').textContent = `${temp}°`;
                document.querySelector('.feelsLike').textContent = `Feels like: ${feelsLike}°`;
                document.querySelector('.tempFirstDay .tempDay').textContent = `${tempFirstDay}°`;
                document.querySelector('.tempSecondDay .tempDay').textContent = `${tempSecondDay}°`;
                document.querySelector('.tempThirdDay .tempDay').textContent = `${tempThirdDay}°`;
            });
        });
    });
})

celsius.addEventListener("click", function () {
    fahrenheit.classList.remove("active");
    fahrenheit.classList.add("inactive");
    celsius.classList.remove("inactive");
    celsius.classList.add("active");

    const values = document.querySelector('.cityAndCountry').textContent;
    const value = values.split(', ').join(',');
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${value}&key=be1c3f93d8bb439cb2c898167c6967be&pretty=1&no_annotations=1`;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        const lat = data.results[0].geometry.lat;
        const long = data.results[0].geometry.lng;


        const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/22fa3da0269ba82ddef2cb6e295cc40d/${lat},${long}`;

        fetch(url, {
            method: 'GET'
        }).then(function(response) {
            response.json().then(function(data) {
                const temp = Math.ceil((data.currently.temperature - 32) * 5 / 9);
                const feelsLike = Math.ceil((data.currently.apparentTemperature - 32) * 5 / 9);
                const tempFirstDay = Math.ceil((((data.daily.data[0].temperatureMax + data.daily.data[0].temperatureMin) / 2) - 32) * 5 / 9);
                const tempSecondDay = Math.ceil((((data.daily.data[1].temperatureMax + data.daily.data[1].temperatureMin) / 2) - 32) * 5 / 9);
                const tempThirdDay = Math.ceil((((data.daily.data[2].temperatureMax + data.daily.data[2].temperatureMin) / 2) - 32) * 5 / 9);

                document.querySelector('.temp').textContent = `${temp}°`;
                document.querySelector('.feelsLike').textContent = `Feels like: ${feelsLike}°`;
                document.querySelector('.tempFirstDay .tempDay').textContent = `${tempFirstDay}°`;
                document.querySelector('.tempSecondDay .tempDay').textContent = `${tempSecondDay}°`;
                document.querySelector('.tempThirdDay .tempDay').textContent = `${tempThirdDay}°`;
            });
        });
    });
})
