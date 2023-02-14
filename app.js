const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},


    // Leaflet Map
    buildMap() {
        this.map = L.map('map', {
            center: this.coordinates,
            zoom: 14,
        })
        //console.log(this.map)
        // Add openstreetmap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(this.map);

        // Create and add a geolocation marker
        const marker = L.marker(this.coordinates)
        marker
            .addTo(this.map)
            .bindPopup('<p1><b>Here we are!</b><br></p1>')
            .openPopup()


    },
    addMarkers() { //Defining a function within an object you do not use the function keyword
        //I am not sure what you are using this array for so I commented it out
        // var locations = [
        //     ["Restaurants", 41.607471, -90.5999839],
        //     ["Coffee Shops", 1.3066948, 103.8003488],
        //     ["Movies", 44.039658, -92.4644389],
        //     ["Gas Stations", 35.0080405, -79.1725965]
        // ];

        //loop through the businesses and add markers
        for (var i = 0; i < this.businesses.length; i++) {

            this.markers = L.marker([this.businesses[i].lat, this.businesses[i].long])
                .bindPopup(`<p1>${this.businesses[i].name}</p1>`).addTo(this.map);

        }
    },

};


//getting coordinates via geolocation api
async function getCoords() {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    return [pos.coords.latitude, pos.coords.longitude]
}


//event handlers
// window load
window.onload = async () => {
    const coords = await getCoords()
    //console.log(coords)
    myMap.coordinates = coords
    myMap.buildMap()
}

//business submit button
document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault()
    let business = document.getElementById('business').value

    //The code here was not complete so I finished it, please take a look and try to understand the code and send me any questions you have
    //1. We need to fetch the data using the foursquare API, starting with setting the options for the fetch command
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8='
        }
    }
    //Setting the limit to 4 businesses
    let limit = 4
    //Setting the coordinates using the myMap object coordinates
    let lat = myMap.coordinates[0]
    let lon = myMap.coordinates[1]

    //Using fetch to get the businesses data
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
    let data = await response.text()
    let parsedData = JSON.parse(data)


    //Here we are using the Array.map function to map the data we got into an array that we can assign to myMap object 
    let businesses = parsedData.results.map((element) => {
        let location = {
            name: element.name,
            lat: element.geocodes.main.latitude,
            long: element.geocodes.main.longitude
        };
        return location
    });

    //Assigning the data to myMap.businesses, this will be used in the AddMarkers function to add the businesses to the map
    myMap.businesses = businesses;
    //Calling the addMarkets function, if you do not see the markers on the map zoom out and you should see them
    myMap.addMarkers();

})
