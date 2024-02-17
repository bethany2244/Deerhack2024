mapboxgl.accessToken =
  "pk.eyJ1IjoiYmxpYW5nMjIyNCIsImEiOiJjbHNwY2w3OGMwcTdsMnZvZ2Joa3V0b2g4In0.RgKi_Gas_6E43r_82M5_cg";

//get current location
navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
});

function successLocation(position) {
  console.log(position);
  setupMap([position.coords.longitude, position.coords.latitude]);

  const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/donut.json?type=poi?proximity=${
    (position.coords.longitude, position)
  }&access_token=${mapboxgl.accessToken}`;

  //find closest gas station with current location
  const apiUrl2 = `https://api.mapbox.com/search/searchbox/v1/category/gas_station?access_token=${mapboxgl.accessToken}&language=en&limit=10&proximity=${position.coords.longitude}%2C${position.coords.latitude}`;

  fetch(apiUrl2)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Handle the data
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error("Fetch error:", error);
    });
}

function errorLocation() {
  setupMap([-2.24, 53.48]);
}

function setupMap(center) {
  const map = new mapboxgl.Map({
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
