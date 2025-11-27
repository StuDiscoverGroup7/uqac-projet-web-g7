// map controller
const map = L.map('mapController').setView([46.8139, -71.2080], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Example marker with popup
const marker1 = L.marker([46.8139, -71.2080]).addTo(map)
    .bindPopup('Au bon gougnier').openPopup();

const marker2 = L.marker([46.8130, -71.2040]).addTo(map)
    .bindPopup('Chez Tremblay').openPopup();

// Add scale control
L.control.scale().addTo(map);

// Click on map to show coordinates in a popup
map.on('click', function(e) {
    L.popup()
        .setLatLng(e.latlng)
        .setContent('Lat: ' + e.latlng.lat.toFixed(5) + '<br>Lng: ' + e.latlng.lng.toFixed(5))
        .openOn(map);
});