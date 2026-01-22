document.addEventListener("DOMContentLoaded", () => {

    const map = L.map('map').setView([49.8, 2.3], 8);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
    }).addTo(map);

    let markersGroup = L.markerClusterGroup();
    map.addLayer(markersGroup);

});
