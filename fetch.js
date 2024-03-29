import { constructMarker } from "./marker.js";
import { currentMarker } from "./script.js";
mapboxgl.accessToken =
  "pk.eyJ1IjoiYmxpYW5nMjIyNCIsImEiOiJjbHNwY2w3OGMwcTdsMnZvZ2Joa3V0b2g4In0.RgKi_Gas_6E43r_82M5_cg";

//   const apiUrl2 = `https://api.mapbox.com/search/searchbox/v1/category/Coffee?access_token=${mapboxgl.accessToken}&language=en&limit=10&proximity=${position.coords.longitude}%2C${position.coords.latitude}`;

//const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/donut.json?type=poi?proximity=${  (position.coords.longitude, position)}&access_token=${mapboxgl.accessToken}`;

let jsonData;
export function fetchApi(type, x, y, color, map) {
  const apiUrl2 = `https://api.mapbox.com/search/searchbox/v1/category/${type}?access_token=${mapboxgl.accessToken}&language=en&limit=20&proximity=${x}%2C${y}`;
  fetch(apiUrl2)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      for (const el of data["features"]) {
        // console.log(el["geometry"]["coordinates"]); -> coordinates
        const coord = el["geometry"]["coordinates"];
        const name = el["properties"]["name"];

        constructMarker(color, coord[0], coord[1], map, name, currentMarker);
      }

      // Handle the data
    })
    .catch((error) => {
      // Handle errors
      console.error("Fetch error:", error);
    });
}

export function fetchApiTwo(type, x, y, color, map) {
  const apiUrl2 = `https://api.mapbox.com/search/searchbox/v1/category/${type}?access_token=${mapboxgl.accessToken}&language=en&limit=20&proximity=${x}%2C${y}`;
  fetch(apiUrl2)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      let i = 0;

      setTimeout(() => {
        while (i < 10) {
          // console.log(el["geometry"]["coordinates"]); -> coordinates
          const coord = el["geometry"]["coordinates"];
          const name = el["properties"]["name"];

          constructMarker(color, coord[0], coord[1], map, name, currentMarker);
          i++;
        }
      }, 1000);

      // Handle the data
    })
    .catch((error) => {
      // Handle errors
      console.error("Fetch error:", error);
    });
}
