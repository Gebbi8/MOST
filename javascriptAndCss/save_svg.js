function downloadHeatmap(){
	$("#download").click(function(){

		var s = new XMLSerializer().serializeToString(document.getElementById("heatmapSvg"))
		
		var encodedData = window.btoa(s);

		console.log(encodedData);
		var test = new Image();
		test.src = 'data:image/svg+xml;base64,' + encodedData;
		test.download = "heatmap.svg";
	})
}