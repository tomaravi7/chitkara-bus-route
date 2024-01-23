mapboxgl.accessToken = 'pk.eyJ1IjoidG9tYXJhdmk3IiwiYSI6ImNrems2ZG94ODBkbGMybnRhN2tnZGlsb3cifQ.UH7MohV8XWRwA4-FmdhpLw';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11?optimize=true',
  center: [76.6598,30.5161],
  zoom: 10
});
//bounds that map sticks to in the starting
const bounds = [
  [78, 21], // Southwest coordinates
  [93,25] // Northeast coordinates
  ];

//Full Screen Option
map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');

//map-controls
map.addControl(new mapboxgl.NavigationControl(),'bottom-right');

//Get user location
map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  trackUserLocation: true,
  showUserHeading: true
  }), 'bottom-right');

//default marker on Chitkara University
const hm = document.createElement('div');
hm.className = 'marker';
hm.style.backgroundImage = `url('./assets/images/favicon.png')`;
const marker1 = new mapboxgl.Marker(hm).setLngLat([76.6598,30.5161]).addTo(map);