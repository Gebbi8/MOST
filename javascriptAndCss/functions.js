

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
function attachInfo (smallInfo, infoBox, infoMsg, top, left)
{
	$(infoBox).append(infoMsg);
 	$(infoBox).hide();
	$(smallInfo).click (function(event){
		$(infoBox).popup({
			tooltipanchor: event.target,
			autoopen: true,
			type: 'tooltip',
			opacity: 0.3,
			transition: 'all 0.3s',
			offsettop: top,
			offsetleft: left
		});
	});
}

//handle bivesTabs
function showBivesContent(show, tab){
	$(".naviTab").attr("class", "naviTab");
	$(tab).attr("class", "naviTab active");
	
	$('.bivesContent').hide();
	$(show).show();
}



// parse the date for D3
var parseDate = d3.time.format("%Y-%m-%d").parse;
var formatDate = d3.time.format("%Y-%m-%d");


