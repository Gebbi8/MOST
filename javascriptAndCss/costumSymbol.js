// DEFINE A COUPLE OF CUSTOM SYMBOLS


var reactionLayout = function(size) {
	size = size*0.15;
	return "m -" + size*0.5 + " -" + size*0.5 +
	" h " + size + 
	" v " + size + 
	" h -" + size +
	" z " + " m 0 " + size/2 +
	" h -" + size/2 +
	" m " + size*2 + " 0" + 
	" h -" + size/2;
  };


var customSymbolTypes = d3.map({
  'compartment': function(size) { //size depends on node content
	  size = size *8;
	return "m -" + size*0.5 + " -" + size*0.5 + 
	" m  0 " + size*0.05 +
	" q " + size*0.2 + " -" + size* 0.05 + " " + size*0.4 + " -" + size*0.05 +
	" l " + size*0.2 + " 0" +
	" q " + size*0.2 + " 0 " + size*0.4 + " " + size*0.05 +
	" l 0 " + size*0.7 + 
	" q -" + size*0.2 + " " + size*0.05 + " -" + size*0.4 + " " + size*0.05 +
	" l -" + size*0.2 + " 0 " + 
	" q -" + size*0.2 + " 0 -" + size*0.4 + " -" + size*0.05 + 
	" z ";
  },
  
  'process': reactionLayout,
  'production': reactionLayout,
  'consumption': reactionLayout,
  'modulation': reactionLayout,
  'stimulation': reactionLayout,
  'catalysis': reactionLayout,
  'necessary stimulation': reactionLayout,
  
  'dissociation': function(size) {
	size = size*0.1;
	return "m -" + size * 0.5 + " -" + size * 0.5 + 
	" m -" + size*0.5 + " " + size*0.5 +
    " a " + size + " " + size + " 0 1 0 " +  size * 2 + " 0" +
	" a " + size + " " + size + " 0 1 0 -" +  size * 2 + " 0" +
	" m " + size*0.3 + " 0" + 
    " a " + size*0.7 + " " + size*0.7 + " 0 1 0 " +  size*0.7 * 2 + " 0" +
	" a " + size*0.7 + " " + size*0.7 + " 0 1 0 -" +  size*0.7 * 2 + " 0" +
	" m -" + size*0.3 + " 0" + 
	//" m 0 " + size/2 +
	" h -" + size/2 +
	" m " + size*3 + " 0" + 
	" h -" + size/2;
  },
  'association': function(size) {
	size = size*0.1;
	return "m -" + size * 0.5 + " -" + size * 0.5 + 
	" m -" + size*0.5 + " " + size*0.5 +
    " a " + size + " " + size + " 0 1 0 " +  size * 2 + " 0" +
	" a " + size + " " + size + " 0 1 0 -" +  size * 2 + " 0" +
	//" m 0 " + size/2 +
	" h -" + size/2 +
	" m " + size*3 + " 0" + 
	" h -" + size/2;
  },
  'macromolecule': function(size) {
	return "m -" + size*0.5 + " -" +size*0.5 + 
	" m " + size*0.1 + " 0" +
	" a " + size*0.1 + " " + size*0.1 + " " + size*0.02 + " 0 0 -" + size*0.1 + " " + size*0.1 +
	" l 0 " + size*0.8 +
	" a " + size*0.1 + " " + size*0.1 + " " + size*0.02 + " 0 0 " + size*0.1 + " " + size*0.1 +
	" l " + size*0.8 + " 0" +
	" a " + size*0.1 + " " + size*0.1 + " " + size*0.02 + " 0 0 " + size*0.1 + " -" + size*0.1 +
	" l 0 -" + size*0.8 + 
	" a " + size*0.1 + " " + size*0.1 + " " + size*0.02 + " 0 0 -" + size*0.1 + " -" + size*0.1 +
	" z ";
  },
   'source and sink': function(size) {
	size = size*0.1;
	return "m -" + size * 0.5 + " -" + size * 0.5 + 
	" m -" + size*0.5 + " " + size*0.5 +
    " a " + size + " " + size + " 0 1 0 " +  size * 2 + " 0" +
	" a " + size + " " + size + " 0 1 0 -" +  size * 2 + " 0" +
	" m 0 " + size +
	" l " + 2*size + " -" + 2*size;
  },
   'complex': function(size) {
	return "m -" + size*0.5 + " -" + size*0.5 +
	" m " + size*0.1 + " 0" +
	" l " + size*0.8 + " 0" +
	" l " + size*0.1 + " " + size*0.1 +
	" l 0 " + size*0.8 +
	" l -" + size*0.1 + " " + size*0.1 +
	" l -" + size*0.8 + " 0" +
	" l -" + size*0.1 + " -" + size*0.1 +
	" l 0 -" + size*0.8 + 
	" z ";
  },
   'perturbing agent': function(size) {
	return "m -" + size*0.5 + " -" + size*0.5 +
	" l " + size + " 0" +
	" l -" + size*0.125 + " " + size*0.5 +
	" l " + size*0.125 + " " + size*0.5 +
	" l -" + size + " " + " 0" +
	" l " + size*0.125 + " -" + size*0.5 +
	" z ";
  },
  'unspecified entity': function(size) {
	size = size;
	if(size > 150) size = 150;
	return "m -" + size * 0.5 + " -" + size * 0 + 
    " a " + size*0.25 + " " + size*0.5 + " -90 0 1 " +  size + " 0" +
	" a " + size*0.25 + " " + size*0.5 + " -90 0 1 -" +  size + " 0";
  },
  
  'simple chemical': function(size) {
	if (size > 35) {
		return "m -" + size/2 + " 0" +
		" m 17.5 -17.5" +
		" a  -17.5 17.5 0.5 1 0 0 35" +  
		" l " + (size - 35) + " 0 " +
		" a  -17.5 17.5 0.5 1 0 0 -35" 
		+ " z ";
	} else {
		return "m -" + size/2 + " 0" +
		" a " + size/2 + " " + size/2 + " 0 1 0 " +  size  + " 0" +
		" a " + size/2 + " " + size/2 + " 0 1 0 -" +  size  + " 0";
	}
  },
});


// CREATE A CUSTOM SYMBOL FUNCTION MIRRORING THE BUILT-IN FUNCTIONALITY
d3.svg.customSymbol = function() {
  var type,
      size = 64; // SET DEFAULT SIZE
  function symbol(d,i) {
    // GET THE SYMBOL FROM THE CUSTOM MAP
    return customSymbolTypes.get(type.call(this,d,i))(size.call(this,d,i));
  }
  // DEFINE GETTER/SETTER FUNCTIONS FOR SIZE AND TYPE
  symbol.type = function(_) {
    if (!arguments.length) return type;
    type = d3.functor(_);
    return symbol;
  };
  symbol.size = function(_) {
    if (!arguments.length) return size;
    size = d3.functor(_);
    return symbol;
  };
  return symbol;
};

function getSymbol(sbo, size) {
	var type = sboSwitch(sbo)
	size = size || 64;
	if (d3.svg.symbolTypes.indexOf(type) !== -1) {
		return d3.svg.symbol().type(type).size(size)();
	} else {
		if(type == "inhibition" || type == "conusmption" || type == "production" || type == "modulation" || type == "stimulation" || type == "catalysis" || type == "necessary stimulation") type = 'process';
		return d3.svg.customSymbol().type(type).size(size)();
	}
}