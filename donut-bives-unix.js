function donut(date1, date2){
	var width = 960,
	    height = 550,
	    radius = Math.min(width, height) / 2;

	var color = d3.scale.category20();

	var parseDate = d3.time.format("%Y-%m-%d").parse;

	var pie = d3.layout.pie()
			.value(function(d){ return d.bives; })
	    .sort(null);

	var arc = d3.svg.arc()
	    .innerRadius(radius - 125)
	    .outerRadius(radius - 45);

	var svg = d3.select("body").append("svg")
	    .attr("width", width)
	    .attr("height", height)
	  .append("g")
	    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

		d3.tsv("diffstats", type, function(error, data) {
			data = data.filter(function(d){ return date1 < d.version1 && d.version2 < date2; });

			var path = svg.datum(data).selectAll("path")
			    .data(pie)
			  .enter().append("path")
			    .attr("fill", function(d, i) { return color(i); })
			    .attr("d", arc)
			    .each(function(d) { this._current = d; }); // store the initial angles
			d3.selectAll("input")
			    .on("change", change);

		var timeout = setTimeout(function() {
			d3.select("input[value=\"bives\"]").property("checked", true).each(change);
		}, 2000);

		function change() {
			var value = this.value;
			clearTimeout(timeout);
			pie.value(function(d) { return d[value]; }); // change the value function
			path = path.data(pie); // compute the new angles
			path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
		}


		});


	function type(d) {
		d.unix = +d.unix;	
		d.unixinsert = +d.unixinsert;
		d.unixdelete = +d.unixdelete;
		d.bives = +d.bives;
		d.bivesinsert = +d.bivesinsert;
		d.bivesdelete	 = +d.bivesdelete;
		d.bivesmove = +d.bivesmove;
		d.bivesupdate = +d.bivesupdate;
		d.bivestriggeredinsert = +d.bivestriggeredinsert;
		d.bivestriggereddelete = +d.bivestriggereddelete;
		d.bivestriggeredmove = +d.bivestriggeredmove;
		d.bivestriggeredupdate = +d.bivestriggeredupdate;
		d.bivesnode = +d.bivesnode;
		d.bivesattribute = +d.bivesattribute;
		d.bivestext = +d.bivestext;
		d.version1 = parseDate(d.version1);
		d.version2 = parseDate(d.version2);
	  return d;
	}

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