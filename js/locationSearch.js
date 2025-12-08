// Fonction pour géocoder une adresse avec Nominatim
async function geocodeLocation(location) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        location
      )}&limit=1`
    );
    const data = await response.json();

    if (data.length === 0) {
      throw new Error("Lieu non trouvé");
    }

    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error("Erreur de géocodage:", error);
    throw error;
  }
}

// Gestion du formulaire pour changer la vue de la carte
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
    const coords = await geocodeLocation(location);

    window.map.setView([coords.lat, coords.lng], 13);
  } catch (error) {
    alert("Erreur : " + error.message);
  }
});
