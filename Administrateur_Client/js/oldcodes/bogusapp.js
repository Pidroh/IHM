alert("Hello World!");

var LISTOFNOTESID = "listofnotes";
var NAMETEXTFIELDID = "nametextfield";
var BODYTEXTAREAID = "bodytextarea";

var notes=new Array();
var currentIndex = -1;

function updateList()
{
	currentIndex = document.getElementById(LISTOFNOTESID).selectedIndex;
	var list = document.getElementById(LISTOFNOTESID);
	while(list.length != 0) list.remove(0);
	for (var i=0;i<notes.length;i++)
	{
		var option=document.createElement("option");
		option.text=notes[i].name;
		list.add(option, null);
	}
	document.getElementById(LISTOFNOTESID).selectedIndex = currentIndex;
}

function showCurrentIndex(){
	//alert(document.getElementById(NAMETEXTFIELDID).value);
	if(currentIndex >= notes.length || currentIndex <0){
		document.getElementById(NAMETEXTFIELDID).value = "";
		document.getElementById(BODYTEXTAREAID).value = "";
	} else{
		document.getElementById(NAMETEXTFIELDID).value = notes[currentIndex].name;
		document.getElementById(BODYTEXTAREAID).value = notes[currentIndex].body;
	}
	
	//alert(document.getElementById(NAMETEXTFIELDID).value);
}

function updateCurrentIndexAndShow(){

	currentIndex = document.getElementById(LISTOFNOTESID).selectedIndex;
	showCurrentIndex();
} 

function creer()
{
	currentIndex = notes.length;
	notes[currentIndex] = new Object();
	notes[currentIndex].name = "Nouvelle Note";
	notes[currentIndex].body = "";
	updateList();
	updateCurrentIndexAndShow();
	//showCurrentIndex();
}

function updateNoteData()
{
	notes[currentIndex].name = document.getElementById(NAMETEXTFIELDID).value;
	notes[currentIndex].body = document.getElementById(BODYTEXTAREAID).value;
	updateList();

}

function effacer()
{
	notes.splice(currentIndex, 1);
	updateList();
	updateCurrentIndexAndShow();
} 