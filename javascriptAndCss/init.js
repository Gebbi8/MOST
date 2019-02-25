var originalFilestats = {};
var originalDiffstats = {};
var models = {};
var repoEvolution = {
	ALL: {maxFiles: 0, maxNodes: 0, values: []},
	PMR2: {maxFiles: 0, maxNodes: 0, values: []},
	BIOMODELS: {maxFiles: 0, maxNodes: 0, values: []},
};

var filestats = {};
var diffstats = {};

var extent =[new Date("2010-01-01"), new Date("2011-01-01")];

var charts = [
    "landingpage",
    "donutpage",
    "heatmappage",
    "box1page",
    "box2page",
    "bivesInfo"
];

var timewidth = 250, timeheight = 200;

function addGeneralStatsTableRow (table, key, val)
{
    table.append('<tr><td>' + key + '</td><td>' + val + '</td></tr>');
}

function fillGeneralStatsTable ()
{
    var table = $('#generalStatsTable > tbody:last')

    addGeneralStatsTableRow (table, "#Models", Object.keys(models).length);
    addGeneralStatsTableRow (table, "#Versions", Object.keys(originalFilestats).length);
    addGeneralStatsTableRow (table, "#Deltas", originalDiffstats.length);

    // number of versions in biomodels for the first 5 years
    var changesInFirstFive = {};
    var numChanges = 0;

    var oneYearPlusMinus = 1000*60*60*24*365.25;
    originalDiffstats.forEach(function(r) {
        var datum = originalFilestats[ r["model"] + r["version2id"]  ].date;
        if ((datum - models[r["model"]].earliest) / oneYearPlusMinus < 5 && r.bives > 0)
        {
            if (!changesInFirstFive[r["model"]])
                changesInFirstFive[r["model"]] = [];
            changesInFirstFive[r["model"]].push (models[r["model"]].earliest + " -- " + datum);
            numChanges++;
        }
    });
    addGeneralStatsTableRow (table, "#changes within first five years of publishing", Math.round(100 * numChanges / Object.keys (changesInFirstFive).length) / 100);

    // remove dummy row...
    $('#generalStatsTableDummy').remove ();
}


function init ()
{
    // load the tables
    d3.tsv("statsTables_custmost/filestats").then(function(dd) {
        // get the file's table and immediately parse the date
        for (var i = 0; i < dd.length; i++)
        {
            dd[i]["date"] = new Date (dd[i]["date"]);
			if(originalFilestats[ dd[i]["model"] + dd[i]["versionid"]  ] != undefined) console.log(dd[i]["model"] + dd[i]["versionid"], dd[i]["model"], dd[i]["versionid"]);
            originalFilestats[ dd[i]["model"] + dd[i]["versionid"]  ] = dd[i];
			if (dd[i]["versionid"] == undefined || dd[i]["versionid"] == "") alert("ätsch");

            if (!models[dd[i]["model"]])
                models[dd[i]["model"]] = {
                    "earliest": dd[i]["date"],
                    "versions": []
                };

            if (models[dd[i]["model"]].earliest > dd[i]["date"])
                models[dd[i]["model"]].earliest = dd[i]["date"];

			var push = 1;
			for(var j = 0; j < models[dd[i]["model"]].versions.length; j++){
				if(models[dd[i]["model"]].versions[j] == dd[i]["versionid"]) push = 0;
			}
            if(push == 1) models[dd[i]["model"]].versions.push (dd[i]["versionid"]);
        }

		var countModelVersions =0;
		for(var i=0; i<Object.keys(models).length;i++){
			countModelVersions = countModelVersions + models[Object.keys(models)[i]].versions.length;
		}



        d3.tsv("statsTables_custmost/repo-evolution").then(function(data) {
					function scaleRow (data)
					{
						var n = +data["nFiles"];
						data["nFiles"] = n;
						data["nodes"] /= n;
						data["components"] /= n;
						data["variables"] /= n;
						data["units"] /= n;
						data["species"] /= n;
						data["reactions"] /= n;
						data["compartments"] /= n;
						data["functions"] /= n;
						data["parameters"] /= n;
						data["rules"] /= n;
						data["events"] /= n;
						return data;
					};

					var lastModel = null;

					for (var i=0; i < data.length; i++)
					{
						data[i] = scaleRow (data[i]);
						repoEvolution[data[i]["type"]].values.push (data[i]);

						if (+data[i]["nFiles"] > repoEvolution[data[i]["type"]].maxFiles)
						{
							repoEvolution[data[i]["type"]].maxFiles = data[i]["nFiles"];
						}
						if (+data[i]["nodes"] > repoEvolution[data[i]["type"]].maxNodes)
						{
							repoEvolution[data[i]["type"]].maxNodes = data[i]["nodes"];
						}
					}




					d3.tsv("statsTables_custmost/diffstats").then(function(d) {
							// get the diffs table and parse numbers
							console.log(d.length);
							for (var i=0; i < d.length; i++){
									d[i]["bivesinsert"] = +d[i]["bivesinsert"];
									d[i]["bivesmove"] = +d[i]["bivesmove"];
									d[i]["bivesdelete"] = +d[i]["bivesdelete"];
									d[i]["bivesupdate"] = +d[i]["bivesupdate"];
									d[i]["bives"] = +d[i]["bives"];

									//sunburst data & model selection list
									var lastModel;
									var modelSelection = d3.select("#selectOptions"); //select list
									if(lastModel != d[i]["model"]){
										modelSelection.append('option').text(d[i]["model"]); //add models to selection list
										lastModel = d[i]["model"];
									}

							}

							originalDiffstats=d;

							// per default time filters are active
							//activateFilesFilter (filterTimeFiles);
							//activateDiffsFilter (filterTimeDiffs);

							applyFilters ();

							// fill general info table
							fillGeneralStatsTable ();

							// if that's done we can initialise the choise chart
				//			initialiseChoiceChart ();
					});
				});
			});




    $("#SBMLFilter").click (function ()
            {
                if (this.checked)
                {
                    deactivateFilesFilter (filterRemoveSbmlFiles);
                    deactivateDiffsFilter (filterRemoveSbmlDiffs);
                }
                else
                {
                    activateFilesFilter (filterRemoveSbmlFiles);
                    activateDiffsFilter (filterRemoveSbmlDiffs);
                }
                applyFilters ();
				checkBoxes();
            });


    $("#CellMLFilter").click (function ()
            {
                if (this.checked)
                {
                    deactivateFilesFilter (filterRemoveCellmlFiles);
                    deactivateDiffsFilter (filterRemoveCellmlDiffs);
                }
                else
                {
                    activateFilesFilter (filterRemoveCellmlFiles);
                    activateDiffsFilter (filterRemoveCellmlDiffs);
                }
                applyFilters ();
				checkBoxes();
            });

	//load comodi svg
	d3.svg("image/comodi-figure.svg").then(function(error, xml) {
	  if (error) throw error;
	  document.getElementById("bivesAnnotations").appendChild(xml.documentElement);
	});

    // select the landing page as start
    selectChart("landingpage");

    // register click-listeners to the tab-buttons
    $("#donutbutton").click (function (){donut(diffstats);});
    $("#heatmapbutton").click (function (){heatmap(diffstats);});
    $("#boxplot1button").click (function (){boxplot(diffstats);});
    $("#boxplot2button").click (function (){boxplot2(diffstats);});
    $("#logolink").click (function (){selectChart("landingpage");});
		$("#sunburstbutton").click (function (){createSunburst(diffstats);});

    // register click-listeners to the bives-tabs
    $("#reportTab").click(function (){showBivesContent("#bivesReport", "#reportTab")});
    $("#graphTab").click(function (){showBivesContent("#bivesGraph", "#graphTab")});
    $("#xmlTab").click(function (){showBivesContent("#bivesXmlDiff", "#xmlTab")});
    $("#annotations").click(function (){showBivesContent("#bivesAnnotations", "#annotations")});

	// register click-listener to feedback
	$("#feedback").click(function (){giveFeedback();});


    // load info material and fill the i-buttons
    $.getJSON("javascriptAndCss/info.json", function(json){

        attachInfo ("#smallInfoTimespan", '#timeSpanBox', json.timespan, -20, 80);
        attachInfo ("#smallInfoDataset", '#datasetBox', json.dataset, -20, 80);
        attachInfo ("#smallInfoDonut", '#donutBox', json.donutVis + json.donutUsage, 150, -80);
        attachInfo ("#smallInfoHeat", '#heatBox', json.heatmapVis + json.heatmapUsage, 150, -80);
        attachInfo ("#smallInfoBox1", '#box1Box', json.boxplot1Vis + json.boxplot1Usage, 150, -80);
        attachInfo ("#smallInfoBox2", '#box2Box', json.boxplot2Vis + json.boxplot2Usage, 150, -80);

        //load startpage info from json
        $("#projectInfo").append(json.projectInfo.motivation).append(json.projectInfo.question);
        $("#acknowledgments").append(json.acknowledgments.design).append(json.acknowledgments.funding);
    });

		//register action listerners
		$("#selectOptions").change(function (e) {updateSelectionFilter(e)});

	//hide annotations tab
	$("#bivesAnnotations").hide();
}

function getShortName(name){
	var re = /.*_(.*)_.*/;
	var newstr = name.replace(re, "$1");
	return newstr;
}
