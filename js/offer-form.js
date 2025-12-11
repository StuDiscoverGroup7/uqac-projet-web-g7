// Cette fonction nettoie une coordonnée (transforme 48° 30' N en 48.5)
      function cleanCoordinate(input) {
        if (!input) return "";
        let str = input.trim().toUpperCase().replace(',', '.'); // Remplace virgule par point
        
        let multiplier = 1;
        if (str.includes("S") || str.includes("W") || str.includes("O")) {
          multiplier = -1;
        }

        // Extrait les nombres
        const matches = str.match(/(\d+(?:\.\d+)?)/g);
        if (!matches || matches.length === 0) return input; // Si pas de chiffre, on renvoie tel quel (l'HTML validera)

        let decimal = parseFloat(matches[0]);
        if (matches.length > 1) decimal += parseFloat(matches[1]) / 60; // Minutes
        if (matches.length > 2) decimal += parseFloat(matches[2]) / 3600; // Secondes

        // Applique le signe négatif si nécessaire
        if (!str.includes("-") && multiplier === -1) {
            decimal = decimal * -1;
        } else if (str.includes("-")) {
            // Si c'est déjà négatif, on garde le signe
            decimal = Math.abs(decimal) * -1; 
        }

        // On arrondit pour que ce soit propre (6 décimales suffisent largement pour le GPS)
        return isNaN(decimal) ? input : parseFloat(decimal.toFixed(6));
      }

      // On applique la conversion quand l'utilisateur quitte le champ (blur)
      const latInput = document.getElementById('latitude');
      const lngInput = document.getElementById('longitude');

      latInput.addEventListener('blur', function() {
        // Bonus : Si l'utilisateur colle "48.5, -71.2" dans Latitude, on remplit les deux !
        if (this.value.includes(',') || this.value.includes(';')) {
            const parts = this.value.split(/[,;]/);
            if (parts.length === 2) {
                this.value = cleanCoordinate(parts[0]);
                lngInput.value = cleanCoordinate(parts[1]);
                return;
            }
        }
        this.value = cleanCoordinate(this.value);
      });

      lngInput.addEventListener('blur', function() {
        this.value = cleanCoordinate(this.value);
      });