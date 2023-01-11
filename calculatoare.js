
/*---------------------------------------------------------------------------*/

function Calculatoare()
{
	//console.log("constructor Projects");

	this.id="Calculatoare";
	this.children=null;
};

/*---------------------------------------------------------------------------*/

Calculatoare.prototype.read=function()
{
	console.log("Calculatoare.read");
	
	$("#main-panel").empty();
	
	var Calculatoare=this;
	$.ajax(
	{
		url: "./Calculatoare.php?read=1",
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		Calculatoare.onRead(JSON.parse(data));
	});
};

Calculatoare.prototype.onRead=function(data)
{
	console.log("Calculatoare.onRead");
	
	var items=data.items;
	
	this.children=new Array();
	for(i=0;i<items.length;i++)
	{
		this.children[i]=new Calculator(
			items[i].id,
			items[i].producator,
			items[i].placa_video,
			items[i].pret,
			items[i].ram,
			items[i].procesor,
			items[i].creation_date);
	}
	console.log("loaded the children");
	console.log(this.children);
	this.show();
};

Calculatoare.prototype.show=function()
{
	console.log("Calculatoare.show");
	
	var divCalculatoare=$('<div class="list-group"> </div>');

	itemCalculator=$(
		'<a href="#" class="list-group-item">'+
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" onclick="Calculatoare.prototype.newCalculator();">'+
		'<span class="glyphicon glyphicon-file"/> Calculator nou...</button>'+
		'</div>'+
		'</a>'
	);		
	divCalculatoare.append(itemCalculator);
	
	for(i=0;i<this.children.length;i++)
	{				
		itemCalculator=$(
		'<a href="#" class="list-group-item" id="Calculator'+this.children[i].id+'">'+
		' <h4>Producator: '+this.children[i].producator+'  </h4>'+
		' <h4>placa_video: '+this.children[i].placa_video+'  </h4>'+
		' <h4>Pret: '+this.children[i].pret+'  </h4>'+
		' <h4>Ram: '+this.children[i].ram+'  </h4>'+
		' <h4>procesor: '+this.children[i].procesor+'  </h4>'+
		' <h4>Created at: '+this.children[i].creation_date+'  </h4>'+
		'</a>' +
		
		//'<span class="badge">'+this.children[i].id+'</span>'+
		'<div class="btn-group btn-group-xs pull-right style="background-procesor: #4CAF50; /* Green */ border: none; procesor: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">'+
		'<button type="button" class="btn btn-primary" onclick="Calculatoare.prototype.viewCalculator('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-eye-open"/> View</button>'+		
		'<button type="button" class="btn btn-warning" onclick="Calculatoare.prototype.editCalculator('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-edit"/> Edit</button>'+
		'<button type="button" class="btn btn-danger" onclick="Calculatoare.prototype.deleteCalculator('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-remove"/> Delete</button>'+
		'</div>'
		);		
		divCalculatoare.append(itemCalculator);
	}
	$("#main-panel").append(divCalculatoare);	
}

/*---------------------------------------------------------------------------*/

Calculatoare.prototype.newCalculator=function()
{
	console.log("Calculatoare.newCalculator");
	
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
		'<span class="input-group-addon" style="width: 150px; color: white;">placa_video</span>'+		
		'<input id="placa_video" type="text" class="form-control" placeholder="placa_video" style="border-radius: 25px;">'+
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
		'<span class="input-group-addon" style="width: 150px; color: white;">procesor</span>'+		
		'<input id="procesor" type="text" class="form-control" placeholder="procesor" style="border-radius: 25px;">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" '+
		'onclick="Calculatoare.prototype.createCalculator();"><span class="glyphicon glyphicon-save"/> Save</button>'+
		'</div>'
	));
	
	$("#main-panel").append(divInputGroup);
}

Calculatoare.prototype.createCalculator=function()
{
	console.log("Calculatoare.saveCalculator");
	
	var name=$("#name").val();
	var placa_video=$("#placa_video").val();
	var pret=$("#pret").val();
	var ram=$("#ram").val();
	var procesor=$("#procesor").val();
	
	var Calculatoare=this;	
	$.ajax(
	{
		url: "./Calculatoare.php?create=1&producator="+name+"&placa_video="+placa_video+"&pret="+pret+"&ram="+ram+"&procesor="+procesor,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		console.log(data);
		Calculatoare.onCreateCalculator(JSON.parse(data));
	});
}

Calculatoare.prototype.onCreateCalculator=function(message)
{
	console.log("Calculatoare.onCreateCalculator");
	console.log(message);
	
	$("#inputGroup").remove();
	this.read();
}

/*---------------------------------------------------------------------------*/

Calculatoare.prototype.viewCalculator=function(id)
{
	$("#main-panel").empty();
	
	var Calculatoare=this;
	$.ajax(
	{
		url: "./Calculatoare.php?read=1",
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		Calculatoare.getCalculator(JSON.parse(data), id);
	});
}

Calculatoare.prototype.getCalculator=function(data, id)
{
	var items=data.items;
	for(i=0;i<items.length;i++)
	{
		if(id == items[i].id){

			console.log("Calculatoare.show");

			var divCalculatoare=$('<div class="list-group"> </div>');
			itemCalculator=$(
			'<a href="#" class="list-group-item" id="Calculator'+items[i].id+'">'+
			' <h4>Producator: '+items[i].producator+'  </h4>'+
			' <h4>placa_video: '+items[i].placa_video+'  </h4>'+
			' <h4>Pret: '+items[i].pret+'  </h4>'+
			' <h4>Ram: '+items[i].ram+'  </h4>'+
			' <h4>procesor: '+items[i].procesor+'  </h4>'+
			' <h4>Created at: '+items[i].creation_date+' </h4> '+
			//'<span class="badge">'+this.children[i].id+'</span>'+
			'<div class="btn-group btn-group-xs pull-right">'+
			'<button type="button" class="btn btn-primary" onclick="Calculatoare.prototype.read(); Telefoane.prototype.read();">'+
			'<span class="glyphicon glyphicon-eye-open"/> Show All</button>'+
			'</div>'+
			'</a>'
			);		
			divCalculatoare.append(itemCalculator);

			$("#main-panel").append(divCalculatoare);
		}
	}
}

Calculatoare.prototype.setCalculator=function(Calculator)
{
	console.log(Calculator);
	
	var divCalculatoare=$('<div class="list-group"> </div>');

	itemCalculator=$(
		'<a href="#" class="list-group-item">'+
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" onclick="Calculatoare.prototype.newCalculator();">'+
		'<span class="glyphicon glyphicon-file"/> Calculator nou...</button>'+
		'</div>'+
		'</a>'
	);		
	divCalculatoare.append(itemCalculator);
	
	itemCalculator=$(
	'<a href="#" class="list-group-item" id="Calculator'+Calculator.id+'">'+
	'Producator: '+Calculator.producator+' '+
	'placa_video: '+Calculator.placa_video+' '+
	'Pret: '+Calculator.pret+' '+
	'Ram: '+Calculator.ram+' '+
	'procesor: '+Calculator.procesor+' '+
	'Created at: '+Calculator.creation_date+' '+
	'</a>'
	);		
	divCalculatoare.append(itemCalculator);
	
	$("#main-panel").append(divCalculatoare);
}

/*---------------------------------------------------------------------------*/

Calculatoare.prototype.editCalculator=function(id)
{
	console.log("Calculatoare.editCalculator");

	var Calculatoare=this;
	$.ajax(
	{
		url: "./Calculatoare.php?read=1",
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
			'<span class="input-group-addon" style="width: 150px; color: white;">placa_video</span>'+		
			'<input id="placa_video" type="text" class="form-control" placeholder="placa_video" value="'+
			itemToEdit.placa_video+'">'+
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
			'<span class="input-group-addon" style="width: 150px; color: white;">procesor</span>'+		
			'<input id="procesor" type="text" class="form-control" placeholder="procesor" value="'+
			itemToEdit.procesor+'">'+
			'</div>'+
			''
		));
		divInputGroup.append($(
			'<div class="btn-group btn-group-xs">'+
			'<button type="button" class="btn btn-warning" '+
			'onclick="Calculatoare.prototype.updateCalculator('+id+');"><span class="glyphicon glyphicon-save"/> Save</button>'+
			'</div>'
		));
		
		$("#main-panel").append(divInputGroup);	
	});
	
}

Calculatoare.prototype.updateCalculator=function(id)
{
	console.log("Calculatoare.updateCalculator");

	var name=$("#name").val();
	var placa_video=$("#placa_video").val();
	var pret=$("#pret").val();
	var ram=$("#ram").val();
	var procesor=$("#procesor").val();
	
	var Calculatoare=this;	
	$.ajax(
	{
		url: "./Calculatoare.php?update=1&id="+id+"&producator="+name+"&placa_video="+placa_video+"&pret="+pret+"&ram="+ram+"&procesor="+procesor,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		console.log(data);
		Calculatoare.onUpdateCalculator();
	});
}

Calculatoare.prototype.onUpdateCalculator=function()
{
	console.log("Calculatoare.onUpdateCalculator");
	
	$("#inputGroup").remove();
	this.read();
	Calculatoare.prototype.read();
}

/*---------------------------------------------------------------------------*/

Calculatoare.prototype.deleteCalculator=function(id)
{
	console.log("Calculatoare.deleteCalculator");
		
	var Calculatoare=this;	
	$.ajax(
	{
		url: "./Calculatoare.php?delete=1&id="+id,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		//console.log(data);
		Calculatoare.onDeleteCalculator(JSON.parse(data),id);
	});
}

Calculatoare.prototype.onDeleteCalculator=function(message,id)
{
	console.log("Calculatoare.onDeleteCalculator");
	
	//$("#Calculator"+id).remove();
	this.read();
}

/*---------------------------------------------------------------------------*/
