function boxplot(date1, date2){
	d3.selectAll('#charts').selectAll('svg').remove();
	
	var x,y;

	var margin = {top: 10, right: 5, bottom: 20, left: 100},
				width = 610 - margin.left - margin.right,
				height = 500 - margin.top - margin.bottom;

	var svg = d3.select("#charts").append("svg")
				.attr("width", width + margin.left + 3*margin.right)
				.attr("height", height + margin.top + 2*margin.bottom)
			.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Variables for Boxplots
	var min = Infinity,
		  max = -Infinity;

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

	d3.tsv("diffstats", type, function(error, tsv) {
		if (error) throw error;
		tsv = tsv.filter(function(d) {return (date1 < d.version1) && (d.version1 < date2); } );
		//filter by modelType
		if(document.getElementById('BioModels').checked != document.getElementById('CellML').checked){
			if(document.getElementById('BioModels').checked) {
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
				//console.log(d.bivesmove, d.bivesdelete, d.bivesinsert,d.bivesupdate);
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
			//.domain([Math.exp(0), Math.exp(9)])//
			.domain([1, max])	
			.clamp(true)
			.range([0, width]).nice()
			;

		var xAxis = d3.svg.axis()
				.scale(x)
				.orient("bottom")
				.tickFormat(function(d){return Math.round(d);});
		
		for(var i=0; i<4; i++){
			var lW = lowerWhisker(data[i]);
			if(lW == 0){ boxData[i][0] = 0; } else { boxData[i][0] = x(lW);};
		
			var lQ = lowerQuartil(data[i]);
			if(lowerQuartil(data[i]) == 0){ boxData[i][1] = 0;} else {boxData[i][1] = x(lQ);};
		
			var m = median(data[i]);
			if(m == 0){ boxData[i][2] = 0;} else {boxData[i][2] = x(m);};
		
			var uQ = upperQuartil(data[i]);
			if(uQ == 0){ boxData[i][3] = 0;} else {boxData[i][3] = x(uQ);};
		
			var uW = upperWhisker(data[i]);
			if(uW == 0){ boxData[i][4] = 0;} else {boxData[i][4] = x(uW);};
		}

		drawBoxes(boxData, data);

		svg.append("g")
				.attr("class", "x axis")
					.attr("transform", "translate(0," + height + ")")
				  .call(xAxis);
	
		svg.append("g")
				.attr("class", "y axis")
					.attr("transform", "translate(0, 0)")
				  .call(yAxis);

	/*var testArr = [0,1,2,3,4,5];
	var controlArr = [];

		controlArr[2] = median(testArr);
		controlArr[1] = lowerQuartil(testArr);
		controlArr[3] = upperQuartil(testArr);

	console.log(controlArr);
	*/


	//console.log(max, min, boxData, data);



	});


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

	function drawBoxes(boxes, data){
		var boxHeight = 40;
		var color = [["#83C5D1"],["#B5D045"],["#F47E7D"],["#FFFA5F"]];

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
				if(data[i][j] < boxes[i][0]){
					svg.append("circle")
						.style("stroke", "black")
						.attr("cx", data[i][j])
						.attr("cy", 55 + i*120)
						.attr("r", 5);
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
				if(data[i][j] > boxes[i][4]){
					console.log(data[i][j]);
					svg.append("circle")
						.style("stroke", "black")
						.attr("cx", data[i][j])
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

		//
		}
	}

	function type(d) {
		d.version1 = parseDate(d.version1);
		d.version2 = parseDate(d.version2);	
		return d;
	}

}
