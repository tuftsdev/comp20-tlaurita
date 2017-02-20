// notuber.js
// Author: Teddy Laurita

notuber = {
    "latitude": 42.364506,
    "longitude": -71.038887,
    "initMap": function initMap() {
        if (navigator.geolocation) {
            // Check if browser allows for geolocation
            navigator.geolocation.getCurrentPosition(function(position) {
                initialLocation = new google.maps.LatLng(
                    this.latitude = position.coords.latitude,
                    this.longitude = position.coords.longitude
                )});
            this.map = new google.maps.Map(document.getElementById("map"), {
                center: {lat: this.latitude, lng: this.longitude},
                zoom: 8
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
    "getLocation": function() {
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
    notuber.getLocation();
}
