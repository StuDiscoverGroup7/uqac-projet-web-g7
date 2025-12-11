// Fonction pour rechercher et afficher les offres
async function searchOffers(location, radiusKm, type) {
  try {
    let url = "/offers/search?";
    const params = new URLSearchParams();

    // Si un lieu est spécifié, utiliser la recherche géographique
    if (location && location.trim()) {
      const geoResponse = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}&limit=1`
      );
      const geoData = await geoResponse.json();

      if (geoData.length === 0) {
        alert("Lieu non trouvé");
        return;
      }

      const lat = parseFloat(geoData[0].lat);
      const lng = parseFloat(geoData[0].lon);

      // Déplacer la carte vers ce lieu
      window.map.setView([lat, lng], 13);

      const radiusMeters = (radiusKm || 5) * 1000;
      params.append("lat", lat);
      params.append("lng", lng);
      params.append("radius", radiusMeters);

      $("#offersList h2").text(`Nos offres à ${location}`);
    } else {
      // Sinon, recherche simple sans géolocalisation
      $("#offersList h2").text("Nos offres");
    }

    // Ajouter le filtre de type si spécifié
    if (type && type.trim()) {
      params.append("type", type);
      // Mettre à jour le titre si on filtre par type sans lieu
      if (!location || !location.trim()) {
        const typeLabels = {
          reduction: "Réductions",
          job: "Offres d'emploi",
          stage: "Stages",
          promotion: "Promotions",
          evenement: "Événements",
        };
        $("#offersList h2").text(typeLabels[type] || "Nos offres");
      }
    }

    const response = await fetch(url + params.toString());
    const data = await response.json();

    if (window.updateOffersDisplay) {
      window.updateOffersDisplay(data.offers);
    }
  } catch (error) {
    alert("Erreur : " + error.message);
  }
}

// Quand le formulaire est soumis
$("#locationSearchForm").on("submit", async function (e) {
  e.preventDefault();

  const location = $("#location").val().trim();
  const radiusKm = parseFloat($("#radius").val()) || 5;
  const type = $("#type").val();

  // Validation du rayon si un lieu est spécifié
  if (location && (isNaN(radiusKm) || radiusKm <= 0)) {
    alert("Veuillez entrer un rayon valide");
    return;
  }

  await searchOffers(location, radiusKm, type);
});
