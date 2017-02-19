// notuber.js
// Author: Teddy Laurita

notuber = {
    "initMap": function initMap() {
        this.map = new google.maps.Map(document.getElementById("map"), {
            center: {lat: -34.397, lng: 150.644},
            zoom: 8
          });
    },
    "latitude": 0.0,
    "longitude": 0.0
}
