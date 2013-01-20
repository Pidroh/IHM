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
