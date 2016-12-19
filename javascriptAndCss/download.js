function download(data) {
	console.log(data);
	
	var xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>\n<sbgn xmlns="http://sbgn.org/libsbgn/0.2">\n';
	xml = xml + '\t<map language="process description">\n';

	//loop over glyphs
	
	for(i = 0; i<data.nodes.length; i++){
		xml = xml + '\t\t<glyph ';
		
		var compartment = data.nodes[i].compartment;
		if(compartment != "null")	xml = xml + ' compartmentRef="' + data.nodes[i].compartment + '" ';
		
		//class optional, id mandatory
		if(data.nodes[i].class != null){ 
			xml = xml + 'class="' + sboSwitch(data.nodes[i].class) + '" ';
			xml = xml + 'id="' + data.nodes[i].id + '"';			
		}
		xml = xml + '>\n';
		
		//label optional
		if(data.nodes[i].label != null){
			xml = xml + '\t\t\t<label text="' + data.nodes[i].label + '"/>\n'
		}
		
		//color
		var color = $("#"+d3.selectAll("g").data()[i].id).css("stroke");
		if(color == "rgb(255, 165, 0)"){
			color = "orange";
		}
		xml = xml + '\t\t\t<note color="' + color + '"/>\n'
		
		//clonmaker optional
		
		//bounding box mandatory
		var bbox = d3.selectAll("g.node")[0][i].getBBox();
		xml = xml + '\t\t\t<bbox x="' + d3.selectAll("g").data()[i].x + '" y="' + d3.selectAll("g").data()[i].y + '" w="' + bbox.width + '" h="' + bbox.height + '"' + '/>\n';
		
		xml = xml + '\t\t</glyph>\n';
	}
	
	//loop over arcs
	for(i = 0; i<data.links.length; i++){
		xml = xml + '\t\t<arc id="arc' + i + '" class="' + sboSwitch(data.links[i].class) + '" ';
		
		xml = xml + 'source="' + data.links[i].source.id + '" target="' + data.links[i].target.id + '"'
		
		xml = xml + '>\n';
		
		xml = xml + '\t\t\t<note color="' + d3.selectAll("line")[0][i].style.stroke + '"/>\n'
		
		xml = xml + '\t\t\t<start x="' + d3.selectAll("line")[0][i].x1.animVal.value + '" y="' + d3.selectAll("line")[0][i].y1.animVal.value + '"/>\n';
		
		xml = xml + '\t\t\t<end x="' + d3.selectAll("line")[0][i].x2.animVal.value + '" y="' + d3.selectAll("line")[0][i].y2.animVal.value + '"/>\n';
		
		xml = xml + '\t\t</arc>\n';		
	}
	
	xml = xml + '\t' + '</map>\n';
	xml = xml + "</sbgn>";
	console.log(xml);
	
	var blob = new Blob([xml], {type: "text/plain;charset=utf-8"});
	saveAs(blob, "sbgn-ml.xml");
}