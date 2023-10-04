   // map initialisatoin
   var map = L.map('map').setView([12.927209828646541, 77.4879806022899], 19);

   var lat;
   var long;
   var nearestlat;
   var nearestlng;
   var routingControl = null;

   let getData = async()=>{
    let res = await fetch("https://api.thingspeak.com/channels/2237307/fields/2.json?results=2");
    let data = await res.json();
    let percentage = data.feeds[0].field2;
    let r;
    if(percentage>0 && percentage<20)
      {
        r = 800;
   
      }
    else if (percentage>=20 && percentage<40){
      r = 8000;
    }
    else if(percentage>=40 && percentage<60){
      r  = 10000 ;
    }
    else if(percentage>=60 && percentage<80){
      r = 15000 ; 
    }
    else{
      r = 18000;
    }

      
  
      return r;
    
  }

   // osm layer
   var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

   googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
   maxZoom: 20,
   subdomains:['mt0','mt1','mt2','mt3']
    });

   //  googleSat.addTo(map);
   var myIcon = L.icon({
       iconUrl : 'charging-station.png',
       iconSize: [40,40],

    })
   

 

osm.addTo(map);


//geolocation

if(!navigator.geolocation){
   console.log("Your browser doesnt support geolocation");
}

else{
   navigator.geolocation.watchPosition(getPosition);
}


// async function getbattery(){

// }
var singlemarker;
var circle;

async function getPosition(position){
   console.log(position);
   lat = position.coords.latitude;
   long = position.coords.longitude;
   var accuracy = position.coords.accuracy;
   let r;
   r=await getData();
   console.log(`radius:${r}`);
   

   console.log([lat, long , accuracy]);




   if(featuregroup){
    map.removeLayer(featuregroup);
   }
  
   var singlemarker = L.marker([lat, long]);  //Current location pinning
    // circle
  //  var circle = L.circle([lat , long], {radius:r}); // Circle

   var featuregroup = L.featureGroup([singlemarker]).addTo(map);

   map.fitBounds(featuregroup.getBounds())
   console.log(singlemarker.toGeoJSON());
   
}



//let id;
//id = navigator.geolocation.watchPosition(getPosition);




function createCustomIcon (feature, latlng) {
    let myIcon = L.icon({
      iconUrl: 'charging-station.png',
      iconSize:     [25, 25], // width and height of the image in pixels
    //   shadowSize:   [35, 20], // width, height of optional shadow image
      iconAnchor:   [12, 12], // point of the icon which will correspond to marker's location
      shadowAnchor: [12, 6],  // anchor point of the shadow. should be offset
      popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    })
    return L.marker(latlng, { icon: myIcon })
  }
  
  // create an options object that specifies which function will called on each feature
  let myLayerOptions = {
    pointToLayer: createCustomIcon
  }

var pointJson= L.geoJson(pointJson, myLayerOptions).addTo(map);

// direction to nearest location
searchIndex = leafletKnn(pointJson);

map.fitBounds(pointJson.getBounds());






var removeRoutingControl = function () {
  if (routingControl != null) {
      map.removeControl(routingControl);
      routingControl = null;
  }
};


map.on('click', function(ev){
   // Perform a KNN search with maximum 1 element in the result set, 
   // then pick the first result from the result set.
    nearestResult = new searchIndex.nearest(ev.latlng, 1)[0];

    if (routingControl!=null){
        removeRoutingControl();
    }


   nearestlat =  nearestResult.lat;
   nearestlng =  nearestResult.lon;
 
   // The result has 'lat' and 'lon' properties...
   console.log('nearest lat: ', nearestResult.lat);
   console.log('nearest lng: ', nearestResult.lon);
 
   // ... as well as a 'layer' property containing the reference to the `L.Layer`,
   // which we can do something with.
   nearestResult.layer.bindPopup("nearest station from clicked location!").openPopup();
   routingControl = L.Routing.control({
      waypoints: [
        L.latLng(lat, long),
        L.latLng(nearestlat,nearestlng )
      ]
    }).addTo(map);
    
   
 
 });


