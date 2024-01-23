const home=[76.6598,30.5161];
var mapmarker;
var route1=[[76.6598,30.5161,"Chitkara University"],[76.82103918335011,30.65508873013418,"Zirakpur"],[76.3869,30.339,"Patiala"],[76.7821,30.3752,"Ambala"]];
var route2=[[75.1598,30.2161,"Random Place 1"],[75.657,29.5161,"Random place 2"],[76.0297,30.9164,"Random Place 2"]];
var route3=[[76.82102,30.65495,"Zirakpur","7:45 Am"],[76.60217,30.49001,"Rajpura","7:45 Am"]];
var route52=[[ 76.59328375933784,30.472870878302427,"Savita Maternity And Nursing Home","7:45 AM"],[76.59066482988008,30.4766247542306,"K.K. Seniory Secondry School","7:47 AM"],[ 76.58114288910686, 30.467976701134198,"Shiv Mandir Road","7:49 AM"],[ 76.58025522680367, 30.47050336996626,"Shree Durga Mandir(Town Bus Stand)","7:51 AM"],[ 76.5921485748213, 30.47131968913632, "Gurudwara Singh Sabha","7:53 AM"], [ 76.58406664986224, 30.47841371757407, "AP Jain Hospital", "7:55 AM"],[76.5967486691324,30.471427428631834,"ITI Lights", "7:58 AM"],[ 76.59375244848594,30.480029075424053,"Alpas Cinema","7:59 AM"],[ 76.60032745563967, 30.492491451595804, "Over Bridge", "8:01 AM"],[76.59370129796828,30.485063827331867, "Bus Stand", "8:03 AM"]];
var route65=[[76.2263807,30.7022546,"Khanna Books Market","Not Time"],[76.2518824,30.6875309,"Khanna Bus Stand","No Time"],[76.2919973,30.663474,"Gobindgarh Bus Stand","No time"],[76.600344,30.4921078,"Gagan Chowk","No time"],[76.6316164,30.5077263,"Chitkara","9:00 AM"]];
var route42=[[76.3669233,30.3404806,"23 no. phatak"],[76.3597119,30.3407675,"Gopal sweets"],[76.3930982,30.3431826,"21 No. Lights"],[76.4319042,30.3401079,"Chaura Moad"],[76.6578691,30.5158619,"Chitkara University"],[76.3599153,30.3400322,"Patiala Cantt station"]];
var route43=[[76.3948961,30.3172716,"RAGHO MAJRA"],[76.3959603,30.3133622,"NIS"],[76.3899767,30.3147004,"New  Moti Bagh"],[76.3848998,30.3167922,"Officers Colony"],[76.3828212,30.3211106,"YPS Chowk"],[76.3927468,30.3222815,"Modi College Chowk"],[76.3921334,30.3256629,"Sai Market"],[76.3895622,30.3252001,"Polo Ground"],[76.3889517,30.3311724,"Fountain chowk"],[76.4552839,30.3565059,"Punjabi University"]];
var route48=[[76.6584599,30.5174613,"Chitkara University"],[76.5244361,30.4159055,"Muradpur"],[76.4726307,30.378289,"Bahadurgarh (Gotze india Ltd.)"],[76.455413,30.3566547,"Radha Swami Satsang"],[76.4272035,30.3530445,"Virk Colony ( River Bridge)"],[76.4178333,30.362812,"P.L.W. (DMW) Flyover"]];
var route41=[[76.6599739,30.514781,"Chitkara university"],[76.4039655,30.3713792,"Sirhind bypass"],[76.4021072,30.3684334,"Sunrise hotel"],[76.4032097,30.361567,"Petrol pump"],[76.3989213,30.3531043,"DLF COLONEY"],[76.3940921,30.3552291,"Kohali sweet"]];
var routeactive=[[],[]];
var currentMarkers=[];
var removelinesflag=0;
//function called when choice is made
function routenum(choice)
{
  document.getElementById("routenumber").innerHTML = `Route ${choice}`;
  removemarker(); //remove markers for previous routes
  if(removelinesflag>0){
    removelines();
  }
  removelinesflag+=1;
  switch(choice)
  {
    case 1:routeactive=route1;
      break;
    case 2:routeactive=route2;
      break;
    case 3:routeactive=route3;
      break;
    case 52:routeactive=route52;
    break;
    case 65:routeactive=route65;
    break;
    case 42:routeactive=route42;
    break;
    case 43:routeactive=route43;
    break;
    case 48:routeactive=route48;
    break;
    case 41:routeactive=route41;
    break;
    default:alert("This route doesnt Exist");
      console.log("Error in selecting route");
  }
  target=[routeactive[0][0],routeactive[0][0+1]]; //for zooming in on new route stop number 0
  addmarker();// add new markers for newly selected route
  addlines(); //addlines btw new stops
  zoom_to_selected_route(); //zoom to newly selected route
}
// function for adding new markers
function addmarker()
{
  for(i=0;i<routeactive.length;i++)
  {
    j=0;
      const geojson = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [routeactive[i][j],routeactive[i][j+1]],
              zoom: 14,
              bearing: 0,
              pitch: 0
            },
            'properties': {
              'title': routeactive[i][j+2],
              'description': `Stop ${i+1}\n`,
              'description2': `Time : ${routeactive[i][j+3]}`
            }
          }
        ]
      };
      for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';
        el.innerHTML=`<p class="stop_number_show">${i+1}</p>`;
        // make a marker for each feature and add to the map
        const marker1=new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}<br>${feature.properties.description2}</p>`
            )
        ).addTo(map);
        currentMarkers.push(marker1);
        marker1.togglePopup(); //to open pop ups automatically
      }
  }
}
//removing old route markers
function removemarker()
{
  for (var i=currentMarkers.length-1;i>=0;i--) {
    currentMarkers[i].remove();
  }
}
// zoom to stop 0 of newly selected route
function zoom_to_selected_route(){
  map.flyTo({
    center: target,
    zoom: 14,
    bearing: 0,
    speed: 0.6,
    curve: 1.6,
    easing: (t) => t,
    essential: true
  });
}
// reset back to home
function fly_to_home(){
  map.flyTo({
    center: home,
    zoom: 10,
    speed: 0.6,
    curve: 1.6,
    easing: (t) => t,
    essential: true
  })
}