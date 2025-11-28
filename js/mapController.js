// popup function
function closePopup() {
    $("#popupInspection").remove();
}

// map controller
const map = L.map('mapController').setView([46.8139, -71.2080], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

jsonTest = [
    { "name": "Au bon gougnier",
      "description": "Le restaurant Au Bon Gougnier, niché au cœur du Vieux‑Québec, est une adresse aussi chaleureuse qu'intrigante. Spécialisé dans la viande de dière (une coupe fictive tendre et persillée), il propose une cuisson unique « à la gougnière »",
      "promotionDescription": "Cherche stagiaire !",
      "placeType": "Restaurant",
      "address": "331 boul. Tablot",
      "offerLabel": "Offre d'emploi",
      "offerType": "jobOffer",
      "lat": 46.8150, 
      "lng": -71.2100 
    },
    { 
      "name": "Chez Tremblay",
      "description": "Librairie indépendante offrant une vaste sélection de livres neufs et d'occasion, ainsi que des événements littéraires réguliers.",
      "promotionDescription": "19% de rabais sur votre première commande!",
      "placeType": "Librairie",
      "address": "330 boul. Tablot",
      "offerLabel": "Promotion",
      "offerType": "promo",
      "lat": 46.8120,
      "lng": -71.2050
    },
    { 
      "name": "Chez Tremblay",
      "description": "Librairie indépendante offrant une vaste sélection de livres neufs et d'occasion, ainsi que des événements littéraires réguliers.",
      "promotionDescription": "19% de rabais sur votre première commande!",
      "placeType": "Librairie",
      "address": "330 boul. Tablot",
      "offerLabel": "Promotion",
      "offerType": "promo",
      "lat": 46.8120,
      "lng": -71.2050
    }
]

jsonTest.forEach(offer => {
    L.marker([offer.lat, offer.lng]).addTo(map).bindPopup('<b>' + offer.name + '</b><br>' + offer.description + '<br><i>' + offer.address + '</i><br><b>' + offer.offerLabel + '</b>');
    offerDom = $('<li>' +
        '<div>' +
        '<div class="offerType">' + '<h3>' + offer.name + '</h3>' + '<h4 class="' + offer.offerType + '">' + offer.offerLabel + '</h4>' +  '</div>' +
        '<hr>' +
        '<h4>' + offer.address + '</h4>' +
        '<p>' + offer.description + '</p>' +
        '</div>' +
        '</li>');

    offerDom.click(function(event) {
        console.log(event.target)
        $("body").append(`
            <div id="popupInspection">
                <div>
                    <h1>${offer.name}</h1>
                    <h3>${offer.placeType}</h3>
                    <hr>
                    <h4>${offer.description}</h4>
                    <hr>
                    <h4>${offer.promotionDescription}</h4>
                    <button onClick="closePopup()">Fermer</button>
                </div>
            </div>
        `);
    })

    $("#offersList ul").append(offerDom);
})

// Add scale control
L.control.scale().addTo(map);
>>>>>>> 5d0b890af0717c478086daa2b33a874576dbacfa
