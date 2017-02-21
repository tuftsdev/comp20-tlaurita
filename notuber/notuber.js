// notuber.js
// Author: Teddy Laurita

notuber = {
    "username": "nmwMbHID",
    "http": new XMLHttpRequest(),
    "url": "https://defense-in-derpth.herokuapp.com/submit",
    "getPostParams": function() {
        return "username=" + this.username +
               "&lat=" + this.latitude +
               "&lng=" + this.longitude;
    },

    // defaults to Medford MA
    "latitude": 42.423844,
    "longitude": -71.109231,
    "initMap": function() {
        // Check if browser allows for geolocation
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                this.latitude = position.coords.latitude,
                this.longitude = position.coords.longitude
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

    "updateMap": function() {
        // STUB
    }
}

// event handler for http
notuber.http.onreadystatechange = function() {
    if(notuber.http.readyState == 4 && notuber.http.status == 200) {
        console.log(notuber.http.responseText);
        notuber.responseText = notuber.http.responseText;
    }
}

window.onload = function() {
    var http = notuber.http;
    var url = notuber.url;
    // retrieve other user locations
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    http.send(notuber.getPostParams());

    notuber.updateMap();
}
