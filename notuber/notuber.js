// notuber.js
// Author: Teddy Laurita

var http = new XMLHttpRequest();
var url = "https://defense-in-derpth.herokuapp.com/submit";
var userInfoContent = '<div id="userInfo">' + '<p>Username: ' + username + '</p></div>';

var username = "nmwMbHID";
var othersMarkers = [];
var userIcon = "userMarker.png";
var passengerIcon = "passengerMarker.png";
var vehicleIcon = "black_car.png";

var initMap = function() {
    var defaultLoc = new google.maps.LatLng(42.423844, -71.109231);
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: defaultLoc
    });
    userInfoWindow = new google.maps.InfoWindow({map: map});

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            userCoords = new google.maps.LatLng(position.coords.latitude,
                                                position.coords.longitude);
            userMarker = new google.maps.Marker({
                position: userCoords,
                map: map,
                icon: userIcon
            });
            userInfoWindow.setPosition(userCoords);
            userInfoWindow.setContent("<p>You are here!" +
                                      "<br/>Your Username: " +
                                      username +
                                      "</p>");
            map.setCenter(userCoords);
        });
    }
    else {
        alert("Your browser doesn't support geolocation!");
    }
}


// event handler for http state change
http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
        displayOthers(JSON.parse(http.responseText));
    }
}

// apply function that creates all the markers
var placeMarkers = function(userObject, iconString) {
    othersMarkers.push(new google.maps.Marker({
        position: new google.maps.LatLng(userObject.lat, userObject.lng),
        map: map,
        icon: iconString
    }));
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
    if (responseText["vehicles"] != undefined) {
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
    retrieveOthers();
}
