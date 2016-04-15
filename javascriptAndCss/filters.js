// This file contains a number of possible filters
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





