//Info-Content
function getBivesData(v1, v2, command, place){
	$(".bivesNavi").hide();
	$(".bivesResult").hide();
	$('#loading').show();
	d3.selectAll(place + ' > *').remove();

	$("#bivesInfo").show ();

	var dataCatch;

	if(sessionStorage.getItem(v1.model+"_"+v1.versionid+"_"+v2.versionid) != null){
		dataCatch = sessionStorage.getItem(v1.model+"_"+v1.versionid+"_"+v2.versionid);
		fillGraphTabs(dataCatch);
		return;
	}

	var bivesJob = {
		files:
		[
			v1.url,
			v2.url
		],
		commands:

			command

	};


	// call the bives wrapper script
	$.post (
		"bives/bives.php",
		"bivesJob=" + JSON.stringify (bivesJob),
		function (data)
		{
			dataCatch = data;
		}
	).done(function(){
		console.log(dataCatch);
		fillGraphTabs(dataCatch);

		//save diff in local storage
		sessionStorage.setItem(v1.model+"_"+v1.versionid+"_"+v2.versionid, dataCatch);
		console.log("saved in sessionStorage");
	});
}

function fillGraphTabs(data){
	//fill bives tabs
	$("#bivesReport").html ($.parseJSON (data).reportHtml);

	var annotations = $.parseJSON (data).separateAnnotations;
	fillcomodiFig(annotations);

	var sbgnJson = $.parseJSON (data).reactionsSbgnJson;
	showSbgn(sbgnJson);

	//highlight XmlDiff
	// $("#highlightXmlDiff").text($.parseJSON (data).xmlDiff);
	//   $('#highlightXmlDiff').each(function(i, block) {
	// 	hljs.highlightBlock(block);
	// });

	//hide loading gif, show bives tabs
	$("#loading").hide();
	$(".bivesNavi").show();
	$('#bivesResult').show();
	//set Hash to report tab
	setHash('b', 'r');
}
