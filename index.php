<!DOCTYPE html>
<html>
<head>
	<title>Stats-website</title>
  <meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="stats.css" />
</head>
<body>

	<div id="choiceDiv">
	<img id="logo" src="image/logo.svg" alt="">

	  <div id="choiceChart" class="chart">
	    <div class="title">Timespan<button id="smallInfoTimespan" class="smallInfo">i</button>
			<div class="infoBox" id="timeSpanBox"></div>
		</div>
				<div class="buttons">
					<input type="date" id="date1" value="Jan 01 2010">
						<a href="#" class="button left up" id="date1Up"></a>
						<a href="#" class="button right down" id="date1Down"></a>
				</div>
				<div class="buttons">
					<input type="date" id="date2" value="Jan 01 2011">
						<a href="#" class="button left up" id="date2Up"></a>
						<a href="#" class="button right down" id="date2Down"></a>
				</div>
	  </div>
	</div>

	<div id="contentDiv"><p></p>
		<div id="menu">
			<li onclick="donut(window.extent[0], window.extent[1])"><img class="pictureMenu" src="image/donutMini.png" alt="Donut"><div class="desc">Donut</div></li>
			<li onclick="bivesOverview(window.extent[0], window.extent[1])"><img class="pictureMenu" src="image/bivesMini.png" alt="BivesChange"><div class="desc">Heatmap</div></li>
			<li onclick="boxplot(window.extent[0], window.extent[1])"><img class="pictureMenu" src="image/boxplotMini.png" alt="Bives-Boxplot"><div class="desc">Boxplot</div></li>
			<li onclick="boxplot2(window.extent[0], window.extent[1])"><img class="pictureMenu" src="image/boxplotMini2.png" alt="Bives-Boxplot"><div class="desc">Boxplot</div></li>
		</div>
		<div id="midScroll">
			<div id="charts"><p>Charts</p></div>
			<div id="info"><p>Info</p></div>
		</div>
	</div>
<button onclick="showInfo(jsonText)" id="infoButton">
	i
</button>

<div id="dataButton"><button id="smallInfoDataset" class="smallInfo">i</button>
	<div class="infoBox" id="datasetBox"></div>
</div>

</body>

<script src="jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="d3.min.js" charset="utf-8"></script>
<script type="text/javascript" src="date.js"></script>
<script type="text/javascript" src="choiceChart.js"></script>
<script type="text/javascript" src="bivesTool.js"></script>
<script type="text/javascript" src="bivesOverview.js"></script>
<script type="text/javascript" src="donut-bives-unix.js"></script>
<script type="text/javascript" src="box.js"></script>
<script type="text/javascript" src="box2.js"></script>
<script> var extent =[Date.parse("Jan 01 2010"), Date.parse("Jan 01 2011")];

var infoMode = "start";


$.getJSON("info.json", function(json){
	$("#smallInfoTimespan").click (function(){
		if( $('#timeSpanBox').is(':empty') ){
			$('#timeSpanBox').append(json.timespan);
		} else {
			$("#timeSpanBox").contents().filter(function () {
				return this.nodeType === 3; // Text nodes only
			}).remove();
		}
	});
	
	$("#smallInfoDataset").click (function(){
		if( $('#datasetBox').is(':empty') ){
			$('#datasetBox').append(json.dataset);
		} else {
			$('#datasetBox > a').remove();
			$('#datasetBox').contents().filter(function () {
				return this.nodeType === 3; // Text nodes only
			}).remove();
		}
	});
});



</script>
</html>
