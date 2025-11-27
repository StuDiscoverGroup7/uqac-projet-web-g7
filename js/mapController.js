// map controller
const map = L.map('mapController').setView([46.8139, -71.2080], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

jsonTest = [
    { "name": "Au bon gougnier",
      "description": "Le restaurant Au Bon Gougnier, niché au cœur du Vieux‑Québec, est une adresse aussi chaleureuse qu'intrigante. Spécialisé dans la viande de dière (une coupe fictive tendre et persillée), il propose une cuisson unique « à la gougnière »",
      "address": "331 boul. Tablot",
      "offerLabel": "Offre d'emploi",
      "offerType": "jobOffer",
      "lat": 46.8150, 
      "lng": -71.2100 
    },
    { "name": "Chez Tremblay",
      "description": "Delicious sandwiches and salads.",
      "address": "330 boul. Tablot",
      "offerLabel": "Promotion",
      "offerType": "promo",
      "lat": 46.8120,
      "lng": -71.2050
    }
]

jsonTest.forEach(offer => {
    L.marker([offer.lat, offer.lng]).addTo(map).bindPopup('<b>' + offer.name + '</b><br>' + offer.description + '<br><i>' + offer.address + '</i><br><b>' + offer.offerLabel + '</b>');
    $("#offersList ul").append(
        '<li>' +
        '<div>' +
        '<div class="offerType">' + '<h3>' + offer.name + '</h3>' + '<h4 class="' + offer.offerType + '">' + offer.offerLabel + '</h4>' +  '</div>' +
        '<hr>' +
        '<h4>' + offer.address + '</h4>' +
        '<p>' + offer.description + '</p>' +
        '</div>' +
        '</li>'
    );
})



// Add scale control
L.control.scale().addTo(map);

// Click on map to show coordinates in a popup
map.on('click', function(e) {
    L.popup()
        .setLatLng(e.latlng)
        .setContent('Lat: ' + e.latlng.lat.toFixed(5) + '<br>Lng: ' + e.latlng.lng.toFixed(5))
        .openOn(map);
});