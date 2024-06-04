const container = document.querySelector(".container");
const searchButton = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

searchButton.addEventListener('click', async () => {
    const APIKey = "af264e0d24af48adccf596ebbf34e99f";
    const cityInput = document.querySelector('.search-box input');
    const city = cityInput.value;

    if (city === "") {
        // Handle the case where the city input is empty
        return;
    }

    // Function to fetch background image based on city
    async function fetchBackgroundImage(city) {
        // Replace this with an actual method/API to get images based on the city
        // For demonstration purposes, I'll use a placeholder URL here
        const imageUrl = `https://source.unsplash.com/1600x900/?${city}`;

        // Use the Image constructor's decode method for faster preloading
        await new Promise((resolve) => {
            const image = new Image();
            image.src = imageUrl;
            image.decode().then(resolve).catch(resolve); // Handle errors, but still resolve the promise
        });

        return imageUrl;
    }

    // Preload background image
    const backgroundImageUrl = await fetchBackgroundImage(city);

    // Fetch weather data
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            const image = weatherBox.querySelector('img.weather-icon');
            const temperature = weatherBox.querySelector('.temperature');
            const description = weatherBox.querySelector('.description');
            const humidity = weatherDetails.querySelector('.humidity span');
            const wind = weatherDetails.querySelector('.wind span');

            switch (json.weather[0].main) {
                // Your existing code for updating weather icon
                // ...

                default:
                    image.src = 'images/cloud.png';
            }

            // Update other weather details
            temperature.textContent = `${Math.round(json.main.temp)}°C`;
            description.textContent = json.weather[0].description;
            humidity.textContent = `${json.main.humidity}%`;
            wind.textContent = `${json.wind.speed} m/s`;

            // Set the preloaded background image
            document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
});
const searchInput = document.querySelector('.search-box input');
searchInput.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        // Trigger the search button click event
        searchButton.click();
    }
});