// popup function
function closePopup() {
  $("#popupInspection").remove();
}

// vue par défaut : Canada entier
const map = L.map("mapController").setView([56, -106], 4);
window.map = map;

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

setTimeout(() => {
  map.invalidateSize();
}, 100);

// Liste des marqueurs actuellement sur la carte
let markers = [];

// Fonction pour créer le HTML de la popup
function createPopupHtml(offer) {
  return `
    <div id="popupInspection">
      <div>
        <h1>${offer.title}</h1>
        <h3>${offer.type}</h3>
        <hr>
        <h4>${offer.description}</h4>
        <button onClick="closePopup()">Fermer</button>
      </div>
    </div>
  `;
}

// Fonction pour obtenir le label et la classe CSS selon le type
function getTypeInfo(type) {
  const typeMap = {
    reduction: { label: "Réduction", class: "type-reduction" },
    job: { label: "Offre d'emploi", class: "type-job" },
    stage: { label: "Stage", class: "type-stage" },
    promotion: { label: "Promotion", class: "type-promotion" },
    evenement: { label: "Événement", class: "type-evenement" },
  };
  return typeMap[type] || { label: type, class: "type-default" };
}

// Fonction pour afficher les offres
function updateOffersDisplay(offers) {
  markers.forEach((marker) => {
    map.removeLayer(marker);
  });
  markers = [];
  $("#offersList ul").empty();

  if (!offers || offers.length === 0) {
    $("#offersList ul").append("<li><p>Aucune offre trouvée.</p></li>");
    return;
  }

  offers.forEach((offer) => {
    const lat = parseFloat(offer.latitude);
    const lng = parseFloat(offer.longitude);
    const typeInfo = getTypeInfo(offer.type);

    // Ajouter un marqueur sur la carte
    const marker = L.marker([lat, lng])
      .addTo(map)
      .bindPopup(
        "<b>" +
          offer.title +
          "</b><br>" +
          offer.description +
          "<br><i>" +
          offer.address +
          "</i><br><b>" +
          typeInfo.label +
          "</b>"
      );
    markers.push(marker);

    // Créer l'élément HTML pour la liste
    const offerHtml =
      "<li>" +
      "<div>" +
      '<div class="offerType">' +
      "<h3>" +
      offer.title +
      "</h3>" +
      '<h4 class="' +
      typeInfo.class +
      '">' +
      typeInfo.label +
      "</h4>" +
      "</div>" +
      "<hr>" +
      "<h4>" +
      offer.address +
      "</h4>" +
      "<p>" +
      offer.description +
      "</p>" +
      "</div>" +
      "</li>";

    const offerDom = $(offerHtml);

    // Quand on clique sur une offre dans la liste
    offerDom.click(function () {
      $("body").append(createPopupHtml(offer));
    });

    $("#offersList ul").append(offerDom);
  });
}

// Rendre cette fonction accessible depuis les autres fichiers
window.updateOffersDisplay = updateOffersDisplay;

L.control.scale().addTo(map);
