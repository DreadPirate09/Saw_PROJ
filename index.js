
/*---------------------------------------------------------------------------*/

window.onload=function()
{	
	init();
};

/*---------------------------------------------------------------------------*/

function init()
{
	var telefoane = new Telefoane();
	var calculatoare = new Calculatoare();
	var televizoare = new Televizoare();
	var monitoare = new Monitoare();
	var tastaturi = new Tastaturi();
	console.log("init");
	
	telefoane.read();
	calculatoare.read();
	televizoare.read();
	monitoare.read();
	tastaturi.read();
}

/*---------------------------------------------------------------------------*/
