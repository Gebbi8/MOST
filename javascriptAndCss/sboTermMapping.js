function sboSwitch(sboTerm){
	switch (sboTerm){
		case "SBO:0000247": return "simple chemical" ; break; // simple chemical
		case "SBO:0000245": return "macromolecule" ; break; // macromolecule
		case "SBO:0000354": return "nucleic acid feature" ; break; // informational molecule segment
		case "SBO:0000421": return "simple chemical multimer" ; break; // multimer of simple chemicals
		case "SBO:0000420": return "macromolecule multimer" ; break; // multimer of macromolecules
		case "SBO:0000419": return "nucleic acid feature multimer" ; break; // multimer of informational molecule segments
		case "SBO:0000253": return "complex" ; break; // non-covalent complex
		case "SBO:0000418": return "complex multimer" ; break; // multimer of complexes
		case "SBO:0000285": return "unspecified entity" ; break; // material entity of unspecified nature
		case "SBO:0000291": return "source and sink" ; break; // empty set
		case "SBO:0000405": return "perturbing agent" ; break; // perturbing agent
		case "SBO:0000290": return "compartment" ; break; // physical compartment
		case "SBO:0000395": return "submap" ; break; // encapsulating process
		case "SBO:0000375": return "process" ; break; // process
		case "SBO:0000397": return "omitted process" ; break; // omitted process
		case "SBO:0000396": return "uncertain process" ; break; // uncertain proces
		case "SBO:0000177": return "association" ; break; // non-covalent binding
		case "SBO:0000180": return "dissociation" ; break; // dissociation
		case "SBO:0000358": return "phenotype" ; break; // phenotype
		case "SBO:0000173": return "and" ; break; // and
		case "SBO:0000174": return "or" ; break; // or
		case "SBO:0000238": return "not" ; break; // not
		case "SBO:0000394": return "consumption" ; break; // consumption
		case "SBO:0000393": return "production" ; break; // production
		case "SBO:0000168": return "modulation" ; break; // control
		case "SBO:0000170": return "stimulation" ; break; // stimulation
		case "SBO:0000172": return "catalysis" ; break; // catalysis
		case "SBO:0000169": return "inhibition" ; break; // inhibition
		case "SBO:0000171": return "necessary stimulation" ; break; // necessary stimulation
		case "SBO:0000398": return "logic arc" ; break; // logical relationship
		// SBO terms from sbml specification
		case "SBO:0000019": return "modulation" ; break; // modifier
		case "SBO:0000020": return "inhibition" ; break; // inhibitor
		case "SBO:0000459": return "stimulation" ; break; // stimulator
		case "SBO:0000013": return "catalysis" ; break; // catalyst
		case "SBO:0000461": return "necessary stimulation" ; break; // essential activator
		case "SBO:0000011": return "production" ; break; // product
		case "SBO:0000010": return "consumption" ; break; // reactant
		// child SBO terms from above SBO terms
		case "SBO:0000181": return "process" ; break;
		case "SBO:0000182": return "process" ; break;
		case "SBO:0000183": return "process" ; break;
		case "SBO:0000184": return "process" ; break;
		case "SBO:0000185": return "process" ; break;
		case "SBO:0000167": return "process" ; break;
		case "SBO:0000178": return "process" ; break;
		case "SBO:0000179": return "process" ; break;
		case "SBO:0000176": return "process" ; break;
		case "SBO:0000402": return "process" ; break;
		case "SBO:0000403": return "process" ; break;
		case "SBO:0000400": return "process" ; break;
		case "SBO:0000401": return "process" ; break;
		case "SBO:0000500": return "process" ; break;
		case "SBO:0000502": return "process" ; break;
		case "SBO:0000501": return "process" ; break;
		case "SBO:0000015": return "consumption" ; break;
		case "SBO:0000410": return "compartment" ; break;
		case "SBO:0000411": return "stimulation" ; break;
		case "SBO:0000407": return "inhibition" ; break;
		case "SBO:0000021": return "stimulation" ; break;
		case "SBO:0000543": return "complex" ; break;
		case "SBO:0000526": return "process" ; break;
		case "SBO:0000534": return "necessary stimulation" ; break;
		case "SBO:0000535": return "necessary stimulation" ; break;
		case "SBO:0000536": return "inhibition" ; break;
		case "SBO:0000537": return "inhibition" ; break;
		case "SBO:0000533": return "necessary stimulation" ; break;
		case "SBO:0000376": return "process" ; break;
		case "SBO:0000377": return "process" ; break;
		case "SBO:0000460": return "catalysis" ; break;
		case "SBO:0000462": return "stimulation" ; break;
		case "SBO:0000464": return "process" ; break;
		case "SBO:0000250": return "macromolecule" ; break;
		case "SBO:0000251": return "macromolecule" ; break;
		case "SBO:0000399": return "process" ; break;
		case "SBO:0000252": return "macromolecule" ; break;
		case "SBO:0000246": return "macromolecule" ; break;
		case "SBO:0000248": return "macromolecule" ; break;
		case "SBO:0000249": return "macromolecule" ; break;
		case "SBO:0000336": return "consumption" ; break;
		case "SBO:0000239": return "modulation" ; break;
		case "SBO:0000330": return "process" ; break;
		case "SBO:0000233": return "process" ; break;
		case "SBO:0000219": return "process" ; break;
		case "SBO:0000221": return "process" ; break;
		case "SBO:0000220": return "process" ; break;
		case "SBO:0000328": return "simple chemical" ; break;
		case "SBO:0000327": return "simple chemical" ; break;
		case "SBO:0000223": return "process" ; break;
		case "SBO:0000222": return "process" ; break;
		case "SBO:0000224": return "process" ; break;
		case "SBO:0000208": return "process" ; break;
		case "SBO:0000209": return "process" ; break;
		case "SBO:0000210": return "process" ; break;
		case "SBO:0000357": return "process" ; break;
		case "SBO:0000214": return "process" ; break;
		case "SBO:0000213": return "process" ; break;
		case "SBO:0000212": return "process" ; break;
		case "SBO:0000211": return "process" ; break;
		case "SBO:0000218": return "process" ; break;
		case "SBO:0000217": return "process" ; break;
		case "SBO:0000216": return "process" ; break;
		case "SBO:0000215": return "process" ; break;
		case "SBO:0000344": return "process" ; break;
		case "SBO:0000343": return "process" ; break;
		case "SBO:0000201": return "process" ; break;
		case "SBO:0000200": return "process" ; break;
		case "SBO:0000342": return "process" ; break;
		case "SBO:0000202": return "process" ; break;
		case "SBO:0000205": return "process" ; break;
		case "SBO:0000204": return "process" ; break;
		case "SBO:0000207": return "inhibition" ; break;
		case "SBO:0000206": return "inhibition" ; break;
		case "SBO:0000296": return "complex" ; break;
		case "SBO:0000297": return "complex" ; break;
		case "SBO:0000286": return "complex" ; break;
		case "unknown": return "modulation" ; break;
		case "stimulator": return "stimulator" ; break;
		case "inhibitor": return "inhibitor" ; break;
		default: return "unspecified entity";
	}
}