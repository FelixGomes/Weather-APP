let weather = {
  apiKey: '5de8fbdada6924a8a41040eb087a39da',
  fetchWeather: function (city) {
    fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=' +
        city +
        '&units=metric&appid=' +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert('No weather found.');
          throw new Error('No weather found.');
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    const { country, sunrise, sunset } = data.sys;
    console.log(
      name,
      icon,
      description,
      temp,
      humidity,
      speed,
      country,
      sunrise,
      sunset
    );
    document.querySelector('.city').innerText = 'Weather in ' + name;
    document.querySelector('.icon').src =
      'https://openweathermap.org/img/wn/' + icon + '.png';
    document.querySelector('.description').innerText = description;
    document.querySelector('.temp').innerText = Math.round(temp) + '°C';
    document.querySelector('.humidity').innerText =
      'Humidity: ' + humidity + '%';
    document.querySelector('.wind').innerText =
      'Wind Speed: ' + speed + ' m/s '; //value in km/h = speed * 3.6
    document.querySelector('.weather').classList.remove('loading');
    //show the country flag of that city:
    document.querySelector('.country1').src =
      'https://openweathermap.org/images/flags/' +
      country.toLowerCase() +
      '.png';
    //sunrise:
    let timestamp_sunrise = sunrise;
    var date = new Date(timestamp_sunrise * 1000);
    var hours = date.getHours();
    var minutes = '0' + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2);
    document.querySelector('.sunrise').innerText = 'Sunrise: ' + formattedTime;
    //sunset:
    let timestamp_sunset = sunset;
    var date = new Date(timestamp_sunset * 1000);
    var hours = date.getHours();
    var minutes = '0' + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2);
    document.querySelector('.sunset').innerText = 'Sunset: ' + formattedTime;

    //background image when user search the city he wants
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(document.querySelector('.search-bar').value);
  },
};

document.querySelector('.search button').addEventListener('click', function () {
  weather.search();
});
document
  .querySelector('.search-bar')
  .addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
      weather.search();
    }
  });

weather.fetchWeather('Florianopolis'); //default value

//sunset e sunrise transformar em funcao para puxar ambos sem precisar repetir codigo
