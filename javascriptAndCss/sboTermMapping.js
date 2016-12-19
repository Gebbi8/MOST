function sboSwitch(sboTerm){
	switch (sboTerm){
		case "SBO:0000247": return "simplechemical" ; break; // simple chemical
		case "SBO:0000245": return "macromolecule" ; break; // macromolecule
		case "SBO:0000354": return "nucleicacidfeature" ; break; 
		case "SBO:0000421": return "multimersimplechemical" ; break; 
		case "SBO:0000420": return "multimermacromolecule" ; break; 
		case "SBO:0000419": return "multimernucleicacidfeature" ; break; 
		case "SBO:0000253": return "complex" ; break; 
		case "SBO:0000418": return "multimercomplex" ; break; 
		case "SBO:0000285": return "unspecifiedentity" ; break; 
		case "SBO:0000291": return "source and sink" ; break; 
		case "SBO:0000405": return "perturbingagent" ; break; 
		case "SBO:0000290": return "compartment" ; break; 
		case "SBO:0000395": return "submap" ; break; 
		case "SBO:0000375": return "process" ; break; 
		case "SBO:0000397": return "omittedprocess" ; break; 
		case "SBO:0000396": return "uncertainprocess" ; break; 
		case "SBO:0000177": return "association" ; break; 
		case "SBO:0000180": return "dissociation" ; break; 
		case "SBO:0000358": return "phenotype" ; break; 
		case "SBO:0000173": return "andoperator" ; break; 
		case "SBO:0000174": return "oroperator" ; break; 
		case "SBO:0000238": return "notoperator" ; break; 
		case "SBO:0000394": return "consumption" ; break; 
		case "SBO:0000393": return "production" ; break; 
		case "SBO:0000168": return "modulation" ; break; 
		case "SBO:0000170": return "stimulation" ; break; 
		case "SBO:0000172": return "catalysis" ; break; 
		case "SBO:0000169": return "inhibition" ; break; 
		case "SBO:0000171": return "necessarystimulation" ; break; 
		case "SBO:0000398": return "logicarc" ; break; 
		
		case "SBO:0000019": return "modulation" ; break; 
		case "SBO:0000020": return "inhibition" ; break; 
		case "SBO:0000459": return "stimulation" ; break; 
		case "SBO:0000013": return "catalysis" ; break; 
		case "SBO:0000461": return "necessarystimulation" ; break; 
		case "SBO:0000011": return "production" ; break; 
		case "SBO:0000010": return "consumption" ; break; 
		case "unkown": return "modulation"; break
		default: return "unspecifiedentity";
	}
}