	alert("The code is loading");
	var Note = Backbone.Model.extend({
		defaults : {
			name : "",
			body : "",
			lat : -1,
			lng : -1
		},
        initialize: function(){
        }
    });

	var collecNotes = Backbone.Collection.extend({
		model : Note
	});
	
	var Path = Backbone.Model.extend({
		defaults : {
			name : "",
			body : "",
			notes: new collecNotes()
		},
        initialize: function(){
        }
    });
	
	var collecPaths = Backbone.Collection.extend({
		model : Path
	});
	
	var CollecToSelect = Backbone.View.extend({
		
	  initialize: function() {
		_(this).bindAll('add', 'remove');
		this._options = [];
		this.collection.each(this.add);	
		this.collection.bind('add', this.add);
		
	  },
	  add : function(note) {
	  
		var option=document.createElement("option");
		option.text=note.get("name");
		this._options.push(option);
		
	  },
	  render: function() {
		$(this.el).empty();
		var a = this.el;
		_(this._options).each(function(dv) {
			a.add(dv, null);
		});
		
	  }
	});
	
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
	var body = document.getElementById("notenameinput").value;
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