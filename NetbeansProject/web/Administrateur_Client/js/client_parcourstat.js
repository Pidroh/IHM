/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var i = localStorage["client_selectedpath"];
var paths = loadPaths("clientlocalpaths");
//alert(i);
//alert(paths);
var currentPath = paths.at(i);
$("#pathtitle")[0].innerHTML = "Parcour: "+ currentPath.get("name");
var mapOk = false;
var allNotes = currentPath.get("notes");
var htmlthing = $("#tableNotesBody")[0];

testGeoloc();

var currentNoteId = localStorage["currentnote"+currentPath.get("name")+i];
if(!currentNoteId) currentNoteId = 0;
var distanceAndTime = [];
calculateDistanceAndTime();
updateButtonAndNote();

var pathStats = loadPathStats();

function updateButtonAndNote(){
    showNoteOnMap(allNotes.at(currentNoteId));
    localStorage["currentnote"+currentPath.get("name")+i] = currentNoteId;
    //alert("what o.o");
    if(currentNoteId >= allNotes.length -1){
        $("#nextButton")[0].onclick = "";
        $("#nextButton")[0].style.color = "gray";
    } else{
        $("#nextButton")[0].onclick = nextNote;
        $("#nextButton")[0].style.color = "white";
    }
    renderNotes();
    routeToMarker();
}

function nextNote(){
    currentNoteId++;
    var pathStat = pathStats.where({name: currentPath.get("name")})[0];
    if(!pathStat){
        pathStat = new PathStats();
        pathStats.add(pathStat);
    }
    pathStat.set("name", currentPath.get("name"));
    var time = pathStat.get("time");
    time += distanceAndTime[currentNoteId+"t"];
    pathStat.set("time", time);
    var distance = pathStat.get("distance");
    distance += distanceAndTime[currentNoteId+"d"];
    pathStat.set("distance", distance);
    //pathStats.reset();
    savePathStats(pathStats);
    
    updateButtonAndNote();
}
function resetCurrentNote(){
    currentNoteId = 0;
    updateButtonAndNote();
}

function renderNotes(){
    var htmlString = "";
    for (i=0; i< allNotes.length; i++) {
        if(i == currentNoteId)
            htmlString += "<tr style='background-color: yellow;'>";
        else
            htmlString += "<tr>";
        htmlString += "<td>";
        htmlString += allNotes.at(i).get("name");
        htmlString += "</td>";
        htmlString += "<td>";
        htmlString += allNotes.at(i).get("body");
        htmlString += "</td>";
        htmlString += "<td>";
        if(mapOk){
            htmlString += distanceAndTime[i+"d"]+" meters";
        }
        else{
            htmlString += "?";
        }
        htmlString += "</td>";
        htmlString += "<td>";
        if(mapOk){
            htmlString += (distanceAndTime[i+"t"]/60).toFixed(2)+" minutes";
        }
        else{
            htmlString += "?";
        }
        htmlString += "</td>";
        htmlString += "</tr>";
    }
    htmlthing.innerHTML = htmlString;
}

function calculateDistanceAndTime(){
    if(allNotes.length > 1)
        getFullDistance(allNotes, distanceCallBack);
}

    function distanceCallBack(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          alert('Error was: ' + status);
        } else {
            mapOk = true;
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          distanceAndTime[0+"d"] = 0;
          distanceAndTime[0+"t"] = 0;
          for (var i = 0; i < origins.length-1; i++) {
            var results = response.rows[i].elements;
            distanceAndTime[i+1+"d"] = results[i+1].distance.value;
            distanceAndTime[i+1+"t"] = results[i+1].duration.value;
          }
          updateButtonAndNote();
          
        }
    }