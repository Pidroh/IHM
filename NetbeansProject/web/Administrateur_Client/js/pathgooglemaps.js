/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function testGeoloc() {
	
            var div = document.getElementById("demoGeoloc");
            if (!navigator.geolocation) {
                    div.innerHTML = 'Erreur : votre navigateur ne supporte pas l\'API de G�olocalisation HTML 5';
                    return;
            }		
            div.style.height = '500px';
		div.style.width = '570px';
            var options = {
			zoom: 13,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
            
            map = new google.maps.Map(div, options);
            if(paths.length > 0){
                selectOfPath.selectedIndex = 0;
                getPathFromSelect();
            }
	}
        
        var markers = [];
        
function showNotesOnMap(notesCol){
    var bounds = new google.maps.LatLngBounds ();
    for (var i=0; i< markers.length; i++) {
        markers[i].setMap(null);

    }
    markers.length = 0;
    /*for (var i=0; i< infos.length; i++) {
        infos[i].close();
    }*/
    for (var i=0; i< notesCol.length; i++) {
        //if(infos.length <= i) infos[infos.length] = new google.maps.InfoWindow();

        var n = notesCol.at(i);
        marker = new google.maps.Marker();
        marker.setMap(map);
        //alert(n.get("lng"));
        //alert(n.get("lat"));
        var p = new google.maps.LatLng(n.get("lat"), n.get("lng"));
        marker.setPosition(p);
        if(!bounds.contains(p))
            bounds.extend(p);
        markers[markers.length] = marker;
        marker.setTitle(n.get("name"));
    }
    map.fitBounds(bounds);
    map.setZoom(map.getZoom()-1);
}

function getFullDistance(notesCol, callback){
    var service = new google.maps.DistanceMatrixService();
    var points = [];
    for (var i=0; i< notesCol.length; i++) {
        //if(infos.length <= i) infos[infos.length] = new google.maps.InfoWindow();

        var n = notesCol.at(i);
        marker = new google.maps.Marker();
        marker.setMap(map);
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