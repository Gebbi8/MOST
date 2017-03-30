<?php
ini_set('max_execution_time', 600);
$BIVES="https://bives.bio.informatik.uni-rostock.de/";


if (!isset ($_POST["bivesJob"]) || empty ($_POST["bivesJob"]))
	die ("no job description");

$bivesJob = $_POST["bivesJob"];


$curl = curl_init();

curl_setopt($curl,CURLOPT_URL,$BIVES);
curl_setopt($curl,CURLOPT_FOLLOWLOCATION,true);
curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false );
curl_setopt($curl, CURLOPT_AUTOREFERER, true );
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true );
curl_setopt($curl, CURLOPT_USERAGENT, "stats website diff generator");
curl_setopt($curl, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, $bivesJob);
curl_setopt($curl, CURLOPT_HTTPHEADER, array ("Content-Type: application/json"));


$result = curl_exec($curl);
curl_close($curl);

echo $result;
?>
