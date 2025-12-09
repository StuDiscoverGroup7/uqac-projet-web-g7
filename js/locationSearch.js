// Quand le formulaire est soumis
$("#locationSearchForm").on("submit", async function (e) {
  e.preventDefault();

  const location = $("#location").val().trim();
  const radiusKm = parseFloat($("#radius").val());

  if (!location) {
    alert("Veuillez entrer un lieu");
    return;
  }

  if (isNaN(radiusKm) || radiusKm <= 0) {
    alert("Veuillez entrer un rayon valide");
    return;
  }

  try {
    // Trouver les coordonnées du lieu
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

    // Chercher les offres dans un rayon
    const radiusMeters = radiusKm * 1000; // Convertir en mètres
    const response = await fetch(
      `/offers/search?lat=${lat}&lng=${lng}&radius=${radiusMeters}`
    );
    const data = await response.json();

    // Mettre à jour le titre
    $("#offersList h2").text(`Nos offres à ${location}`);

    // Afficher les offres sur la carte et dans la liste
    if (window.updateOffersDisplay) {
      window.updateOffersDisplay(data.offers);
    }
  } catch (error) {
    alert("Erreur : " + error.message);
  }
});
