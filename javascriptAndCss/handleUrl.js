function queryUrl(callback1, callback2, callback3, brushed, brush, brush2){
	//console.log(brush, brush2);
	var url = location.hash.slice(1);
	console.log(url);
	var vis, tab, diff, callBives;

	var variables = url.split(',');
	console.log(variables);
	for(var i=0; i < variables.length; i++){
		var pair = variables[i].split(':');
		console.log(pair);
			switch (pair[0]){
				case 't': checkTypeBoxes(pair[1]); break;
				case 'd1': setDate('date1', pair[1], brushed); break;
				case 'd2': setDate('date2', pair[1], brushed); break;
				case 'v': vis = pair[1]; break;
				case 'm': filterModel(pair[1], brushed); break;
				case 'b': tab = pair[1]; break;
				case 'd': diff = pair[1]; break;
				case 's': sessionStorage.clear();
				//case 'c': callBives = 1;
				default: console.log("invalid var name: " + pair[0]);
			}
	}

    //date1 = new Date (document.getElementById("date1").value);
    //date2 = new Date (document.getElementById("date2").value);
    brush.extent(window.extent);
    brush2.extent(window.extent);
    brushed ();

	applyFilters ();

 	if(typeof callback1 === 'function') callVis(vis); else {
		console.log(callVis +" is not a function");
	}

	if(typeof callback2 === 'function') clickDiff(vis, diff); else {
		console.log(clickDiff +" is not a function");
	}

	if(typeof callback3 === 'function') showBivesTab(vis, tab, diff); else {
		console.log(showBivesTab +" is not a function");
	}
}

function filterModel(models){
	models = models.split('&');
	for(var i=0; i<models.length; i++){
		modelsFilter.push("/" + models[i]);
	}

	activateFilesFilter(filterIdFiles);
	activateDiffsFilter(filterIdDiffs);
};

function setDate(datafield, date){
	datafield = "" + datafield
	console.log(datafield, date);

	var newDate = new Date(date);
	console.log(newDate);
	document.getElementById(datafield).value = newDate.toISOString().slice(0,10);

	if(datafield == "date1") {
        window.extent[0] = newDate;
    }
	else {
        window.extent[1] = newDate;
    }
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

function callVis(vis){
	console.log("call vis");
	switch (vis){
		case 'h': heatmap(diffstats); break;
		case 'd': donut(diffstats); break;
		case 'b1': console.log(window.extent); boxplot(diffstats); break;
		case 'b2': boxplot2(diffstats); break;
		default: console.log("invalid vis call: " + vis + "!");
	}
}

function clickDiff(vis, id){
	console.log("click diff");
	console.log($('#'+id));

	d3.select('#'+id).each(
		function(d){
			var version1, version2;
			if(vis === "d"){
				version1 = originalFilestats[this.__data__.data.model + this.__data__.data.version1id];
				version2 = originalFilestats[this.__data__.data.model + this.__data__.data.version2id];
			} else {
				version1 = originalFilestats[this.__data__.model + this.__data__.version1id];
				version2 = originalFilestats[this.__data__.model + this.__data__.version2id];
			}
			showDiffInfo(version1, version2);
		}
	);
}

function showBivesTab(vis, tab, id){
	console.log("show tab: " + tab);
	if(tab == undefined) return;
	//compute diff
	d3.select('#' + id).each(
		function(d){
			var version1, version2;
			if(vis === "d"){
				version1 = originalFilestats[this.__data__.data.model + this.__data__.data.version1id];
				version2 = originalFilestats[this.__data__.data.model + this.__data__.data.version2id];
			} else {
				version1 = originalFilestats[this.__data__.model + this.__data__.version1id];
				version2 = originalFilestats[this.__data__.model + this.__data__.version2id];
			}
			getBivesData(version1, version2, ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"], "#info")
		}
	);
	switch (tab){
		case 'r': showBivesContent('#bivesReport', '#reportTab'); break;
		case 'g': showBivesContent('#bivesGraph', '#graphTab'); break;
		case 'x': showBivesContent('#bivesXmlDiff', '#xmlTab'); break;
		case 'a': showBivesContent('#bivesAnnotations', '#annotations'); break;
		default: console.log("invalid bives tab call: " + tab + "!");
	}
}
