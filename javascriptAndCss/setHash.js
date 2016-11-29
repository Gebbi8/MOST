function setHash(attr, value){
	var currentHash = location.hash.slice(1);
	
	var newHash = "";
	var found = 0;
	
	if(currentHash.length == 0){
		location.hash = attr + ":" + value; return;
	} else {
		var variables = currentHash.split(',');

		for(var i=0; i<variables.length; i++){
			var pair = variables[i].split(':');

			if(pair[0] == attr){
				found = 1;
				newHash += attr + ":" + value;
			} else {
				newHash += variables[i];
			}
			newHash += ',';
		}
		if(found == 0){
			newHash += attr + ":" + value;
		} else {
			newHash = newHash.slice(0, -1);
		}
		location.hash = newHash;
	}	
}

function checkBoxes(){
	if(document.getElementById('SBMLFilter').checked && document.getElementById('CellMLFilter').checked){
		setHash("t", "a");
	} else if (document.getElementById('SBMLFilter').checked == document.getElementById('CellMLFilter').checked){
		setHash("t", "n");
	} else if(document.getElementById('SBMLFilter').checked){
		setHash("t", "s");
	} else {
		setHash("t", "c");
	}
}