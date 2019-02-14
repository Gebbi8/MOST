<?php


function strip_tailing_slashes ($str)
{
    while (substr ($str, 0, 1) == '/')
        $str = substr ($str, 1);

    while (substr ($str, -1) == '/')
        $str = substr ($str, 0, -1);

    return $str;
}

function prep ($str)
{
    return strip_tailing_slashes (base64_decode ($str));
}

function getXml ($userAgent, $httpAccept)
{
	// java tool always gets the xml
	if (strpos($userAgent, 'Java') !== false)
		return true;

	// otherwise we evaluate the Accept: contents of the header
	if ($httpAccept)
	{
		$acc = explode (',', $httpAccept);
		foreach ($acc as $a)
		{
			if (strpos($a, 'application/xml') !== false || strpos($a, 'text/xml') !== false)
				return true;
			if (strpos($a, 'html') !== false)
				return false;
		}
	}
	// default: html
	return false;
}


$url = explode ("/", $_SERVER["REQUEST_URI"]);
if (count ($url) != 5 || $url[1] != "resources")
    die ("access denied.");


$repo = prep ($url[2]);       //web
$model = prep ($url[3]);
$version = prep ($url[4]);

$isBioModelRep = strpos($repo, 'biomodels') === true;
$isCellModelRepo = strpos($repo, 'cellml') === true;


$httpAccept = "";
$userAgent = "";
if (isset ($_SERVER["HTTP_ACCEPT"]))
	$httpAccept = $_SERVER["HTTP_ACCEPT"];
if (isset ($_SERVER["HTTP_USER_AGENT"]))
	$userAgent = $_SERVER["HTTP_USER_AGENT"];


if( !getXml ($userAgent, $httpAccept) )
{
    if($isCellModelRepo)
    {
        header("Location: http://$repo/file/$version/$model");
    }
    else if($isBioModelRep)
    {
        header("Location: http://$repo/$model");
    } else {
        header("Location: http://$repo/$model/SBML/$version.xml");
    }
}
else
{
    // the request is coming from bives
    if($isCellModelRepo)
    {
        header("Location: http://$repo/download/$version/$model");
    }
    else if($isBioModelRep)
    {
        header("Location: http://biomodels.bio.informatik.uni-rostock.de/$model.xml/$version/$model.xml");
    } else {
        header("Location: http://$repo/$model/SBML/$version.xml");
    }
}
?>
