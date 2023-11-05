// Function to create the earthquake map
function createMap() {
  // Create a tile layer for the base map
  let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  // Create a baseMaps object to hold the streetmap layer
  let baseMaps = {
    "Street Map": streetmap
  };

  // Create the map object with options
  let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [streetmap]
  });

  // Create a layer control and add it to the map
  L.control.layers(baseMaps).addTo(myMap);

  // Create a legend
  let legend = L.control({ position: 'bottomright' });

  legend.onAdd = function () {
      let div = L.DomUtil.create("div", "info legend");
      let depths = [-10, 10, 30, 50, 70, 90];
      let labels = [];

      for (let i = 0; i < depths.length; i++) {
          div.innerHTML += '<i style="background:' + mapColor(depths[i] + 1) + '"></i> ';
          if (i === 0) {
              labels.push('Depth < ' + depths[i] + ' km');
          } else {
            labels.push('Depth ' + depths[i - 1] + ' - ' + depths[i] + ' km');
          }
      }

      div.innerHTML += '<br>' + labels.join('<br>');
      return div;
  };
  legend.addTo(myMap);

  // Perform an API call to the USGS GeoJSON API to get the earthquake data and call createMarkers when it completes
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(earthquakeData) {
    createMarkers(earthquakeData, myMap);
  });
}

// Function to create earthquake markers
function createMarkers(earthquakeData, myMap) {
// Get the features array from earthquake data
let features = earthquakeData.features;

// Initialize an array to hold earthquake markers
let earthquakeMarkers = [];

for (let i = 0; i < features.length; i++) {
  let feature = features[i];
  let coordinates = feature.geometry.coordinates;
  let magnitude = feature.properties.mag;
  let depth = coordinates[2];
  let location = feature.properties.place;

  // Create a marker with a popup for each earthquake
  let earthquakeMarker = L.circleMarker([coordinates[1], coordinates[0]], {
    radius: mapRadius(magnitude),
    fillColor: mapColor(depth),
    fillOpacity: 0.7,
    color: "black",
    stroke: true,
    weight: 0.5
  }).bindPopup(`Magnitude: ${magnitude}<br>Location: ${location}<br>Depth: ${depth}`);

  earthquakeMarkers.push(earthquakeMarker);
}

// Create a layer group from the earthquake markers
let earthquakeLayerGroup = L.layerGroup(earthquakeMarkers);

// Add the earthquake data layer to the map
earthquakeLayerGroup.addTo(myMap);
}

// Function to determine marker size based on magnitude
function mapRadius(magnitude) {
return magnitude * 4;
}

// Function to determine marker color based on depth
function mapColor(depth) {
switch(true) {
  case depth > 90:
    return "darkblue";
  case depth > 70:
    return "purple";
  case depth > 50:
    return "orangered";
  case depth > 30:
    return "red";
  case depth > 10:
    return "orange";
  default:
    return "yellow";
}
}

// Call the createMap function to initialize the map
createMap();
