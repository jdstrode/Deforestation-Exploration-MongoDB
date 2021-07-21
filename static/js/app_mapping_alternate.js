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

d3.selectAll("#selDataset").on("change", getData);

function getData() {
  let dropdownMenu = d3.select("#selDataset");
  var selector = dropdownMenu.property("value");

  console.log(selector)

  var data = [];
  console.log(data)


    d3.json("api/mapdata").then((incomingData) => {
        console.log(incomingData)
        let yearlyDeforestData = data;
        console.log(yearlyDeforestData);
        let latitudes = incomingData[0].Latitude;
        console.log(latitudes);
        let longitudes = incomingData[0].Longitude;
        console.log(longitudes);
        let state = incomingData[0].States;
        console.log(state);


        if (selector == "2004") {
          data = incomingData[0]["2004"];
          console.log(data);
        }
        else if (selector == "2005") {
            data = incomingData[0]["2005"];
        }
        else if (selector == "2006") {
            data =  incomingData[0]["2006"];
        }
        else if (selector == "2007") {
            data =  incomingData[0]["2007"];
        }
        else if (selector == "2008") {
            data =  incomingData[0]["2008"];
        }
        else if (selector == "2009") {
            data =  incomingData[0]["2009"];
        }
        else if (selector == "2010") {
            data =  incomingData[0]["2010"];
        }
        else if (selector == "2011") {
            data =  incomingData[0]["2011"];
        }
        else if (selector == "2012") {
            data =  incomingData[0]["2012"];
        }
        else if (selector == "2013") {
            data =  incomingData[0]["2013"];
        }
        else if (selector == "2014") {
          data =  incomingData[0]["2014"];
        }
        else if (selector == "2015") {
          data =  incomingData[0]["2015"];
        }
        else if (selector == "2016") {
          data =  incomingData[0]["2016"];
        }
        else if (selector == "2017") {
          data =  incomingData[0]["2017"];
        }
        else if (selector == "2018") {
          data =  incomingData[0]["2018"];
        }
        else if (selector == "2019") {
          data =  incomingData[0]["2019"];
        }

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
}



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