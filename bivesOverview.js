function bivesOverview(date1, date2){
	d3.selectAll('#charts').selectAll('svg').remove();
	d3.selectAll('.onoffswitch').remove();

	var margin = {top: 10, right: 5, bottom: 5, left: 45},
		  width = 610 - margin.left - margin.right,
		  height = 500 - margin.top - margin.bottom;

	var colors =	[["inserts", "green"],
								["deletes", "red"],
								["moves", "blue"],
								["update", "yellow"],
								];

		var x = d3.scale.ordinal()
				.rangeBands([0, width], .1);

		var xAxis = d3.svg.axis()
				.orient("bottom");

		var y = d3.scale.log()
				.base(Math.E)
				.clamp(true)
				.range([height, 0]);

		var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left")
				.tickFormat(function(d){return Math.round(d);}); //Number of axis-splits


		d3.tsv("diffstats", type, function(error, data) {
			if (error) throw error;
			data = data.filter(function(d) {return (date1 < d.version1) && (d.version1 < date2); } );
			//filter by modelType
			if(document.getElementById('BioModels').checked != document.getElementById('CellML').checked){
				if(document.getElementById('BioModels').checked) {
					data = data.filter(function(d){return d.modeltype == 'SBML'})
				} else {
					data = data.filter(function(d){return d.modeltype == 'CellML'})
				}
			}

			y.domain([1, d3.max(data, function(d) { return d.bives; })]).nice();


			//compute svg width depending on data length
			var rectWidth = width/data.length;
	
			if (rectWidth < 10) rectWidth = 1;
			
			var svgWidth = rectWidth * data.length;
			
			var svgDiv = d3.select("#charts").append("div")
										.attr("id", "svgDiv");

	
			//text field overlay
			var tooltip = d3.select("body")
				.append("div")
				.style("position", "absolute")
				.style("z-index", "10")
				.style("visibility", "hidden");

			var svg = d3.select("#svgDiv").append("svg")
				.attr("width", svgWidth + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			svg.append("g")
					.attr("class", "y axis")
					.call(yAxis)
				.append("text")
					.attr("transform", "rotate(-90)")
					.attr("y", 6)
					.attr("dy", ".71em")
					.style("text-anchor", "end")
					.attr("fill", "white")
					.text("Changes");

/*			var bivupdate = svg.selectAll(".bar3")
						.data(data)
					.enter().append("rect")
						.attr("class", "bar3")
						.attr("x", function(d, i) { return i * (rectWidth)+2; })
						.attr("width", rectWidth) //add -0.1 for padding
						.attr("y", function(d) { return y(d.bivesupdate) })
						.attr("height", function(d) { return height - y(d.bivesupdate);})
						.attr("fill", "yellow")
						.on("mouseover", function(){tooltip.text(this.__data__.model) ;return tooltip.style("visibility", "visible");})
						.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
						.on("click", function(){ getBivesData(this.__data__.model, this.__data__.version1, this.__data__.version2, "reportHtml", "#info")});


			var bivmove = svg.selectAll(".bar2")
						.data(data)
					.enter().append("rect")
						.attr("class", "bar2")
						.attr("x", function(d, i) { return i * (rectWidth)+2; })
						.attr("width", rectWidth) //add -0.1 for padding
						.attr("y", function(d) { return y(d.bivesmove + d.bivesupdate) })
						.attr("height", function(d) { return height - y(d.bivesupdate + d.bivesmove) - (height - y(d.bivesupdate));})
						.attr("fill", "blue")
						.on("mouseover", function(){tooltip.text(this.__data__.model) ;return tooltip.style("visibility", "visible");})
						.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
						.on("click", function(){ getBivesData(this.__data__.model, this.__data__.version1, this.__data__.version2, "reportHtml", "#info")});

			var bivinsert = svg.selectAll(".bar")
						.data(data)
					.enter().append("rect")
						.attr("class", "bar")
						.attr("x", function(d, i) { return i * (rectWidth)+2; })
						.attr("width", rectWidth) //add -0.1 for padding
						.attr("y", function(d) {return y(d.bivesinsert + d.bivesmove + d.bivesupdate); })
						.attr("height", function(d) { return height - y(d.bivesinsert + d.bivesmove + d.bivesupdate)
																				 - (height - y(d.bivesupdate + d.bivesmove) - (height - y(d.bives*d.bivesupdate/d.bives)))
																				 - (height - y(d.bivesupdate)); })
						.attr("fill", "green")
						.on("mouseover", function(){tooltip.text(this.__data__.model) ;return tooltip.style("visibility", "visible");})
						.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
						.on("click", function(){ getBivesData(this.__data__.model, this.__data__.version1, this.__data__.version2, "reportHtml", "#info")});

			var bivdelete = svg.selectAll(".bar1")
						.data(data)
					.enter().append("rect")
						.attr("class", "bar1")
						.attr("x", function(d, i) { return i * (rectWidth)+2; })
						.attr("width", rectWidth) //add -0.1 for padding
						.attr("y", function(d) { return y(d.bivesdelete + d.bivesinsert + d.bivesmove + d.bivesupdate) })
						.attr("height", function(d) { return height - y(d.bivesdelete + d.bivesinsert + d.bivesmove + d.bivesupdate)
																				- (height - y(d.bivesinsert + d.bivesmove + d.bivesupdate) - (height - y(d.bivesupdate + d.bivesmove) - (height - y(d.bives*d.bivesupdate/d.bives))) 
																										- (height - y(d.bives*d.bivesupdate/d.bives)))
																				- (height - y(d.bivesupdate + d.bivesmove) - (height - y(d.bives*d.bivesupdate/d.bives)))
																				- (height - y(d.bivesupdate)); })
						.attr("fill", "red")
						.on("mouseover", function(){tooltip.text(this.__data__.model) ;return tooltip.style("visibility", "visible");})
						.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
						.on("click", function(){ getBivesData(this.__data__.model, this.__data__.version1, this.__data__.version2, "reportHtml", "#info")}); */

			var bivdelete = svg.selectAll(".bar1")
						.data(data)
					.enter().append("rect")
						.attr("class", "bar1")
						.attr("insert", function(d, i) {return(d.bivesinsert)})
						.attr("delete", function(d, i) {return(d.bivesdelete)})
						.attr("move", function(d, i) {return(d.bivesmove)})
						.attr("update", function(d, i) {return(d.bivesupdate)})
						.attr("sum", function(d, i) {return(d.bivesinsert+d.bivesdelete+d.bivesmove+d.bivesupdate)})
						.attr("x", function(d, i) { return i * (rectWidth)+2; })
						.attr("width", rectWidth) //add -0.1 for padding
						.attr("y", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								return (y(H));
								})
						.attr("height", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								return (height - y(H))*d.bivesdelete/H;
								})
						.attr("fill", "red")
						.on("mouseover", function(){tooltip.text(this.__data__.model) ;return tooltip.style("visibility", "visible");})
						.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
						.on("click", function(){ getBivesData(this.__data__.model, this.__data__.version1, this.__data__.version2, "reportHtml", "#info")});

			var bivinsert = svg.selectAll(".bar")
						.data(data)
					.enter().append("rect")
						.attr("class", "bar")
						.attr("x", function(d, i) { return i * (rectWidth)+2; })
						.attr("width", rectWidth) //add -0.1 for padding
						.attr("y", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								return (y(H)+(height - y(H))*d.bivesdelete/H);
								})
						.attr("height", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								return (height - y(H))*d.bivesinsert/H;
								})
						.attr("fill", "green")
						.on("mouseover", function(){tooltip.text(this.__data__.model) ;return tooltip.style("visibility", "visible");})
						.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
						.on("click", function(){ getBivesData(this.__data__.model, this.__data__.version1, this.__data__.version2, "reportHtml", "#info")});

			var bivmove = svg.selectAll(".bar2")
						.data(data)
					.enter().append("rect")
						.attr("class", "bar2")
						.attr("x", function(d, i) { return i * (rectWidth)+2; })
						.attr("width", rectWidth) //add -0.1 for padding
						.attr("y", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								return (y(H)+(height - y(H))*(d.bivesdelete+d.bivesinsert)/H);
								})
						.attr("height", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								return (height - y(H))*d.bivesmove/H;
								})
						.attr("fill", "blue")
						.on("mouseover", function(){tooltip.text(this.__data__.model) ;return tooltip.style("visibility", "visible");})
						.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
						.on("click", function(){ getBivesData(this.__data__.model, this.__data__.version1, this.__data__.version2, "reportHtml", "#info")});

				var bivupdate = svg.selectAll(".bar3")
						.data(data)
					.enter().append("rect")
						.attr("class", "bar3")
						.attr("x", function(d, i) { return i * (rectWidth)+2; })
						.attr("width", rectWidth) //add -0.1 for padding
						.attr("y", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								return (y(H)+(height - y(H))*(d.bivesdelete+d.bivesinsert+d.bivesmove)/H);
								})
						.attr("height", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								return (height - y(H))*d.bivesupdate/H;
								})
						.attr("fill", "yellow")
						.on("mouseover", function(){tooltip.text(this.__data__.model) ;return tooltip.style("visibility", "visible");})
						.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
						.on("click", function(){ getBivesData(this.__data__.model, this.__data__.version1, this.__data__.version2, "reportHtml", "#info")});



		});


	// add legend
/*
	var legend = svg.append("g")
			.attr("class", "legend")
			//.attr("x", w - 65)
			//.attr("y", 50)
			.attr("height", 100)
			.attr("width", 100)
			.attr('transform', 'translate(-20,50)');

	var legendRect = legend.selectAll('rect').data(colors);

	legendRect.enter()
		  .append("rect")
		  .attr("x", width - 65)
		  .attr("width", 10)
		  .attr("height", 10);

	legendRect
		  .attr("y", function(d, i) {
		      return i * 20;
		  })
		  .style("fill", function(d) {
		      return d[1];
		  });

	var legendText = legend.selectAll('text').data(colors);

	legendText.enter()
		  .append("text")
			.attr("fill", "white")
		  .attr("x", width - 52);

	legendText
		  .attr("y", function(d, i) {
		      return i * 20 + 9;
		  })
		  .text(function(d) {
		      return d[0];
		  });
	}
*/

	var parseDate = d3.time.format("%Y-%m-%d").parse;

	function type(d) {
		d.bives = getInt(d.bives);
		d.bivesinsert = getInt(d.bivesinsert);
		d.bivesdelete = getInt(d.bivesdelete);
		d.bivesmove = getInt(d.bivesmove);
		d.bivesupdate = getInt(d.bivesupdate);
		d.version1 = parseDate(d.version1);
		d.version2 = parseDate(d.version2);	
		return d;
	}

	function getInt(l){
		if(+l == 0){
			return 0;
		} else {
			return +l;
			//return Math.log(+l)+1;
		}
	}

	function barDetail(){
		console.log("barDetail");
		return;
	}
}
