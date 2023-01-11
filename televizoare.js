
/*---------------------------------------------------------------------------*/

function Televizoare()
{
	//console.log("constructor Projects");

	this.id="Televizoare";
	this.children=null;
};

/*---------------------------------------------------------------------------*/

Televizoare.prototype.read=function()
{
	console.log("Televizoare.read");
	
	$("#main-panel").empty();
	
	var Televizoare=this;
	$.ajax(
	{
		url: "./Televizoare.php?read=1",
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		Televizoare.onRead(JSON.parse(data));
	});
};

Televizoare.prototype.onRead=function(data)
{
	console.log("Televizoare.onRead");
	
	var items=data.items;
	
	this.children=new Array();
	for(i=0;i<items.length;i++)
	{
		this.children[i]=new Televizor(
			items[i].id,
			items[i].producator,
			items[i].diagonala,
			items[i].pret,
			items[i].culoare,
			items[i].tip_ecran,
			items[i].creation_date);
	}
	console.log("loaded the children");
	console.log(this.children);
	this.show();
};

Televizoare.prototype.show=function()
{
	console.log("Televizoare.show");
	
	var divTelevizoare=$('<div class="list-group"> </div>');

	itemTelevizor=$(
		'<a href="#" class="list-group-item">'+
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" onclick="Televizoare.prototype.newTelevizor();">'+
		'<span class="glyphicon glyphicon-file"/> Televizor nou...</button>'+
		'</div>'+
		'</a>'
	);		
	divTelevizoare.append(itemTelevizor);
	
	for(i=0;i<this.children.length;i++)
	{				
		itemTelevizor=$(
		'<a href="#" class="list-group-item" id="Televizor'+this.children[i].id+'">'+
		' <h4>Producator: '+this.children[i].producator+'  </h4>'+
		' <h4>diagonala: '+this.children[i].diagonala+'  </h4>'+
		' <h4>Pret: '+this.children[i].pret+'  </h4>'+
		' <h4>culoare: '+this.children[i].culoare+'  </h4>'+
		' <h4>tip_ecran: '+this.children[i].tip_ecran+'  </h4>'+
		' <h4>Created at: '+this.children[i].creation_date+'  </h4>'+
		'</a>' +
		
		//'<span class="badge">'+this.children[i].id+'</span>'+
		'<div class="btn-group btn-group-xs pull-right style="background-tip_ecran: #4CAF50; /* Green */ border: none; tip_ecran: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;">'+
		'<button type="button" class="btn btn-primary" onclick="Televizoare.prototype.viewTelevizor('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-eye-open"/> View</button>'+		
		'<button type="button" class="btn btn-warning" onclick="Televizoare.prototype.editTelevizor('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-edit"/> Edit</button>'+
		'<button type="button" class="btn btn-danger" onclick="Televizoare.prototype.deleteTelevizor('+this.children[i].id+');">'+
		'<span class="glyphicon glyphicon-remove"/> Delete</button>'+
		'</div>'
		);		
		divTelevizoare.append(itemTelevizor);
	}
	$("#main-panel").append(divTelevizoare);	
}

/*---------------------------------------------------------------------------*/

Televizoare.prototype.newTelevizor=function()
{
	console.log("Televizoare.newTelevizor");
	
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
		'<span class="input-group-addon" style="width: 150px; color: white;">diagonala</span>'+		
		'<input id="diagonala" type="text" class="form-control" placeholder="diagonala" style="border-radius: 25px;">'+
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
		'<span class="input-group-addon" style="width: 150px; color: white;">tip_ecran</span>'+		
		'<input id="tip_ecran" type="text" class="form-control" placeholder="tip_ecran" style="border-radius: 25px;">'+
		'</div>'+
		''
	));
	divInputGroup.append($(
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" '+
		'onclick="Televizoare.prototype.createTelevizor();"><span class="glyphicon glyphicon-save"/> Save</button>'+
		'</div>'
	));
	
	$("#main-panel").append(divInputGroup);
}

Televizoare.prototype.createTelevizor=function()
{
	console.log("Televizoare.saveTelevizor");
	
	var name=$("#name").val();
	var diagonala=$("#diagonala").val();
	var pret=$("#pret").val();
	var culoare=$("#culoare").val();
	var tip_ecran=$("#tip_ecran").val();
	
	var Televizoare=this;	
	$.ajax(
	{
		url: "./Televizoare.php?create=1&producator="+name+"&diagonala="+diagonala+"&pret="+pret+"&culoare="+culoare+"&tip_ecran="+tip_ecran,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		console.log(data);
		Televizoare.onCreateTelevizor(JSON.parse(data));
	});
}

Televizoare.prototype.onCreateTelevizor=function(message)
{
	console.log("Televizoare.onCreateTelevizor");
	console.log(message);
	
	$("#inputGroup").remove();
	this.read();
}

/*---------------------------------------------------------------------------*/

Televizoare.prototype.viewTelevizor=function(id)
{
	$("#main-panel").empty();
	
	var Televizoare=this;
	$.ajax(
	{
		url: "./Televizoare.php?read=1",
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		Televizoare.getTelevizor(JSON.parse(data), id);
	});
}

Televizoare.prototype.getTelevizor=function(data, id)
{
	var items=data.items;
	for(i=0;i<items.length;i++)
	{
		if(id == items[i].id){

			console.log("Televizoare.show");

			var divTelevizoare=$('<div class="list-group"> </div>');
			itemTelevizor=$(
			'<a href="#" class="list-group-item" id="Televizor'+items[i].id+'">'+
			' <h4>Producator: '+items[i].producator+'  </h4>'+
			' <h4>diagonala: '+items[i].diagonala+'  </h4>'+
			' <h4>Pret: '+items[i].pret+'  </h4>'+
			' <h4>culoare: '+items[i].culoare+'  </h4>'+
			' <h4>tip_ecran: '+items[i].tip_ecran+'  </h4>'+
			' <h4>Created at: '+items[i].creation_date+'  </h4>'+
			//'<span class="badge">'+this.children[i].id+'</span>'+
			'<div class="btn-group btn-group-xs pull-right">'+
			'<button type="button" class="btn btn-primary" onclick="Televizoare.prototype.read(); Calculatoare.prototype.read();">'+
			'<span class="glyphicon glyphicon-eye-open"/> Show All</button>'+
			'</div>'+
			'</a>'
			);		
			divTelevizoare.append(itemTelevizor);

			$("#main-panel").append(divTelevizoare);
		}
	}
}

Televizoare.prototype.setTelevizor=function(Televizor)
{
	console.log(Televizor);
	
	var divTelevizoare=$('<div class="list-group"> </div>');

	itemTelevizor=$(
		'<a href="#" class="list-group-item">'+
		'<div class="btn-group btn-group-xs">'+
		'<button type="button" class="btn btn-warning" onclick="Televizoare.prototype.newTelevizor();">'+
		'<span class="glyphicon glyphicon-file"/> Televizor nou...</button>'+
		'</div>'+
		'</a>'
	);		
	divTelevizoare.append(itemTelevizor);
	
	itemTelevizor=$(
	'<a href="#" class="list-group-item" id="Televizor'+Televizor.id+'">'+
	'Producator: '+Televizor.producator+' '+
	'diagonala: '+Televizor.diagonala+' '+
	'Pret: '+Televizor.pret+' '+
	'culoare: '+Televizor.culoare+' '+
	'tip_ecran: '+Televizor.tip_ecran+' '+
	'Created at: '+Televizor.creation_date+' '+
	'</a>'
	);		
	divTelevizoare.append(itemTelevizor);
	
	$("#main-panel").append(divTelevizoare);
}

/*---------------------------------------------------------------------------*/

Televizoare.prototype.editTelevizor=function(id)
{
	console.log("Televizoare.editTelevizor");

	var Televizoare=this;
	$.ajax(
	{
		url: "./Televizoare.php?read=1",
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
			'<span class="input-group-addon" style="width: 150px; color: white;">diagonala</span>'+		
			'<input id="diagonala" type="text" class="form-control" placeholder="diagonala" value="'+
			itemToEdit.diagonala+'">'+
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
			'<span class="input-group-addon" style="width: 150px; color: white;">tip_ecran</span>'+		
			'<input id="tip_ecran" type="text" class="form-control" placeholder="tip_ecran" value="'+
			itemToEdit.tip_ecran+'">'+
			'</div>'+
			''
		));
		divInputGroup.append($(
			'<div class="btn-group btn-group-xs">'+
			'<button type="button" class="btn btn-warning" '+
			'onclick="Televizoare.prototype.updateTelevizor('+id+');"><span class="glyphicon glyphicon-save"/> Save</button>'+
			'</div>'
		));
		
		$("#main-panel").append(divInputGroup);	
	});
	
}

Televizoare.prototype.updateTelevizor=function(id)
{
	console.log("Televizoare.updateTelevizor");

	var name=$("#name").val();
	var diagonala=$("#diagonala").val();
	var pret=$("#pret").val();
	var culoare=$("#culoare").val();
	var tip_ecran=$("#tip_ecran").val();
	
	var Televizoare=this;	
	$.ajax(
	{
		url: "./Televizoare.php?update=1&id="+id+"&producator="+name+"&diagonala="+diagonala+"&pret="+pret+"&culoare="+culoare+"&tip_ecran="+tip_ecran,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		console.log(data);
		Televizoare.onUpdateTelevizor();
	});
}

Televizoare.prototype.onUpdateTelevizor=function()
{
	console.log("Televizoare.onUpdateTelevizor");
	
	$("#inputGroup").remove();
	this.read();
	Calculatoare.prototype.read();
}

/*---------------------------------------------------------------------------*/

Televizoare.prototype.deleteTelevizor=function(id)
{
	console.log("Televizoare.deleteTelevizor");
		
	var Televizoare=this;	
	$.ajax(
	{
		url: "./Televizoare.php?delete=1&id="+id,
		beforeSend : function(xhr) 
		{
			xhr.overrideMimeType("text/plain; charset=x-user-defined");
		}
	})
	.done(function(data) 
	{
		//console.log(data);
		Televizoare.onDeleteTelevizor(JSON.parse(data),id);
	});
}

Televizoare.prototype.onDeleteTelevizor=function(message,id)
{
	console.log("Televizoare.onDeleteTelevizor");
	
	//$("#Televizor"+id).remove();
	this.read();
}

/*---------------------------------------------------------------------------*/
