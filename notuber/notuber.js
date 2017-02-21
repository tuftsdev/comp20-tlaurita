// notuber.js
// Author: Teddy Laurita


notuber = {
    "http": new XMLHttpRequest(),
    "url": "https://defense-in-derpth.herokuapp.com/submit",
    "getPostParams": function() {
        // STUB
        return 0;
    },

    // defaults to Medford MA
    "latitude": 42.423844,
    "longitude": -71.109231,
    "initMap": function() {
        // TODO
        console.log("INSIDE INIT MAP");
        // Check if browser allows for geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                // TODO
                console.log("GEOLOCATION LAT: " + position.coords.latitude + " LONG: " + position.coords.longitude);
                this.latitude = position.coords.latitude,
                this.longitude = position.coords.longitude
                // TODO
                console.log("LAT: " + this.latitude + "\nLONG: " + this.longitude);
                this.map = new google.maps.Map(document.getElementById("map"), {
                    center: {lat: this.latitude, lng: this.longitude},
                    zoom: 14
                });
            });
        }
        else {
            // if no geolocation, open map on Boston, MA
            this.map = new google.maps.Map(document.getElementById("map"), {
                center: {lat: this.latitude, lng: this.longitude},
                zoom: 8
              });
        }

    },
    "updateLocation": function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
            });
        }
        else {
            document.getElementById("infoPanel").innerHTML =
                                "Geolocation not supported by this browser";
        }
    },
}

window.onload = function() {
    // TODO
    console.log("OUTSIDE GEO :: \nLAT: " + this.latitude + "\nLONG: " + this.longitude);
    // retrieve other user locations
    notuber.http.open("POST", notuber.url, true);
    notuber.http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    var params = notuber.getPostParams();

}
