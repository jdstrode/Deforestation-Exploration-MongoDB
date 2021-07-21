// let mapdata = d3.select("api/mapdata")
// console.log(mapdata)

// d3.json("api/mapdata").then(incomingData => {
//     console.log(incomingData);

// });


// Define streetmap layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "streets-v11",
  accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
let baseMaps = {
  "Street Map": streetmap
};

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
  center: [ -10.16, -55.12 ],
  zoom: 4,
  layers: [streetmap]     //default selected layer
  });

// Add streetmap tile to map
streetmap.addTo(myMap);

//NEW ADDITIONS

let deforestation = new L.LayerGroup();

let overlayMaps = {
  "Deforestation": deforestation
};

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


    d3.json("api/mapdata").then((incomingData) => {
        console.log(incomingData)
        let yearlyDeforestData = incomingData[0]["2004"];
        console.log(yearlyDeforestData);
        let latitudes = incomingData[0].Latitude;
        console.log(latitudes);
        let longitudes = incomingData[0].Longitude;
        console.log(longitudes);
        let state = incomingData[0].States;
        console.log(state);

        for (var i = 0; i < longitudes.length-1; i++) {

        let circle = L.circle([latitudes[i],longitudes[i]], {
          // color: 'red',
          // fillColor: '#f03',
          color: circleColor(yearlyDeforestData[i]),
          fillOpacity: 0.5,
          radius: yearlyDeforestData[i] * 50
        // }).addTo(myMap);

    }).bindPopup("<h4> State: " + state[i] + "</h4> <hr> <h5>Deforestation: " + yearlyDeforestData[i] + "</h5>").addTo(deforestation);

    deforestation.addTo(myMap);
  }});


  function circleColor(deforest) {
    if (deforest > 2000) {
        color = "red";
    } else if (deforest > 1000) {
        color = "orange";
    } else if (deforest > 500) {
        color = "yellow";
    } else {
        color = "green";
    }
    return color; 
};

// L.circle(countries[i].location, {
//   fillOpacity: 0.75,
//   color: "white",
//   fillColor: color,
//   // Adjust radius
//   radius: countries[i].points * 1500
// }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
// }






// L.geoJSON(data, {
//   onEachFeature: popUpMsg,
//   pointToLayer: function(feature, latlng) {
//       return new L.CircleMarker(latlng, {
//           color: circleColor(feature.geometry.coordinates[2]),
//         radius: feature.properties.mag * 7, 
//         fillOpacity: 0.5
//       });
//   },