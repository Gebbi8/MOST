//Info-Content
function getBivesData(v1, v2, command, place){
	d3.selectAll(place + ' > *').remove();
	
	console.log(place, v1.url, v2.url);
	$("#bivesInfo").show ();
	
	$("#bivesOriginalModel").attr ("href", v1.url).text (v1.model + " in version " + v1.versionid);
	$("#bivesModifiedModel").attr ("href", v2.url).text (v2.model + " in version " + v2.versionid);
	
	$("#bivesOriginalModelSupp").text ("(" + v1.date + ")");
	$("#bivesModifiedModelSupp").text ("(" + v1.date + ")");
	
	var bivesJob = {
		files:
		[
			v1.url,
			v2.url
		],
		commands:
		[
			command
		]
	};

	// call the bives wrapper script
	$.post (
		"bives/bives.php",
		"bivesJob=" + JSON.stringify (bivesJob),
		function (data)
		{
			
			console.log(data);
			
			$("#bivesResult").html ($.parseJSON (data).reportHtml);
		}
	);
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
