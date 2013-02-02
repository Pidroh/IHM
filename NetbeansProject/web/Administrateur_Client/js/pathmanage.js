	var marker;
	alert("code loaded");
        
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
	
	var selectOfPath = $('select.paths')[0];
	
        var markers = [];
        
	var paths;
        paths = loadPaths("mypaths");
	if(!paths) paths = new collecPaths();
        
	var pathView = new CollecToSelect({
		el : selectOfPath,
		collection : paths
	});
        
	pathView.render();
	var selectOfNote = $('select.notes')[0];
        var noteView;
        
        
        var currentPath;
        //var infos = [];
        
function getPathFromSelect(){
    var id = selectOfPath.selectedIndex;
    var model = paths.at(id);
    if(model){
     //   alert(model.get("notes"));
        document.getElementById("parcournameinput").value = model.get("name");
        document.getElementById("parcourbodyinput").value = model.get("body");
        currentPath = model;
        //alert(model.get("notes"));//
        if(!noteView) noteView = new CollecToSelect({
            
            collection : model.get("notes"),
            el : selectOfNote
                
	});
        noteView.collection = model.get("notes");
        noteView.render();
        var notesCol =  model.get("notes");
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
    } else{
        alert("parcours n'est pas valide");
    }
}
function newPath(){
    var p = new Path({ 
        name : "Nouveau parcour",
        notes : new collecNotes()
    });
    
    paths.add(p);
    saveCollectionToLocal("mypaths",paths);
    pathView.render();
    var indexOf = paths.indexOf(p);
    selectOfPath.selectedIndex = indexOf;
    getPathFromSelect();
//alert(JSON.stringify(paths));
}
function updatePath(){
    currentPath.set("name", $('#parcournameinput')[0].value);
    currentPath.set("body", $('#parcourbodyinput')[0].value);
    saveCollectionToLocal("mypaths",paths);
    pathView.render();
}
function goToNewNote(){
    localStorage["currentpath"] = paths.indexOf(currentPath);
    window.location.href="notecreate.html";
}
function deleteNote(){
    if(currentPath){
        if(selectOfNote.selectedIndex >= 0){
            currentPath.get("notes").remove(currentPath.get("notes").at(selectOfNote.selectedIndex));
            noteView.render();
            saveCollectionToLocal("mypaths",paths);
            getPathFromSelect();
        } else{
            alert("Il n'y a pas de note selectionne");
        }
    }
}
function swapNotes(index1, index2){
    if(currentPath){
        var c =noteView.collection; 
        if(index1 >= 0 && index2>= 0 && index1 < c.length && index2 < c.length){
            var a = c.models[index2];
            c.models[index2] = c.models[index1];
            c.models[index1] = a;
            //c.models[index1] = c.models.splice(index2, 1, c.models[index1]);
            saveCollectionToLocal("mypaths",paths);
            noteView.render();
            selectOfNote.selectedIndex = index2;
        }
    }
}
function bringNoteUp(){
    var index1 = selectOfNote.selectedIndex;
    var index2 = selectOfNote.selectedIndex-1;
    swapNotes(index1, index2);
}
function bringNoteDown(){
    var index1 = selectOfNote.selectedIndex;
    var index2 = selectOfNote.selectedIndex+1;
    swapNotes(index1, index2);
}
function editNote(){
    if(currentPath){
        
        if(selectOfNote.selectedIndex >= 0){
            localStorage["currentnote"] = selectOfNote.selectedIndex;
            localStorage["currentpath"] = paths.indexOf(currentPath);
            window.location.href="editnote.html";
        } else{
            alert("Il n'y a pas de note selectionne");
        }
    }
}
function sendToServer(){
    var dataJSON = JSON.stringify(paths);
    var result = $.ajax({
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json' 
            },
            url: 'http://localhost:8080/NetbeansProject/webresources/aministratorSave', //'http://localhost:8080/WebServiceInvocation/webresources/generic/',//'webresources/generic',
            type: 'PUT', //webresources/generic
            data: dataJSON,
            mimeType: 'text/JSON',
            success: function() { alert('Envoye au serveur!'); }
        });
        result.fail(function(jqXHR, textStatus) {
            alert( "Request failed: " + textStatus );
        });
}
$('select.paths').on("change", getPathFromSelect);
$('#parcournameinput').on("change", updatePath);
$('#parcourbodyinput').on("change", updatePath);
$('#parcournameinput').on("keyup", updatePath);
$('#parcourbodyinput').on("keypress", updatePath);