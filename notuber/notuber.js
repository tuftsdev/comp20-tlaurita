// notuber.js
// Author: Teddy Laurita

var username = "nmwMbHID";

var http = new XMLHttpRequest();
var url = "https://defense-in-derpth.herokuapp.com/submit";
var userInfoContent = '<div id="userInfo">' + '<p>Username: ' + username + '</p></div>';

var othersMarkers = [];
var passengerIcon = "passengerMarker.png";
var vehicleIcon = "black_car.png";

var initMap = function() {
    // TODO
    console.log("INSIDE INIT MAP");
    // Check if browser allows for geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            window.userCoords = new google.maps.LatLng(position.coords.latitude,
                                                     position.coords.longitude);

            window.map = new google.maps.Map(document.getElementById("map"), {
                center: userCoords,
                zoom: 14
            });
            window.userMarker = new google.maps.Marker({
                position: userCoords,
                map: map,
                icon: "/userMarker.png"
            });
        });
    }
    else {

        // if no geolocation, open map on Medford, MA
        map = new google.maps.Map(document.getElementById("map"), {
            center: new google.maps.LatLng(42.423844, -71.109231),
            zoom: 14
        });
        userMarker = new google.maps.Marker({
            position: new google.maps.LatLng(42.423844, -71.109231),
            map: map,
            icon: "/userMarker.png"
        });
    }
}

// event handler for http state change
http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
        // TODO
        console.log(http.responseText);
        displayOthers(http.responseText);
    }
}

// apply function that creates all the markers
var placeMarkers = function(userObject, iconString) {
    othersMarkers.push(new google.maps.Marker({
        position: new google.maps.LatLng(userObject.lat, userObject.lng),
        map: map,
        icon: iconString
    }))
    return userObject;
}

// map function that works over JSON returned by POST request
var mapOthers = function(list, apply, icon) {
    for (var i = 0; i < list.length; i++) {
        list[i] = apply(list[i], icon);
    }
}

// determines whether to show vehicles or passengers
var displayOthers = function(responseText) {
    if (responseText["vehicles"]) {
        mapOthers(responseText["vehicles"], placeMarkers, vehicleIcon);
    }
    else {
        mapOthers(responseText["passengers"], placeMarkers, passengerIcon);
    }
}

// retrieve JSON information about other notuber users
var retrieveOthers = function() {
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    userParams = "username=" + username +
                     "&lat=" + userCoords.lat() +
                     "&lng=" + userCoords.lng();
    http.send(userParams);
}

window.onload = function() {
    // TODO
    console.log("INSIDE WINDOW ONLOAD");
    console.log("MAP: " + map);
    console.log("USER COORDS: " + userCoords);
    retrieveOthers();
}
