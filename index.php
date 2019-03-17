<!DOCTYPE html>
<html>
<head>
	<title>Stats-website</title>
  <meta charset="UTF-8">
<link rel="shortcut icon" href="favicon.png" />
	<link rel="stylesheet" type="text/css" href="javascriptAndCss/stats.css" />
	<link rel="stylesheet" href="javascriptAndCss/atom-one-light.css">



<script type="text/javascript" src="thirdParty/jquery-2.1.4.min.js"></script>
<!-- <script type="text/javascript" src="thirdParty/d3.min.js" charset="utf-8"></script> -->
<script type="text/javascript" src="thirdParty/d3.v5.min.js" charset="utf-8"></script>
<!-- <script type="text/javascript" src="thirdParty/moment-with-locales.min.js"></script> -->
<script type="text/javascript" src="thirdParty/jquery.popupoverlay.js"></script>
<script type="text/javascript" src="javascriptAndCss/3rd party/highlight.pack.js"></script>

<script type="text/javascript" src="javascriptAndCss/functions.js"></script>
<script type="text/javascript" src="bives/bivesTool.js"></script>


<!--<script type="text/javascript" src="javascriptAndCss/heat_map.js"></script>				runs on d3 v3
<script type="text/javascript" src="javascriptAndCss/donut.js"></script>
<script type="text/javascript" src="javascriptAndCss/boxplot1.js"></script>
<script type="text/javascript" src="javascriptAndCss/boxplot2.js"></script>
-->
<script type="text/javascript" src="javascriptAndCss/sunburst.js"></script>

<script type="text/javascript" src="javascriptAndCss/filters.js"></script>
<script type="text/javascript" src="javascriptAndCss/feedback.js"></script>
<script type="text/javascript" src="javascriptAndCss/handleUrl.js"></script>
<!-- <script type="text/javascript" src="javascriptAndCss/initCharts.js"></script> -->
<script type="text/javascript" src="javascriptAndCss/setHash.js"></script>
<script type="text/javascript" src="javascriptAndCss/comodiParser.js"></script>
<script type="text/javascript" src="javascriptAndCss/3rd party/dom-to-image.js"></script>
<script type="text/javascript" src="javascriptAndCss/3rd party/FileSaver.js"></script>
<script type="text/javascript" src="divil/javascriptAndCss/sboTermMapping.js"></script>
<script type="text/javascript" src="divil/javascriptAndCss/appendDefs.js"></script>
<script type="text/javascript" src="divil/javascriptAndCss/showSbgn.js"></script>
<script type="text/javascript" src="divil/javascriptAndCss/customSymbol.js"></script>
<script type="text/javascript" src="divil/javascriptAndCss/download.js"></script>
<script type="text/javascript" src="divil/javascriptAndCss/sbmlParser.js"></script>
<script type="text/javascript" src="divil/javascriptAndCss/xmlDiffParser.js"></script>
<script type="text/javascript" src="divil/javascriptAndCss/arrowsOnNodes.js"></script>
<script type="text/javascript" src="javascriptAndCss/init.js"></script>


</head>
<body>
	<div id="choiceDiv">
		<div id="feedback">
			<a />
		</div>
		<a href="#" id="logolink"><img id="logo" src="image/logo.svg" alt=""></a>

	  <div id="choiceChart" class="chart">
	    <!-- <div class="title">
				Timespan<button id="smallInfoTimespan" class="smallInfo">i</button><div class="infoBox" id="timeSpanBox"></div>
			</div> -->
			<!-- <div class="buttons">
				<input type="date" id="date1" value="2010-01-01" min="2004-12-31" max="2017-12-31">
					<a href="#" class="button left up" id="date1Up"></a>
					<a href="#" class="button right down" id="date1Down"></a>

			</div> -->
			<!-- <div class="buttons">
				<input type="date" id="date2" value="2011-01-01" min="2004-12-31" max="2017-12-31">
				<a href="#" class="button left up" id="date2Up"></a>
				<a href="#" class="button right down" id="date2Down"></a>

			</div> -->
			<!-- <div class="choiseSwitches">
				<input id="toggle-btn-changes" class="toggle-btn" type="checkbox"/>
				<label for="toggle-btn-changes" data-on="Changes" data-off="Changes"></label>
				<input id="toggle-btn-props" class="toggle-btn" type="checkbox"/>
				<label for="toggle-btn-props" data-on="Properties" data-off="Properties"></label>
			</div> -->

			<!-- <div class="choiceSwitches">
				<button id='choiceChanges' class='btn-changes-on'>changes</button>
				<button id='choiceProperties' class='btn-changes-off'>properties</button>
				<div id="choiceChartChartChanges" class="chart"></div>
				<div id="choiceChartChartProperties" class="chart"></div>
			</div> -->

			<div id="datasetFilter">
				Dataset<button id="smallInfoDataset" class="smallInfo">i</button>
				<div class="infoBox" id="datasetBox"></div>

				<!-- <form>
					<label>SBML<input checked="checked" name="mode" class="modelType" id="SBMLFilter" type="checkbox"></label>
					<label>CellML<input checked="checked" name="mode" class="modelType" id="CellMLFilter" type="checkbox"></label>
				</form> -->

				<div class="choiceInfo">
					Your selection contains:<ul><li><span id="choiceSelectedVersions"></span> model versions</li><li><span id="choiceSelectedDiffs"></span> deltas</li></ul>
				</div>

			</div>
	  </div>
		<div id="modelFilterList">
			<select id="selectOptions" multiple size="8">

			</select>
		</div>
		<div id="menu">
			<li><img class="pictureMenu" src="image/sunburstMini.png" alt="Sunburst" id="sunburstbutton"><div class="desc">Create Sunburst</div></li>
			<!-- <li><img class="pictureMenu" src="image/donutMini.png" alt="Donut" id="donutbutton"><div class="desc">Donut</div></li>
			<li><img class="pictureMenu" src="image/heatmapMini.png" alt="BivesChange" id="heatmapbutton"><div class="desc">Heatmap</div></li>
			<li><img class="pictureMenu" src="image/boxplotMini.png" alt="Bives-Boxplot" id="boxplot1button"><div class="desc">Change Type Boxplot</div></li>
			<li><img class="pictureMenu" src="image/boxplotMini2.png" alt="Bives-Boxplot" id="boxplot2button"><div class="desc">Change Target Boxplot</div></li> -->
		</div>
	</div>

	<div id="contentDiv"><p></p>
		<div id="midScroll">

			<div id="charts">

				<div id="landingpage">
					<div id="startInfo">
						<h3>General Statistics</h3>
						<table id="generalStatsTable"><col><col>
							<tbody>
								<tr id="generalStatsTableDummy"><td>loading...</td><td>please be patient</td></tr>
							</tbody>
						</table>

						<h3>Project info</h3>
						<p id="projectInfo"> </p>
					</div>
					<div id="bottom">
						<h3>Acknowledgments</h3>
						<p id="acknowledgments"> </p>
						<div id="linkLogos">
							<!-- <a href="https://www.ebi.ac.uk/biomodels-main/" class="floatlogo" id="bioModels"></a>
							<a href="http://models.cellml.org/cellml" class="floatlogo" id="cellML"></a> -->
							<!-- <a href="https://sems.uni-rostock.de/projects/bives/" class="floatlogo"id="bives"></a> -->
						</div>
					</div>
				</div>


				<!-- <div id="donutpage">
					<div class="tooltip" id="donutTip"></div>
					<div class="menuInfoButton" id="donutButton"><button id="smallInfoDonut" class="smallInfo">i</button>
						<div class="infoBox" id="donutBox"></div>
					</div>
				</div>

				<div id="heatmappage">
					<div class="menuInfoButton" id="heatButton"><button id="smallInfoHeat" class="smallInfo">i</button>
						<div class="infoBox" id="heatBox"></div>
					</div>
					<div id="scaleHeatmap">
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
				</div> -->
				<div id="sunburstPage">
					<div class="tooltip" id="sunburstTip"></div>
					<div class="menuInfoButton" id="sunburstButton"><button id="smallInfoSunburst" class="smallInfo">i</button>
						<div class="infoBox" id="sunburstBox"></div>
					</div>
				</div>


			</div>




			<div id="bivesInfo">
				<div id="bivesGeneralInfo">
					<h3>Comparison of Models</h3>
					<table id="versionComparison" border="1">
						<colgroup>
							<col>
							<col>
						</colgroup>
						<tr>
							<td align="center">Model</td><td colspan="2" id="bivesModelName"></td>
						</tr>
						<tr>
							<td>Version</td><td><a id="bivesOriginalModel"></a></td><td><a id="bivesModifiedModel"></a></td>
						</tr>
						<tr>
							<td>Date</td><td id="bivesOriginalModelSupp"></td><td id="bivesModifiedModelSupp"></td>
						</tr>
						<tr>
							<td>Curated</td><td id="bivesOriginalModelCuration"></td><td id="bivesModifiedModelCuration"></td>
						</tr>
						<tr>
							<td>Type</td><td colspan="2" id="bivesRepository"></td>
						</tr>
						<tr rowspan="2">
							<td>
								<span># of Changes</span></br>
								<span style="color:red">Deletes</span>
								<span style="color:green">Inserts</span>
								<span style="color:blue">Moves</span>
								<span style="color:orange">Updates</span>
							</td>
							<td colspan="2" >
								<span id="bivesChangesSum"></span></br>
								<span style="color:red" id="bivesDeletes"></span>
								<span style="color:green" id="bivesInserts"></span>
								<span style="color:blue" id="bivesMoves"></span>
								<span style="color:orange" id="bivesUpdates"></span>
							</td>
						</tr>
					</table>

					<div id="bivesComparedModels">
						<a id="bivesModelName"></a> <span id="bivesModelNameSupp"></span><br />
						<a id=""></a><a id=""></a><br />
						<a id="bivesOriginalModelSupp"></a> <a id="bivesModifiedModelSupp"></a><br />
						<a id="bivesRepository"></a><span id="bivesRepositorySupp"></span>
						<a id="bivesOriginalModelCuration"></a><span id="bivesOriginalModelCurationSupp"></span><a id="bivesModifiedModelCuration"></a><span id="bivesModifiedModelCurationSupp"></span>
					</div>
					<button class="bivesButton" id="callBivesButton">Differences</button>
					<button class="bivesButton" id="mergeVersions">Merge this!</button>
				</div>
				<div class="bivesNavi">
					<a class="naviTab active" id="reportTab"> Report </a>
					<a class="naviTab" id="graphTab"> Graph </a>
					<a class="naviTab" id="xmlTab"> XML-Diff </a>
					<a class="naviTab" id="annotations"> Annotations </a>
				</div>
				<div id="loading">
					<img src="image/loading142.gif" title="loading..." alt="loading..."><img>
				</div>
				<div id="bivesResult">
					<div class="bivesContent" id="bivesReport">
					</div>
					<div class="bivesContent" id="bivesGraph">
						<form>
							Toggle process node ports
							<input type="checkbox" id="portToggle">
						</form>
						<button id="download">download</button>
					</div>
					<div class="bivesContent" id="bivesXmlDiff">
						<pre id="highlightXmlDiff">
						</pre>
					</div>
					<pre class="bivesContent" id="bivesAnnotations">
					</pre>
				</div>
			</div>
		</div>
	</div>
	<script type="text/javascript">
			$(document).ready(
				function () {
					init ();
				});
	</script>
</body>
</html>
