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


$url = explode ("/", $_SERVER["REQUEST_URI"]);
if (count ($url) != 5 || $url[1] != "resources")
    die ("access denied.");


$userAgent = $_SERVER['HTTP_USER_AGENT'];
$repo = prep ($url[2]);
$model = prep ($url[3]);
$version = prep ($url[4]);


$isRequestComingFromRealUser = strpos($userAgent, 'Java') === false;
$isCellModelRepo = strpos($repo, 'biomodels') === false;

if( $isRequestComingFromRealUser)
{
    if($isCellModelRepo)
    {
        header("Location: http://$repo/file/$version/$model");
    }
    else
    {
        header("Location: http://$repo/$model");
    }
}
else
{
    // the request is coming from bives
    if($isCellModelRepo)
    {
        header("Location: http://$repo/download/$version/$model");
    }
    else
    {
        header("Location: http://biomodels.lesscomplex.org/releases/$model.xml/$version/$model.xml");
    }
}
?>
