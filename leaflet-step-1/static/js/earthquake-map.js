// Create the tile layer that will be the background of our map.
var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

// Create the map with our layers.
var map = L.map("map-id", {
    center: [40, -100],
    zoom: 4,
  });

// Add our "streetmap" tile layer to the map.
streetmap.addTo(map);

// Get earthquake data and process
var equakedata = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson"

// colours from colorbrewer: https://colorbrewer2.org/#type=diverging&scheme=RdYlGn&n=9
var colours = ['#d73027','#f46d43','#fdae61','#fee08b','#ffffbf','#d9ef8b','#a6d96a','#66bd63','#1a9850'];

// Data is all earthquakes greater than magnitude 4.5 in the last month
d3.json(equakedata).then(function(earthquakes) {

  // Extract geojson data for mapping
  var locationdata = earthquakes.features;

  function popupFromFeature(feature, layer) {
    if (feature.properties && feature.properties.place && feature.properties.time) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><p>${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}`);
    }
}

  L.geoJSON(locationdata, {
      pointToLayer: function(feature, latlng) {
        var fdepth = feature.geometry.coordinates[2];
        
        var mag = feature.properties.mag;
        
        function getColor(m) {
            return m > 50  ? colours[0] :
                   m > 35  ? colours[1] :
                   m > 20  ? colours[2] :
                   m > 10  ? colours[3] :
                   m > 5  ? colours[4] :
                   m > 3  ? colours[5] :
                   m > 2  ? colours[6] :
                   m > 1  ? colours[7] :
                            colours[8];
                }
        
        var circleoptions = {
            radius: mag*1.5,
            color: getColor(fdepth),
            fillcolor: getColor(fdepth),
            fillOpacity: 0.8
        }  
        console.log(circleoptions);
        return L.circleMarker(latlng, circleoptions)
      }
  ,onEachFeature: popupFromFeature}).addTo(map);

});