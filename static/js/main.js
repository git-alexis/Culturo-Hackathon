document.addEventListener("DOMContentLoaded", () => {

    const map = L.map('map').setView([49.8, 2.3], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    let markersGroup = L.markerClusterGroup();
    map.addLayer(markersGroup);

    // ---------------------------------- FETCH ----------------------------------------
    fetch("/api/places")
        .then(response => response.json())
        .then(data => {

            // Stock all markers
            const allMarkers = [];

            data.forEach(place => {
                const marker = L.marker([place.lat, place.lon])
                    .bindPopup(`<b>${place.name}</b>`);
                
                // Ajouter le type de lieu au marker
                marker.category = getCategoryFromTags(place.tags);

                markersGroup.addLayer(marker);
                allMarkers.push(marker);
            });

            // Fonction pour filtrer selon les checkboxes
            const checkboxes = document.querySelectorAll("#menu input[type='checkbox']");
            checkboxes.forEach(cb => {
                cb.addEventListener('change', () => {
                    markersGroup.clearLayers();
                    allMarkers.forEach(marker => {
                        if (isMarkerVisible(marker, checkboxes)) {
                            markersGroup.addLayer(marker);
                        }
                    });
                });
            });
        })
        .catch(err => console.error("Erreur API:", err));

    // Définir la catégorie à partir des tags OSM
    function getCategoryFromTags(tags) {
        if (tags.tourism === "museum") return "Musée";
        if (tags.historic === "monument") return "Monument historique";
        if (tags.amenity === "place_of_worship") return "Lieu de culte";
        if (tags.tourism === "artwork") return "Street art";
        return "Autre";
    }

    // Vérifie si un marker doit être visible selon les checkboxes
    function isMarkerVisible(marker, checkboxes) {
        for (const cb of checkboxes) {
            if (cb.checked && marker.category === cb.value) {
                return true;
            }
        }
        return false;
    }

});
