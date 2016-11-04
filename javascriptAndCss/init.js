var originalFilestats = {};
var originalDiffstats = {};
var models = {};
var repoEvolution = {
	ALL: {maxFiles: 0, maxNodes: 0, values: []},
	CellML: {maxFiles: 0, maxNodes: 0, values: []},
	SBML: {maxFiles: 0, maxNodes: 0, values: []},
};

var filestats = {};
var diffstats = {};

var extent =[moment("2010-01-01"), moment("2011-01-01")];

var charts = [
    "landingpage",
    "donutpage",
    "heatmappage",
    "box1page",
    "box2page",
    "bivesInfo"
];

var timewidth = 250, timeheight = 200;



function addGeneralStatsTableRow (table, key, val)
{
    table.append('<tr><td>' + key + '</td><td>' + val + '</td></tr>');
}

function fillGeneralStatsTable ()
{
    var table = $('#generalStatsTable > tbody:last')

        addGeneralStatsTableRow (table, "#Models", Object.keys(models).length);
    addGeneralStatsTableRow (table, "#Versions", Object.keys(originalFilestats).length);
    addGeneralStatsTableRow (table, "#Deltas", originalDiffstats.length);

    // number of versions in biomodels for the first 5 years
    var changesInFirstFive = {};
    var numChanges = 0;

    var oneYearPlusMinus = 1000*60*60*24*365.25;
    originalDiffstats.forEach(function(r) {
        var datum = originalFilestats[ r["model"] + r["version2id"]  ].date;
        if ((datum - models[r["model"]].earliest) / oneYearPlusMinus < 5 && r.bives > 0)
        {
            if (!changesInFirstFive[r["model"]])
                changesInFirstFive[r["model"]] = [];
            changesInFirstFive[r["model"]].push (models[r["model"]].earliest + " -- " + datum);
            numChanges++;
        }
    });
    addGeneralStatsTableRow (table, "#changes within first five years of publishing", Math.round(100 * numChanges / Object.keys (changesInFirstFive).length) / 100);

    // remove dummy row...
    $('#generalStatsTableDummy').remove ();
}






function init ()
{
    // load the tables
    d3.tsv("statsTables/filestats", function(dd) {
        // get the file's table and immediately parse the date
        for (var i = 0; i < dd.length; i++)
        {
            dd[i]["date"] = new Date (dd[i]["date"]);
            originalFilestats[ dd[i]["model"] + dd[i]["versionid"]  ] = dd[i];

            if (!models[dd[i]["model"]])
                models[dd[i]["model"]] = {
                    "earliest": dd[i]["date"],
                    "versions": []
                };

            if (models[dd[i]["model"]].earliest > dd[i]["date"])
                models[dd[i]["model"]].earliest = dd[i]["date"];
            models[dd[i]["model"]].versions.push (dd[i]["versionid"]);
        }
        
        d3.tsv("statsTables/repo-evolution", function(data) {
					function scaleRow (data)
					{
						var n = +data["nFiles"];
						data["nFiles"] = n;
						data["nodes"] /= n;
						data["components"] /= n;
						data["variables"] /= n;
						data["units"] /= n;
						data["species"] /= n;
						data["reactions"] /= n;
						data["compartments"] /= n;
						data["functions"] /= n;
						data["parameters"] /= n;
						data["rules"] /= n;
						data["events"] /= n;
						return data;
					};
					
					for (var i=0; i < data.length; i++)
					{
						data[i] = scaleRow (data[i]);
						repoEvolution[data[i]["type"]].values.push (data[i]);
						
						if (+data[i]["nFiles"] > repoEvolution[data[i]["type"]].maxFiles)
						{
							repoEvolution[data[i]["type"]].maxFiles = data[i]["nFiles"];
						}
						if (+data[i]["nodes"] > repoEvolution[data[i]["type"]].maxNodes)
						{
							repoEvolution[data[i]["type"]].maxNodes = data[i]["nodes"];
						}
					}
					
					d3.tsv("statsTables/diffstats", function(d) {
							// get the diffs table and parse numbers
							for (var i=0; i < d.length; i++){
									d[i]["bivesinsert"] = +d[i]["bivesinsert"];
									d[i]["bivesmove"] = +d[i]["bivesmove"];
									d[i]["bivesdelete"] = +d[i]["bivesdelete"];
									d[i]["bivesupdate"] = +d[i]["bivesupdate"];
									d[i]["bives"] = +d[i]["bives"];
							}
							originalDiffstats=d;

							// per default time filters are active
							activateFilesFilter (filterTimeFiles);
							activateDiffsFilter (filterTimeDiffs);

							applyFilters ();

							// fill general info table
							fillGeneralStatsTable ();

							// if that's done we can initialise the choise chart
							initialiseChoiceChart ();
					});
			});
    });


    $("#BioModelsFilter").click (function ()
            {
                if (this.checked)
                {
                    deactivateFilesFilter (filterRemoveSbmlFiles);
                    deactivateDiffsFilter (filterRemoveSbmlDiffs);
                }
                else
                {
                    activateFilesFilter (filterRemoveSbmlFiles);
                    activateDiffsFilter (filterRemoveSbmlDiffs);
                }
                applyFilters ();
            });


    $("#CellMLFilter").click (function ()
            {
                if (this.checked)
                {
                    deactivateFilesFilter (filterRemoveCellmlFiles);
                    deactivateDiffsFilter (filterRemoveCellmlDiffs);
                }
                else
                {
                    activateFilesFilter (filterRemoveCellmlFiles);
                    activateDiffsFilter (filterRemoveCellmlDiffs);
                }
                applyFilters ();
            });



    // select the landing page as start
    selectChart("landingpage");

    // register click-listeners to the tab-buttons
    $("#donutbutton").click (function (){donut (diffstats);});
    $("#heatmapbutton").click (function (){heatmap(diffstats);});
    $("#boxplot1button").click (function (){boxplot(window.extent[0], window.extent[1]);});
    $("#boxplot2button").click (function (){boxplot2(window.extent[0], window.extent[1]);});
    $("#logolink").click (function (){selectChart("landingpage");});

    // register click-listeners to the bives-tabs
    $("#reportTab").click(function (){showBivesContent("#bivesReport", "#reportTab")});
    $("#graphTab").click(function (){showBivesContent("#bivesGraph", "#graphTab")});
    $("#xmlTab").click(function (){showBivesContent("#bivesXmlDiff", "#xmlTab")});
    $("#annotations").click(function (){showBivesContent("#bivesAnnotations", "#annotations")});

	// register click-listener to feedback
	$("#feedback").click(function (){giveFeedback();});


    // load info material and fill the i-buttons
    $.getJSON("javascriptAndCss/info.json", function(json){

        attachInfo ("#smallInfoTimespan", '#timeSpanBox', json.timespan, -20, 80);
        attachInfo ("#smallInfoDataset", '#datasetBox', json.dataset, -20, 80);
        attachInfo ("#smallInfoDonut", '#donutBox', json.donutVis + json.donutUsage, 150, -80);
        attachInfo ("#smallInfoHeat", '#heatBox', json.heatmapVis + json.heatmapUsage, 150, -80);
        attachInfo ("#smallInfoBox1", '#box1Box', json.boxplot1Vis + json.boxplot1Usage, 150, -80);
        attachInfo ("#smallInfoBox2", '#box2Box', json.boxplot2Vis + json.boxplot2Usage, 150, -80);

        //load startpage info from json
        $("#projectInfo").append(json.projectInfo.motivation).append(json.projectInfo.question);
        $("#acknowledgments").append(json.acknowledgments.design).append(json.acknowledgments.funding);
    });

}












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

    var date1 = moment(document.getElementById("date1").value);
    var date2 = moment(document.getElementById("date2").value);

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
		
	var hold = -1; var wait = 1;

    function holdit(btn, mode) {
        if (hold == -1 && wait == 1){
            setTimeout(function(){
                wait = 0;
                if(mode === "up"){
                    var newDate = moment(document.getElementById(btn).value).add(1, 'd');
                    document.getElementById(btn).value = moment(newDate).format('YYYY-MM-DD');
                    if(btn == "date2"){
                        brush.extent([date1, newDate]);
                        date2 = newDate;
                    } else {
                        brush.extent([newDate, date2]);
                        date1 = newDate;
                    }
                    extent = brush.extent();
                    brushed();
                } else {
                    var newDate = moment(document.getElementById(btn).value).add(-1, 'days');
                    document.getElementById(btn).value = moment(newDate).format('YYYY-MM-DD');
                    if(btn == "date2"){
                        brush.extent([date1, newDate]);
                        date2 = newDate;
                    } else {
                        brush.extent([newDate, date2]);
                        date1 = newDate;
                    }
                    extent = brush.extent();
                    brushed();
                }

                holdit(btn, mode);
            }, 300);
        } else if (hold == -1){
            setTimeout(function(){
                wait = 0;
                if(mode === "up"){
                    var newDate = moment(document.getElementById(btn).value).add(1, 'd');
                    document.getElementById(btn).value = moment(newDate).format('YYYY-MM-DD');
                    if(btn == "date2"){
                        brush.extent([date1, newDate]);
                        date2 = newDate;
                    } else {
                        brush.extent([newDate, date2]);
                        date1 = newDate;
                    }
                    extent = brush.extent();
                    brushed();
                } else {
                    var newDate = moment(document.getElementById(btn).value).add(-1, 'days');
                    document.getElementById(btn).value = moment(newDate).format('YYYY-MM-DD');
                    if(btn == "date2"){
                        brush.extent([date1, newDate]);
                        date2 = newDate;
                    } else {
                        brush.extent([newDate, date2]);
                        date1 = newDate;
                    }
                    extent = brush.extent();
                    brushed();
                }

                holdit(btn, mode);
            }, 1);
        }
    };

	function brushed() {
        svg.select(".brush").call(brush);
    }

    function brushmove() {
        extent = brush.extent();
        date1 = moment(window.extent[0]);
        date2 = moment(window.extent[1]);
        document.getElementById("date1").value = date1.format('YYYY-MM-DD');
        document.getElementById("date2").value = date2.format('YYYY-MM-DD');
    }

    function brushend() {
        svg.select(".brush").call(brush);
        extent = brush.extent();
        applyFilters ();
	}
    
		
		margin.left = 65;
		margin.right = 25;
		drawPropertiesChart (repoEvolution["ALL"], margin, timewidth + 35, timeheight);
		
		$("#choiceChartChartProperties").hide ();
				
		
		$("#choiceChanges").click (function ()
		{
			date1 = moment(document.getElementById("date1").value);
			date2 = moment(document.getElementById("date2").value);
			
			brush.extent([date1, date2]);
			brushed();

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

			var date1Field = document.getElementById("date1");
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
						brush.extent([newDate, date2]);
						date1 = newDate;
						extent = brush.extent();
						applyFilters ();
						brushed();
					} else {
						alert("Please enter a correct date.");
					}

				}
			});


			var date2Field = document.getElementById("date2");
			date2Field.addEventListener("keydown", function (e) {
				if(e.keyCode === 13){
					var newDate = Date.parse(date2Field.value);
					if(newDate != null){
						if(newDate < minVersion2){
							newDate = minVersion2;
						} else if(newDate > maxVersion2){
							newDate = maxVersion2;
						}
						brush.extent([date1, newDate]);
						date2 = newDate;
						extent = brush.extent();
						applyFilters ();
						brushed();
					} else {
						alert("Please enter a correct date.");
					}
				}
			});
			
			$("#choiceProperties").attr("class","btn-changes-off");
			$("#choiceChanges").attr("class","btn-changes-on");
			$("#choiceChartChartProperties").hide ();
			$("#choiceChartChartChanges").show ();
		});
		
		$( "#choiceChanges" ).trigger( "click" );
}



function drawPropertiesChart (repoEvo, margin, width, height)
{
	data = repoEvo.values;
	
	var parseDate = d3.time.format("%Y-%m-%d").parse;
	
	var x = d3.time.scale()
	.range([0, timewidth]);
	
	var y = d3.scale.linear()
	.range([timeheight, 0]);
	
	var yNodes = d3.scale.linear()
	.range([height, 0]);
	
	var yFiles = d3.scale.linear()
	.range([height, 0]);
	
	var color = d3.scale.category10();
	
	//var xAxis = d3.svg.axis().scale(x).orient("bottom");
	var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(5).tickFormat(d3.time.format("%Y"));
	
	var yAxis = d3.svg.axis().scale(y).orient("left").ticks(7);
	
	var line = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.value); });
	
	var lineFiles = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x(d.date); })
	.y(function(d) { return yFiles(d.value); });
	
	var lineNodes = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x(d.date); })
	.y(function(d) { return yNodes(d.value); });
	
	
	var svg = d3.select("#choiceChartChartProperties").append("svg")
	.attr("width", timewidth + margin.left + margin.right)
	.attr("height", timeheight + margin.top + margin.bottom)
	.append("g")
	.attr("transform", "translate(50,30)");		//
 	//.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
	
	
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
	
	x.domain(d3.extent(data, function(d) { return d.date; }));
	
	y.domain([
	0,d3.max(properties, function(c) { return d3.max(c.values, function(v) { return v.value; }); })
	]);
	
	yNodes.domain([0, repoEvo.maxNodes]);
	yFiles.domain([0, repoEvo.maxFiles]);
	
	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + timeheight + ")")
	.attr("fill", "white")
	.call(xAxis);
	
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
	
	var property = svg.selectAll(".property")
	.data(properties)
	.enter().append("g")
	.attr("class", "property");
	
	property.append("path")
	.attr("class", "line")
	.attr("d", function(d) { return line(d.values); })
	.style("stroke", function(d) { return color(d.name); });
	
	property.append("text")
	.datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
	.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.value) + ")"; })
	.attr("x", 3)
	.attr("dy", ".35em")
	.style("fill", function(d) { return color(d.name); })
	.text(function(d) { return d.name; });
	
	svg.append('path')
	.attr("class", "line")
	.attr('d', lineFiles (files.values))
	.attr('stroke', 'black')
	.attr('fill', 'none');
	
/*	svg.append("text")
	.datum({name: "files", value: files.values[files.values.length - 1]})
	.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + yFiles(d.value.value) + ")"; })
	.attr("x", 3)
	.attr("dy", ".35em")
	.text("files");
*/	
	var domain = color.domain().push("files");
	console.log(domain);
	console.log(d3.scale.category10().range());
	console.log(["#000000"].concat(d3.scale.category10().range()));
	
	var color = d3.scale.ordinal()
	  .domain(["files", "variables", "units", "species", "reactions", "parameters"])
	  .range(["#000000"].concat(d3.scale.category10().range()));
	  
	  console.log(color.domain());

	var legend = svg.selectAll('.legend')
		.data(color.domain())
		.enter()
		.append('g')
		.attr('class', 'legend')
		.attr('transform', function(d, i){
			console.log(d);
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
	
	var hold = -1; var wait = 1;

    
	var date1 = moment(document.getElementById("date1").value);
    var date2 = moment(document.getElementById("date2").value);

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
	
    

    function holdit(btn, mode) {
        if (hold == -1 && wait == 1){
            setTimeout(function(){
                wait = 0;
                if(mode === "up"){
                    var newDate = moment(document.getElementById(btn).value).add(1, 'd');
                    document.getElementById(btn).value = moment(newDate).format('YYYY-MM-DD');
                    if(btn == "date2"){
                        brush.extent([date1, newDate]);
                        date2 = newDate;
                    } else {
                        brush.extent([newDate, date2]);
                        date1 = newDate;
                    }
                    extent = brush.extent();
                    brushed();
                } else {
                    var newDate = moment(document.getElementById(btn).value).add(-1, 'days');
                    document.getElementById(btn).value = moment(newDate).format('YYYY-MM-DD');
                    if(btn == "date2"){
                        brush.extent([date1, newDate]);
                        date2 = newDate;
                    } else {
                        brush.extent([newDate, date2]);
                        date1 = newDate;
                    }
                    extent = brush.extent();
                    brushed();
                }

                holdit(btn, mode);
            }, 300);
        } else if (hold == -1){
            setTimeout(function(){
                wait = 0;
                if(mode === "up"){
                    var newDate = moment(document.getElementById(btn).value).add(1, 'd');
                    document.getElementById(btn).value = moment(newDate).format('YYYY-MM-DD');
                    if(btn == "date2"){
                        brush.extent([date1, newDate]);
                        date2 = newDate;
                    } else {
                        brush.extent([newDate, date2]);
                        date1 = newDate;
                    }
                    extent = brush.extent();
                    brushed();
                } else {
                    var newDate = moment(document.getElementById(btn).value).add(-1, 'days');
                    document.getElementById(btn).value = moment(newDate).format('YYYY-MM-DD');
                    if(btn == "date2"){
                        brush.extent([date1, newDate]);
                        date2 = newDate;
                    } else {
                        brush.extent([newDate, date2]);
                        date1 = newDate;
                    }
                    extent = brush.extent();
                    brushed();
                }

                holdit(btn, mode);
            }, 1);
        }
    };

	function brushed() {
        svg.select(".brush").call(brush);
		console.log("brushed");
    }

    function brushmove() {
		console.log("brushmove");
        extent = brush.extent();
        date1 = moment(window.extent[0]);
        date2 = moment(window.extent[1]);
        document.getElementById("date1").value = date1.format('YYYY-MM-DD');
        document.getElementById("date2").value = date2.format('YYYY-MM-DD');
    }

    function brushend() {
		console.log("brushend");
        svg.select(".brush").call(brush);
        extent = brush.extent();
        applyFilters ();
	}
	
	$("#choiceProperties").click (function ()
		{
			date1 = moment(document.getElementById("date1").value);
			date2 = moment(document.getElementById("date2").value);
						
			brush.extent([date1, date2]);
			brushed();
			
			
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
			
			var date1Field = document.getElementById("date1");
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
						brush.extent([newDate, date2]);
						date1 = newDate;
						extent = brush.extent();
						applyFilters ();
						brushed();
					} else {
						alert("Please enter a correct date.");
					}

				}
			});


			var date2Field = document.getElementById("date2");
			date2Field.addEventListener("keydown", function (e) {
				if(e.keyCode === 13){
					var newDate = Date.parse(date2Field.value);
					if(newDate != null){
						if(newDate < minVersion2){
							newDate = minVersion2;
						} else if(newDate > maxVersion2){
							newDate = maxVersion2;
						}
						brush.extent([date1, newDate]);
						date2 = newDate;
						extent = brush.extent();
						applyFilters ();
						brushed();
					} else {
						alert("Please enter a correct date.");
					}
				}
			});
			
			d3.selectAll("#choiceChartChartProperties").select(".brush").call(brush);
			$("#choiceProperties").attr("class","btn-changes-on");
			$("#choiceChanges").attr("class","btn-changes-off");
			$("#choiceChartChartProperties").show ();
			$("#choiceChartChartChanges").hide ();
		});
}