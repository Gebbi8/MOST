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
	var hash;
	switch(tab){
		case '#reportTab': hash = 'r'; break;
		case '#graphTab': hash = 'g'; break;
		case '#xmlTab': hash = 'x'; break;
		case '#annotations': hash = 'a'; break;
		default: return;
	};
	setHash("b", hash);
}



// parse the date for D3
var parseDate = d3.timeParse("%Y-%m-%d");
var formatDate = d3.timeFormat("%Y-%m-%d");


// show info andd difference button of a visulization element
function showDiffInfo(version1, version2){
	var bivesSum, bivesDeletes, bivesInserts, bivesUpdates, bivesMoves;
	originalDiffstats.forEach(function(r){
		if(r.model == version1.model && r.version1id == version1.versionid && r.version2id == version2.versionid){
			bivesSum = r.bives;
			bivesInserts = r.bivesinsert;
			bivesDeletes = r.bivesdelete;
			bivesMoves = r.bivesmove;
			bivesUpdates = r.bivesupdate;
		}
	});
	$("#bivesInfo").show();
	$('#callBivesButton').show();
	$('.bivesNavi').hide();
	$('#bivesResult').hide();
	$("#bivesModelName").text (version1.modelname);
	$("#bivesOriginalModel").attr ("href", version1.url).text (version1.versionid);
	$("#bivesModifiedModel").attr ("href", version2.url).text (version2.versionid);
	$("#bivesOriginalModelSupp").text (version1.date.getDate() + "." + version1.date.getMonth() + "." + version1.date.getFullYear());
	$("#bivesModifiedModelSupp").text (version2.date.getDate() + "." + version2.date.getMonth() + "." + version2.date.getFullYear());

	$("#bivesOriginalModelCuration").text (version1.curated);
	$("#bivesModifiedModelCuration").text (version2.curated);
	$("#bivesRepository").text (version1.modeltype);
	$("#bivesChangesSum").text (bivesSum);
	$("#bivesInserts").text (bivesInserts);
	$("#bivesUpdates").text (bivesUpdates);
	$("#bivesMoves").text (bivesMoves);
	$("#bivesDeletes").text (bivesDeletes);

	$('#callBivesButton').click(function(){getBivesData(version1, version2, ["reportHtml", "reactionsSbgnJson", "xmlDiff", "separateAnnotations"], "#info");});
}
