function boxplot(date1, date2){
	$('.menuInfoButton').fadeOut();
	d3.selectAll('#box1page').selectAll('svg').remove();
	d3.selectAll('.onoffswitch').remove();
	d3.selectAll('#info > *').remove();
	selectChart("box1page");
	$('#box1Button').fadeIn();

// Variables for Boxplots
	var mode = 0;
	var min = Infinity, max = -Infinity;

	var data = [];
		data[0] = [];
		data[1] = [];
		data[2] = [];
		data[3] = [];

	var boxData = [];
		boxData[0] = [];
		boxData[1] = [];
		boxData[2] = [];
		boxData[3] = [];

	var boxData2 = [];
		boxData2[0] = [];
		boxData2[1] = [];
		boxData2[2] = [];
		boxData2[3] = [];

//flip-button to switch between log and normal scale
	var onOffSwitch = d3.select("#box1page")
           .append("div")
               .attr("class","onoffswitch");

  onOffSwitch = d3.select(".onoffswitch")
		.append("input")
		 .attr("type", "checkbox")
		 .attr("name", "onoffswitch")
		 .attr("class", "onoffswitch-checkbox")
		 .attr("id", "myonoffswitch")
		 .attr("checked", "")
		 .on("click", function(){rescale();});

	onOffSwitch = d3.select(".onoffswitch")
		.append("label")
		 .attr("class", "onoffswitch-label")
		 .attr("for", "myonoffswitch");

	 onOffSwitch = d3.select(".onoffswitch-label")
		  .append("span")
		   .attr("class", "onoffswitch-inner");
	onOffSwitch = d3.select(".onoffswitch-label")
		  .append("span")	
		   .attr("class", "onoffswitch-switch");

	var x,y,x2;

	var margin = {top: 10, right: 5, bottom: 20, left: 100},
				width = 610 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

	var svg = d3.select("#box1page").append("svg")
				.style("opacity", 1)
				.attr("width", width + margin.left + 3*margin.right + 10)
				.attr("height", height + margin.top + 2*margin.bottom)
				.attr("id", "logSvg")
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
///////////////////////
	var svg2 = d3.select("#box1page").append("svg")
				.style("opacity", 1)
				.attr("width", width + margin.left + 3*margin.right + 10)
				.attr("height", height + margin.top + 2*margin.bottom)
				.attr("id", "normalSvg")
				.style("display", "none")
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
				
			var tsv = diffstats.filter(function(d){
				var ddatum = filestats[d["model"] + d["version2id"] ]["date"];
				return date1 < ddatum && ddatum < date2;
			});

		//filter by modelType
		if(document.getElementById('SBMLFilter').checked != document.getElementById('CellMLFilter').checked){
			if(document.getElementById('SBMLFilter').checked) {
				tsv = tsv.filter(function(d){return d.modeltype == 'SBML'})
			} else {
				tsv = tsv.filter(function(d){return d.modeltype == 'CellML'})
			}
		}
		var header = [["move"],["insert"],["delete"],["update"]];

		tsv.forEach(function(d){
			d.bivesmove = +d.bivesmove;
			d.bivesinsert = +d.bivesinsert;
			d.bivesdelete = +d.bivesdelete;
			d.bivesupdate = +d.bivesupdate;
		
			//discard diff if all values equal 0
		
			if(d.bivesmove + d.bivesdelete + d.bivesinsert + d.bivesupdate < 20) { //?????????????????????????
			}
			else {
				data[0].push(d.bivesmove);
				data[1].push(d.bivesinsert);
				data[2].push(d.bivesdelete);
				data[3].push(d.bivesupdate);
			
				max = Math.max(max, d.bivesmove, d.bivesinsert, d.bivesdelete, d.bivesupdate);
				min = Math.min(min, d.bivesmove, d.bivesinsert, d.bivesdelete, d.bivesupdate);
			}
		});
		//max, min test
		data[0].sort(function(a,b){ return a-b;});
		data[1].sort(function(a,b){ return a-b;});
		data[2].sort(function(a,b){ return a-b;});
		data[3].sort(function(a,b){ return a-b;});

		y = d3.scale.ordinal()
			.domain( header.map(function(d) { return d[0] } ) )	    
			.rangeRoundBands([0 , height], 0.7, 0.3); 

		var yAxis = d3.svg.axis()
				.scale(y)
				.orient("left");

		x = d3.scale.log()
			.base(Math.E)
			.domain([1, max])	
			.clamp(true)
			.range([0, width]).nice();

///////////////////
		x2 = d3.scale.linear()
			.domain([1, max])	
			.clamp(true)
			.range([0, width]).nice()
			;	

		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(function(d){return Math.round(d);});
///////////////////
		var xAxis2 = d3.svg.axis()
				.scale(x2)
				.orient("bottom")
				.tickFormat(function(d){return Math.round(d);});		
		
		for(var i=0; i<4; i++){
			var lW = lowerWhisker(data[i]);
			if(lW == 0){ boxData[i][0] = 0; boxData2[i][0] = 0; } else { boxData[i][0] = x(lW); boxData2[i][0] = x2(lW);};
		
			var lQ = lowerQuartil(data[i]);
			if(lowerQuartil(data[i]) == 0){ boxData[i][1] = 0; boxData2[i][1] = 0;} else {boxData[i][1] = x(lQ); boxData2[i][1] = x2(lQ);};
		
			var m = median(data[i]);
			if(m == 0){ boxData[i][2] = 0; boxData2[i][2] = 0;} else {boxData[i][2] = x(m); boxData2[i][2] = x2(m);};
		
			var uQ = upperQuartil(data[i]);
			if(uQ == 0){ boxData[i][3] = 0; boxData2[i][3] = 0;} else {boxData[i][3] = x(uQ); boxData2[i][3] = x2(uQ)};
		
			var uW = upperWhisker(data[i]);
			if(uW == 0){ boxData[i][4] = 0; boxData2[i][4] = 0;} else {boxData[i][4] = x(uW); boxData2[i][4] = x2(uW);};
		}

		

		svg.append("g")
				.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
				  .call(xAxis);
	
		svg.append("g")
				.attr("class", "y axis")
					.attr("transform", "translate(0, 0)")
				  .call(yAxis);

		svg2.append("g")
				.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
				  .call(xAxis2);
	
		svg2.append("g")
				.attr("class", "y axis")
					.attr("transform", "translate(0, 0)")
				  .call(yAxis);
		
		drawBoxes(boxData, boxData2, data);

	/*var testArr = [0,1,2,3,4,5];
	var controlArr = [];

		controlArr[2] = median(testArr);
		controlArr[1] = lowerQuartil(testArr);
		controlArr[3] = upperQuartil(testArr);

	console.log(controlArr);
	*/


	//console.log(max, min, boxData, data);



// 	});


	// Returns the median of an already sorted array
	function median(arr){
		var half = Math.floor(arr.length/2);

		if(arr.length % 2)
			return arr[half];
		else
			return (arr[half-1] + arr[half])/2;
	}

	// Returns the value for the lower Quartil
	function lowerQuartil(arr) {
		var quarter = Math.floor(arr.length/4);

		if(arr.length % 4)
			return arr[quarter];
		else
			return (arr[quarter-1] + arr[quarter])/2;
	}

	// Returns the value for the upper Quartil
	function upperQuartil(arr) {
		var thirdQuarter = Math.floor(3*arr.length/4);

		if((3*arr.length) % 4)
			return arr[thirdQuarter];
		else
			return (arr[thirdQuarter-1] + arr[thirdQuarter])/2;
	}

	function lowerWhisker(arr){
		var lowerWhisker = Math.ceil(0.0125*arr.length);

		return arr[lowerWhisker];
	}

	function upperWhisker(arr){
		var upperWhisker = Math.floor(0.9875*arr.length);

		return arr[upperWhisker];
	}

	function drawBoxes(boxes, boxes2, data){
		var boxHeight = 40;
		var color = [["#83C5D1"],["#B5D045"],["#F47E7D"],["#FFFA5F"]];

/*		var controlData = data; var controlData2 = data;
		
		for(var i = 0; i<data.length; i++){
			for(var j = 0; j < data[i].length; j++){
				
				controlData[i][j]=x(data[i][j]);
				controlData2[i][j]=x2(data[i][j]);
			}
		}
		console.log(boxes);	console.log(boxes2);	console.log(controlData);	console.log(controlData2);
*/
		for(var i = 0; i < 4; i++){
			//draw Whiskers
			svg.append("line")
				.style("stroke", "black")
				.attr("x1", boxes[i][0])
				.attr("y1", 55 + i*120 + boxHeight/2)
				.attr("x2", boxes[i][0])
				.attr("y2", 55 + i*120 - boxHeight/2);

			//untere Ausreißer
			for(var j = 0; j < data[i].length; j++){
				if(x(data[i][j]) < boxes[i][0]){
					svg.append("circle")
						.style("stroke", "black")
						.attr("cx", x(data[i][j]))
						.attr("cy", 55 + i*120)
						.attr("r", 5)
						.attr("fill", "none");
				} else {j = data[i].length;}
			}

			svg.append("line")
				.style("stroke", "black")
				.attr("x1", boxes[i][4])
				.attr("y1", 55 + i*120 + boxHeight/2)
				.attr("x2", boxes[i][4])
				.attr("y2", 55 + i*120 - boxHeight/2);

			//obere Ausreißer
			for(var j = data[i].length-1; j > 0; j--){
				if(x(data[i][j]) > boxes[i][4]){
					//console.log(data[i][j]);
					svg.append("circle")
						.style("stroke", "black")
						.attr("cx", x(data[i][j]))
						.attr("cy", 55 + i*120)
						.attr("r", 5)
						.attr("fill", "none");
				} else {j = 0;}
			}

			svg.append("line")
				.style("stroke", "black")
				.style("stroke-dasharray", ("3, 3")) 
				.attr("x1", boxes[i][0])
				.attr("y1", 55 + i*120)
				.attr("x2", boxes[i][4])
				.attr("y2", 55 + i*120);	

			svg.append("rect")
				.style("fill", color[i])
				.style("stroke-width", 1)
				.style("stroke", "black")
				.attr("x", boxes[i][1])
				.attr("y", 55 + i*120 - boxHeight/2)
				.attr("width", boxes[i][3] - boxes[i][1])
				.attr("height", boxHeight);
			
			svg.append("line")
				.style("stroke", "black")
				.attr("x1", boxes[i][2])
				.attr("y1", 55 + i*120 + boxHeight/2)
				.attr("x2", boxes[i][2])
				.attr("y2", 55 + i*120 - boxHeight/2)

		///////draw linear svg
			//draw Whiskers
			svg2.append("line")
				.style("stroke", "black")
				.attr("x1", boxes2[i][0])
				.attr("y1", 55 + i*120 + boxHeight/2)
				.attr("x2", boxes2[i][0])
				.attr("y2", 55 + i*120 - boxHeight/2);

			//untere Ausreißer
			for(var j = 0; j < data[i].length; j++){
				if(x2(data[i][j]) < boxes2[i][0]){
					svg2.append("circle")
						.style("stroke", "black")
						.attr("cx", x2(data[i][j]))
						.attr("cy", 55 + i*120)
						.attr("r", 5)
						.attr("fill", "none");
				} else {j = data[i].length;}
			}

			svg2.append("line")
				.style("stroke", "black")
				.attr("x1", boxes2[i][4])
				.attr("y1", 55 + i*120 + boxHeight/2)
				.attr("x2", boxes2[i][4])
				.attr("y2", 55 + i*120 - boxHeight/2);
		//obere Ausreißer
			for(var j = data[i].length-1; j > 0; j--){
				if(x2(data[i][j]) > boxes2[i][4]){
					svg2.append("circle")
						.style("stroke", "black")
						.attr("cx", x2(data[i][j]))
						.attr("cy", 55 + i*120)
						.attr("r", 5)
						.attr("fill", "none");
				} else {j = 0;}
			}

			svg2.append("line")
				.style("stroke", "black")
				.style("stroke-dasharray", ("3, 3")) 
				.attr("x1", boxes2[i][0])
				.attr("y1", 55 + i*120)
				.attr("x2", boxes2[i][4])
				.attr("y2", 55 + i*120);	

			svg2.append("rect")
				.style("fill", color[i])
				.style("stroke-width", 1)
				.style("stroke", "black")
				.attr("x", boxes2[i][1])
				.attr("y", 55 + i*120 - boxHeight/2)
				.attr("width", boxes2[i][3] - boxes2[i][1])
				.attr("height", boxHeight);
			
			svg2.append("line")
				.style("stroke", "black")
				.attr("x1", boxes2[i][2])
				.attr("y1", 55 + i*120 + boxHeight/2)
				.attr("x2", boxes2[i][2])
				.attr("y2", 55 + i*120 - boxHeight/2)
			
		}
	}

	function type(d) {
		d.version1 = parseDate(d.version1);
		d.version2 = parseDate(d.version2);	
		return d;
	}

	function rescale() {
		if(mode == 0){
			mode = 1;
			$("#logSvg").fadeToggle(function(){
				$("#normalSvg").fadeToggle();
			});
		} else {
			mode = 0;
			$("#normalSvg").fadeToggle(function(){
					$("#logSvg").fadeToggle();
				});
		}

		//jquery fadeIn/Out between svgs

//////////////////////////////



		console.log("TEST!!!!!!!!!!");
  }
	setHash("v", "b1");
}
