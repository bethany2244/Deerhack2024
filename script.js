import { fetchApi } from "./fetch.js";
import { moveOffScreen } from "./initialani.js";
import { constructMarker } from "./marker.js";
import { fetchTransitInfo } from "./transitfetch.js";
let map = null;

//success location
export var currentMarker = [];

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

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude]);
  //construct marker for current location -> aqua blue
  constructMarker(
    "#2adeeb",
    position.coords.longitude,
    position.coords.latitude,
    map,
    name,
    currentMarker
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

  directions.on("route", function (event) {
    // animate
    moveOffScreen();

    let route = event.route;
    // console.log("Route:", route["0"]);

    clearMarkers(currentMarker);

    //fetching the start point and the end point of the navigation******
    const all_route = route["0"]["legs"]["0"]["steps"];
    console.log(all_route);

    for (const el of all_route) {
      console.log(el["maneuver"]["location"]);
    }
    const first_route = all_route[0]["maneuver"]["location"];
    const last_route = all_route[all_route.length - 1]["maneuver"]["location"];

    directions.removeRoutes(); //remove route

    console.log(first_route, last_route);
    fetchTransitInfo(
      [first_route[1], first_route[0]],
      [last_route[1], last_route[0]],
      map
    );
    console.log(map.getSource("routes"));

    const transit = fetchTransitInfo(first_route, last_route, map);
  });
  // var origin = [43.5484,-79.6626];
  // var destination = [43.7832,-79.1872];
  // fetchTransitInfo(origin, destination, map);
  //clearMarkers(currentMarker);

  function clearMarkers(currentMarker) {
    for (let i = 0; i < currentMarker.length; i++) {
      currentMarker[i].remove();
    }
  }
}
