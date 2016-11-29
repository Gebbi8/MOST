var originalFilestats = {};
var originalDiffstats = {};
var models = {};
var repoEvolution = {
	ALL: {maxFiles: 0, maxNodes: 0, values: []},
	CellML: {maxFiles: 0, maxNodes: 0, values: []},
	SBML: {maxFiles: 0, maxNodes: 0, values: []},
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
    d3.tsv("statsTables/filestats", function(dd) {
        // get the file's table and immediately parse the date
        for (var i = 0; i < dd.length; i++)
        {
            dd[i]["date"] = new Date (dd[i]["date"]);
            originalFilestats[ dd[i]["model"] + dd[i]["versionid"]  ] = dd[i];

            if (!models[dd[i]["model"]])
                models[dd[i]["model"]] = {
                    "earliest": dd[i]["date"],
                    "versions": []
                };

            if (models[dd[i]["model"]].earliest > dd[i]["date"])
                models[dd[i]["model"]].earliest = dd[i]["date"];
            models[dd[i]["model"]].versions.push (dd[i]["versionid"]);
        }
        
        d3.tsv("statsTables/repo-evolution", function(data) {
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
					
					d3.tsv("statsTables/diffstats", function(d) {
							// get the diffs table and parse numbers
							for (var i=0; i < d.length; i++){
									d[i]["bivesinsert"] = +d[i]["bivesinsert"];
									d[i]["bivesmove"] = +d[i]["bivesmove"];
									d[i]["bivesdelete"] = +d[i]["bivesdelete"];
									d[i]["bivesupdate"] = +d[i]["bivesupdate"];
									d[i]["bives"] = +d[i]["bives"];
							}
							originalDiffstats=d;

							// per default time filters are active
							activateFilesFilter (filterTimeFiles);
							activateDiffsFilter (filterTimeDiffs);

							applyFilters ();

							// fill general info table
							fillGeneralStatsTable ();

							// if that's done we can initialise the choise chart
							initialiseChoiceChart ();
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



    // select the landing page as start
    selectChart("landingpage");

    // register click-listeners to the tab-buttons
    $("#donutbutton").click (function (){donut (diffstats);});
    $("#heatmapbutton").click (function (){heatmap(diffstats);});
    $("#boxplot1button").click (function (){boxplot(window.extent[0], window.extent[1]);});
    $("#boxplot2button").click (function (){boxplot2(window.extent[0], window.extent[1]);});
    $("#logolink").click (function (){selectChart("landingpage");});

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

}