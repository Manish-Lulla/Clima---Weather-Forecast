(function($, document, window) {

    $(document).ready(function() {

        // Cloning main navigation for mobile menu
        $(".mobile-navigation").append($(".main-navigation .menu").clone());

        // Mobile menu toggle 
        $(".menu-toggle").click(function() {
            $(".mobile-navigation").slideToggle();
        });
    });

    $(window).load(function() {

    });

})(jQuery, document, window);

const DEFAULT_CITY = "Mumbai";

document.getElementById('cityForm').addEventListener('submit', handleSubmit);

function handleSubmit(evt) {
    evt.preventDefault();
    let cityName = document.getElementById("city").value;

    if(cityName == '') {
        cityName = DEFAULT_CITY;
    }
    getWeatherData(cityName)
    .then(data => processWeatherData(data))
    .catch(err => console.log(err));
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

function manageDateElements() {
    const todaysDate = new Date();

    const dayElements = document.querySelectorAll('.day');
    dayElements.forEach((dayElement, index) => {
        dayElement.innerHTML = DAYS[(todaysDate.getDay  () +index) % DAYS.length];
    });
    document.getElementById('date').innerHTML = `${todaysDate.getDate()} ${MONTHS[todaysDate.getMonth()]}`;
}

function processWeatherData(data) {
    document.getElementById("location").innerHTML = data.city.name;

    manageDateElements();

    const tempElements = document.querySelectorAll('.temp');
    const weatherIconElements = document.querySelectorAll('.weather-icon');

    const temps = data.list.filter((tempData, index) => index % 8 == 0);

    document.getElementById('humidity').innerHTML = `${Math.round(temps[0].main.humidity)}%`;
    document.getElementById('wind-speed').innerHTML = `${Math.round(temps[0].wind.speed *3.6)}kmph`;
    document.getElementById('wind-degree').innerHTML = `${Math.round(temps[0].wind.deg)}<sup>o</sup>`;

    tempElements.forEach((tempElement, index) => {
        tempElement.innerHTML = `${Math.round(temps[index].main.temp)} <sup>o</sup>C`;
        const imagePath = `./images/icons/${temps[index].weather[0].icon}.svg`;
        weatherIconElements[index].setAttribute('src', imagePath);
    });
}
