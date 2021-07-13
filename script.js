$(document).ready(function() {
    const userSearches = document.querySelector('#userSearches');
    let userCities = [];

    const currentDay = moment().format('MMMM Do, YYYY');
    $('#currentDay').text(currentDay);
  
    const dayTwo = moment()
      .add(1, 'days')
      .format('l');
    $('#dayTwo').text(dayTwo.slice(0, 9));
  
    const dayThree = moment()
      .add(2, 'days')
      .format('l');
    $('#dayThree').text(dayThree.slice(0, 9));
  
    const dayFour = moment()
      .add(3, 'days')
      .format('l');
    $('#dayFour').text(dayFour.slice(0, 9));
  
    const dayFive = moment()
      .add(4, 'days')
      .format('l');
    $('#dayFive').text(dayFive.slice(0, 9));
  
    const daySix = moment()
      .add(5, 'days')
      .format('l');
    $('#daySix').text(daySix.slice(0, 9));
  
    init();
  
    function getUserCities() {
      userSearches.innerHTML = '';
      $('#userSearches').empty();
      for (let i = 0; i < userCities.length; i++) {
        const newCity = $('<button>');
        newCity.addClass('newCityBtn');
        newCity.text(userCities[i]);
        newCity.attr('data-name', userCities[i]);
        $('#userSearches').append(newCity);
        $('#userSearches').attr('style', 'display:block');
      }
    }
  
    $(document).on('click', '.searchBtn', function() {
      currentWeather($(this).text());
    });
  
    function init() {
      const storedUserCities = JSON.parse(
        localStorage.getItem('userCities')
      );
      if (storedUserCities !== null) {
        userCities = storedUserCities;
      }
      getUserCities();
    }
  
    function storeUserCities() {
      localStorage.setItem('userCities', JSON.stringify(userCities));
    }

    $('#searchBtn').on('click', function(event) {
      event.preventDefault();
  
      let cityName = $('#citySearchBar')
        .val()
        .trim();
      cityName = cityName.charAt(0).toUpperCase() + cityName.slice(1); 
      currentWeather(cityName);
  
      $('#userSearches').on('click', function(event) {
        event.preventDefault();
  
        const cityName = $(this).text();
        currentWeather(cityName);
        if (cityName !== null) {
          city = cityName[0].name;
        }
      });
  
      userCities.push(cityName);
      cityName.value = '';

      storeUserCities();
      getUserCities();
    });

    $(document).on('click', 'newCity', function() {
      currentWeather($(this).text());
    });
r
    function currentWeather(cityName) {
      apiKey = '37773106ccf560628687f6e4bd7705cb';
      const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`;
      const fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=${apiKey}`;
  
      $.ajax({
        url: queryURL,
        method: 'GET',
      }).then(function(response) {
        const city = response.name;
        const temp = Math.round(response.main.temp);
        const { humidity } = response.main;
        const windSpeed = response.wind.speed;
        const { lat } = response.coord;
        const { lon } = response.coord;
        const indexQueryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
        $('#city').text(city);
        $('#temp').text(`Temperature: ${temp}° F`);
        $('#humidity').text(`Humidity: ${humidity} %`);
        $('#windSpeed').text(`Wind Speed: ${windSpeed} MPH`);

        $.ajax({
          url: indexQueryURL,
          method: 'GET',
        }).then(function(resp) {
          $('#uvIndex').text(`UV Index: ${resp.value}`);
        });
      });

      $.ajax({
        url: fiveDayQueryURL,
        method: 'GET',
      }).then(function(response) {
        $('#tempTwo').text(`Temp: ${parseInt(response.list[0].main.temp)}° F`);
        $('#humidTwo').text(`Humidity: ${response.list[0].main.humidity}%`);
  
        $('#tempThree').text(`Temp: ${parseInt(response.list[8].main.temp)}° F`);
        $('#humidThree').text(`Humidity: ${response.list[8].main.humidity}%`);

        $('#tempFour').text(`Temp: ${parseInt(response.list[16].main.temp)}° F`);
        $('#humidFour').text(`Humidity: ${response.list[16].main.humidity}%`);

        $('#tempFive').text(`Temp: ${parseInt(response.list[24].main.temp)}° F`);
        $('#humidFive').text(`Humidity: ${response.list[24].main.humidity}%`);

        $('#tempSix').text(`Temp: ${parseInt(response.list[32].main.temp)}° F`); 
        $('#humidSix').text(`Humidity: ${response.list[32].main.humidity}%`);
      });
    }

    navigator.geolocation.getCurrentPosition(function(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      apiKey = '37773106ccf560628687f6e4bd7705cb';
      const queryLocationURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
      const fiveDayQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

      $.ajax({
        url: queryLocationURL,
        method: 'GET',
      }).then(function(response) {
        const city = response.name;
        const temp = parseInt(response.main.temp);
        const humidity = parseInt(response.main.humidity);
        const windSpeed = parseInt(response.wind.speed);
        const { lat } = response.coord;
        const { lon } = response.coord;
  
        $('#city').text(city);
        $('#temp').text(`Temperature: ${temp}° F`);
        $('#humidity').text(`Humidity: ${humidity} %`);
        $('#windSpeed').text(`Wind Speed: ${windSpeed} MPH`);
     
        $.ajax({
          url: `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`,
          method: 'GET',
        }).then(function(response) {
          $('#uvIndex').html(`UV Index: ${response.value}`);
        });

        $.ajax({
          url: fiveDayQueryURL,
          method: 'GET',
        }).then(function(response) {
          $('#tempTwo').text(`Temp: ${parseInt(response.list[0].main.temp)}° F`);
          $('#humidTwo').text(`Humidity: ${response.list[0].main.humidity}%`);

          $('#tempThree').text(`Temp: ${parseInt(response.list[8].main.temp)}° F`);
          $('#humidThree').text(`Humidity: ${response.list[8].main.humidity}%`);

          $('#tempFour').text(`Temp: ${parseInt(response.list[16].main.temp)}° F`);
          $('#humidFour').text(`Humidity: ${response.list[16].main.humidity}%`);

          $('#tempFive').text(`Temp: ${parseInt(response.list[24].main.temp)}° F`);
          $('#humidFive').text(`Humidity: ${response.list[24].main.humidity}%`);

          $('#tempSix').text(`Temp: ${parseInt(response.list[32].main.temp)}° F`);
          $('#humidSix').text(`Humidity: ${response.list[32].main.humidity}%`);
        });
      });
    });
  });