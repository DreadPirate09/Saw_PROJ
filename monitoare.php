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
		if(isset($_GET["frame_rate"]))
		{
			$fields.=",frame_rate";
			$values.=',"'.$_GET["frame_rate"].'"';
		}
		if(isset($_GET["pret"]))
		{ 
			$fields.=",pret";
			$values.=',"'.$_GET["pret"].'"';
		}
		if(isset($_GET["diagonala"]))
		{ 
			$fields.=",diagonala";
			$values.=',"'.$_GET["diagonala"].'"';
		}
		if(isset($_GET["tip_ecran"]))
		{ 
			$fields.=",tip_ecran";
			$values.=',"'.$_GET["tip_ecran"].'"';
		}
		
		$query="INSERT INTO monitoare(".$fields.") VALUES (".$values.")";		
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

		$count = $connection->query("SELECT count(*) as total_no_of_items FROM monitoare");
		if($item = $count->fetch_array())
		{
			$nTotalNoOfItems=$item['total_no_of_items'];
		}
		$count->close();
		
		$items = $connection->query("SELECT * FROM monitoare ".$whereClause." ORDER BY id ".$limitClause);
		$nNoOfItems = $items->num_rows;
		
		$index=0;
		echo '{"items" : [';
		while($item = $items->fetch_array())
		{
			echo '{';
			echo '"id":'				.	''.$item['id'].''.					' , ';
			echo '"producator":'		.	'"'.$item['producator'].'"'.		' , ';
			echo '"frame_rate":'				.	'"'.$item['frame_rate'].'"'.				' , ';
			echo '"pret":'				.	''.$item['pret'].''.				' , ';
			echo '"diagonala":'				.	'"'.$item['diagonala'].'"'.				' , ';
			echo '"tip_ecran":'				.	'"'.$item['tip_ecran'].'"'.				' , ';
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
		if(isset($_GET["frame_rate"]))
		{
			$maps.=$comma.'frame_rate="'.$_GET["frame_rate"].'"';
			$comma=',';
		}
		if(isset($_GET["pret"]))
		{ 
			$maps.=$comma.'pret="'.$_GET["pret"].'"';
			$comma=',';
		}
		if(isset($_GET["diagonala"]))
		{
			$maps.=$comma.'diagonala="'.$_GET["diagonala"].'"';
			$comma=',';
		}
		if(isset($_GET["tip_ecran"]))
		{
			$maps.=$comma.'tip_ecran="'.$_GET["tip_ecran"].'"';
			$comma=',';
		}
		
		$query="UPDATE monitoare SET ".$maps." WHERE id=".$_GET["id"];
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
		$query="DELETE FROM monitoare WHERE id=".$_GET["id"];
		
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
