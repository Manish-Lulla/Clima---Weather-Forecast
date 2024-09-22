async function getWeatherData(city) {
    const API_KEY = "f197dabb31ddf6aaed355eb8feb3ad9e";
    const URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;

    const response = await fetch(URL);

    if(!response.ok) {
        throw new Error(`Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}