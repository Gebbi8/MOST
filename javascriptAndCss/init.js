var originalFilestats = {};
var originalDiffstats = {};

var filestats = {};
var diffstats = {};

var extent =[moment("2010-01-01"), moment("2011-01-01	")];

var charts = [
"landingpage",
"donutpage",
"heatmappage",
"box1page",
"box2page",
"bivesInfo"
];











							
function init ()
{
	// load the tables
	d3.tsv("statsTables/filestats", function(dd) {
		// get the file's table and immediately parse the date
		for (var i = 0; i < dd.length; i++)
		{
			dd[i]["date"] = new Date (dd[i]["date"]);
			originalFilestats[ dd[i]["model"] + dd[i]["versionid"]  ] = dd[i];
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
			
			// if that's done we can initialise the choise chart
			initialiseChoiceChart ();
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
	$("#heatmapbutton").click (function (){bivesOverview(window.extent[0], window.extent[1]);});
	$("#boxplot1button").click (function (){boxplot(window.extent[0], window.extent[1]);});
	$("#boxplot2button").click (function (){boxplot2(window.extent[0], window.extent[1]);});
	$("#logolink").click (function (){selectChart("landingpage");;});





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
	
	
	
var margin = {top: 10, right: 25, bottom: 70, left: 65}, timewidth = 250, timeheight = 200;
var x = d3.time.scale().range([0, timewidth]);
var y = d3.scale.linear().range([timeheight, 0]);
var xAxis = d3.svg.axis().scale(x).ticks(5).tickFormat(d3.time.format("%Y"));
var yAxis = d3.svg.axis().scale(y).orient("left");		//evtl. tickFormat für Achsensplit????
	

	y.domain([0, max]).nice();
	x.domain([minVersion2, maxVersion2]).nice();

	
var svg = d3.select("#choiceChartChart").append("svg")
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
// 	alert("brushEND");
	svg.select(".brush").call(brush);
	extent = brush.extent();
	applyFilters ();
}

}

