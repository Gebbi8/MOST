//Info-Content
function getBivesData(name, dateVersion1, dateVersion2, command, place){
//https://stuff.lesscomplex.org/biomodels/releases/MODEL1105030000.xml/Wed Dec 12 2012 00:00:00 GMT+0100 (CET)/MODEL1105030000.xml https://stuff.lesscomplex.org/biomodels/releases/MODEL1105030000.xml/Tue Jun 18 2013 00:00:00 GMT+0200 (CEST)/MODEL1105030000.xml
	dateVersion1 = formatDate(dateVersion1);
	dateVersion2 = formatDate(dateVersion2);
	var file1 = "https://stuff.lesscomplex.org/biomodels/releases/"+name+"/"+dateVersion1+"/"+name;
	var file2 = "https://stuff.lesscomplex.org/biomodels/releases/"+name+"/"+dateVersion2+"/"+name;
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
		"bives.php",
		"bivesJob=" + JSON.stringify (bivesJob),
		function (data)
		{
			$(place).html ($.parseJSON (data).reportHtml);
		}
	);
}

function formatDate(date){
	return Date.parse(date).toString().substr(4,11);
}
