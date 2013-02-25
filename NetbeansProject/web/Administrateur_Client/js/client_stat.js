var htmlthing = $("#tableNotesBody")[0];

var pathStats = loadPathStats();

var htmlString = "";
for (var i=0; i< pathStats.length; i++) {
    htmlString += "<tr>";
    htmlString += "<td>";
    htmlString += pathStats.at(i).get("name");
    htmlString += "</td>";
    htmlString += "<td>";
    htmlString += pathStats.at(i).get("distance")+" meters";
    htmlString += "</td>";
    htmlString += "<td>";
    htmlString += (pathStats.at(i).get("time")/60).toFixed(2)+" minutes";
    htmlString += "</td>";
    htmlString += "</tr>";
}

htmlthing.innerHTML = htmlString;
