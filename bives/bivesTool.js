//Info-Content
function getBivesData(url1, url2, command, place){
	d3.selectAll('#info > *').remove();
	
	console.log(url1, url2);
	// create the job object
	// see http://bives.sems.uni-rostock.de/
	var bivesJob = {
		files:
		[
			url1,
			url2
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
			
			$(place).html ($.parseJSON (data).reportHtml);
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
