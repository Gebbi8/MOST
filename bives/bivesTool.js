//Info-Content
function getBivesData(name, dateVersion1, dateVersion2, command, place){
	d3.selectAll('#info > *').remove();
	
	dateVersion1 = formatDate(dateVersion1);
	dateVersion2 = formatDate(dateVersion2);
	var file1 = "http://biomodels.lesscomplex.org/releases/"+name+"/"+dateVersion1+"/"+name;
	var file2 = "http://biomodels.lesscomplex.org/releases/"+name+"/"+dateVersion2+"/"+name;
	console.log(file1,file2);
	// create the job object
	// see http://bives.sems.uni-rostock.de/
	var bivesJob = {
		files:
		[
			file1,
			file2
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



function formatDate(date) {
	    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
