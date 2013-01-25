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
			id : 0,
			notes: new collecNotes()
		},
        initialize: function(){
        }
    });
	
	window.collecPaths = Backbone.Collection.extend({
		//localStorage: new Backbone.LocalStorage("collecPathsSaving"),
		model : Path
	});
	
	var CollecToSelect = Backbone.View.extend({
		
	  initialize: function() {
		_(this).bindAll('add', 'remove');
		this._options = [];
		this.collection.each(this.add);	
		this.collection.bind('add', this.add);
		this.numbered = false;		
	  },
	  add : function(note) {
	  	
		var option=document.createElement("option");
		option.text=this.collection.indexOf(note)+1+" - "+note.get("name");
		this._options.push(option);
		
	  },
	  render: function() {
		$(this.el).empty();
		var a = this.el;
		for (var i=0; i< this._options.length; i++) {

			a.add(this._options[i], null);
		}
		_(this._options).each(function(dv) {

		});
		
	  }
	});

	var CollecToList = Backbone.View.extend({
		
	  initialize: function() {
		_(this).bindAll('add', 'remove');
		this._options = [];
		this.collection.each(this.add);	
		this.collection.bind('add', this.add);

	  },
	  add : function(note) {
	  
		this._options.push(note.get("name"));
		
	  },
	  render: function() {
		$(this.el).empty();
		var a = this.el;
		_(this._options).each(function(dv) {
			a.innerHTML+= "<li>"+dv+"</li>";
		});
		
	  }
	});

function saveCollectionToLocal(k, c){
//	alert(JSON.stringify(c));
	localStorage[k] = JSON.stringify(c);
}
