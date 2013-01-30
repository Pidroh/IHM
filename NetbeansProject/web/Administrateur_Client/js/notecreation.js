	var marker;
	alert("code loaded");

	
	var selectOfPath = $('select.notes')[0];
	
        paths = loadPaths("mypaths");
	//var paths = new collecPaths();
        
	var noteView = new CollecToSelect({
		el : selectOfPath,
		collection : paths
	});
	noteView.render();
        
        selectOfPath.selectedIndex = localStorage["currentpath"];
		
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
        saveCollectionToLocal("mypaths", paths);
        //paths = loadPaths("mypaths");
        window.location.href="parcour.html";
	//alert("Adding "+n.get("name")+ "  to path "+p.get("name") + " at latitude "+a+" at longitude " +b);
}
