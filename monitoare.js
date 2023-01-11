
/*---------------------------------------------------------------------------*/

function Monitoare()
{
	//console.log("constructor Projects");

	this.id="Monitoare";
	this.children=null;
};

/*---------------------------------------------------------------------------*/

Monitoare.prototype.read=function()
{
	console.log("Monitoare.read");
	
	$("#main-panel").empty();
	
	var Monitoare=this;
	$.ajax(
	{
		url: "./Monitoare.php?read=1",
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		Monitoare.onRead(JSON.parse(data));
	});
};

Monitoare.prototype.onRead=function(data)
{
	console.log("Monitoare.onRead");
	
	var items=data.items;
	
	this.children=new Array();
	for(i=0;i<items.length;i++)
	{
		this.children[i]=new Monitor(
			items[i].id,
			items[i].producator,
			items[i].frame_rate,
			items[i].pret,
			items[i].diagonala,
			items[i].tip_ecran,
			items[i].creation_date);
	}
	console.log("loaded the children");
	console.log(this.children);
	this.show();
};

Monitoare.prototype.show=function()
{
	console.log("Monitoare.show");
	
	var divMonitoare=$('<div class="list-group"> </div>');

	itemMonitor=$(
		'<a href="#" class="list-group-item">'+
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" onclick="Monitoare.prototype.newMonitor();">'+
		'<span class="glyphicon glyphicon-file"/> Monitor nou...</button>'+
		'</div>'+
		'</a>'
	);		
	divMonitoare.append(itemMonitor);
	
	for(i=0;i<this.children.length;i++)
	{				
		itemMonitor=$(
		'<a href="#" class="list-group-item" id="Monitor'+this.children[i].id+'">'+
		'<h4>Producator: '+this.children[i].producator+' </h4>'+
		'<h4>frame_rate: '+this.children[i].frame_rate+' </h4>'+
		'<h4>Pret: '+this.children[i].pret+' </h4>'+
		'<h4>diagonala: '+this.children[i].diagonala+' </h4>'+
		'<h4>tip_ecran: '+this.children[i].tip_ecran+' </h4>'+
		'<h4>Created at: '+this.children[i].creation_date+' </h4>'+
		'</a>' +
		
		//'<span class="badge">'+this.children[i].id+'</span>'+
		'<div class="btn-group btn-group-xs pull-right style="background-tip_ecran: #4CAF50; /* Green */ border: none; tip_ecran: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">'+
		'<button type="button" class="btn btn-primary" onclick="Monitoare.prototype.viewMonitor('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-eye-open"/> View</button>'+		
		'<button type="button" class="btn btn-warning" onclick="Monitoare.prototype.editMonitor('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-edit"/> Edit</button>'+
		'<button type="button" class="btn btn-danger" onclick="Monitoare.prototype.deleteMonitor('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-remove"/> Delete</button>'+
		'</div>'
		);		
		divMonitoare.append(itemMonitor);
	}
	$("#main-panel").append(divMonitoare);	
}

/*---------------------------------------------------------------------------*/

Monitoare.prototype.newMonitor=function()
{
	console.log("Monitoare.newMonitor");
	
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
		'<span class="input-group-addon" style="width: 150px; color: white;">frame_rate</span>'+		
		'<input id="frame_rate" type="text" class="form-control" placeholder="frame_rate" style="border-radius: 25px;">'+
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
		'<span class="input-group-addon" style="width: 150px; color: white;">diagonala</span>'+		
		'<input id="diagonala" type="text" class="form-control" placeholder="diagonala" style="border-radius: 25px;">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="input-group" style="padding: 10px;">'+
		'<span class="input-group-addon" style="width: 150px; color: white;">tip_ecran</span>'+		
		'<input id="tip_ecran" type="text" class="form-control" placeholder="tip_ecran" style="border-radius: 25px;">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="btn-group btn-group-xs" style="padding: 10px;">'+
		'<button type="button" class="btn btn-warning" '+
		'onclick="Monitoare.prototype.createMonitor();"><span class="glyphicon glyphicon-save"/> Save</button>'+
		'</div>'
	));
	
	$("#main-panel").append(divInputGroup);
}

Monitoare.prototype.createMonitor=function()
{
	console.log("Monitoare.saveMonitor");
	
	var name=$("#name").val();
	var frame_rate=$("#frame_rate").val();
	var pret=$("#pret").val();
	var diagonala=$("#diagonala").val();
	var tip_ecran=$("#tip_ecran").val();
	
	var Monitoare=this;	
	$.ajax(
	{
		url: "./Monitoare.php?create=1&producator="+name+"&frame_rate="+frame_rate+"&pret="+pret+"&diagonala="+diagonala+"&tip_ecran="+tip_ecran,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		console.log(data);
		Monitoare.onCreateMonitor(JSON.parse(data));
	});
}

Monitoare.prototype.onCreateMonitor=function(message)
{
	console.log("Monitoare.onCreateMonitor");
	console.log(message);
	
	$("#inputGroup").remove();
	this.read();
}

/*---------------------------------------------------------------------------*/

Monitoare.prototype.viewMonitor=function(id)
{
	$("#main-panel").empty();
	
	var Monitoare=this;
	$.ajax(
	{
		url: "./Monitoare.php?read=1",
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		Monitoare.getMonitor(JSON.parse(data), id);
	});
}

Monitoare.prototype.getMonitor=function(data, id)
{
	var items=data.items;
	for(i=0;i<items.length;i++)
	{
		if(id == items[i].id){

			console.log("Monitoare.show");

			var divMonitoare=$('<div class="list-group"> </div>');
			itemMonitor=$(
			'<a href="#" class="list-group-item" id="Monitor'+items[i].id+'">'+
			'<h4>Producator: '+items[i].producator+' </h4>'+
			'<h4>frame_rate: '+items[i].frame_rate+' </h4>'+
			'<h4>Pret: '+items[i].pret+' </h4>'+
			'<h4>diagonala: '+items[i].diagonala+' </h4>'+
			'<h4>tip_ecran: '+items[i].tip_ecran+' </h4>'+
			'<h4>Created at: '+items[i].creation_date+' </h4>'+
			//'<span class="badge">'+this.children[i].id+'</span>'+
			'<div class="btn-group btn-group-xs pull-right">'+
			'<button type="button" class="btn btn-primary" onclick="Monitoare.prototype.read(); Calculatoare.prototype.read();">'+
			'<span class="glyphicon glyphicon-eye-open"/> Show All</button>'+
			'</div>'+
			'</a>'
			);		
			divMonitoare.append(itemMonitor);

			$("#main-panel").append(divMonitoare);
		}
	}
}

Monitoare.prototype.setMonitor=function(Monitor)
{
	console.log(Monitor);
	
	var divMonitoare=$('<div class="list-group"> </div>');

	itemMonitor=$(
		'<a href="#" class="list-group-item">'+
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" onclick="Monitoare.prototype.newMonitor();">'+
		'<span class="glyphicon glyphicon-file"/> Monitor nou...</button>'+
		'</div>'+
		'</a>'
	);		
	divMonitoare.append(itemMonitor);
	
	itemMonitor=$(
	'<a href="#" class="list-group-item" id="Monitor'+Monitor.id+'">'+
	'Producator: '+Monitor.producator+' '+
	'frame_rate: '+Monitor.frame_rate+' '+
	'Pret: '+Monitor.pret+' '+
	'diagonala: '+Monitor.diagonala+' '+
	'tip_ecran: '+Monitor.tip_ecran+' '+
	'Created at: '+Monitor.creation_date+' '+
	'</a>'
	);		
	divMonitoare.append(itemMonitor);
	
	$("#main-panel").append(divMonitoare);
}

/*---------------------------------------------------------------------------*/

Monitoare.prototype.editMonitor=function(id)
{
	console.log("Monitoare.editMonitor");

	var Monitoare=this;
	$.ajax(
	{
		url: "./Monitoare.php?read=1",
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
			'<div class="input-group">'+
			'<span class="input-group-addon">Name</span>'+		
			'<input id="name" type="text" class="form-control" placeholder="name" value="'+
			itemToEdit.producator+'">'+
			'</div>'+
			
			'<div class="input-group">'+
			'<span class="input-group-addon">frame_rate</span>'+		
			'<input id="frame_rate" type="text" class="form-control" placeholder="frame_rate" value="'+
			itemToEdit.frame_rate+'">'+
			'</div>'+

			'<div class="input-group">'+
			'<span class="input-group-addon">Pret</span>'+		
			'<input id="pret" type="text" class="form-control" placeholder="pret" value="'+
			itemToEdit.pret+'">'+
			'</div>'+

			'<div class="input-group">'+
			'<span class="input-group-addon">diagonala</span>'+		
			'<input id="diagonala" type="text" class="form-control" placeholder="diagonala" value="'+
			itemToEdit.diagonala+'">'+
			'</div>'+

			'<div class="input-group">'+
			'<span class="input-group-addon">tip_ecran</span>'+		
			'<input id="tip_ecran" type="text" class="form-control" placeholder="tip_ecran" value="'+
			itemToEdit.tip_ecran+'">'+
			'</div>'+
			''
		));
		divInputGroup.append($(
			'<div class="btn-group btn-group-xs">'+
			'<button type="button" class="btn btn-warning" '+
			'onclick="Monitoare.prototype.updateMonitor('+id+');"><span class="glyphicon glyphicon-save"/> Save</button>'+
			'</div>'
		));
		
		$("#main-panel").append(divInputGroup);	
	});
	
}

Monitoare.prototype.updateMonitor=function(id)
{
	console.log("Monitoare.updateMonitor");

	var name=$("#name").val();
	var frame_rate=$("#frame_rate").val();
	var pret=$("#pret").val();
	var diagonala=$("#diagonala").val();
	var tip_ecran=$("#tip_ecran").val();
	
	var Monitoare=this;	
	$.ajax(
	{
		url: "./Monitoare.php?update=1&id="+id+"&producator="+name+"&frame_rate="+frame_rate+"&pret="+pret+"&diagonala="+diagonala+"&tip_ecran="+tip_ecran,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		console.log(data);
		Monitoare.onUpdateMonitor();
	});
}

Monitoare.prototype.onUpdateMonitor=function()
{
	console.log("Monitoare.onUpdateMonitor");
	
	$("#inputGroup").remove();
	this.read();
	Calculatoare.prototype.read();
}

/*---------------------------------------------------------------------------*/

Monitoare.prototype.deleteMonitor=function(id)
{
	console.log("Monitoare.deleteMonitor");
		
	var Monitoare=this;	
	$.ajax(
	{
		url: "./Monitoare.php?delete=1&id="+id,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		//console.log(data);
		Monitoare.onDeleteMonitor(JSON.parse(data),id);
	});
}

Monitoare.prototype.onDeleteMonitor=function(message,id)
{
	console.log("Monitoare.onDeleteMonitor");
	
	//$("#Monitor"+id).remove();
	this.read();
}

/*---------------------------------------------------------------------------*/
