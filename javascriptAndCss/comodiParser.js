function fillcomodiFig(annotations){
	var comodiTerms = [
					["Deletion","Insertion","Update","PermutationOfEntities","Move"],
					["EntityName","XmlNode","XmlAttribute","EntityIdentifier","ModelId","ModelName","XmlText"],
					["HierarchyDefinition","ReactionDefinition","FunctionDefinition","ReversibilityDefinition","ChangedSpecification","KineticsDefinition","ModelAnnotation","RuleDefinition","OntologyReference","TextualDescription","SpeciesSetup","Contributor","ParticipantDefinition","UnitDefinition","ParameterSetup","IdentifierEncoding","Creator","VariableSetup","CreationDate","MetaIdEncoding","EventDefinition","MathematicalModelDefinition","Person","ReactionNetworkDefinition","VariableConnectionDefinition","Attribution","ModificationDate","ComponentDefinition"]
					];
	
	for(var j = 0; j<comodiTerms.length; j++){
		var counter = [];
		var allCounts = [];
		for(var i=0; i<comodiTerms[j].length; i++){
			//console.log(comodiTerms[i]);
			var re;
			if(j==0) re = new RegExp("comodi:"+comodiTerms[j][i], 'g');
			else re = new RegExp("#"+comodiTerms[j][i], 'g');
			var matchCount = Math.log((annotations.match(re) || []).length+1);
			counter.push([comodiTerms[j][i], matchCount]);
			allCounts.push(matchCount);
		}
		
		var max = Math.max.apply(null, allCounts);
		var min = Math.min.apply(null, allCounts);
		
		console.log(counter);
		console.log(allCounts, max, min);
		for(var i = 0; i<counter.length; i++){
			var opacity = (counter[i][1] - min + 1)/(max-min+1);
			d3.select("#" + counter[i][0]).style("fill-opacity", "" + opacity);
			console.log("#" + counter[i][0], "" + opacity);
		}
	}
}