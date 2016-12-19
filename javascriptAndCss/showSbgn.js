function showSbgn(data){
	d3.selectAll("#bivesGraph").selectAll("svg").remove();

	console.log(data);
	var obj = JSON.parse(data);
	console.log(obj);
	
	var width = 650,
		height = 400,
		size = (width - 50) / 10 ;
		marker = width / 100;

	var color = d3.scale.category20();

	var force = d3.layout.force()
		.charge(-900)
		.linkDistance(20)
		.size([width, height]);

	var svg = d3.select("#bivesGraph").append("svg")
		.attr("width", width)
		.attr("height", height);
	
	defs = svg.append("defs")

		defs.append("marker")
				.attr({
					"id":"productionnothing",
					"viewBox":"0 -6 11 12",
					"refX":9,
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
					"refX":9,
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
					"refX":5,
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
					"refX":5,
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
					"refX":5,
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
					"refX":5,
					"refY":0,
					"markerWidth":marker,
					"markerHeight":marker,
					"orient":"auto"
				})
				.style("stroke", "blue")
				.append("path")
					.attr("d", "M0,0L5,5L10,0L5,-5Z")
					.attr("class","arrowHead");

		defs.append("marker")
				.attr({
					"id":"stimulatornothing",
					"viewBox":"0 -6 11 12",
					"stroke":"black",
					"stroke-width":"0.5",
					"fill":"white",
					"refX":5,
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
					"id":"stimulatorupdate",
					"viewBox":"0 -6 11 12",
					"stroke-width":"1",
					"fill":"white",
					"refX":5,
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
					"id":"stimulatordelete",
					"viewBox":"0 -6 11 12",
					"stroke-width":"1",
					"fill":"white",
					"refX":5,
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
					"id":"stimulatorinsert",
					"viewBox":"0 -6 11 12",
					"stroke-width":"1",
					"fill":"white",
					"refX":5,
					"refY":0,
					"markerWidth":marker,
					"markerHeight":marker,
					"orient":"auto"
				})
				.style("stroke", "blue")
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
					"refX":5,
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
					"id":"inhibition",
					"viewBox":"0 -6 11 12",
					"stroke":"black",
					"stroke-width":"2.5",
					"fill":"white",
					"refX":0,
					"refY":0,
					"markerWidth":marker,
					"markerHeight":marker,
					"fill":"white",
					"orient":"auto"
				})
				.append("path")
					.attr("d", "M0,-5L0,5")
					.attr("class","arrowHead");
					
		defs.append("marker")
				.attr({
					"id":"necessarystimulation",
					"viewBox":"0 -6 11 12",
					"stroke-width":"0.5",
					"stroke":"black",
					"fill":"white",
					"refX":5,
					"refY":0,
					"markerWidth":marker,
					"markerHeight":marker,
					"orient":"auto"
				})
				.append("path")
					.attr("d", "M1,-5L1,105M2,-4L2,4L10,0L2,-4")
					.attr("class","arrowHead");
	
	var edges = [];
	
	var nodeById = d3.map();

	  obj.nodes.forEach(function(node) {
		nodeById.set(node.id, node);
	  });

	  obj.links.forEach(function(link) {
		link.source = nodeById.get(link.source);
		link.target = nodeById.get(link.target);
	  });
	 
	force
		  .nodes(obj.nodes)
		  .links(edges)
		  .start();

	  var link = svg.selectAll(".link")
		  .data(obj.links)
		.enter().append("path")
		  .attr("marker-end", function(d) { return "url(#" + sboSwitch(d.class) + "" + d.bivesClass + ")"; })
		  .attr("id", function(d) {return d.id})
		  .attr("class", function(d) { return "link " + d.bivesClass;})
		  .style("stroke-width", 2)
		  .style("fill", "none");

	  var node_drag = d3.behavior.drag()
        .on("dragstart", dragstart)
        .on("drag", dragmove)
        .on("dragend", dragend);

    function dragstart(d, i) {
        force.stop() // stops the force auto positioning before you start dragging
    }

    function dragmove(d, i) {
        d.px += d3.event.dx;
        d.py += d3.event.dy;
        d.x += d3.event.dx;
        d.y += d3.event.dy; 
        tick(); // this is the key to make it work together with updating both px,py,x,y on d !
    }

    function dragend(d, i) {
        d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
        tick();
        force.resume();
    }  
		
	
	  var node = svg.selectAll(".node")
		  .data(obj.nodes)
		.enter().append("g")
			.attr("class", function(d) {return "node " + sboSwitch(d.class);})
			.attr("fill", function(d) { if(d.class != "SBO:0000290") return "white";})
				.call(force.drag)
				.call(node_drag);
			
		
		node.append("path")
		  .attr("class", function(d) { return "node " + d.bivesClass } )
		  .attr("id", function(d) {return d.id})
		  .attr('d', function(d) { return getSymbol(d.class, size); })
		  ;
		  
		node.append("text")
		  .style("text-anchor", "middle")
		  .style("stroke-width", "0px")
		  .style("fill", "black")
		  .attr('y', function(d) { if(d.class == "SBO:0000290") return -450;})
		  .attr('dy', "0.25em")
		  //.attr('x', function(d) { if(d.class == "SBO:0000290") return -100;})
		  .text(function(d) { return d.label });
		  
	  

	  force.on("tick", function() {
		link.attr("d", function(d){
			var x1 = d.source.x,
				y1 = d.source.y,
				y2, x2;
			
			if(sboSwitch(d.class) != "consumption"){
				var distance = distanceHack(sboSwitch(d.target.class), size);
				
				if(Math.abs(d.source.y - d.target.y) > 2* distance){
					if (Math.abs(d.source.x - d.target.x) < 0.4 * distance){
						x2 = d.target.x;
					} else if (Math.abs(d.source.x - d.target.x) < 1.2 * distance){
						if(d.source.x < d.target.x){
							x2 = d.target.x - distance/2;
						} else {
							x2 = d.target.x + distance/2;
						}
					} else {
						if(d.source.x < d.target.x){
							x2 = d.target.x - distance;
						} else {
							x2 = d.target.x + distance;
						}
					}
				} else if (Math.abs(d.source.y - d.target.y) > 1.5 * distance){
					if (Math.abs(d.source.x - d.target.x) < 0.4 * distance){
						x2 = d.target.x;
					} else if (Math.abs(d.source.x - d.target.x) < 1.2 * distance){
						if(d.source.x < d.target.x){
							x2 = d.target.x - distance/2;
						} else {
							x2 = d.target.x + distance/2;
						}
					} else {
						if(d.source.x < d.target.x){
							x2 = d.target.x - distance;
						} else {
							x2 = d.target.x + distance;
						}
					}
				} else {
					if(d.source.x < d.target.x){
						x2 = d.target.x - distance;
					} else {
						x2 = d.target.x + distance;
					}
				}
			} else x2 = d.target.x;
			
				

			if(sboSwitch(d.class) != "consumption"){
				var distance = distanceHack(sboSwitch(d.target.class), size);
				
				if(Math.abs(d.source.x - d.target.x) > 2* distance){
					if (Math.abs(d.source.y - d.target.y) < 0.4 * distance){
						y2 = d.target.y;
					} else if (Math.abs(d.source.y - d.target.y) < 1.2 * distance){
						if(d.source.y < d.target.y){
							y2 = d.target.y - distance/2;
						} else {
							y2 = d.target.y + distance/2;
						}
					} else {
						if(d.source.y < d.target.y){
							y2 = d.target.y - distance;
						} else {
							y2 = d.target.y + distance;
						}
					}
				} else if (Math.abs(d.source.x - d.target.x) > 1.5 * distance){
					if (Math.abs(d.source.y - d.target.y) < 0.4 * distance){
						y2 = d.target.y;
					} else if (Math.abs(d.source.y - d.target.y) < 1.2 * distance){
						if(d.source.y < d.target.y){
							y2 = d.target.y - distance/2;
						} else {
							y2 = d.target.y + distance/2;
						}
					} else {
						if(d.source.y < d.target.y){
							y2 = d.target.y - distance;
						} else {
							y2 = d.target.y + distance;
						}
					}
				} else {
					if(d.source.y < d.target.y){
						y2 = d.target.y - distance;
					} else {
						y2 = d.target.y + distance;
					}
				}
			} else y2 = d.target.y;	

			var dr = Math.sqrt((x2-d.source.x) * (x2-d.source.x) + (y2-d.source.y) * (y2-d.source.y));
			
			switch(d.bivesClass){
				case "insert": if(d.source.y < d.target.y){
					return "M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,1 " + (x2 + distance/2) + "," + y2;
				} else {
					return "M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,1 " + (x2 - distance/2) + "," + y2;
				}; break;
				case "delete": if(d.source.y < d.target.y){
					return "M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,0 " + (x2 - distance/2) + "," + y2;
				} else {
					console.log("yepp");
					return "M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,0 " + (x2 + distance/2) + "," + y2;
				}; break;
				default: return "M" + x1 + "," + y1 + "L" + x2 + "," + y2;
			}
		});

		node.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			});
	  });
	  
	  function tick() {
		link.attr("d", function(d){
			var x1 = d.source.x,
				y1 = d.source.y,
				y2, x2;
			
			var distance = distanceHack(sboSwitch(d.target.class), size);
			if(sboSwitch(d.class) != "consumption"){
				if(Math.abs(d.source.y - d.target.y) > 2* distance){
					if (Math.abs(d.source.x - d.target.x) < 0.4 * distance){
						x2 = d.target.x;
					} else if (Math.abs(d.source.x - d.target.x) < 1.2 * distance){
						if(d.source.x < d.target.x){
							x2 = d.target.x - distance/2;
						} else {
							x2 = d.target.x + distance/2;
						}
					} else {
						if(d.source.x < d.target.x){
							x2 = d.target.x - distance;
						} else {
							x2 = d.target.x + distance;
						}
					}
				} else if (Math.abs(d.source.y - d.target.y) > 1.5 * distance){
					if (Math.abs(d.source.x - d.target.x) < 0.4 * distance){
						x2 = d.target.x;
					} else if (Math.abs(d.source.x - d.target.x) < 1.2 * distance){
						if(d.source.x < d.target.x){
							x2 = d.target.x - distance/2;
						} else {
							x2 = d.target.x + distance/2;
						}
					} else {
						if(d.source.x < d.target.x){
							x2 = d.target.x - distance;
						} else {
							x2 = d.target.x + distance;
						}
					}
				} else {
					if(d.source.x < d.target.x){
						x2 = d.target.x - distance;
					} else {
						x2 = d.target.x + distance;
					}
				}
			} else x2 = d.target.x;
			
				

			if(sboSwitch(d.class) != "consumption"){
				if(Math.abs(d.source.x - d.target.x) > 2* distance){
					if (Math.abs(d.source.y - d.target.y) < 0.4 * distance){
						y2 = d.target.y;
					} else if (Math.abs(d.source.y - d.target.y) < 1.2 * distance){
						if(d.source.y < d.target.y){
							y2 = d.target.y - distance/2;
						} else {
							y2 = d.target.y + distance/2;
						}
					} else {
						if(d.source.y < d.target.y){
							y2 = d.target.y - distance;
						} else {
							y2 = d.target.y + distance;
						}
					}
				} else if (Math.abs(d.source.x - d.target.x) > 1.5 * distance){
					if (Math.abs(d.source.y - d.target.y) < 0.4 * distance){
						y2 = d.target.y;
					} else if (Math.abs(d.source.y - d.target.y) < 1.2 * distance){
						if(d.source.y < d.target.y){
							y2 = d.target.y - distance/2;
						} else {
							y2 = d.target.y + distance/2;
						}
					} else {
						if(d.source.y < d.target.y){
							y2 = d.target.y - distance;
						} else {
							y2 = d.target.y + distance;
						}
					}
				} else {
					if(d.source.y < d.target.y){
						y2 = d.target.y - distance;
					} else {
						y2 = d.target.y + distance;
					}
				}
			} else y2 = d.target.y;	

			var dr = Math.sqrt((x2-d.source.x) * (x2-d.source.x) + (y2-d.source.y) * (y2-d.source.y));
			//console.log("M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,1 " + x2 + "," + y2);
			
			switch(d.bivesClass){
				case "insert": if(d.source.y < d.target.y){
					return "M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,1 " + (x2 + distance/2) + "," + y2;
				} else {
					return "M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,1 " + (x2 - distance/2) + "," + y2;
				}; break;
				case "delete": if(d.source.y < d.target.y){
					return "M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,0 " + (x2 - distance/2) + "," + y2;
				} else {
					console.log("yepp");
					return "M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,0 " + (x2 + distance/2) + "," + y2;
				}; break;
				default: return "M" + x1 + "," + y1 + "L" + x2 + "," + y2;
			}
			
			//return "M" + x1 + "," + y1 + "A" + dr + "," + dr + " 0 0,1 " + x2 + "," + y2;
		});

		node.attr("transform", function(d) {
				return "translate(" + d.x + "," + d.y + ")";
			});
	  };
	  return obj;
}

function distanceHack(nodeClass, sized){
	var size = sized/1000;
	switch (nodeClass){
		case "process": return size*0.15 ; break;
		case "macromolecule": return size*0.5; break;
		case "source and sink": return size*0.1; break;
		case "complex": return size*0.5; break;
		case "unspecifiedentity": return size*0.5; break;
		case "simplechemical": return size*0.25; break;
		default: return size;
	}
}