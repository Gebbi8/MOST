function donut(table){
	$('.menuInfoButton').fadeOut();
	d3.selectAll('#donutpage').selectAll('svg').remove();
	d3.selectAll('.onoffswitch').remove();
	d3.selectAll('#info > *').remove();
	selectChart("donutpage");
	$('#donutButton').fadeIn();
	
	var width = 610,
	    height = 550,
	    radius = Math.min(width, height) / 2;

	var color = d3.scale.category20();

	var pie = d3.layout.pie()	
			.value(function(d){ return d.bives; })
	    .sort(null);
 	
	var arc = d3.svg.arc()
	    .innerRadius(radius - 155)
	    .outerRadius(radius - 45);

	//text field overlay
	var tooltip = d3.select("body")
		.append("div")
		.style("position", "absolute")
		.style("z-index", "10")
		.style("visibility", "hidden");

	var svg = d3.select("#donutpage").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
			
			
	var path = svg.datum(table).selectAll("path")
		.data(pie)
		.enter().append("path")
		.attr("fill", function(d, i) { return color(i); })
		.attr("d", arc)
			.on("mouseover", function(){tooltip.text(this.__data__.data.model) ;return tooltip.style("visibility", "visible");})
			.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
			.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
			.on("click", function(){ getBivesData(originalFilestats[this.__data__.data.model + this.__data__.data.version1id], originalFilestats[this.__data__.data.model + this.__data__.data.version2id],["reportHtml", "reactionsDot", "xmlDiff", "separateAnnotations"], "#info")});

// 	function type(d) {
// 		d.unix = +d.unix;	
// 		d.unixinsert = +d.unixinsert;
// 		d.unixdelete = +d.unixdelete;
// 		d.bives = +d.bives;
// 		d.bivesinsert = +d.bivesinsert;
// 		d.bivesdelete = +d.bivesdelete;
// 		d.bivesmove = +d.bivesmove;
// 		d.bivesupdate = +d.bivesupdate;
// 		d.bivestriggeredinsert = +d.bivestriggeredinsert;
// 		d.bivestriggereddelete = +d.bivestriggereddelete;
// 		d.bivestriggeredmove = +d.bivestriggeredmove;
// 		d.bivestriggeredupdate = +d.bivestriggeredupdate;
// 		d.bivesnode = +d.bivesnode;
// 		d.bivesattribute = +d.bivesattribute;
// 		d.bivestext = +d.bivestext;
// 		d.version1 = parseDate(d.version1);
// 		d.version2 = parseDate(d.version2);
// 		d.model = d.model;
// 		d.modeltype = d.modeltype;
// 	  return d;
// 	}

	// Store the displayed angles in _current.
	// Then, interpolate from _current to the new angles.
	// During the transition, _current is updated in-place by d3.interpolate.
	function arcTween(a) {
	  var i = d3.interpolate(this._current, a);
	  this._current = i(0);
	  return function(t) {
	    return arc(i(t));
	  };
	}
}
