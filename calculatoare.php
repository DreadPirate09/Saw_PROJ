<?php
	$connection=new mysqli("localhost","root","","magazin_saw");

	if($connection->connect_errno)
	{
		echo "Failed to connect to MySQL: " . $connection->connect_error;
		exit();
	}
	else
	{
		//echo "Connection succeeded!";
	}

	//---------------------------------------------------------------------------------------------
	if(isset($_GET["create"]))
	{
		$fields="";
		$values="";
		if(isset($_GET["producator"]))
		{
			$fields.="producator";
			$values.='"'.$_GET["producator"].'"';
		}
		if(isset($_GET["placa_video"]))
		{
			$fields.=",placa_video";
			$values.=',"'.$_GET["placa_video"].'"';
		}
		if(isset($_GET["pret"]))
		{ 
			$fields.=",pret";
			$values.=',"'.$_GET["pret"].'"';
		}
		if(isset($_GET["ram"]))
		{ 
			$fields.=",ram";
			$values.=',"'.$_GET["ram"].'"';
		}
		if(isset($_GET["procesor"]))
		{ 
			$fields.=",procesor";
			$values.=',"'.$_GET["procesor"].'"';
		}
		
		$query="INSERT INTO calculatoare(".$fields.") VALUES (".$values.")";		
		$result=$connection->query($query);
		//echo $query."<br/>";
		
		if($result)
		{
			echo '{"error":0, "text":"new object '.$_GET["producator"].' was added"}';
		}
		else
		{
			echo '{"error":1, "text":"'.mysqli_error($connection).'"}';
		}
	}	
	//---------------------------------------------------------------------------------------------
	else if(isset($_GET["read"]))
	{
		$whereClause="";
		if(isset($_GET["id"]))
		{
			$whereClause="WHERE id=".$_GET["id"];
		}
		
		$limitClause="";
		if(isset($_GET["base"]) && isset($_GET["count"]))
		{
			$limitClause="LIMIT ".$_GET["base"].",".$_GET["count"];
		}

		$count = $connection->query("SELECT count(*) as total_no_of_items FROM calculatoare");
		if($item = $count->fetch_array())
		{
			$nTotalNoOfItems=$item['total_no_of_items'];
		}
		$count->close();
		
		$items = $connection->query("SELECT * FROM calculatoare ".$whereClause." ORDER BY id ".$limitClause);
		$nNoOfItems = $items->num_rows;
		
		$index=0;
		echo '{"items" : [';
		while($item = $items->fetch_array())
		{
			echo '{';
			echo '"id":'				.	''.$item['id'].''.					' , ';
			echo '"producator":'		.	'"'.$item['producator'].'"'.		' , ';
			echo '"placa_video":'				.	'"'.$item['placa_video'].'"'.				' , ';
			echo '"pret":'				.	''.$item['pret'].''.				' , ';
			echo '"ram":'				.	'"'.$item['ram'].'"'.				' , ';
			echo '"procesor":'				.	'"'.$item['procesor'].'"'.				' , ';
			echo '"creation_date":'		.	'"'.$item['creation_date'].'"'.		'   ';
			echo '}';
			
			if($index!=$nNoOfItems-1)
			{
				echo ",\n";
			}		
			$index++;
		}
		echo '], "total_no_of_items" : '.$nTotalNoOfItems.' }';
		
		$items->close();
	}
	//---------------------------------------------------------------------------------------------
	else if(isset($_GET["update"]))
	{
		$comma='';
		$maps='';
		if(isset($_GET["producator"]))
		{
			$maps.='producator="'.$_GET["producator"].'"';
			$comma=',';
		}
		if(isset($_GET["placa_video"]))
		{
			$maps.=$comma.'placa_video="'.$_GET["placa_video"].'"';
			$comma=',';
		}
		if(isset($_GET["pret"]))
		{ 
			$maps.=$comma.'pret="'.$_GET["pret"].'"';
			$comma=',';
		}
		if(isset($_GET["ram"]))
		{
			$maps.=$comma.'ram="'.$_GET["ram"].'"';
			$comma=',';
		}
		if(isset($_GET["procesor"]))
		{
			$maps.=$comma.'procesor="'.$_GET["procesor"].'"';
			$comma=',';
		}
		
		$query="UPDATE calculatoare SET ".$maps." WHERE id=".$_GET["id"];
		echo $query;
		$result=$connection->query($query);
		//echo $query."<br/>";
		
		if($result)
		{
			echo '{"error":0, "text":"object '.$_GET["id"].' was updated"}';
		}
		else
		{
			echo '{"error":1, "text":"'.mysqli_error($connection).'"}';
		}
	}
	//---------------------------------------------------------------------------------------------
	else if(isset($_GET["delete"]))
	{
		$id=$_GET["id"];
		$query="DELETE FROM calculatoare WHERE id=".$_GET["id"];
		
		$result=$connection->query($query);
		//echo $query."<br/>";
		//echo $result."<br/>";
		
		if($result)
		{
			echo '{"error":0, "text":"object '.$id.' was deleted"}';
		}
		else
		{
			echo '{"error":1, "text":"'.mysqli_error($connection).'"}';
		}
	}
	//---------------------------------------------------------------------------------------------
	
	$connection->close();
?>
