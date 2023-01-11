
/*---------------------------------------------------------------------------*/

function Tastaturi()
{
	//console.log("constructor Projects");

	this.id="Tastaturi";
	this.children=null;
};

/*---------------------------------------------------------------------------*/

Tastaturi.prototype.read=function()
{
	console.log("Tastaturi.read");
	
	$("#main-panel").empty();
	
	var Tastaturi=this;
	$.ajax(
	{
		url: "./Tastaturi.php?read=1",
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		Tastaturi.onRead(JSON.parse(data));
	});
};

Tastaturi.prototype.onRead=function(data)
{
	console.log("Tastaturi.onRead");
	
	var items=data.items;
	
	this.children=new Array();
	for(i=0;i<items.length;i++)
	{
		this.children[i]=new Tastatura(
			items[i].id,
			items[i].producator,
			items[i].tip_cablu,
			items[i].pret,
			items[i].culoare,
			items[i].rgb,
			items[i].creation_date);
	}
	console.log("loaded the children");
	console.log(this.children);
	this.show();
};

Tastaturi.prototype.show=function()
{
	console.log("Tastaturi.show");
	
	var divTastaturi=$('<div class="list-group"> </div>');

	itemTastatura=$(
		'<a href="#" class="list-group-item">'+
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" onclick="Tastaturi.prototype.newTastatura();">'+
		'<span class="glyphicon glyphicon-file"/> Tastatura noua...</button>'+
		'</div>'+
		'</a>'
	);		
	divTastaturi.append(itemTastatura);
	
	for(i=0;i<this.children.length;i++)
	{				
		itemTastatura=$(
		'<a href="#" class="list-group-item" id="Tastatura'+this.children[i].id+'">'+
		'<h4>Producator: '+this.children[i].producator+' </h4>'+
		'<h4>tip_cablu: '+this.children[i].tip_cablu+' </h4>'+
		'<h4>Pret: '+this.children[i].pret+' </h4>'+
		'<h4>culoare: '+this.children[i].culoare+' </h4>'+
		'<h4>rgb: '+this.children[i].rgb+' </h4>'+
		'<h4>Created at: '+this.children[i].creation_date+' </h4>'+
		'</a>' +
		
		//'<span class="badge">'+this.children[i].id+'</span>'+
		'<div class="btn-group btn-group-xs pull-right style="background-rgb: #4CAF50; /* Green */ border: none; rgb: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">'+
		'<button type="button" class="btn btn-primary" onclick="Tastaturi.prototype.viewTastatura('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-eye-open"/> View</button>'+		
		'<button type="button" class="btn btn-warning" onclick="Tastaturi.prototype.editTastatura('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-edit"/> Edit</button>'+
		'<button type="button" class="btn btn-danger" onclick="Tastaturi.prototype.deleteTastatura('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-remove"/> Delete</button>'+
		'</div>'
		);		
		divTastaturi.append(itemTastatura);
	}
	$("#main-panel").append(divTastaturi);	
}

/*---------------------------------------------------------------------------*/

Tastaturi.prototype.newTastatura=function()
{
	console.log("Tastaturi.newTastatura");
	
	var divInputGroup=$('<div class="input-group input-group-sm" id="inputGroup"> </div>');
	divInputGroup.append($(
		'<div class="input-group" style="padding: 10px;">'+
		'<span class="input-group-addon" style="width: 150px; color: white;">Name</span>'+		
		'<input id="name" type="text" class="form-control" placeholder="name" style="border-radius: 25px;">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="input-group" style="padding: 10px;">'+
		'<span class="input-group-addon" style="width: 150px; color: white;">tip_cablu</span>'+		
		'<input id="tip_cablu" type="text" class="form-control" placeholder="tip_cablu" style="border-radius: 25px;">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="input-group" style="padding: 10px;">'+
		'<span class="input-group-addon" style="width: 150px; color: white;">Pret</span>'+		
		'<input id="pret" type="text" class="form-control" placeholder="pret" style="border-radius: 25px;">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="input-group" style="padding: 10px;">'+
		'<span class="input-group-addon" style="width: 150px; color: white;">culoare</span>'+		
		'<input id="culoare" type="text" class="form-control" placeholder="culoare" style="border-radius: 25px;">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="input-group" style="padding: 10px;">'+
		'<span class="input-group-addon" style="width: 150px; color: white;">rgb</span>'+		
		'<input id="rgb" type="text" class="form-control" placeholder="rgb" style="border-radius: 25px;">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" '+
		'onclick="Tastaturi.prototype.createTastatura();"><span class="glyphicon glyphicon-save"/> Save</button>'+
		'</div>'
	));
	
	$("#main-panel").append(divInputGroup);
}

Tastaturi.prototype.createTastatura=function()
{
	console.log("Tastaturi.saveTastatura");
	
	var name=$("#name").val();
	var tip_cablu=$("#tip_cablu").val();
	var pret=$("#pret").val();
	var culoare=$("#culoare").val();
	var rgb=$("#rgb").val();
	
	var Tastaturi=this;	
	$.ajax(
	{
		url: "./Tastaturi.php?create=1&producator="+name+"&tip_cablu="+tip_cablu+"&pret="+pret+"&culoare="+culoare+"&rgb="+rgb,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		console.log(data);
		Tastaturi.onCreateTastatura(JSON.parse(data));
	});
}

Tastaturi.prototype.onCreateTastatura=function(message)
{
	console.log("Tastaturi.onCreateTastatura");
	console.log(message);
	
	$("#inputGroup").remove();
	this.read();
}

/*---------------------------------------------------------------------------*/

Tastaturi.prototype.viewTastatura=function(id)
{
	$("#main-panel").empty();
	
	var Tastaturi=this;
	$.ajax(
	{
		url: "./Tastaturi.php?read=1",
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		Tastaturi.getTastatura(JSON.parse(data), id);
	});
}

Tastaturi.prototype.getTastatura=function(data, id)
{
	var items=data.items;
	for(i=0;i<items.length;i++)
	{
		if(id == items[i].id){

			console.log("Tastaturi.show");

			var divTastaturi=$('<div class="list-group"> </div>');
			itemTastatura=$(
			'<a href="#" class="list-group-item" id="Tastatura'+items[i].id+'">'+
			'<h4>Producator: '+items[i].producator+' </h4>'+
			'<h4>tip_cablu: '+items[i].tip_cablu+' </h4>'+
			'<h4>Pret: '+items[i].pret+' </h4>'+
			'<h4>culoare: '+items[i].culoare+' </h4>'+
			'<h4>rgb: '+items[i].rgb+' </h4>'+
			'<h4>Created at: '+items[i].creation_date+' </h4>'+
			//'<span class="badge">'+this.children[i].id+'</span>'+
			'<div class="btn-group btn-group-xs pull-right">'+
			'<button type="button" class="btn btn-primary" onclick="Tastaturi.prototype.read(); Calculatoare.prototype.read();">'+
			'<span class="glyphicon glyphicon-eye-open"/> Show All</button>'+
			'</div>'+
			'</a>'
			);		
			divTastaturi.append(itemTastatura);

			$("#main-panel").append(divTastaturi);
		}
	}
}

Tastaturi.prototype.setTastatura=function(Tastatura)
{
	console.log(Tastatura);
	
	var divTastaturi=$('<div class="list-group"> </div>');

	itemTastatura=$(
		'<a href="#" class="list-group-item">'+
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" onclick="Tastaturi.prototype.newTastatura();">'+
		'<span class="glyphicon glyphicon-file"/> Tastatura nou...</button>'+
		'</div>'+
		'</a>'
	);		
	divTastaturi.append(itemTastatura);
	
	itemTastatura=$(
	'<a href="#" class="list-group-item" id="Tastatura'+Tastatura.id+'">'+
	'Producator: '+Tastatura.producator+' '+
	'tip_cablu: '+Tastatura.tip_cablu+' '+
	'Pret: '+Tastatura.pret+' '+
	'culoare: '+Tastatura.culoare+' '+
	'rgb: '+Tastatura.rgb+' '+
	'Created at: '+Tastatura.creation_date+' '+
	'</a>'
	);		
	divTastaturi.append(itemTastatura);
	
	$("#main-panel").append(divTastaturi);
}

/*---------------------------------------------------------------------------*/

Tastaturi.prototype.editTastatura=function(id)
{
	console.log("Tastaturi.editTastatura");

	var Tastaturi=this;
	$.ajax(
	{
		url: "./Tastaturi.php?read=1",
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		var items=JSON.parse(data).items;
		for(i=0;i<items.length;i++)
		{
			if(id == items[i].id){
			itemToEdit = items[i];
			}
		}
		var divInputGroup=$('<div class="input-group input-group-sm" id="inputGroup"> </div>');
		divInputGroup.append($(
			'<div class="input-group" style="padding: 10px;">'+
			'<span class="input-group-addon" style="width: 150px; color: white;">Name</span>'+		
			'<input id="name" type="text" class="form-control" placeholder="name" value="'+
			itemToEdit.producator+'">'+
			'</div>'+
			
			'<div class="input-group" style="padding: 10px;">'+
			'<span class="input-group-addon" style="width: 150px; color: white;">tip_cablu</span>'+		
			'<input id="tip_cablu" type="text" class="form-control" placeholder="tip_cablu" value="'+
			itemToEdit.tip_cablu+'">'+
			'</div>'+

			'<div class="input-group" style="padding: 10px;">'+
			'<span class="input-group-addon" style="width: 150px; color: white;">Pret</span>'+		
			'<input id="pret" type="text" class="form-control" placeholder="pret" value="'+
			itemToEdit.pret+'">'+
			'</div>'+

			'<div class="input-group" style="padding: 10px;">'+
			'<span class="input-group-addon" style="width: 150px; color: white;">culoare</span>'+		
			'<input id="culoare" type="text" class="form-control" placeholder="culoare" value="'+
			itemToEdit.culoare+'">'+
			'</div>'+

			'<div class="input-group" style="padding: 10px;">'+
			'<span class="input-group-addon" style="width: 150px; color: white;">rgb</span>'+		
			'<input id="rgb" type="text" class="form-control" placeholder="rgb" value="'+
			itemToEdit.rgb+'">'+
			'</div>'+
			''
		));
		divInputGroup.append($(
			'<div class="btn-group btn-group-xs">'+
			'<button type="button" class="btn btn-warning" '+
			'onclick="Tastaturi.prototype.updateTastatura('+id+');"><span class="glyphicon glyphicon-save"/> Save</button>'+
			'</div>'
		));
		
		$("#main-panel").append(divInputGroup);	
	});
	
}

Tastaturi.prototype.updateTastatura=function(id)
{
	console.log("Tastaturi.updateTastatura");

	var name=$("#name").val();
	var tip_cablu=$("#tip_cablu").val();
	var pret=$("#pret").val();
	var culoare=$("#culoare").val();
	var rgb=$("#rgb").val();
	
	var Tastaturi=this;	
	$.ajax(
	{
		url: "./Tastaturi.php?update=1&id="+id+"&producator="+name+"&tip_cablu="+tip_cablu+"&pret="+pret+"&culoare="+culoare+"&rgb="+rgb,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		console.log(data);
		Tastaturi.onUpdateTastatura();
	});
}

Tastaturi.prototype.onUpdateTastatura=function()
{
	console.log("Tastaturi.onUpdateTastatura");
	
	$("#inputGroup").remove();
	this.read();
	Calculatoare.prototype.read();
}

/*---------------------------------------------------------------------------*/

Tastaturi.prototype.deleteTastatura=function(id)
{
	console.log("Tastaturi.deleteTastatura");
		
	var Tastaturi=this;	
	$.ajax(
	{
		url: "./Tastaturi.php?delete=1&id="+id,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		//console.log(data);
		Tastaturi.onDeleteTastatura(JSON.parse(data),id);
	});
}

Tastaturi.prototype.onDeleteTastatura=function(message,id)
{
	console.log("Tastaturi.onDeleteTastatura");
	
	//$("#Tastatura"+id).remove();
	this.read();
}

/*---------------------------------------------------------------------------*/
