# MOST - Model Statistics

MOST ist an interactive website to visualize, filter and explore the evolution of biological models.
Based on the BioModels Database and the Physiome Model Repository 2 (PMR2) we computed stastistics about all models and visualize them in different views. The underlying data set can be filtered by the user in different ways.

[Check it out!](most.sems.uni-rostock.de)

## Data
All model versions from BioModels and PMR2 are retrived and sorted by the [ModelCrawler](https://github.com/SemsProject/ModelCrawler).
Aftwards [BiVeS](https://sems.uni-rostock.de/projects/bives/) computes the difference between consecutive versions of a model.
The retrieved data is stored in three tables:
- [repo-evolution](/statsTables/repo-evolution): Contains data about the evolution of the repositories. For example, it lists the number of models and the average number of reactions per model for specific point of time
- [filestats](/statsTables/filestats): Contains data about every file in the repositories. Examplary, it stores the number of species in the model and the format of the file
- [diffstats](/statsTables/diffstats): Contains data about the changes between two consecutive model version, specifically the number and type of differences reported by BiVeS

## Filter the data
Several function to filter the data are available. While most of them can be use via the interface and the URL, some can only be used via the URL at the moment.

#### Time filter
The user can choose a relevant date range for the statistics he wants to explore. The chosen dates can be changed by interacting with the visualization of changes or by alternate the according fields.

#### Type filter
The user can choose if he wants only SBML, CellML or both model types by clicking the labeled check boxes.

#### ID filter
The model ID filter is currently only available via URL see [Filter via URL](#filter-via-url) for detailed information.

#### Filter via URL 

url + /# + {variable:value},{variable:value},...

Filter        |  Variables |   Values                        | Explanation
:---:         |  :---:     |   :---:                         | :---:
Type          |  t         |   a, n, s, c                    | a: all types, n: no types, s: only SBML, c: only CellML
Date          |  d1        |   date in the format YYYY-MM-DD | first date of the date range
Date          |  d2        |   date in the format YYYY-MM-DD | second date of the date range
Visaulization | v          |   d, h, b1, b2                  | d: donut, h: heatmap, b1: first boxplot, b2: second boxplot
Model         | m          |   id1&id2&...                   | IDs of models that will be shown

Example: http://most.sems.uni-rostock.de/#t:s,d1:2004-12-31,d2:2017-12-31,m:BIOMD0000000426.xml&BIOMD0000000312.xml



## Visualizations
All visualizations are based on the retrived [data](#data) and created with the [D3.js](https://d3js.org/) library.

#### Filter graphic
Two visualizations are provided to filter for a time range of interest. One shows how many new model versions where released on a specificm date and the other one shows how the repositories evolved over time.

Based on the filtered tables differnet visualizations can be choosen.

#### Donut
The donut shows how many differences BiVeS detected in a version transition proportional to the sum of differences in all filtered deltas.

#### Heatmap
The Heatmap shows how many changes BiVeS detected for each filtered delta on a logarithmic scale. Furthermore it shows which kind of change occured of often in normal scale. 

#### Boxplots
Two boxplots are provided. One focuses on the kind of changes while the other one shows whate where the targets of the changes.



## Explore a delta

#### BiVeS report

#### DiVil

#### Comodi

#### XML Diff

## Share the view

While interacting with most the actions are tracked in the URL.
The URL can be copied to share or save the current view.

## Connect to MOST

