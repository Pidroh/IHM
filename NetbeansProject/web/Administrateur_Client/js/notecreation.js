	var marker;
	function testGeoloc() {
	
		var div = document.getElementById("demoGeoloc");
		if (!navigator.geolocation) {
			div.innerHTML = 'Erreur : votre navigateur ne supporte pas l\'API de Géolocalisation HTML 5';
			return;
		}			
		div.style.height = '500px';
		div.style.width = '570px';
		var options = {
			zoom: 13,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(div, options);
		marker = new google.maps.Marker();
		marker.setMap(map);
		marker.setDraggable(true);
		google.maps.event.addListener(map, 'click', function(event) {
			marker.setPosition(event.latLng);
			marker.setCenter(event.latLng);
		});
		
		navigator.geolocation.getCurrentPosition(
			// Succès
			function (position) {
			
				var lat = position.coords.latitude;
				var lng = position.coords.longitude;
				map.setCenter(new google.maps.LatLng(lat, lng));
				marker.setPosition(new google.maps.LatLng(lat, lng));
			},
			// Erreur
			function (error) {
				div.innerHTML = 'Erreur : ' + error.message;
			},
			// Configuration
			{
				maximumAge: 60000,
				timeout: 2000
			}
		);
	}
	
	var selectOfPath = $('select.notes')[0];
	
	var paths = new collecPaths([
	  {"name" : "Le grand parcour"},
	  {"name" : "La bla"},
	  {"name" : "Le parcours d'arc"}
	]);
	var noteView = new CollecToSelect({
		el : selectOfPath,
		collection : paths
	});
	
	noteView.render();
	paths.add({ name : "Le parcour" });
	noteView.render();
		
function addNoteToPath()
{
	var p = paths.at(selectOfPath.selectedIndex);
	
	var name = document.getElementById("notenameinput").value;
	var body = document.getElementById("notebodyinput").value;
	//alert(marker);
	var a = marker.getPosition().lat();
	var b = marker.getPosition().lng();
	var n = new Note({
		name: name,
		body: body,
		lat: a,
		lng: b
	});
	//alert(n.getLat());
	p.get("notes").add(n);
	alert("Adding "+n.get("name")+ "  to path "+p.get("name") + " at latitude "+a+" at longitude " +b);
}