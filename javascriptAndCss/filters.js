// This file contains code to establish
// filtering for files and differences



// list currently active filters
var activeFilesFilters = [];
var activeDiffsFilters = [];





// APPLY FILTERS

// apply active file filters
function applyFilesFilters ()
{
	var result = originalFilestats;
	activeFilesFilters.forEach (function (filter)
	{
		result = filter (result);
	});
	return result;
}
// apply active diffs filters
function applyDiffsFilters ()
{
	var result = originalDiffstats;
	activeDiffsFilters.forEach (function (filter)
	{
		result = filter (result);
	});
	return result;
}







// ACTIVATE FILTERS


// activate a file filter
function activateFilesFilter (filter)
{
	var add = true;
	activeFilesFilters.forEach (function (f)
	{
		if (f == filter)
		{
			add = false;
			return;
		}
	});
	if (add)
		activeFilesFilters.push (filter);
}

// activate a diff filter
function activateDiffsFilter (filter)
{
	var add = true;
	activeDiffsFilters.forEach (function (f)
	{
		if (f == filter)
		{
			add = false;
			return;
		}
	});
	if (add)
		activeDiffsFilters.push (filter);
}







// DEACTIVATE FILTERS



// deactivate a file filter
function deactivateFilesFilter (filter)
{
	for (var i = activeFilesFilters.length - 1; i >= 0; i--)
		if (activeFilesFilters[i] == filter)
			activeFilesFilters.splice(i, 1)
}

// deactivate a diff filter
function deactivateDiffsFilter (filter)
{
	for (var i = activeFilesFilters.length - 1; i >= 0; i--)
		if (activeFilesFilters[i] == filter)
			activeFilesFilters.splice(i, 1)
}







// ACTUAL FILTERS



// This file contains a number of implemented filters
// that can be applied to models
//
// Every filter takes the matrix of files or diffs
// and returns a matrix that contains only those
// entries of the input that match the filter's
// criteria




function filterRemoveSbmlFiles (table)
{
	var filtered = {};
	for (var id in table)
	{
		if (table.hasOwnProperty(id) && table[id].modeltype != "SBML")
			filtered[id] = table[id];
	}
	return filtered;
}


function filterRemoveCellmlFiles (table)
{
	var filtered = {};
	for (var id in table)
	{
		if (table.hasOwnProperty(id) && table[id].modeltype != "CellML")
			filtered[id] = table[id];
	}
	return filtered;
}


// filter for times in the files table
function filterTimeFiles (table)
{
	var filtered = {};
	for (var id in table)
	{
		if (table.hasOwnProperty(id) && table[id].date >= extent[0] && table[id].date <= extent[1])
			filtered[id] = table[id];
	}
	return filtered;
}


// filter for times in the diffs table
function filterTimeDiffs (table)
{
	var n = 0;
	var filtered = [];
	for (var id = 0; id < table.length; id++)
	{
// 		if (n++ < 10)
// 			console.log (id + " -- " + table[id]);
		
		
		if (table.hasOwnProperty(id))
		{
			var datum1 = originalFilestats[ table[id]["model"] + table[id]["version2id"]  ].date;
			var datum2 = originalFilestats[ table[id]["model"] + table[id]["version2id"]  ].date;
			
			if (datum1 >= extent[0] && datum1 <= extent[1] && datum2 >= extent[0] && datum2 <= extent[1])
				filtered.push (table[id]);
		}
	}
	return filtered;
}








