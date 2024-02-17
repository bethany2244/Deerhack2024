export function constructMarker(c, long, lat, map) {
  const marker = new mapboxgl.Marker({
    color: c,
    draggable: true,
  })
    .setLngLat([long, lat])

    .addTo(map);
}
