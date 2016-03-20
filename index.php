<!DOCTYPE html>
<html>
<head>
	<title>Stats-website</title>
  <meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="javascriptAndCss/stats.css" />
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
			<li><img class="pictureMenu" src="image/donutMini.png" alt="Donut" id="donutbutton"><div class="desc">Donut</div></li>
			<li onclick="bivesOverview(window.extent[0], window.extent[1])"><img class="pictureMenu" src="image/bivesMini.png" alt="BivesChange"><div class="desc">Heatmap</div></li>
			<li onclick="boxplot(window.extent[0], window.extent[1])"><img class="pictureMenu" src="image/boxplotMini.png" alt="Bives-Boxplot"><div class="desc">Boxplot</div></li>
			<li onclick="boxplot2(window.extent[0], window.extent[1])"><img class="pictureMenu" src="image/boxplotMini2.png" alt="Bives-Boxplot"><div class="desc">Boxplot</div></li>
		</div>
		<div id="midScroll">
			
			<div id="charts">
				<h3>Project info</h3>
				<p id="projectInfo"> </p>
												
				
				<h3>Acknowledgments</h3>
				<p id="acknowledgments">
				</p>
				<div id="bioModels"></div>
				<div id="cellML"></div>
				<div id="bives"></div>
				
				<div class="menuInfoButton" id="donutButton"><button id="smallInfoDonut" class="smallInfo">i</button>
					<div class="infoBox" id="donutBox"></div>
				</div>
				<div class="menuInfoButton" id="heatButton"><button id="smallInfoHeat" class="smallInfo">i</button>
					<div class="infoBox" id="heatBox"></div>
				</div>
				<div class="menuInfoButton" id="box1Button"><button id="smallInfoBox1" class="smallInfo">i</button>
					<div class="infoBox" id="box1Box"></div>
				</div>
				<div class="menuInfoButton" id="box2Button"><button id="smallInfoBox2" class="smallInfo">i</button>
					<div class="infoBox" id="box2Box"></div>
				</div>				
			</div>
			
			<div id="info"></div>
		</div>
	</div>

<div id="dataButton"><button id="smallInfoDataset" class="smallInfo">i</button>
	<div class="infoBox" id="datasetBox"></div>
</div>

</body>

<script src="thirdParty/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="thirdParty/d3.min.js" charset="utf-8"></script>
<script type="text/javascript" src="thirdParty/date.js"></script>
<script type="text/javascript" src="bives/bivesTool.js"></script>
<script type="text/javascript" src="javascriptAndCss/heatmap.js"></script>
<script type="text/javascript" src="javascriptAndCss/donut.js"></script>
<script type="text/javascript" src="javascriptAndCss/boxplot1.js"></script>
<script type="text/javascript" src="javascriptAndCss/boxplot2.js"></script>
<script type="text/javascript">

var filestats = {};
var diffstats = {};


$("#donutbutton").click (function ()
{
	donut (window.extent[0], window.extent[1]);
});



 var extent =[Date.parse("Jan 01 2010"), Date.parse("Jan 01 2011")];

var infoMode = "start";


$.getJSON("javascriptAndCss/info.json", function(json){
//	console.log(json);
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
	
	$("#smallInfoDonut").click (function(){
		if( $('#donutBox').is(':empty') ){
			$('#donutBox').append(json.donutVis).append(json.donutUsage);
		} else {
			$('#donutBox > a').remove();
			$('#donutBox').contents().filter(function () {
				return this.nodeType === 3; // Text nodes only
			}).remove();
		}
	});
	
	$("#smallInfoHeat").click (function(){
		if( $('#heatBox').is(':empty') ){
			$('#heatBox').append(json.heatmapVis).append(json.heatmapUsage);
		} else {
			$('#heatBox > a').remove();
			$('#heatBox').contents().filter(function () {
				return this.nodeType === 3; // Text nodes only
			}).remove();
		}
	});

	$("#smallInfoBox1").click (function(){
		if( $('#box1Box').is(':empty') ){
			$('#box1Box').append(json.boxplot1Vis).append(json.boxplot1Usage);
		} else {
			$('#box1Box > a').remove();
			$('#box1Box').contents().filter(function () {
				return this.nodeType === 3; // Text nodes only
			}).remove();
		}
	});
	
	$("#smallInfoBox2").click (function(){
		if( $('#box2Box').is(':empty') ){
			$('#box2Box').append(json.boxplot2Vis).append(json.boxplot2Usage);
		} else {
			$('#box2Box > a').remove();
			$('#box2Box').contents().filter(function () {
				return this.nodeType === 3; // Text nodes only
			}).remove();
		}
	});	


//load startpage info from json
	$("#projectInfo").append(json.projectInfo.motivation).append(json.projectInfo.question);
	$("#acknowledgments").append(json.acknowledgments.design).append(json.acknowledgments.funding);
});


</script>
<script type="text/javascript" src="javascriptAndCss/choiceChart.js"></script>
</html>
