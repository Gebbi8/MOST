

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



// parse the date for D3
var parseDate = d3.time.format("%Y-%m-%d").parse;



