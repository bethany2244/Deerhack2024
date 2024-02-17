export function constructMarker(c, long, lat, map, name) {
  const popup = new mapboxgl.Popup({ offset: 25 }).setText(name);

  console.log(name);
  const marker = new mapboxgl.Marker({
    color: c,
    draggable: true,
  })

    .setLngLat([long, lat])
    .setPopup(popup)
    .addTo(map);
}
