// Leaflet map instance centered on the Dunkerque–Rouen–Reims triangle.
const map = L.map('map').setView([49.8, 2.3], 8);

// OpenStreetMap tile layer added to the map.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
}).addTo(map);

// Leaflet MarkerClusterGroup instance to handle overlapping markers.
let markersGroup = L.markerClusterGroup();
map.addLayer(markersGroup);

// +++++++++++++++++++++++++++++++++++++++ FUNCTIONS +++++++++++++++++++++++++++++


// +++++++++++++++++++++++++++++++++++++++ EXECUTION +++++++++++++++++++++++++++++