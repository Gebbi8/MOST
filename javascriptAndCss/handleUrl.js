function callVis(vis){
	switch (vis){
		case 'h': heatmap(diffstats); break;
		case 'd': donut(diffstats); break;
		case 'b1': boxplot1(boxplot(window.extent[0], window.extent[1])); break;
		case 'b2': boxplot2(boxplot(window.extent[0], window.extent[1])); break;
		default: console.log("invalid vis call: " + vis + "!");
	}
}
function queryUrl(callback){
	var url = location.hash.slice(1);
	console.log(url);
	var vis;
	
	var variables = url.split(',');
	console.log(variables);
	for(var i=0; i < variables.length; i++){
		var pair = variables[i].split(':');
		console.log(pair);
			switch (pair[0]){
				case 't': checkTypeBoxes(pair[1]); break;
				case 'd1': setDate('date1', pair[1]); break;
				case 'd2': setDate('date2', pair[1]); break;
				case 'v': vis = pair[1]; break;
				case 'm': filterModel(pair[1]); break;
				default: console.log("invalid var name: " + pair[0]);
			}
	}
 	 if(typeof callback === 'function') callVis(vis); else {
		 console.log(callVis +" is not a function");
	 } 
}

function filterModel(models){
	models = models.split('&');
	for(var i=0; i<models.length; i++){
		modelsFilter.push("/" + models[i]);
	}
	
	activateFilesFilter(filterIdFiles);
	activateDiffsFilter(filterIdDiffs);
	
	applyFilters ();
};

function setDate(datafield, date){
	datafield = "" + datafield
	console.log(datafield, date);
	
	var newDate = new Date(date);
	console.log(newDate);
	document.getElementById(datafield).value = newDate.toISOString().slice(0,10);

	if(datafield == "date1") extent[0] = newDate;
	else  extent[1] = newDate;
	console.log("ende");
}

function checkTypeBoxes(types){
	switch (types){
		case 'a':	deactivateFilesFilter (filterRemoveSbmlFiles); deactivateDiffsFilter (filterRemoveSbmlDiffs);
					deactivateFilesFilter (filterRemoveCellmlFiles); deactivateDiffsFilter (filterRemoveCellmlDiffs);
					document.getElementById('SBMLFilter').checked = true; document.getElementById('CellMLFilter').checked = true; break;
		case 'n': 	activateFilesFilter (filterRemoveSbmlFiles); activateDiffsFilter (filterRemoveSbmlDiffs);
					activateFilesFilter (filterRemoveCellmlFiles); activateDiffsFilter (filterRemoveCellmlDiffs); break;
					document.getElementById('SBMLFilter').checked = false; document.getElementById('CellMLFilter').checked = false; break;
		case 's': 	deactivateFilesFilter (filterRemoveSbmlFiles); deactivateDiffsFilter (filterRemoveSbmlDiffs);
					activateFilesFilter (filterRemoveCellmlFiles); activateDiffsFilter (filterRemoveCellmlDiffs); 
					document.getElementById('SBMLFilter').checked = true; document.getElementById('CellMLFilter').checked = false; break;
		case 'c':	activateFilesFilter (filterRemoveSbmlFiles); activateDiffsFilter (filterRemoveSbmlDiffs);
					deactivateFilesFilter (filterRemoveCellmlFiles); deactivateDiffsFilter (filterRemoveCellmlDiffs);
					document.getElementById('SBMLFilter').checked = false; document.getElementById('CellMLFilter').checked = true; break;
		default: ; break;
	}
	applyFilters();
}