mapboxgl.accessToken =
  "pk.eyJ1IjoiYmxpYW5nMjIyNCIsImEiOiJjbHNwY2w3OGMwcTdsMnZvZ2Joa3V0b2g4In0.RgKi_Gas_6E43r_82M5_cg";

// https://api.mapbox.com/{endpoint}?access_token={your_access_token}

const apiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/donut.json?type=poi?&access_token=${mapboxgl.accessToken}`;

fetch(apiUrl)
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
