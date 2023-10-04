//address to long and lat
var address1;
var address2;
var city;
var state;
var country;
var pincode;
var lati;
var longi;


function formChanged() {
    address1 = document.getElementsByName("addressline1")[0].value;
    address2 = document.getElementsByName("addressline2")[0].value;
    city = document.getElementsByName("city")[0].value;
    state = document.getElementsByName("state")[0].value;
    country = document.getElementsByName("country")[0].value;
    pincode = document.getElementsByName("pincode")[0].value;

    console.log([address1,address2, city, state , country , pincode ]);
    var address = address1+address2+city+ state+ country;

    // $.get(location.protocol + '//nominatim.openstreetmap.org/search?format=json&q='+address, function(data){
    //    console.log(data);
    // });
}












// map initialisatoin
var map = L.map('map').setView([12.927209828646541, 77.4879806022899], 22);

// osm layer
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(map);

googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
maxZoom: 20,
subdomains:['mt0','mt1','mt2','mt3']
 });

 osm.addTo(map);

 //geolocation

if(!navigator.geolocation){
    console.log("Your browser doesnt support geolocation");
 }
 
 else{
    navigator.geolocation.getCurrentPosition(getPosition);
 }
 var singlemarker;
 function getPosition(position){
    console.log(position);
    lat = position.coords.latitude;
    long = position.coords.longitude;
    var accuracy = position.coords.accuracy;
    var r = 2000;
 
    console.log([lat, long , accuracy]);
 
    singlemarker = new L.marker([lat, long]);
    map.addLayer(singlemarker);  //Current location pinning
    console.log(singlemarker.toGeoJSON());
 }

 
 map.on('click', function(e) {
    lati = e.latlng.lat;
    longi = e.latlng.lng;
    console.log([lati,longi]);
    map.removeLayer(singlemarker);
    singlemarker = new L.marker([lati, longi]);
    map.addLayer(singlemarker); 


    document.getElementById("latlonglat").value = lati; 
    document.getElementById("latlonglong").value= longi;  
});










