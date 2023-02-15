//myMap
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

    // Adding Markers

    addMarkers() { 

        //loop through the businesses and add markers
        for (var i = 0; i < this.businesses.length; i++) {

            this.markers = L.marker([this.businesses[i].lat, this.businesses[i].long])
                .bindPopup(`<p1>${this.businesses[i].name}</p1>`).addTo(this.map);

        }
    },

};


//Getting cords from the GEO

async function getCoords() {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    });
    return [pos.coords.latitude, pos.coords.longitude]
}


// Windows loading
window.onload = async () => {
    const coords = await getCoords()
    //console.log(coords)
    myMap.coordinates = coords
    myMap.buildMap()
}

// Business submit Bttn
document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault()
    let business = document.getElementById('business').value

    
    // Using Get Method
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'fsq3ATzZbmcGhdeFafr73wZcnJ+LlN6bK+4dh19a7ClS4u8='
        }
    }
    //Businesses being set at the limit of 4
    let limit = 4


    // Set the Coords from myMap 
    let lat = myMap.coordinates[0]
    let lon = myMap.coordinates[1]

    //Fetch to gain access to the API
    let response = await fetch(`https://api.foursquare.com/v3/places/search?&query=${business}&limit=${limit}&ll=${lat}%2C${lon}`, options)
    let data = await response.text()
    let parsedData = JSON.parse(data)


    //Array.map function to myMap 
    let businesses = parsedData.results.map((element) => {
        let location = {
            name: element.name,
            lat: element.geocodes.main.latitude,
            long: element.geocodes.main.longitude
        };
        return location
    });

    // Adding Markers and Calling the map to the businesses
    myMap.businesses = businesses;
    myMap.addMarkers();

})