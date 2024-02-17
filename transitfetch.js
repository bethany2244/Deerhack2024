import './node_modules/@liberty-rider/flexpolyline/index.js';
import polyline from './node_modules/@liberty-rider/flexpolyline/index.js';
import { constructMarker } from './marker.js';
import { FormatString } from './formatstring.js';

const hereApiKey = `g6nnuctjhkfGxqmdV-clZzkcZlq7mTLEyHlj59oFIM8`

export function fetchTransitInfo(position1, position2, map) {
    const apiUrl = `https://transit.router.hereapi.com/v8/routes?apiKey=${hereApiKey}&origin=${position1[0]},${position1[1]}&destination=${position2[0]},${position2[1]}&return=polyline`;
    console.log(apiUrl);
    fetch(apiUrl)
    .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
  
        return response.json();
      })
      .then((data) => {
        console.log(data);
        map.on('load', () => {
          console.log(map);
          // check if 'routes' exists
          if (!map.getSource('routes')){
            map.addSource('routes', {
              'type': 'geojson',
              'data': {
                'type': 'FeatureCollection',
                'features': []
              }
              });
          }
          var featureCollection = [];
          console.log('hello');
          //append every polyline to featureCollection
          for (const path of data['routes'][0]['sections']) {
            const pathRoute = path['polyline'];
            console.log(polyline.decode(pathRoute));
            var routeImage = polyline.decode(pathRoute)['polyline'];
            for (var array of routeImage) {
              const temp = array[0];
              array[0] = array[1];
              array[1] = temp;
            }
            var pathMarker = '';
            if (path['type'] == 'pedestrian') {
              pathMarker = 'Walk';
            }
            else {
              var transitInfo = path['transport'];
              // there are many forms of bus, train, and rail; if mode contains one of them then change the name to be simpler
              if(transitInfo['mode'].toLowerCase().includes('bus')) {
                pathMarker = pathMarker.concat('Bus ');
              }
              else if (transitInfo['mode'].toLowerCase().includes('train')) {
                pathMarker = pathMarker.concat('Train ');
              }
              else if (transitInfo['mode'].toLowerCase().includes('rail')) {
                  pathMarker = pathMarker.concat('Rail ');
              }
              else {
                pathMarker = pathMarker.concat(FormatString(transitInfo['mode']));
              }
              pathMarker = pathMarker.concat(FormatString(transitInfo['name']));
              if (transitInfo['headsign']) {
                pathMarker = pathMarker.concat(FormatString(transitInfo['headsign'].split(' ')[0]));
              }
            }
            // create a marker for the beginning of every polyline with information
            constructMarker('#000', routeImage[0][0], routeImage[0][1], map, pathMarker);
            featureCollection.push({
                'type': 'Feature',
                'geometry': {
                  'type': path['type']=='transit'? 'LineString' : 'MultiPoint',
                  'coordinates':
                  routeImage
                },
            })
          }
          //overwrite data with new polylines
          map.getSource('routes').setData({
            'type': 'FeatureCollection',
            'features': featureCollection
          })
          console.log(map.getSource('routes'));
          //draw lines
          map.addLayer({
            'id': 'transitroutes',
            'type': 'line',
            'source': `routes`,
            'layout': {},
            'paint': {
            'line-color': '#ff0000',
            'line-width': 3
            },
            'filter': ['==', '$type', 'LineString']
          });
          map.addLayer({
            'id': 'walkroutes',
            'type': 'circle',
            'source': `routes`,
            'layout': {},
            'paint': {
              'circle-radius': 5,
              'circle-color': '#0000ff',
              'circle-stroke-color': 'white',
              'circle-stroke-width': 1,
            },
            'filter': ['==', '$type', 'Point']
          });
        })
      })
      .catch((error) => {
        // Handle errors
        console.error("Fetch error:", error);
      });
}