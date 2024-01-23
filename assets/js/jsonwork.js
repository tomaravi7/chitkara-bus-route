const random_path = {
  type: "Feature",
  properties: {
    color: "#FF0000",
  },
  geometry: {
    type: "LineString",
    coordinates: [
      // [76.6598,30.5161],
      // [76.82103918335011,30.65508873013418]
    ],
  },
};
map.on("load", () => {
  map.addSource(`lines52`, {
    type: "geojson",
    data: random_path,
  });
  map.addLayer({
    id: `lin`,
    type: "line",
    source: `lines52`,
    paint: {
      "line-width": 10,
      "line-color": ["get", "color"],
    },
  });
});
