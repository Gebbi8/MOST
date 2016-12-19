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
			console.log(dataCatch);
			fillcomodiFig(annotations);
			var sbgnJson = $.parseJSON (dataCatch).reactionsSbgnJson;
			showSbgn(sbgnJson);
			$("#bivesXmlDiff").text ($.parseJSON (dataCatch).xmlDiff);
			$("#loading").hide();
			$(".bivesNavi").show();
			$('#bivesResult').show();
	});
}



// function formatDate(date) {
// 	    var d = new Date(date),
//         month = '' + (d.getMonth() + 1),
//         day = '' + d.getDate(),
//         year = d.getFullYear();
// 
//     if (month.length < 2) month = '0' + month;
//     if (day.length < 2) day = '0' + day;
// 
//     return [year, month, day].join('-');
// }
