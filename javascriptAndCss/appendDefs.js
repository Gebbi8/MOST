function appendDefs(svg){
var defs = svg.append("defs");
var refX = 10;
	defs.append("marker")
			.attr({
				"id":"productionnothing",
				"viewBox":"0 -6 11 12",
				"fill":"black",
				"stroke-width":"0",
				"refX":refX,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"orient":"auto"
			})
			.append("path")
				.attr("d", "M0,-5L10,0L0,5")
				.attr("class","arrowHead");
				
	defs.append("marker")
			.attr({
				"id":"productionupdate",
				"viewBox":"0 -6 11 12",
				"fill":"orange",
				"stroke-width":"0",
				"refX":refX,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"orient":"auto"
			})
			.append("path")
				.attr("d", "M0,-5L10,0L0,5")
				.attr("class","arrowHead");

	defs.append("marker")
			.attr({
				"id":"modulationnothing",
				"viewBox":"0 -6 11 12",
				"fill":"white",
				"stroke-width":"0.5",
				"refX":refX,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"orient":"auto"
			})
			.append("path")
				.attr("d", "M0,0L5,5L10,0L5,-5Z")
				.attr("class","arrowHead");
				
	defs.append("marker")
			.attr({
				"id":"modulationupdate",
				"viewBox":"0 -6 11 12",
				"fill":"white",
				"stroke-width":"1",
				"refX":refX,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"orient":"auto"
			})
			.style("stroke", "orange")
			.append("path")
				.attr("d", "M0,0L5,5L10,0L5,-5Z")
				.attr("class","arrowHead");
				
	defs.append("marker")
			.attr({
				"id":"modulationdelete",
				"viewBox":"0 -6 11 12",
				"fill":"white",
				"stroke-width":"1",
				"refX":refX,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"orient":"auto"
			})
			.style("stroke", "red")
			.append("path")
				.attr("d", "M0,0L5,5L10,0L5,-5Z")
				.attr("class","arrowHead");
				
	defs.append("marker")
			.attr({
				"id":"modulationinsert",
				"viewBox":"0 -6 11 12",
				"fill":"white",
				"stroke-width":"1",
				"refX":refX,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"orient":"auto"
			})
			.style("stroke", "green")
			.append("path")
				.attr("d", "M0,0L5,5L10,0L5,-5Z")
				.attr("class","arrowHead");

	defs.append("marker")
			.attr({
				"id":"stimulationnothing",
				"viewBox":"0 -6 11 12",
				"stroke":"black",
				"stroke-width":"0.5",
				"fill":"white",
				"refX":refX,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"orient":"auto"
			})
			.style("stroke", "black")
			.append("path")
				.attr("d", "M1,-5L1,4L10,0Z")
				.attr("class","arrowHead");

	defs.append("marker")
			.attr({
				"id":"stimulationupdate",
				"viewBox":"0 -6 11 12",
				"stroke-width":"1",
				"fill":"white",
				"refX":refX,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"orient":"auto"
			})
			.style("stroke", "orange")
			.append("path")
				.attr("d", "M1,-5L1,4L10,0Z")
				.attr("class","arrowHead");
				
	defs.append("marker")
			.attr({
				"id":"stimulationdelete",
				"viewBox":"0 -6 11 12",
				"stroke-width":"1",
				"fill":"white",
				"refX":refX,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"orient":"auto"
			})
			.style("stroke", "red")
			.append("path")
				.attr("d", "M1,-5L1,4L10,0Z")
				.attr("class","arrowHead");
				
	defs.append("marker")
			.attr({
				"id":"stimulationinsert",
				"viewBox":"0 -6 11 12",
				"stroke-width":"1",
				"fill":"white",
				"refX":refX,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"orient":"auto"
			})
			.style("stroke", "green")
			.append("path")
				.attr("d", "M1,-5L1,4L10,0Z")
				.attr("class","arrowHead");
				
	defs.append("marker")
			.attr({
				"id":"catalysis",
				"viewBox":"0 -6 11 12",
				"stroke":"black",
				"stroke-width":"0.5",
				"fill":"white",
				"refX":refX,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"orient":"auto"
			})
			.append("path")
				.attr("d", "M1,0A1,1,0,0,1,9,0A1,1,0,0,1,1,0")
				.attr("class","arrowHead");
				
	defs.append("marker")
			.attr({
				"id":"inhibitionnothing",
				"viewBox":"0 -6 11 12",
				"stroke":"black",
				"stroke-width":"2.5",
				"fill":"white",
				"refX":refX,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"fill":"white",
				"orient":"auto"
			})
			.append("path")
				.style("stroke", "black")
				.attr("d", "M0,-5L0,5")
				.attr("class","arrowHead");
	
	defs.append("marker")
			.attr({
				"id":"inhibitioninsert",
				"viewBox":"0 -6 11 12",
				"stroke":"black",
				"stroke-width":"2.5",
				"fill":"white",
				"refX":refX,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"fill":"white",
				"orient":"auto"
			})
			.append("path")
				.style("stroke", "green")
				.attr("d", "M0,-5L0,5")
				.attr("class","arrowHead");
				
	defs.append("marker")
			.attr({
				"id":"inhibitionupdate",
				"viewBox":"0 -6 11 12",
				"stroke":"black",
				"stroke-width":"2.5",
				"fill":"white",
				"refX":11,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"fill":"white",
				"orient":"auto"
			})
			.append("path")
				.style("stroke", "orange")
				.attr("d", "M0,-5L0,5")
				.attr("class","arrowHead");
				
	defs.append("marker")
			.attr({
				"id":"inhibitiondelete",
				"viewBox":"0 -6 11 12",
				"stroke":"black",
				"stroke-width":"2.5",
				"fill":"white",
				"refX":11,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"fill":"white",
				"orient":"auto"
			})
			.append("path")
				.style("stroke", "red")
				.attr("d", "M0,-5L0,5")
				.attr("class","arrowHead");
				
	defs.append("marker")
			.attr({
				"id":"inhibitionmove",
				"viewBox":"0 -6 11 12",
				"stroke":"black",
				"stroke-width":"2.5",
				"fill":"white",
				"refX":11,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"fill":"white",
				"orient":"auto"
			})
			.append("path")
				.style("stroke", "blue")
				.attr("d", "M0,-5L0,5")
				.attr("class","arrowHead");
				
	defs.append("marker")
			.attr({
				"id":"necessarystimulation",
				"viewBox":"0 -6 11 12",
				"stroke-width":"0.5",
				"stroke":"black",
				"fill":"white",
				"refX":11,
				"refY":0,
				"markerWidth":marker,
				"markerHeight":marker,
				"orient":"auto"
			})
			.append("path")
				.attr("d", "M1,-5L1,105M2,-4L2,4L10,0L2,-4")
				.attr("class","arrowHead");

return defs;
}