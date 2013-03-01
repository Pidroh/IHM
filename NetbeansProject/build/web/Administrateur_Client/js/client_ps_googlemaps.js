/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var map;
marker = new google.maps.Marker();
var directionDisplay;
var directionsService = new google.maps.DirectionsService();

function testGeoloc() {
    var div = document.getElementById("map_canvas");
    div.style.height = '200px';
    var options = {
			zoom: 13,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
    map = new google.maps.Map(div, options);
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);
}

function showNoteOnMap(note){
    marker.setMap(map);
    var lat = note.get("lat");
    var lng = note.get("lng");
    map.setCenter(new google.maps.LatLng(lat, lng));
    marker.setPosition(new google.maps.LatLng(lat, lng));
}

function getFullDistance(notesCol, callback){
    var service = new google.maps.DistanceMatrixService();
    var points = [];
    for (var i=0; i< notesCol.length; i++) {
        //if(infos.length <= i) infos[infos.length] = new google.maps.InfoWindow();

        var n = notesCol.at(i);
        var p = new google.maps.LatLng(n.get("lat"), n.get("lng"));
        points[i] = p;
        
    }
    service.getDistanceMatrix(
          {
            origins: points,
            destinations: points,
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          }, callback);
}

function routeToMarker(){
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);
            var start = pos;
        var end = marker.getPosition();
        var request = {
            origin:start,
            destination:end,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });
                                             
            
          }, function() {
            
          });
        } else {
        }
}