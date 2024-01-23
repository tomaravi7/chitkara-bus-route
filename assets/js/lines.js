function addlines() {
    for(i=0;i<routeactive.length-1;i++){
        map.addSource(`lines${i}`, {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {
                    color: "#FF0000",
                  },
                  geometry: {
                    type: "LineString",
                    coordinates: [
                        [routeactive[i][j],routeactive[i][j+1]],
                        [routeactive[i+1][j],routeactive[i+1][j+1]]
                    ],
                  },
                },
              ],
            },
          });
          map.addLayer({
            id: `lin${i}`,
            type: "line",
            source: `lines${i}`,
            paint: {
              "line-width": 5,
              "line-color": ["get", "color"],
            },
          });
    }      
}
// removing source and layers of old route before adding new ones
function removelines(){
    for(i=0;i<routeactive.length-1;i++){
        map.removeLayer(`lin${i}`)
        map.removeSource(`lines${i}`);
    }
}