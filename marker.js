import anime from "./node_modules/animejs/lib/anime.es.js";
import { currentMarker } from "./script.js";

export function constructMarker(c, long, lat, map, name, currentMarker) {
  const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);

  console.log(name);
  const marker = new mapboxgl.Marker({
    color: c,
    draggable: false
  })

    .setLngLat([long, lat])
    .setPopup(popup)
    .addTo(map);

  currentMarker.push(marker);
}
