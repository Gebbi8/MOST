 function download(data) {
	console.log(data.nodes, data.links);
	
	var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<sbgn xmlns="http://sbgn.org/libsbgn/0.2">\n';
	xml = xml + '\t<map language="process description">\n';
	
	var xmlExtension = '\t\t<extension>\n\t\t\t<renderInformation xmlns="http://projects.eml.org/bcb/sbml/render/level2">\n\t\t\t\t<listOfColorDefinitions>\n\t\t\t\t\t<colorDefinition id="insert" value="#00FF00" />\n\t\t\t\t\t<colorDefinition id="delete" value="#FF0000" />\n\t\t\t\t\t<colorDefinition id="move" value="#FFFF00" />\n\t\t\t\t\t<colorDefinition id="update" value="#0000FF" />\n\t\t\t\t\t<colorDefinition id="move-stroke" value="#CCCC00" />\n\t\t\t\t</listOfColorDefinitions>\n';

	var xmlListOfStyles = '\t\t\t\t<listOfStyles>'
	
	var xmlGlyphs = "";
	var	xmlArcs = "";
	
	var insertGlyphs = '<style idList="';
	var deleteGlyphs = '<style idList="';
	var moveGlyphs = '<style idList="';
	var updateGlyphs = '<style idList="';
	
	//loop over compartments
	d3.select("#bivesGraphSvg").selectAll("g.compartment").each( function (d,i){
		console.log(d);console.log(i);console.log(this);

		xmlGlyphs = xmlGlyphs + '\t\t<glyph ';
		
		var compartment = this.getAttribute('compartment');
		if(compartment != "null" && compartment != null)	xmlGlyphs = xmlGlyphs + ' compartmentRef="' + compartment + '" ';
		
		//class optional, id mandatory
		xmlGlyphs = xmlGlyphs + 'id="' + this.getAttribute('id') + '"';
		xmlGlyphs = xmlGlyphs + ' class="' + 'compartment' + '" ';			
			
		xmlGlyphs = xmlGlyphs + '>\n';
		
		//bounding box mandatory
		var bbox = this.getBBox();
		console.log(this.transform);
		xmlGlyphs = xmlGlyphs + '\t\t\t<bbox x="' + bbox.x + '" y="' + bbox.y + '" w="' + bbox.width + '" h="' + bbox.height + '"' + '/>\n';
		
		//label optional
		if(this.getAttribute('label') != null){
			xmlGlyphs = xmlGlyphs + '\t\t\t<label text="' + this.getAttribute('label') + '"/>\n'
		}
		
		//color
		switch (d.bivesClass){
			case 'update': updateGlyphs = updateGlyphs + d.id + " "; break;
			case 'insert': insertGlyphs = insertGlyphs + d.id + " "; break; 
			case 'delete': deleteGlyphs = deleteGlyphs + d.id + " "; break;
			case 'move': moveGlyphs = moveGlyphs + d.id + " "; break;
			default: ;
		}
		
		xmlGlyphs = xmlGlyphs + '\t\t</glyph>\n';		
	})

	//loop over glyphs
	d3.select("#bivesGraphSvg").selectAll("g.node").each( function (d,i){
		console.log(d);console.log(i);console.log(this);
		xmlGlyphs = xmlGlyphs + '\t\t<glyph ';
		
		var compartment = d.compartment;
		if(compartment != "null")	xmlGlyphs = xmlGlyphs + ' compartmentRef="' + d.compartment + '" ';
		
		//class optional, id mandatory
		if(d.class != null){ 
			xmlGlyphs = xmlGlyphs + 'id="' + d.id + '"';
			xmlGlyphs = xmlGlyphs + ' class="' + sboSwitch(d.class) + '" ';			
		}
		xmlGlyphs = xmlGlyphs + '>\n';
		
		//bounding box mandatory
		var bbox = this.getBBox();
		console.log(this.transform);
		if(sboSwitch(d.class) == "process") xmlGlyphs = xmlGlyphs + '\t\t\t<bbox x="' + (d.x + bbox.width/4) + '" y="' + d.y + '" w="' + bbox.width/2 + '" h="' + bbox.height + '"' + '/>\n';
		else xmlGlyphs = xmlGlyphs + '\t\t\t<bbox x="' + d.x + '" y="' + d.y + '" w="' + bbox.width + '" h="' + bbox.height + '"' + '/>\n';
		
		//label optional
		if(d.label != null){
			xmlGlyphs = xmlGlyphs + '\t\t\t<label text="' + d.label + '"/>\n'
		}
		
		//color
		switch (d.bivesClass){
			case 'update': updateGlyphs = updateGlyphs + d.id + " "; break;
			case 'insert': insertGlyphs = insertGlyphs + d.id + " "; break; 
			case 'delete': deleteGlyphs = deleteGlyphs + d.id + " "; break;
			case 'move': moveGlyphs = moveGlyphs + d.id + " "; break;
			default: ;
		}
		
		//clonmaker optional
		
		xmlGlyphs = xmlGlyphs + '\t\t</glyph>\n';		
	})
	
	var styleGlyphs =  '\n\t\t\t\t\t' + updateGlyphs + '">\n\t\t\t\t\t\t<g stroke="update-stroke" stroke-width="2" fill="update"  />\n\t\t\t\t\t</style>';
	styleGlyphs = styleGlyphs + '\n\t\t\t\t\t' + moveGlyphs + '">\n\t\t\t\t\t\t<g stroke="move-stroke" stroke-width="2" fill="move"  />\n\t\t\t\t\t</style>';
	styleGlyphs = styleGlyphs + '\n\t\t\t\t\t' + insertGlyphs + '">\n\t\t\t\t\t\t<g stroke="insert-stroke" stroke-width="2" fill="insert"  />\n\t\t\t\t\t</style>';
	styleGlyphs = styleGlyphs + '\n\t\t\t\t\t' + deleteGlyphs + '">\n\t\t\t\t\t\t<g stroke="delete-stroke" stroke-width="2" fill="delete"  />\n\t\t\t\t\t</style>';
		
	var updateArcs = '<style idList="';
	var deleteArcs = '<style idList="';
	var moveArcs = '<style idList="';
	var insertArcs = '<style idList="';
	
	//loop over arcs
	d3.select("#bivesGraphSvg").selectAll("path.link").each( function (d,i){
		console.log(d, this)
	
		xmlArcs = xmlArcs + '\t\t<arc id="arc' + i + '" class="' + sboSwitch(d.class) + '" ';
		
		xmlArcs = xmlArcs + 'source="' + d.source.id + '" target="' + d.target.id + '"'
		
		xmlArcs = xmlArcs + '>\n';
		
		//color
		switch (d.bivesClass){
			case 'update': updateArcs = updateArcs + "arc" + i + " "; break;
			case 'insert': insertArcs = insertArcs + "arc" + i + " "; break; 
			case 'delete': deleteArcs = deleteGlyphs + "arc" + i + " "; break;
			case 'move': moveArcs = moveArcs + "arc" + i + " "; break;
			default: ;
		}
		
		var path =  this.getAttribute('d').substr(1).split('L');
		
		for(var i=0; i<path.length; i++) path[i]=path[i].split(',');
		if("isNotBended" == "isNotBended"){
			xmlArcs = xmlArcs + '\t\t\t<start x="' + path[0][0] + '" y="' + path[0][1] + '"/>\n';
		
			xmlArcs = xmlArcs + '\t\t\t<end x="' + path[1][0] + '" y="' + path[1][1] + '"/>\n';
			
			xmlArcs = xmlArcs + '\t\t</arc>\n';	
		} else {
			xmlArcs = xmlArcs + '\t\t\t<start x="' + d3.selectAll("line")[0][i].x1.animVal.value + '" y="' + d3.selectAll("line")[0][i].y1.animVal.value + '"/>\n';
		
			xmlArcs = xmlArcs + '\t\t\t<end x="' + d3.selectAll("line")[0][i].x2.animVal.value + '" y="' + d3.selectAll("line")[0][i].y2.animVal.value + '"/>\n';
		
			xmlArcs = xmlArcs + '\t\t</arc>\n';
		}
	});
	
	var styleArcs =  '\n\t\t\t\t\t' + updateArcs + '">\n\t\t\t\t\t\t<g stroke="update-stroke" stroke-width="2" fill="update"  />\n\t\t\t\t\t</style>';
	styleArcs = styleArcs + '\n\t\t\t\t\t' + moveArcs + '">\n\t\t\t\t\t\t<g stroke="move-stroke" stroke-width="2" fill="move"  />\n\t\t\t\t\t</style>';
	styleArcs = styleArcs + '\n\t\t\t\t\t' + insertArcs + '">\n\t\t\t\t\t\t<g stroke="insert-stroke" stroke-width="2" fill="insert"  />\n\t\t\t\t\t</style>';
	styleArcs = styleArcs + '\n\t\t\t\t\t' + deleteArcs + '">\n\t\t\t\t\t\t<g stroke="delete-stroke" stroke-width="2" fill="delete"  />\n\t\t\t\t\t</style>';
	
	xmlListOfStyles = xmlListOfStyles + styleGlyphs + styleArcs; 
	
	xml = xml + xmlExtension + xmlListOfStyles + '\n\t\t\t\t</listOfStyles>\n\t\t\t</renderInformation>\n\t\t</extension>\n' + xmlGlyphs + xmlArcs + '</map>\n' +  "</sbgn>";
	
	var blob = new Blob([xml], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "sbgn-ml.sbgnml");
}