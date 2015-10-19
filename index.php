<!DOCTYPE html>
<html>
<head>
	<title>Stats-website</title>
  <meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="stats.css" />
</head>
<body>

<div id="topDiv">

<p>TopDiv</p>
</div>

<div id="midDiv">
	<div id="choiceDiv">
	  <div id="choiceChart" class="chart">
	    <div class="title">Timespan</div>
				<p>	
					<input type="date" id="date1" value="Jan 01 2010">
					<button class="up" id="date1Up"></button>
					<button class="down" id="date1Down"></button>
				</p>
				<p>
					<input type="date" id="date2" value="Jan 01 2011">
					<button class="up" id="date2Up"></button>
					<button class="down" id="date2Down"></button>
				</p>
			</p>
	  </div>
	</div>

	<div id="contentDiv"><p>MainDiv</p>
		<div id="menu">
			<li onclick="donut(window.extent[0], window.extent[1])"><img class="pictureMenu" src="image/donutMini.png" alt="Donut"><div class="desc">Bives-Unix-Donut</div></li>
			<li onclick="bivesOverview(window.extent[0], window.extent[1])"><img class="pictureMenu" src="image/bivesMini.png" alt="BivesChange"><div class="desc">Bives-Heatmap</div></li>
		</div>
		<div id="charts"><p>Charts</p></div>
		<div id="info"><p>Info</p>
		</div>
	</div>
</div>
<footer>
	<p>Footer</p>
</footer> 
</body>
<script> var extent; </script>
<script src="jquery-2.1.4.min.js"></script>
<script type="text/javascript" src="d3.min.js" charset="utf-8"></script>
<script type="text/javascript" src="date.js"></script>
<script type="text/javascript" src="choiceChart.js"></script>
<script type="text/javascript" src="bivesTool.js"></script>
<script type="text/javascript" src="bivesOverview.js"></script>
<script type="text/javascript" src="donut-bives-unix.js"></script>

</html>
