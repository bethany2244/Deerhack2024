import { fetchApi } from "./fetch.js";
import { constructMarker } from "./marker.js";
let map = null;

mapboxgl.accessToken =
  "pk.eyJ1IjoiYmxpYW5nMjIyNCIsImEiOiJjbHNwY2w3OGMwcTdsMnZvZ2Joa3V0b2g4In0.RgKi_Gas_6E43r_82M5_cg";

const category = {
  "Bus Station": "#f0afaa",
  Coffee: "#FF5733",
  Restaurant: "#9abaed",
  Grocery: "#f0d25b",
};

//get current location
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

//success location

function successLocation(position) {
  console.log(position);
  setupMap([position.coords.longitude, position.coords.latitude]);

  //construct marker for current location -> aqua blue
  constructMarker(
    "#2adeeb",
    position.coords.longitude,
    position.coords.latitude,
    map
  );

  for (const el of Object.keys(category)) {
    fetchApi(
      el,
      position.coords.longitude,
      position.coords.latitude,
      category[el],
      map
    );
  }
}

//error location

function errorLocation() {
  setupMap([-2.24, 53.48]);
}

//set line

function setupMap(center) {
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v11",
    center: center,
    zoom: 14,
  });

  const nav = new mapboxgl.NavigationControl();
  map.addControl(nav);

  const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  });

  map.addControl(directions, "top-left");
}

map.on("load", () => {
  map.addSource("route", {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: [
          [-122.483696, 37.833818],
          [-122.483482, 37.833174],
        ],
      },
    },
  });

  map.addLayer({
    id: "route",
    type: "line",
    source: "route",
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "#888",
      "line-width": 8,
    },
  });
});
