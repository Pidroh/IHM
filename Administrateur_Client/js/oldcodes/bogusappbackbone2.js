	alert("The code is loading");
	var Note = Backbone.Model.extend({
		defaults : {
			name : "",
			body : ""
		},
        initialize: function(){
//            alert("Welcome to this world");
        }
    });
    
	var userNotes = Backbone.Collection.extend({
		model : Note
	});
	
	DonutView = Backbone.View.extend({
	  tagName : "option",
	  className : "donut",
		events: {
		"dblclick"                : "open",
		},
		
		open: function() {
			alert("SASAS");
		},
  
	  render : function() {
		this.el.innerHTML = this.model.get('name');
	 
		return this;
	  }
	  
	});
	
	var UpdatingDonutView = DonutView.extend({
		initialize : function(options) {
		this.render = _.bind(this.render, this);
 
		this.model.bind('change:name', this.render);
		}
	});

	var DonutCollectionView = Backbone.View.extend({
	  initialize : function() {
		// bind the functions 'add' and 'remove' to the view.
		_(this).bindAll('add', 'remove');
	 
		// create an array of donut views to keep track of children
		this._donutViews = [];
	 
		// add each donut to the view
		this.collection.each(this.add);
	 
		// bind this view to the add and remove events of the collection!
		this.collection.bind('add', this.add);
		this.collection.bind('remove', this.remove);
	  },
	 
	  add : function(Note) {
		// We create an updating donut view for each donut that is added.
		var dv = new UpdatingDonutView({
		  tagName : 'option',
		  model : Note
		});
	 
		// And add it to the collection so that it's easy to reuse.
		this._donutViews.push(dv);
	 
		// If the view has been rendered, then
		// we immediately append the rendered donut.
		if (this._rendered) {
		  //$(this.el).append(dv.render().el);
		  alert(dv.render().el);
		  $(this.el).add(dv.render().el);
		}
	  },
	 
	  remove : function(model) {
		var viewToRemove = _(this._donutViews).select(function(cv) { return cv.model === model; })[0];
		this._donutViews = _(this._donutViews).without(viewToRemove);
	 
		if (this._rendered) $(viewToRemove.el).remove();
	  },
	 
	  render : function() {
		// We keep track of the rendered state of the view
		this._rendered = true;
	 
		$(this.el).empty();
	 
		// Render each Donut View and append them.
		_(this._donutViews).each(function(dv) {
		//alert(this.$('select.notes'));
		  this.$('selector.notes').append(dv.render().el);
		  //this.el.add(dv.render().el);
		  //this.el.append(dv.render().el);
		});
	 
		return this;
	  }
	});
	
	var notes = new userNotes([
	  {"name" : "Boston Cream"},
	  {"name" : "Lemon-Filled"},
	  {"name" : "Rusty Iron Shavings"}
	]);
	alert("collection declared");
	var donutCollectionView = new DonutCollectionView({
	  collection : notes,
	  el : $('selector.notes')[0]
	});
	alert("Before render");
	donutCollectionView.render();
	alert("After render");
	notes.add({ name : "Lemon Filled" });
	alert("After add");