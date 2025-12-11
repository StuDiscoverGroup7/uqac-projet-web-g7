// Fonction pour convertir des coordonnées en adresse (reverse geocoding)
async function reverseGeocode(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
    );
    const data = await response.json();

    if (data && data.address) {
      const addr = data.address;
      // Construire une adresse lisible
      const parts = [];
      if (addr.city) parts.push(addr.city);
      else if (addr.town) parts.push(addr.town);
      else if (addr.village) parts.push(addr.village);

      if (addr.state) parts.push(addr.state);
      else if (addr.region) parts.push(addr.region);

      if (addr.country) parts.push(addr.country);

      return parts.length > 0
        ? parts.join(", ")
        : data.display_name || `${lat}, ${lng}`;
    }

    return `${lat}, ${lng}`;
  } catch (error) {
    console.error("Erreur reverse geocoding:", error);
    return `${lat}, ${lng}`;
  }
}

// Gestion du bouton "Utiliser ma position"
$(document).ready(function () {
  $("#useCurrentLocation").on("click", async function () {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par votre navigateur");
      return;
    }

    const button = $(this);
    const originalText = button.html();
    button.prop("disabled", true).html("⏳");

    navigator.geolocation.getCurrentPosition(
      async function (position) {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Convertir les coordonnées en adresse
        const address = await reverseGeocode(lat, lng);

        // Remplir le champ lieu avec l'adresse
        $("#location").val(address);

        // Déplacer la carte vers la position
        window.map.setView([lat, lng], 13);

        button.prop("disabled", false).html(originalText);
      },
      function (error) {
        let errorMessage = "Impossible d'obtenir votre position : ";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Permission refusée";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Position indisponible";
            break;
          case error.TIMEOUT:
            errorMessage += "Timeout";
            break;
          default:
            errorMessage += "Erreur inconnue";
            break;
        }
        alert(errorMessage);
        button.prop("disabled", false).html(originalText);
      }
    );
  });
});

