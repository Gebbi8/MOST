function heatmap(table){
	$('.menuInfoButton').fadeOut();
	d3.selectAll('#heatmappage').selectAll('svg').remove();
	d3.selectAll('.onoffswitch').remove();
	d3.selectAll('#info > *').remove();
selectChart("heatmappage");
	$('#heatButton').fadeIn();

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


			y.domain([1, d3.max(table, function(d) { return d.bives; })]).nice();


			//compute svg width depending on table length
			var rectWidth = width/table.length;
			if (rectWidth < 5)
				rectWidth = 1;
			
			var svgWidth = rectWidth * table.length;
			
			var svgDiv = d3.select("#heatmappage").append("div")
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

svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", "black");
		
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

			var bivdelete = svg.selectAll(".bar1")
						.data(table)
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
								if (H == 0) return 0;
								return (y(H));
								})
						.attr("height", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								if (H == 0) return 0;
								return (height - y(H))*d.bivesdelete/H;
								})
						.attr("fill", "red")
						.on("mouseover", function(){tooltip.text(this.__data__.model) ;return tooltip.style("visibility", "visible");})
						.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
					.on("click", function(){ getBivesData(originalFilestats[this.__data__.model + this.__data__.version1id], originalFilestats[this.__data__.model + this.__data__.version2id],["reportHtml", "reactionsDot", "xmlDiff", "separateAnnotations"], "#info")});

			var bivinsert = svg.selectAll(".bar")
						.data(table)
					.enter().append("rect")
						.attr("class", "bar")
						.attr("x", function(d, i) { return i * (rectWidth)+2; })
						.attr("width", rectWidth) //add -0.1 for padding
						.attr("y", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								if (H == 0) return 0;
								return (y(H)+(height - y(H))*d.bivesdelete/H);
								})
						.attr("height", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								if (H == 0) return 0;
								return (height - y(H))*d.bivesinsert/H;
								})
						.attr("fill", "green")
						.on("mouseover", function(){tooltip.text(this.__data__.model) ;return tooltip.style("visibility", "visible");})
						.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
					.on("click", function(){ getBivesData(originalFilestats[this.__data__.model + this.__data__.version1id], originalFilestats[this.__data__.model + this.__data__.version2id],["reportHtml", "reactionsDot", "xmlDiff", "separateAnnotations"], "#info")});

			var bivmove = svg.selectAll(".bar2")
						.data(table)
					.enter().append("rect")
						.attr("class", "bar2")
						.attr("x", function(d, i) { return i * (rectWidth)+2; })
						.attr("width", rectWidth) //add -0.1 for padding
						.attr("y", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								if (H == 0) return 0;
								return (y(H)+(height - y(H))*(d.bivesdelete+d.bivesinsert)/H);
								})
						.attr("height", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								if (H == 0) return 0;
								return (height - y(H))*d.bivesmove/H;
								})
						.attr("fill", "blue")
						.on("mouseover", function(){tooltip.text(this.__data__.model) ;return tooltip.style("visibility", "visible");})
						.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
					.on("click", function(){ getBivesData(originalFilestats[this.__data__.model + this.__data__.version1id], originalFilestats[this.__data__.model + this.__data__.version2id],["reportHtml", "reactionsDot", "xmlDiff", "separateAnnotations"], "#info")});

				var bivupdate = svg.selectAll(".bar3")
						.data(table)
					.enter().append("rect")
						.attr("class", "bar3")
						.attr("x", function(d, i) { return i * (rectWidth)+2; })
						.attr("width", rectWidth) //add -0.1 for padding
						.attr("y", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								if (H == 0) return 0;
								return (y(H)+(height - y(H))*(d.bivesdelete+d.bivesinsert+d.bivesmove)/H);
								})
						.attr("height", function(d) {
								var H = d.bivesupdate+d.bivesinsert+d.bivesdelete+d.bivesmove;
								if (H == 0) return 0;
								return (height - y(H))*d.bivesupdate/H;
								})
						.attr("fill", "yellow")
						.on("mouseover", function(){tooltip.text(this.__data__.model) ;return tooltip.style("visibility", "visible");})
						.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
					.on("click", function(){ getBivesData(originalFilestats[this.__data__.model + this.__data__.version1id], originalFilestats[this.__data__.model + this.__data__.version2id],["reportHtml", "reactionsDot", "xmlDiff", "separateAnnotations"], "#info")});

}
