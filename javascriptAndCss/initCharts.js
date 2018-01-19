function initialiseChoiceChart ()
{
    var counts = {};
    originalDiffstats.forEach(function(r) {
        var datum = originalFilestats[ r["model"] + r["version2id"]  ].date;
        if (!counts[datum]) {
            counts[datum] = 0;
        }
        counts[datum]++;
    });

    var max = 0;
    var data = [];
    Object.keys(counts).forEach(function(key) {
        data.push({
            datum: new Date(key)
                ,
            count: counts[key]
        });
        if (counts[key] > max)
            max = counts[key];
    });


    var minVersion2 = d3.min(data, function (d){ return d.datum });
    var maxVersion2 = d3.max(data, function (d){ return d.datum });



    var margin = {top: 10, right: 25, bottom: 70, left: 65};
    var x = d3.time.scale().range([0, timewidth]);
    var y = d3.scale.linear().range([timeheight, 0]);
    var xAxis = d3.svg.axis().scale(x).ticks(5).tickFormat(d3.time.format("%Y"));
    var yAxis = d3.svg.axis().scale(y).orient("left");		//evtl. tickFormat für Achsensplit????


    y.domain([0, max]).nice();
    x.domain([minVersion2, maxVersion2]).nice();


    var svg = d3.select("#choiceChartChartChanges").append("svg")
        .attr("width", timewidth + margin.left + margin.right)
        .attr("height", timeheight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(50,30)");
    svg.append("g")
        .attr("class", "y axis")
        .attr("fill", "white")
        .call(yAxis)
        .append("text")
        .attr("x", 25)
        .attr("y", -20)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "white")
        .text("Changes");


    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + timeheight + ")")
        .attr("fill", "white")
        .call(xAxis);




    var rects = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.datum); })
        .attr("width", timewidth / data.length)
        .attr("y", function(d) { return y(d.count) })
        .attr("height", function(d) { return timeheight - y(d.count);})
        .attr("fill", "white");

    var date1 = new Date(document.getElementById("date1").value);
    var date2 = new Date(document.getElementById("date2").value);

    var brush = d3.svg.brush()
        .x(x)
        .extent([date1, date2])
        .on("brush", brushmove)
        .on("brushend", brushend);

    svg.append("g")
        .attr("class", "brush")
        .call(brush)
        .selectAll('rect')
        .attr('height', timeheight);


	margin.left = 65;
	margin.right = 25;
//		drawPropertiesChart (repoEvolution["ALL"], margin, timewidth + 35, timeheight);

	$("#choiceChartChartProperties").hide ();

	var repoEvo = repoEvolution["ALL"]; var width = timewidth + 35; var height = timeheight;

	data = repoEvo.values;

	var parseDate = d3.time.format("%Y-%m-%d").parse;

	var x2 = d3.time.scale()
	.range([0, timewidth]);

	var y2 = d3.scale.linear()
	.range([timeheight, 0]);

	var yNodes = d3.scale.linear()
	.range([height, 0]);

	var yFiles = d3.scale.linear()
	.range([height, 0]);

	var color = d3.scale.category10();

	var xAxis = d3.svg.axis().scale(x2).orient("bottom").ticks(5).tickFormat(d3.time.format("%Y"));

	var yAxis = d3.svg.axis().scale(y2).orient("left").ticks(7);

	var line = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x2(d.date); })
	.y(function(d) { return y2(d.value); });

	var lineFiles = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x2(d.date); })
	.y(function(d) { return yFiles(d.value); });

	var lineNodes = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x2(d.date); })
	.y(function(d) { return yNodes(d.value); });


	var svg2 = d3.select("#choiceChartChartProperties").append("svg")
	.attr("width", timewidth + margin.left + margin.right)
	.attr("height", timeheight + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(50,30)");


	var neglect = ["date", "type", "nodes", "nFiles", "rules", "components", "compartments", "events", "functions"];

	color.domain(d3.keys(data[0]).filter(function(key) { return neglect.indexOf (key) < 0; }));

	data.forEach(function(d) {
		d.date = parseDate(d.date);
	});

	var properties = color.domain().map(function(name) {
		return {
			name: name,
			values: data.map(function(d) {
				return {date: d.date, value: +d[name]};
			})
		};
	});
	var nodes = {name: "nodes", values: data.map(function(d) {return {date: d.date, value: +d["nodes"]};})};
	var files = {name: "files", values: data.map(function(d) {return {date: d.date, value: +d["nFiles"]};})};

	x2.domain(d3.extent(data, function(d) { return d.date; })).nice();

	y2.domain([
	0,d3.max(properties, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
	]).nice();

	yNodes.domain([0, repoEvo.maxNodes]);
	yFiles.domain([0, repoEvo.maxFiles]);

	svg2.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + timeheight + ")")
	.attr("fill", "white")
	.call(xAxis);

	svg2.append("g")
	.attr("class", "y axis")
	.attr("fill", "white")
	.call(yAxis)
	.append("text")
	.attr("x", 25)
	.attr("y", -20)
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.attr("fill", "white")
	.text("Changes");

	var property = svg2.selectAll(".property")
	.data(properties)
	.enter().append("g")
	.attr("class", "property");

	property.append("path")
	.attr("class", "line")
	.attr("d", function(d) { return line(d.values); })
	.style("stroke", function(d) { return color(d.name); });

	svg2.append('path')
	.attr("class", "line")
	.attr('d', lineFiles (files.values))
	.attr('stroke', 'black')
	.attr('fill', 'none');

	var domain = color.domain().push("files");

	var color = d3.scale.ordinal()
	  .domain(["files", "variables", "units", "species", "reactions", "parameters"])
	  .range(["#000000"].concat(d3.scale.category10().range()));

	var legend = svg2.selectAll('.legend')
		.data(color.domain())
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('transform', function(d, i){
			var horz = 18;
			var vert = i * 12 + 5;
			return 'translate(' + horz + ',' + vert + ')';
		});

	legend.append('rect')
	  .attr("class", "legendRect")
	  .attr('width', 15)
	  .attr('height', 1)
	  .style('fill', color)
	  .style('stroke', color);

	legend.append('text')
	 .attr('x', 18)
	 .attr('y',3)
	 .style('fill', 'white')
	 .text(function(d) { return d; });

	var date1 = new Date(document.getElementById("date1").value);
    var date2 = new Date(document.getElementById("date2").value);

    var brush2 = d3.svg.brush()
        .x(x2)
        .extent(window.extent)
        //[date1, date2])
        .on("brush", brushmove2)
        .on("brushend", brushend2);

    svg2.append("g")
        .attr("class", "brush")
        .call(brush2)
        .selectAll('rect')
        .attr('height', timeheight);

	date1 = new Date(document.getElementById("date1").value);
	date2 = moment(document.getElementById("date2").value);

	brush.extent(window.extent);
	//brush.extent([date1, date2]);

	$("#choiceProperties").click (function (){
		$("#choiceProperties").attr("class","btn-changes-on");
		$("#choiceChanges").attr("class","btn-changes-off");
		$("#choiceChartChartProperties").show();
		$("#choiceChartChartChanges").hide();
	});


	function brushed() {
    console.log ("brushing");
		svg.select(".brush").call(brush);
    svg2.select(".brush").call(brush2);
  }

	 function brushmove() {
        extent = brush.extent();
        date1 = new Date(window.extent[0]);
        date2 = new Date(window.extent[1]);
        document.getElementById("date1").value = date1.toISOString().slice(0,10);
        document.getElementById("date2").value = date2.toISOString().slice(0,10);
		setHash('d1', date1.toISOString().slice(0,10));
		setHash('d2', date2.toISOString().slice(0,10));
		brushed();
    }


    function brushmove2() {
        extent = brush2.extent();
        console.log ("brushmove2: " + date1 + " -- " + date2)
        date1 = new Date(window.extent[0]);
        date2 = new Date(window.extent[1]);
        document.getElementById("date1").value = date1.toISOString().slice(0,10);
        document.getElementById("date2").value = date2.toISOString().slice(0,10);
		console.log(date1.toISOString().slice(0,10));
		setHash('d1', date1.toISOString().slice(0,10));
		setHash('d2', date2.toISOString().slice(0,10));
		brushed();
    }

    function brushend() {
		brush2.extent(window.extent);
        //[date1, date2]);
		svg.select(".brush").call(brush);
        svg2.select(".brush").call(brush2);
        extent = brush.extent();
        applyFilters ();
	}

    function brushend2() {
		brush.extent(window.extent);
        //[date1, date2]);
		svg.select(".brush").call(brush);
        svg2.select(".brush").call(brush2);
        extent = brush2.extent();
        applyFilters ();
	}
	applyFilters ();

	$("#choiceChanges").click (function () {
		d3.selectAll("#choiceChartChartProperties").select(".brush").call(brush2);
		$("#choiceProperties").attr("class","btn-changes-off");
		$("#choiceChanges").attr("class","btn-changes-on");
		$("#choiceChartChartChanges").show ();
		$("#choiceChartChartProperties").hide ();
	});

	queryUrl(callVis, clickDiff, showBivesTab, brushed, brush, brush2);

}
