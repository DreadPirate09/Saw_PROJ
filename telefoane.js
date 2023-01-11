
/*---------------------------------------------------------------------------*/

function Telefoane()
{
	//console.log("constructor Projects");

	this.id="telefoane";
	this.children=null;
};

/*---------------------------------------------------------------------------*/

Telefoane.prototype.read=function()
{
	console.log("Telefoane.read");
	
	$("#main-panel").empty();
	
	var telefoane=this;
	$.ajax(
	{
		url: "./telefoane.php?read=1",
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		telefoane.onRead(JSON.parse(data));
	});
};

Telefoane.prototype.onRead=function(data)
{
	console.log("Telefoane.onRead");
	
	var items=data.items;
	
	this.children=new Array();
	for(i=0;i<items.length;i++)
	{
		this.children[i]=new Telefon(
			items[i].id,
			items[i].producator,
			items[i].model,
			items[i].pret,
			items[i].ram,
			items[i].color,
			items[i].creation_date);
	}
	console.log("loaded the children");
	console.log(this.children);
	this.show();
};

Telefoane.prototype.show=function()
{
	console.log("Telefoane.show");
	
	var divTelefoane=$('<div class="list-group"> </div>');

	itemTelefon=$(
		'<a href="#" class="list-group-item">'+
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" onclick="Telefoane.prototype.newTelefon();">'+
		'<span class="glyphicon glyphicon-file"/> Telefon nou...</button>'+
		'</div>'+
		'</a>'
	);		
	divTelefoane.append(itemTelefon);
	
	for(i=0;i<this.children.length;i++)
	{				
		itemTelefon=$(
		'<a href="#" class="list-group-item" id="telefon'+this.children[i].id+'">'+
		' <h4>Producator: '+this.children[i].producator+' </h4>'+
		' <h4>Model: '+this.children[i].model+' </h4>'+
		' <h4>Pret: '+this.children[i].pret+' </h4>'+
		' <h4>Ram: '+this.children[i].ram+' </h4>'+
		' <h4>Color: '+this.children[i].color+' </h4>'+
		' <h4>Created at: '+this.children[i].creation_date+' </h4>'+
		'</a>' +
		
		//'<span class="badge">'+this.children[i].id+'</span>'+
		'<div class="btn-group btn-group-xs pull-right style="background-color: #4CAF50; /* Green */ border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">'+
		'<button type="button" class="btn btn-primary" onclick="Telefoane.prototype.viewTelefon('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-eye-open"/> View</button>'+		
		'<button type="button" class="btn btn-warning" onclick="Telefoane.prototype.editTelefon('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-edit"/> Edit</button>'+
		'<button type="button" class="btn btn-danger" onclick="Telefoane.prototype.deleteTelefon('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-remove"/> Delete</button>'+
		'</div>'
		);		
		divTelefoane.append(itemTelefon);
	}
	$("#main-panel").append(divTelefoane);	
}

/*---------------------------------------------------------------------------*/

Telefoane.prototype.newTelefon=function()
{
	console.log("Telefoane.newTelefon");
	
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
		'<span class="input-group-addon" style="width: 150px; color: white;">Model</span>'+		
		'<input id="model" type="text" class="form-control" placeholder="model" style="border-radius: 25px;">'+
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
		'<span class="input-group-addon" style="width: 150px; color: white;">Ram</span>'+		
		'<input id="ram" type="text" class="form-control" placeholder="ram" style="border-radius: 25px;">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="input-group" style="padding: 10px;">'+
		'<span class="input-group-addon" style="width: 150px; color: white;">Color</span>'+		
		'<input id="Color" type="text" class="form-control" placeholder="Color" style="border-radius: 25px;">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" '+
		'onclick="Telefoane.prototype.createTelefon();"><span class="glyphicon glyphicon-save"/> Save</button>'+
		'</div>'
	));
	
	$("#main-panel").append(divInputGroup);
}

Telefoane.prototype.createTelefon=function()
{
	console.log("Telefoane.saveTelefon");
	
	var name=$("#name").val();
	var model=$("#model").val();
	var pret=$("#pret").val();
	var ram=$("#ram").val();
	var color=$("#color").val();
	
	var telefoane=this;	
	$.ajax(
	{
		url: "./telefoane.php?create=1&producator="+name+"&model="+model+"&pret="+pret+"&ram="+ram+"&color="+color,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		console.log(data);
		telefoane.onCreateTelefon(JSON.parse(data));
	});
}

Telefoane.prototype.onCreateTelefon=function(message)
{
	console.log("Telefoane.onCreateTelefon");
	console.log(message);
	
	$("#inputGroup").remove();
	this.read();
}

/*---------------------------------------------------------------------------*/

Telefoane.prototype.viewTelefon=function(id)
{
	$("#main-panel").empty();
	
	var telefoane=this;
	$.ajax(
	{
		url: "./telefoane.php?read=1",
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		telefoane.getTelefon(JSON.parse(data), id);
	});
}

Telefoane.prototype.getTelefon=function(data, id)
{
	var items=data.items;
	for(i=0;i<items.length;i++)
	{
		if(id == items[i].id){

			console.log("Telefoane.show");

			var divTelefoane=$('<div class="list-group"> </div>');
			itemTelefon=$(
			'<a href="#" class="list-group-item" id="telefon'+items[i].id+'">'+
			' <h4>Producator: '+items[i].producator+'  </h4>'+
			' <h4>Model: '+items[i].model+'  </h4>'+
			' <h4>Pret: '+items[i].pret+'  </h4>'+
			' <h4>Ram: '+items[i].ram+'  </h4>'+
			' <h4>Color: '+items[i].color+'  </h4>'+
			' <h4>Created at: '+items[i].creation_date+'  </h4>'+
			//'<span class="badge">'+this.children[i].id+'</span>'+
			'<div class="btn-group btn-group-xs pull-right">'+
			'<button type="button" class="btn btn-primary" onclick="Telefoane.prototype.read(); Calculatoare.prototype.read();">'+
			'<span class="glyphicon glyphicon-eye-open"/> Show All</button>'+
			'</div>'+
			'</a>'
			);		
			divTelefoane.append(itemTelefon);

			$("#main-panel").append(divTelefoane);
		}
	}
}

Telefoane.prototype.setTelefon=function(telefon)
{
	console.log(telefon);
	
	var divTelefoane=$('<div class="list-group"> </div>');

	itemTelefon=$(
		'<a href="#" class="list-group-item">'+
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" onclick="Telefoane.prototype.newTelefon();">'+
		'<span class="glyphicon glyphicon-file"/> Telefon nou...</button>'+
		'</div>'+
		'</a>'
	);		
	divTelefoane.append(itemTelefon);
	
	itemTelefon=$(
	'<a href="#" class="list-group-item" id="telefon'+telefon.id+'">'+
	'Producator: '+telefon.producator+' '+
	'Model: '+telefon.model+' '+
	'Pret: '+telefon.pret+' '+
	'Ram: '+telefon.ram+' '+
	'Color: '+telefon.color+' '+
	'Created at: '+telefon.creation_date+' '+
	'</a>'
	);		
	divTelefoane.append(itemTelefon);
	
	$("#main-panel").append(divTelefoane);
}

/*---------------------------------------------------------------------------*/

Telefoane.prototype.editTelefon=function(id)
{
	console.log("Telefoane.editTelefon");

	var telefoane=this;
	$.ajax(
	{
		url: "./telefoane.php?read=1",
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
			'<span class="input-group-addon" style="width: 150px; color: white;">Model</span>'+		
			'<input id="model" type="text" class="form-control" placeholder="model" value="'+
			itemToEdit.model+'">'+
			'</div>'+

			'<div class="input-group" style="padding: 10px;">'+
			'<span class="input-group-addon" style="width: 150px; color: white;">Pret</span>'+		
			'<input id="pret" type="text" class="form-control" placeholder="pret" value="'+
			itemToEdit.pret+'">'+
			'</div>'+

			'<div class="input-group" style="padding: 10px;">'+
			'<span class="input-group-addon" style="width: 150px; color: white;">Ram</span>'+		
			'<input id="ram" type="text" class="form-control" placeholder="ram" value="'+
			itemToEdit.ram+'">'+
			'</div>'+

			'<div class="input-group" style="padding: 10px;">'+
			'<span class="input-group-addon" style="width: 150px; color: white;">Color</span>'+		
			'<input id="color" type="text" class="form-control" placeholder="color" value="'+
			itemToEdit.color+'">'+
			'</div>'+
			''
		));
		divInputGroup.append($(
			'<div class="btn-group btn-group-xs">'+
			'<button type="button" class="btn btn-warning" '+
			'onclick="Telefoane.prototype.updateTelefon('+id+');"><span class="glyphicon glyphicon-save"/> Save</button>'+
			'</div>'
		));
		
		$("#main-panel").append(divInputGroup);	
	});
	
}

Telefoane.prototype.updateTelefon=function(id)
{
	console.log("Telefoane.updateTelefon");

	var name=$("#name").val();
	var model=$("#model").val();
	var pret=$("#pret").val();
	var ram=$("#ram").val();
	var color=$("#color").val();
	
	var telefoane=this;	
	$.ajax(
	{
		url: "./telefoane.php?update=1&id="+id+"&producator="+name+"&model="+model+"&pret="+pret+"&ram="+ram+"&color="+color,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		console.log(data);
		telefoane.onUpdateTelefon();
	});
}

Telefoane.prototype.onUpdateTelefon=function()
{
	console.log("Telefoane.onUpdateTelefon");
	
	$("#inputGroup").remove();
	this.read();
	Calculatoare.prototype.read();
}

/*---------------------------------------------------------------------------*/

Telefoane.prototype.deleteTelefon=function(id)
{
	console.log("Telefoane.deleteTelefon");
		
	var telefoane=this;	
	$.ajax(
	{
		url: "./telefoane.php?delete=1&id="+id,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		//console.log(data);
		telefoane.onDeleteTelefon(JSON.parse(data),id);
	});
}

Telefoane.prototype.onDeleteTelefon=function(message,id)
{
	console.log("Telefoane.onDeleteTelefon");
	
	//$("#telefon"+id).remove();
	this.read();
}

/*---------------------------------------------------------------------------*/
