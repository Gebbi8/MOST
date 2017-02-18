//Info-Content
function getBivesData(v1, v2, command, place){
	$(".bivesNavi").hide();
	$(".bivesResult").hide();
	$('#loading').show();
	d3.selectAll(place + ' > *').remove();
	
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
			//console.log(dataCatch, "!!!");
			$("#bivesReport").html ($.parseJSON (dataCatch).reportHtml);
			var annotations = $.parseJSON (dataCatch).separateAnnotations;
			//console.log("annotations: ",annotations);
			fillcomodiFig(annotations);
			var sbgnJson = $.parseJSON (dataCatch).reactionsSbgnJson;
			if(sbgnJson == undefined) console.log(dataCatch); 
			else console.log("sbgnJson: ",sbgnJson);
			showSbgn(sbgnJson);
			$("#bivesXmlDiff").text ($.parseJSON (dataCatch).xmlDiff);
			$("#loading").hide();
			$(".bivesNavi").show();
			$('#bivesResult').show();
	});
}