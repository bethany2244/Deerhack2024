import "./node_modules/@liberty-rider/flexpolyline/index.js";
import polyline from "./node_modules/@liberty-rider/flexpolyline/index.js";
import { constructMarker } from "./marker.js";
import { FormatString } from "./formatstring.js";
import { currentMarker } from "./script.js";
import { errorAni } from "./initialani.js";

const hereApiKey = `g6nnuctjhkfGxqmdV-clZzkcZlq7mTLEyHlj59oFIM8`;

export function fetchTransitInfo(position1, position2, map) {
  const apiUrl = `https://transit.router.hereapi.com/v8/routes?apiKey=${hereApiKey}&origin=${position1[0]},${position1[1]}&destination=${position2[0]},${position2[1]}&return=polyline`;
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      console.log(data);
      // return these for POI centers
      var transitEndpoints = [];
      // check if 'routes' exists
      if (!map.getSource("routes")) {
        map.addSource("routes", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });
      }
      var featureCollection = [];

      //append every polyline to featureCollection
      for (const path of data["routes"][0]["sections"]) {
        const pathRoute = path["polyline"];
        var routeImage = polyline.decode(pathRoute)["polyline"];
        for (var array of routeImage) {
          const temp = array[0];
          array[0] = array[1];
          array[1] = temp;
        }
        var pathMarker = "";
        if (path["type"] == "pedestrian") {
          // pedestrian code
          pathMarker = "Walk";
        } else {
          //transit code
          // append arrival and destination to transitEndpoints
          console.log(data);
          transitEndpoints.push([
            path["departure"]["place"]["location"]["lat"],
            path["departure"]["place"]["location"]["lng"],
          ]);
          transitEndpoints.push([
            path["arrival"]["place"]["location"]["lat"],
            path["arrival"]["place"]["location"]["lng"],
          ]);
          // change transit marker text
          var transitInfo = path["transport"];
          // there are many forms of bus, train, and rail; if mode contains one of them then change the name to be simpler
          if (transitInfo["mode"].toLowerCase().includes("bus")) {
            pathMarker = pathMarker.concat("Bus ");
          } else if (transitInfo["mode"].toLowerCase().includes("train")) {
            pathMarker = pathMarker.concat("Train ");
          } else if (transitInfo["mode"].toLowerCase().includes("rail")) {
            pathMarker = pathMarker.concat("Rail ");
          } else {
            pathMarker = pathMarker.concat(FormatString(transitInfo["mode"]));
          }
          pathMarker = pathMarker.concat(FormatString(transitInfo["name"]));
          if (transitInfo["headsign"]) {
            pathMarker = pathMarker.concat(
              FormatString(transitInfo["headsign"].split(" ")[0])
            );
          }
          // add the time
          pathMarker = pathMarker.concat(" ");
          pathMarker = pathMarker.concat(
            new Date(path["arrival"]["time"]).getHours().toString()
          );
          pathMarker = pathMarker.concat(":");
          pathMarker = pathMarker.concat(
            new Date(path["arrival"]["time"]).getMinutes().toString()
          );
        }
        // create a marker for the beginning of every polyline with information
        constructMarker(
          "#000",
          routeImage[0][0],
          routeImage[0][1],
          map,
          pathMarker,
          currentMarker
        );
        featureCollection.push({
          type: "Feature",
          geometry: {
            type: path["type"] == "transit" ? "LineString" : "MultiPoint",
            coordinates: routeImage,
          },
        });
      }
      //overwrite data with new polylines
      map.getSource("routes").setData({
        type: "FeatureCollection",
        features: featureCollection,
      });
      //draw lines
      if (!map.getLayer("transitroutes")) {
        map.addLayer({
          id: "transitroutes",
          type: "line",
          source: `routes`,
          layout: {},
          paint: {
            "line-color": "#ff0000",
            "line-width": 3,
          },
          filter: ["==", "$type", "LineString"],
        });
      }
      if (!map.getLayer("walkroutes")) {
        map.addLayer({
          id: "walkroutes",
          type: "circle",
          source: `routes`,
          layout: {},
          paint: {
            "circle-radius": 5,
            "circle-color": "#0000ff",
            "circle-stroke-color": "white",
            "circle-stroke-width": 1,
          },
          filter: ["==", "$type", "Point"],
        });
      }
      console.log(transitEndpoints);
      return transitEndpoints;
    })
    .catch((error) => {
      // Handle errors
      // console.error("Fetch error:", error);
      errorAni();
    });
}
