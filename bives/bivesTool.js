//Info-Content
function getBivesData(v1, v2, command, place){
	$(".bivesNavi").hide();
	$(".bivesResult").hide();
	$('#loading').show();
	d3.selectAll(place + ' > *').remove();
	
	console.log(place, v1.url, v2.url);
	$("#bivesInfo").show ();
	
	
	
	var bivesJob = {
		files:
		[
			v1.url,
			v2.url
		],
		commands:
		
			command
		
	};

	var dataCatch;
	// call the bives wrapper script
	$.post (
		"bives/bives.php",
		"bivesJob=" + JSON.stringify (bivesJob),
		function (data)
		{				
			dataCatch = data;
		}
	).done(function(){
			$("#bivesReport").html ($.parseJSON (dataCatch).reportHtml);
			var annotations = $.parseJSON (dataCatch).separateAnnotations;
			fillcomodiFig(annotations);
			var sbgnJson = $.parseJSON (dataCatch).reactionsSbgnJson;
			showSbgn(sbgnJson);
			$("#bivesXmlDiff").text ($.parseJSON (dataCatch).xmlDiff);
			$("#loading").hide();
			$(".bivesNavi").show();
			$('#bivesResult').show();
	});
}