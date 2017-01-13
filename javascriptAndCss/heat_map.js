function heatmap(table){
	$('.menuInfoButton').fadeOut();
	d3.selectAll('#heatmappage').selectAll('svg').remove();
	d3.selectAll('.onoffswitch').remove();
	d3.selectAll('#info > *').remove();
	d3.selectAll('#heatTip').remove();
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
				rectWidth = 5;
			
			var svgWidth = rectWidth * table.length;
			
			var svgDiv = d3.select("#heatmappage").append("div")
					.attr("id", "svgDiv");



			var svg = d3.select("#svgDiv").append("svg")
				.attr("id", "heatmapSvg")
				.attr("width", svgWidth + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom + 20)
				.style("background-color", "black")
			.append("g")
				.attr("transform", "translate("+0+"," + (margin.top + 20) + ")");
				
			var svgYAxis = d3.select("#scaleHeatmap").append("svg")
				.attr("width", margin.left)
				.attr("height", height + margin.top + margin.bottom + 20)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + (margin.top +20) + ")");
				
	/*		svg.append("rect")
				.attr("width", "100%")
				.attr("height", "100%")
				.attr("fill", "black");
	*/	
			svgYAxis.append("g")
					.attr("class", "y axis")
					.call(yAxis)
				.append("text")
					//.attr("transform", "rotate(-90)")
					.attr("y", -15)
					//.attr("dy", ".71em")
					.style("text-anchor", "end")
					.attr("fill", "black")
					.text("Changes");

						//text field overlay
			var tooltip = d3.select("#svgDiv")
				.append("span")
				.attr("id", "heatTip")
				.attr("class", "tooltip")
				.style("visibility", "hidden")
				.style("position", "absolute")
				.style("transform", "translate(-25%,0)");
				
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
						.style("fill", "red")
						.on("mouseover", function(){
											var left = Math.min((d3.select("#heatmappage").node().getBoundingClientRect().width-45), (d3.select("#heatmapSvg").node().getBoundingClientRect().width-45))/2;
											tooltip.text(this.__data__.model) ; tooltip.style("visibility", "visible");
											d3.select("#heatTip").style("left", left + 'px');})
						//.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
					.on("click", function(){
				var version1 = originalFilestats[this.__data__.model + this.__data__.version1id];
				var version2 = originalFilestats[this.__data__.model + this.__data__.version2id];
				
				$("#bivesInfo").show();
				$('#callBivesButton').show();
				$('.bivesNavi').hide();
				$('#bivesResult').hide();
				$("#bivesOriginalModel").attr ("href", version1.url).text (version1.model + " in version " + version1.versionid);
				$("#bivesModifiedModel").attr ("href", version2.url).text (version2.model + " in version " + version2.versionid);
				
				$("#bivesOriginalModelSupp").text ("(" + version1.date + ")");
				$("#bivesModifiedModelSupp").text ("(" + version2.date + ")");
				
				$('#callBivesButton').off('click');
				$('#callBivesButton').click(function(){getBivesData(version1, version2, ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"], "#info");});}
				);
				
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
						.style("fill", "green")
						.on("mouseover", function(){
											var left = Math.min((d3.select("#heatmappage").node().getBoundingClientRect().width-45), (d3.select("#heatmapSvg").node().getBoundingClientRect().width-45))/2;
											tooltip.text(this.__data__.model) ; tooltip.style("visibility", "visible");
											d3.select("#heatTip").style("left", left + 'px');})
						//.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
					.on("click", function(){
				var version1 = originalFilestats[this.__data__.model + this.__data__.version1id];
				var version2 = originalFilestats[this.__data__.model + this.__data__.version2id];
				
				$("#bivesInfo").show();
				$('#callBivesButton').show();
				$('.bivesNavi').hide();
				$('#bivesResult').hide();
				$("#bivesOriginalModel").attr ("href", version1.url).text (version1.model + " in version " + version1.versionid);
				$("#bivesModifiedModel").attr ("href", version2.url).text (version2.model + " in version " + version2.versionid);
				
				$("#bivesOriginalModelSupp").text ("(" + version1.date + ")");
				$("#bivesModifiedModelSupp").text ("(" + version2.date + ")");
				
				$('#callBivesButton').off('click');
				$('#callBivesButton').click(function(){getBivesData(version1, version2, ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"], "#info");});}
				);
				
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
						.style("fill", "blue")
						.on("mouseover", function(){
											var left = Math.min((d3.select("#heatmappage").node().getBoundingClientRect().width-45), (d3.select("#heatmapSvg").node().getBoundingClientRect().width-45))/2;
											tooltip.text(this.__data__.model) ; tooltip.style("visibility", "visible");
											d3.select("#heatTip").style("left", left + 'px');})
						//.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
					.on("click", function(){
				var version1 = originalFilestats[this.__data__.model + this.__data__.version1id];
				var version2 = originalFilestats[this.__data__.model + this.__data__.version2id];
				
				$("#bivesInfo").show();
				$('#callBivesButton').show();
				$('.bivesNavi').hide();
				$('#bivesResult').hide();
				$("#bivesOriginalModel").attr ("href", version1.url).text (version1.model + " in version " + version1.versionid);
				$("#bivesModifiedModel").attr ("href", version2.url).text (version2.model + " in version " + version2.versionid);
				
				$("#bivesOriginalModelSupp").text ("(" + version1.date + ")");
				$("#bivesModifiedModelSupp").text ("(" + version2.date + ")");
				
				$('#callBivesButton').off('click');
				$('#callBivesButton').click(function(){getBivesData(version1, version2, ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"], "#info");});}
				);
					
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
						.style("fill", "yellow")
						.on("mouseover", function(){
											var left = Math.min((d3.select("#heatmappage").node().getBoundingClientRect().width-45), (d3.select("#heatmapSvg").node().getBoundingClientRect().width-45))/2;
											tooltip.text(this.__data__.model) ; tooltip.style("visibility", "visible");
											d3.select("#heatTip").style("left", left + 'px');})
						//.on("mousemove", function(){return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
						.on("mouseout", function(){return tooltip.style("visibility", "hidden");})
					//.on("click", function(){ getBivesData(originalFilestats[this.__data__.model + this.__data__.version1id], originalFilestats[this.__data__.model + this.__data__.version2id],["reportHtml", "reactionsDot", "xmlDiff", "separateAnnotations"], "#info")});
					.on("click", function(){
				var version1 = originalFilestats[this.__data__.model + this.__data__.version1id];
				var version2 = originalFilestats[this.__data__.model + this.__data__.version2id];
				
				$("#bivesInfo").show();
				$('#callBivesButton').show();
				$('.bivesNavi').hide();
				$('#bivesResult').hide();
				$("#bivesOriginalModel").attr ("href", version1.url).text (version1.model + " in version " + version1.versionid);
				$("#bivesModifiedModel").attr ("href", version2.url).text (version2.model + " in version " + version2.versionid);
				
				$("#bivesOriginalModelSupp").text ("(" + version1.date + ")");
				$("#bivesModifiedModelSupp").text ("(" + version2.date + ")");
				
				$('#callBivesButton').off('click');
				$('#callBivesButton').click(function(){getBivesData(version1, version2, ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"], "#info");});}
				);
				
	$("#download").click(function(){
		console.log ("hey");
		domtoimage.toBlob(document.getElementById('heatmaptest'))
			.then(function (blob) {
				window.saveAs(blob, 'heatmapSvg.png');
			});
		
		domtoimage.toPng(document.getElementById('heatmapSvg'))
			.then(function (dataUrl){
				var img = new Image();
				img.src = dataUrl;
				document.body.appendChild(img);
			})
			.catch(function (error) {
			console.error('oops, something went wrong!', error);
			});
	})
	setHash("v", "h");
}
