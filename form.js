const firebaseConfig = {
    apiKey: "AIzaSyCGQOMrIyAO_dWpAOdpuLGcU6dMIE34kp8",
    authDomain: "addressform-eecbc.firebaseapp.com",
    databaseURL: "https://addressform-eecbc-default-rtdb.firebaseio.com",
    projectId: "addressform-eecbc",
    storageBucket: "addressform-eecbc.appspot.com",
    messagingSenderId: "550975264784",
    appId: "1:550975264784:web:0a099ed060c1bb18d41295"
};

const getlocation = () =>{
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((position) => {
            // console.log(position);
            let lat = position.coords.latitude;
            let long = position.coords.longitude;
            // console.log(lat , long);
            callback(lat, long);
        });
    }
};



// firebase conntinuation

firebase.initializeApp(firebaseConfig);

var addressFormDB = firebase.database().ref('addressForm');

document.getElementById('contact-form').addEventListener("submit",submitForm);

function submitForm(e){
    e.preventDefault();

    var name = getElementVal('name');
    var email = getElementVal('email');
    var address1 = getElementVal('latlonglat');
    var address2 = getElementVal('latlonglong');
    var city = getElementVal('city');
    var state = getElementVal('state');
    var country = getElementVal('country');
    var pincode = getElementVal('pincode');
    var latitude = lat;
    var longitude = long;

    // getlocation((latitude, longitude) => {
        // saveMessages(name, email, address1, address2, city, state, country, pincode, latitude, longitude);
    // });
    

    saveMessages(name,email,address1,address2,city,state,country,pincode,latitude,longitude);
}

const saveMessages = ( name ,email , address1 ,address2 ,city ,state ,country ,pincode,latitude,longitude) => {
    var newaddressForm = addressFormDB.push();

    newaddressForm.set({
        name :  name,
        email : email,
        address1 : address1,
        address2 : address2,
        city : city,
        state : state,
        country : country,
        pincode : pincode,
        latitude : latitude,
        longitude : longitude,
    })
    document.getElementById('contact-form').reset();
}

const getElementVal = (id) => {
    return document.getElementById(id).value;
}
