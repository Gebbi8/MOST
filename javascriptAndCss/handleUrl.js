function queryUrl(){
	var url = location.hash.slice(1);
	console.log(url);
	var vis;
	
	var variables = url.split(',');
	for(var i=0; i < variables.length; i++){
		var pair = variables[i].split(':');
		console.log(pair);
			switch (pair[0]){
				case 't':
					switch (pair[1]){
						case 'all': ; break;
						case 'none': ; break;
						case 'sbml': ; break;
						case 'cellml': ;break;
						default: console.log("invalid var value: " + pair[0] + " = " + pair[1]); 
					}; break;
				case 'd1': setDate('date1', pair[1]); break;
				case 'd2': setDate('date2', pair[1]); break;
				case 'v': vis = pair[1]; break;
				case 'm': filterModel(pair[1]); break;
				default: console.log("invalid var name: " + pair[0]);
			}	
	}
	callVis(vis);
}

function callVis(vis){
	switch (vis){
		case 'h': heat_map(diffstats); break;
		case 'd': donut(diffstats); break;
		case 'b1': boxplot1(boxplot(window.extent[0], window.extent[1])); break;
		case 'b2': boxplot2(boxplot(window.extent[0], window.extent[1])); break;
		default: console.log("invalid vis call: " + vis + "!");
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
	var newDate = moment(date);
	document.getElementById("" + datafield).value = newDate.format("YYYY-MM-DD");
	//document.getElementById("choiceProperties").click(); 
	//$("#date1").submit();
	if(datafield == "date1") extent[0] = newDate;
	else  extent[1] = newDate;
	
 	//$("#date2Down").trigger('mousedown');
	//$("#date2Down").trigger('mouseup');
	//applyFilters();
}