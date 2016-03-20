<!DOCTYPE html>
<html>
<head>
	<title>Stats-website</title>
  <meta charset="UTF-8">
<link rel="shortcut icon" href="favicon.png" />
	<link rel="stylesheet" type="text/css" href="javascriptAndCss/stats.css" />
</head>
<body>

	<div id="choiceDiv">
	<a href="#" id="logolink"><img id="logo" src="image/logo.svg" alt=""></a>

	  <div id="choiceChart" class="chart">
	    <div class="title">Timespan<button id="smallInfoTimespan" class="smallInfo">i</button>
			<div class="infoBox" id="timeSpanBox"></div>
		</div>
				<div class="buttons">
					<input type="date" id="date1" value="2010-01-01">
						<a href="#" class="button left up" id="date1Up"></a>
						<a href="#" class="button right down" id="date1Down"></a>
				</div>
				<div class="buttons">
					<input type="date" id="date2" value="2011-01-01">
						<a href="#" class="button left up" id="date2Up"></a>
						<a href="#" class="button right down" id="date2Down"></a>
				</div>
	  </div>
	</div>

	<div id="contentDiv"><p></p>
		<div id="menu">
			<li><img class="pictureMenu" src="image/donutMini.png" alt="Donut" id="donutbutton"><div class="desc">Donut</div></li>
			<li><img class="pictureMenu" src="image/bivesMini.png" alt="BivesChange" id="heatmapbutton"><div class="desc">Heatmap</div></li>
			<li><img class="pictureMenu" src="image/boxplotMini.png" alt="Bives-Boxplot" id="boxplot1button"><div class="desc">Boxplot</div></li>
			<li><img class="pictureMenu" src="image/boxplotMini2.png" alt="Bives-Boxplot" id="boxplot2button"><div class="desc">Boxplot</div></li>
		</div>
		<div id="midScroll">
			
			<div id="charts">
				<div id="landingpage">
					<h3>Project info</h3>
					<p id="projectInfo"> </p>
													
					
					<h3>Acknowledgments</h3>
					<p id="acknowledgments">
					</p>
					<div id="linkLogos">
						<a href="https://www.ebi.ac.uk/biomodels-main/" class="floatlogo" id="bioModels"></a>
						<a href="http://models.cellml.org/cellml" class="floatlogo" id="cellML"></a>
						<a href="https://sems.uni-rostock.de/projects/bives/" class="floatlogo"id="bives"></a>
					</div>
				</div>
				
				<div id="donutpage">
				<div class="menuInfoButton" id="donutButton"><button id="smallInfoDonut" class="smallInfo">i</button>
					<div class="infoBox" id="donutBox"></div>
				</div>
				</div>
				
				<div id="heatmappage">
				<div class="menuInfoButton" id="heatButton"><button id="smallInfoHeat" class="smallInfo">i</button>
					<div class="infoBox" id="heatBox"></div>
				</div>
				</div>
				
				<div id="box1page">
				<div class="menuInfoButton" id="box1Button"><button id="smallInfoBox1" class="smallInfo">i</button>
					<div class="infoBox" id="box1Box"></div>
				</div>
				</div>
				
				<div id="box2page">
				<div class="menuInfoButton" id="box2Button"><button id="smallInfoBox2" class="smallInfo">i</button>
					<div class="infoBox" id="box2Box"></div>
				</div>
				</div>
				
			</div>
			
			<div id="bivesInfo">
				<div id="bivesGeneralInfo">
					<h3>Comparison of Models</h3>
					<div id="bivesComparedModels">
						<a id="bivesOriginalModel"></a> <span id="bivesOriginalModelSupp"></span><br />
						<a id="bivesModifiedModel"></a> <span id="bivesModifiedModelSupp"></span>
					</div>
				</div>
				<div id="bivesResult">
				</div>
			</div>
		</div>
	</div>

<div id="dataButton"><button id="smallInfoDataset" class="smallInfo">i</button>
	<div class="infoBox" id="datasetBox"></div>
</div>

</body>

<script type="text/javascript" src="thirdParty/jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="thirdParty/d3.min.js" charset="utf-8"></script>
<script type="text/javascript" src="thirdParty/moment-with-locales.min.js"></script>
<script type="text/javascript" src="bives/bivesTool.js"></script>
<script type="text/javascript" src="javascriptAndCss/heatmap.js"></script>
<script type="text/javascript" src="javascriptAndCss/donut.js"></script>
<script type="text/javascript" src="javascriptAndCss/boxplot1.js"></script>
<script type="text/javascript" src="javascriptAndCss/boxplot2.js"></script>
<script type="text/javascript">



/*
* selectChart can be used to select one of the charts (or tabs). all other content will be hidden.
*/
function selectChart (chart)
{
	for (var i = 0; i < charts.length; i++)
		$("#"+charts[i]).hide();
	$("#"+chart).show();
}

/*
* attachInfo can be used to attache some informational strings to one of the "i" boxes on the web page
* smallInfo: the i-button
* infoBox: the grey box that will pop-up
* infoMsg: the message to be displayed
*/
function attachInfo (smallInfo, infoBox, infoMsg)
{
	$(smallInfo).click (function(){
		if( $(infoBox).is(':empty') ){
			$(infoBox).append(infoMsg);
		} else {
			$(infoBox).contents().filter(function () {
				return this.nodeType === 3; // Text nodes only
			}).remove();
		}
	});
}






var filestats = {};
var diffstats = {};
var extent =[Date.parse("01-01-2010"), Date.parse("01-01-2011")];
var infoMode = "start";

var charts = [
"landingpage",
"donutpage",
"heatmappage",
"box1page",
"box2page",
"bivesInfo"
];

// select the landing page as start
selectChart("landingpage");

// register click-listeners to the tab-buttons
$("#donutbutton").click (function (){donut (window.extent[0], window.extent[1]);});
$("#heatmapbutton").click (function (){bivesOverview(window.extent[0], window.extent[1]);});
$("#boxplot1button").click (function (){boxplot(window.extent[0], window.extent[1]);});
$("#boxplot2button").click (function (){boxplot2(window.extent[0], window.extent[1]);});
$("#logolink").click (function (){selectChart("landingpage");;});

// load info material and fill the i-buttons
$.getJSON("javascriptAndCss/info.json", function(json){

	attachInfo ("#smallInfoTimespan", '#timeSpanBox', json.timespan);
	attachInfo ("#smallInfoDataset", '#datasetBox', json.dataset);
	attachInfo ("#smallInfoDonut", '#donutBox', json.donutVis + json.donutUsage);
	attachInfo ("#smallInfoHeat", '#heatBox', json.heatmapVis + json.heatmapUsage);
	attachInfo ("#smallInfoBox1", '#box1Box', json.boxplot1Vis + json.boxplot1Usage);
	attachInfo ("#smallInfoBox2", '#box2Box', json.boxplot2Vis + json.boxplot2Usage);

	//load startpage info from json
	$("#projectInfo").append(json.projectInfo.motivation).append(json.projectInfo.question);
	$("#acknowledgments").append(json.acknowledgments.design).append(json.acknowledgments.funding);
});


</script>
<script type="text/javascript" src="javascriptAndCss/choiceChart.js"></script>
</html>
