<?php

function strip_tailing_slashes ($str)
{
    while (substr ($str, 0, 1) == '/')
        $str = substr ($str, 1);

    while (substr ($str, -1) == '/')
        $str = substr ($str, 0, -1);

    return $str;
}


	$userAgent = $_SERVER['HTTP_USER_AGENT'];
	$model = strip_tailing_slashes ($_GET['model']);
	$version = strip_tailing_slashes ($_GET['version']);
	$repo = strip_tailing_slashes ($_GET['repo']);
	
	
    $isRequestComingFromRealUser = strpos($userAgent, 'Java') === false;
    $isCellModelRepo = strpos($repo, 'biomodels') == false;

	if( $isRequestComingFromRealUser){
		if($isCellModelRepo){
			header("Location: http://$repo/file/$version/$model");
		}else{
			header("Location: http://$repo/$model");
		}
	}else{
		// the request is coming from bives
		if($isCellModelRepo){
			header("Location: http://$repo/download/$version/$model");
		}else{
			header("Location: http://biomodels.lesscomplex.org/releases/$model.xml/$version/$model.xml");
		}
	}
?>
