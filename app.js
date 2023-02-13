// map
const myMap = {
    coordinates: [],
    businesses: [],
    map: {},
    markers: {},
}

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Leaflet Map
buildMap() {
    this.map = L.map('map', {
     center: this.coordinates,
        zoom: 11,
    })

// Add openstreetmap tiles
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

       

// Create and add a geolocation marker
const marker = L.marker(this.coordinates)
marker
.addTo(this.map)
.bindPopup('<p1><b>Here we are!</b><br></p1>')
.openPopup()

fetch{
    //api.foursquare.com/v3/places/search?&query=${business}&limit=5{limit}&ll=${lat}%2C${lon}`
},

}

//getting coordinates via geolocation api
async function getCoords(){
    const pos = await new Promise ((resolve, reject) =>{
        navigator.geolocation.getCurrentPosition(resolve,reject)
    });
    return [pos.coords.latitude, pos.coords.longitude]
}


//event handlers
// window load
window.onload = async() => {
    const coords = await getCoords()
    console.log(coords)
    myMap.coordinates = coords
    myMap.buildMap()
}

//business submit button
document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault()
    let business = document.getElementById('business').valueMax
//
console.log(business)
})

