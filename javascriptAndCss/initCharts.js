function initialiseChoiceChart ()
{
	queryUrl(callVis);
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

	var repoEvo = repoEvolution["ALL"]; var width = timewidth + 35; var height = timeheight
	
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
	
	x2.domain(d3.extent(data, function(d) { return d.date; }));
	
	y2.domain([
	0,d3.max(properties, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
	]);
	
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
        .extent([date1, date2])
        .on("brush", brushmove2)
        .on("brushend", brushend2);

    svg2.append("g")
        .attr("class", "brush")
        .call(brush2)
        .selectAll('rect')
        .attr('height', timeheight);
		
	date1 = new Date(document.getElementById("date1").value);
	date2 = moment(document.getElementById("date2").value);
	
	brush.extent([date1, date2]);

	var date1Up = document.getElementById("date1Up");
	date1Up.onmouseup = function(){ hold = 0; applyFilters ();};
	date1Up.onmouseout = function(){ hold = 0;};
	date1Up.onmousedown = function () { wait = 1; hold = -1; holdit("date1", "up");};

	var date1Down = document.getElementById("date1Down");
	date1Down.onmouseup = function(){ hold = 0; applyFilters ();};
	date1Down.onmouseout = function(){ hold = 0;};
	date1Down.onmousedown = function () { wait = 1; hold = -1; holdit("date1", "down");};

	var date2Up = document.getElementById("date2Up");
	date2Up.onmouseup = function(){ hold = 0; applyFilters ();};
	date2Up.onmouseout = function(){ hold = 0;};
	date2Up.onmousedown = function () { wait = 1; hold = -1; holdit("date2", "up");};

	var date2Down = document.getElementById("date2Down");
	date2Down.onmouseup = function(){ hold = 0; applyFilters ();};
	date2Down.onmouseout = function(){ hold = 0;};
	date2Down.onmousedown = function () { wait = 1; hold = -1; holdit("date2", "down");};

	$("#choiceProperties").click (function (){		
		$("#choiceProperties").attr("class","btn-changes-on");
		$("#choiceChanges").attr("class","btn-changes-off");
		$("#choiceChartChartProperties").show();
		$("#choiceChartChartChanges").hide();
	});

    function holdit(btn, mode) {
        if (hold == -1 && wait == 1){
            setTimeout(function(){
                wait = 0;
                if(mode === "up"){
                    var newDate = new Date(document.getElementById(btn).value).add(1, 'd');
                    document.getElementById(btn).value = new Date(newDate).toISOString().slice(0,10);
                    if(btn == "date2"){
						brush.extent([date1, newDate]);
                        brush2.extent([date1, newDate]);
                        date2 = newDate;
                    } else {
						brush.extent([newDate, date2]);
                        brush2.extent([newDate, date2]);
                        date1 = newDate;
                    }
                    extent = brush2.extent();
                    brushed();
                } else {
                    var newDate = new Date(document.getElementById(btn).value).add(-1, 'days');
                    document.getElementById(btn).value = new Date(newDate).toISOString().slice(0,10);
                    if(btn == "date2"){
						brush.extent([date1, newDate]);
                        brush2.extent([date1, newDate]);
                        date2 = newDate;
                    } else {
						brush.extent([newDate, date2]);
                        brush2.extent([newDate, date2]);
                        date1 = newDate;
                    }
                    extent = brush2.extent();
                    brushed();
                }

                holdit(btn, mode);
            }, 300);
        } else if (hold == -1){
            setTimeout(function(){
                wait = 0;
                if(mode === "up"){
                    var newDate = new Date(document.getElementById(btn).value).add(1, 'd');
                    document.getElementById(btn).value = new Date(newDate).toISOString().slice(0,10);
                    if(btn == "date2"){
						brush.extent([date1, newDate]);
                        brush2.extent([date1, newDate]);
                        date2 = newDate;
                    } else {
						brush.extent([newDate, date2]);
                        brush2.extent([newDate, date2]);
                        date1 = newDate;
                    }
                    extent = brush2.extent();
                    brushed();
                } else {
                    var newDate = new Date(document.getElementById(btn).value).add(-1, 'days');
                    document.getElementById(btn).value = new Date(newDate).toISOString().slice(0,10);
                    if(btn == "date2"){
						brush.extent([date1, newDate]);
                        brush2.extent([date1, newDate]);
                        date2 = newDate;
                    } else {
						brush.extent([newDate, date2]);
                        brush2.extent([newDate, date2]);
                        date1 = newDate;
                    }
                    extent = brush2.extent();
                    brushed();
                }

                holdit(btn, mode);
            }, 1);
        }
    };

	function brushed() {
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
		brush2.extent([date1, date2]);
		svg.select(".brush").call(brush);
        svg2.select(".brush").call(brush2);
        extent = brush.extent();
        applyFilters ();
	}
	
    function brushend2() {
		brush.extent([date1, date2]);
		svg.select(".brush").call(brush);
        svg2.select(".brush").call(brush2);
        extent = brush2.extent();
        applyFilters ();
	}
	applyFilters ();
	
	$("#choiceChanges").click (function ()
		{			
/* 			var date1Field = document.getElementById("date1");
			date1Field.addEventListener("keydown", function (e) {
				if(e.keyCode === 13){
					var newDate = Date.parse(date1Field.value);
					console.log(newDate);
					alert("jupp");
					if(newDate != null){
						if(newDate < minVersion2){
							newDate = minVersion2;
						} else if(newDate > maxVersion2){
							newDate = maxVersion2;
						}
						brush2.extent([newDate, date2]);
						date1 = newDate;
						extent = brush2.extent();
						applyFilters ();
						brushed();
					} else {
						alert("Please enter a correct date.");
					}

				}
			}); */


/* 			var date2Field = document.getElementById("date2");
			date2Field.addEventListener("keydown", function (e) {
				if(e.keyCode === 13){
					var newDate = Date.parse(date2Field.value);
					if(newDate != null){
						if(newDate < minVersion2){
							newDate = minVersion2;
						} else if(newDate > maxVersion2){
							newDate = maxVersion2;
						}
						brush2.extent([date1, newDate]);
						date2 = newDate;
						extent = brush2.extent();
						applyFilters ();
						brushed();
					} else {
						alert("Please enter a correct date.");
					}
				}
			}); */
			
			d3.selectAll("#choiceChartChartProperties").select(".brush").call(brush2);
			$("#choiceProperties").attr("class","btn-changes-off");
			$("#choiceChanges").attr("class","btn-changes-on");
			$("#choiceChartChartChanges").show ();
			$("#choiceChartChartProperties").hide ();
		}); 
}