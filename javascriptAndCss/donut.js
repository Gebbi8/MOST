function donut(table){
	$('.menuInfoButton').fadeOut();
	d3.selectAll('#donutpage').selectAll('svg').remove();
	d3.selectAll('.onoffswitch').remove();
	d3.selectAll('#info > *').remove();
	d3.selectAll('#donutTip > *').remove();
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

	var svg = d3.select("#donutpage").append("svg")
		.attr("id", "donutSvg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
			
	var tooltip = d3.select("#donutTip")
		.append("span")
		.style("visibility", "hidden");	
	
	var path = svg.datum(table).selectAll("path")
		.data(pie)
		.enter().append("path")
		.attr("id", function(d, i){return "d" + i;})
		.attr("fill", function(d, i) { return color(i); })
		.attr("d", arc)
			.on("mouseover", function(){
				tooltip.text(this.__data__.data.model) ;return tooltip.style("visibility", "visible");})
			.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
			.on("click", function(d, i){
				console.log(this);
				var version1 = originalFilestats[this.__data__.data.model + this.__data__.data.version1id];
				var version2 = originalFilestats[this.__data__.data.model + this.__data__.data.version2id];
				showDiffInfo(version1, version2);
				setHash("d", "d"+i);
			});

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
	setHash("v", "d");
}
