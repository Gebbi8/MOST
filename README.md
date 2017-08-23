# MOST - Model Statistics

MOST is an interactive website to visualize, filter and explore the evolution of biological models.
Based on the BioModels Database and the Physiome Model Repository 2 (PMR2) we computed statistics about all models and visualize them in different views. The underlying data set can be filtered by the user in different ways.

[Check it out!](most.sems.uni-rostock.de)

## Data
All model versions from BioModels and PMR2 are retrived and sorted by the [ModelCrawler](https://github.com/SemsProject/ModelCrawler).
Aftwards [BiVeS](https://sems.uni-rostock.de/projects/bives/) computes the difference between consecutive versions of a model.
The retrieved data is stored in three tables:
- [repo-evolution](/statsTables/repo-evolution): Contains data about the evolution of the repositories. For example, it lists the number of models and the average number of reactions per model for a specific point of time
- [filestats](/statsTables/filestats): Contains data about every file in the repositories. Examplary, it stores the number of species in the model and the format of the file
- [diffstats](/statsTables/diffstats): Contains data about the changes between two consecutive model version, specifically the number and type of differences reported by BiVeS

## Filter the data
Several functions to filter the data are available. While most of them can be used via the interface and the URL, some can only be used via the URL at the moment.

#### Filter by time
The user can choose a relevant date range for the statistics he wants to explore. The chosen dates can be changed by interacting with the visualization of changes or by alternating the according fields.

#### Filter by file format
The user can choose to filter the data by the type of the file: SBML, CellML or both model types by clicking the labeled check boxes.

#### Filter by ID
The model ID filter is currently only available via URL see [Filter via URL](#filter-via-url) for detailed information.

#### Filter via URL 
The filter functions can also be called by modifying the URL

most.sems.uni-rostock.de + /# + {variable:value},{variable:value},...

Filter        |  Variables |   Values                        | Explanation
:---:         |  :---:     |   :---:                         | :---:
Type          |  t         |   a, n, s, c                    | a: all types, n: no types, s: only SBML, c: only CellML
Date          |  d1        |   date in the format YYYY-MM-DD | first date of the date range
Date          |  d2        |   date in the format YYYY-MM-DD | second date of the date range
Model         | m          |   id1&id2&...                   | IDs of models that will be shown

There are more variables that do not have a filter function but they navigate through the page.

Navigation          |  Variables |   Values                        | Explanation
:---:               |  :---:     |   :---:                         | :---:
Delta selection     | d          |   d+n, hi+n, hu+n, hd+n, hm+n   | d+n: n'th element from donut, hi/hu/hd/hm + n, n'th element from heatmap
BiVeS tab selection | v          |   d, h, b1, b2                  | d: donut, h: heatmap, b1: first boxplot, b2: second boxplot

Example: http://most.sems.uni-rostock.de/#t:s,d1:2004-12-31,d2:2017-12-31,m:BIOMD0000000426.xml&BIOMD0000000312.xml



## Visualizations
All visualizations are based on the retrived [data](#data) and created with the [D3.js](https://d3js.org/) library.

#### Filter graphic
Two visualizations are provided to filter for a time range of interest. One shows how many new model versions where released on a specific date and the other one shows how the repositories evolved over time.

Based on the filtered tables different visualizations can be choosen.

#### Donut
The donut shows how many differences BiVeS detected in a version transition proportional to the sum of differences in all filtered deltas. Single elements can be selected by clicking to [explore the delta](#explore-a-delta).

#### Heatmap
The heatmap shows how many changes BiVeS detected for each filtered delta on a logarithmic scale. Furthermore it shows which kind of change occured of often in normal scale. Single elements can be selected by clicking to [explore the delta](#explore-a-delta).

#### Boxplots
Two boxplots are provided. One focuses on the kind of changes while the other one shows the targets of the changes.


## Explore a delta
After selecting a specific delta from the [Donut](#donut) or the [Heatmap](#heatmap) more information about the version transition is retrieved and presented in a table. One can see the model name, links to the versions, the curation status, release dates, model type, the sum of changes and how often the four kinds of changes where detected.

Furthermore the BiVeS service can be called to get more information about the delta.

## BiVeS
Four outputs of the BiVeS service are presented in MOST. Each of them can be shown by clicking its tab. Some version transition may not have a representational delta. In this case the user may see less than four tabs. 

#### BiVeS report
The report shows all detected changes in a human readable way. One can see which kind of change occured where in the model.

#### DiVil visualization
[DiViL](https://github.com/Gebbi8/DiVil) visualizes the underlying network and highlights the differences between the version in SBGN PD format. The map is interactive and an SBGN-ML file with differences stored with a color-coded annotations can be downloaded.

#### Comodi ontology
Based on the Comodi ontology the graphic characterizes the differences between the model versions. The intensity of the colors shows how often a target, change type or XMLEntity were part of the differences.

#### XML Diff
Also the complete differences are available in XML format. The syntax is highlighted with the help of [highlight.js](https://highlightjs.org/).

## Share the view

While interacting with most the actions are tracked in the URL.
By copying it, the current view can be shared or saved to share or save the current view.

## Connect to MOST
If you want to connect your models to MOST you can use the [URL](#filter-via-url). With this you can provide a model history by a simple link.
