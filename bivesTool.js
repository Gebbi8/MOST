//Info-Content
function getBivesData(file1, file2, command, place){
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
			$(place).html ($.parseJSON (data).reactionsJson);
		}
	);
}

