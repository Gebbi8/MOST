<?php
	$userAgent = $_SERVER['HTTP_USER_AGENT'];
	$model = $_GET['model'];
	$version = $_GET['version'];
	$repo = $_GET['repo'];
	
	
	$isRequestComingFromRealUser = strpos($userAgent, 'Java') !== false;
	$isCellModelRepo = strpos($repo, 'biomodels') !== false;

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
