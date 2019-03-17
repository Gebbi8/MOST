function createSunburst(table){
// TODO remove sunburst and starting page. //

$('.menuInfoButton').fadeOut();
d3.selectAll('#sunburstPage').selectAll('svg').remove();
d3.selectAll('.onoffswitch').remove();
d3.selectAll('#info > *').remove();
d3.selectAll('#sunburstTip > *').remove();
selectChart("sunburstPage");
$('#sunburstButton').fadeIn();
//  d3.selectAll('#donutpage').selectAll('svg').remove();

  var sunburstJSON = '{"name": "BenchmarkModels", "children":[\n';
  /*compute data to:
      {name: , children: [{name, children}, {name, children}]}

      ... last level:
      name: , value,

  */
  console.log(table);


////////////////
  for (var i=0; i < table.length; i++){

    console.log(table[0].model);
      //sunburst data & model selection list
      var lastModel;
      if(lastModel != table[i].model){
        if(lastModel != null) sunburstJSON += '\n]},\n'
        lastModel = table[i].model;
        sunburstJSON += '{"name": "' + table[i].model + '", ';
        sunburstJSON += ' "children":[';
      } else {
        sunburstJSON +=  ',';
      }
      sunburstJSON += '\n\t{"name": "' + getShortName(table[i].version1id) + ' -> ' + getShortName(table[i].version2id) +
                          '", "version1": "' + table[i].version1id + '", "version2": "' + table[i].version2id + '", "value": ' + table[i].bives + '}';

  }
  sunburstJSON += "\n]}]}";

  console.log(sunburstJSON);


  sunburstObj = JSON.parse(sunburstJSON);

  console.log(sunburstObj);
  sunburstChart(sunburstObj);

/////////////
}

function sunburstChart(data){

  var width = 1000;
  var svgSunburst = d3.select("#sunburstPage").append("svg").attr("width", width).attr("height", width).attr("id", "svgBurst");

  radius = width / 6;
  format = d3.format(",d");
  //from: https://beta.observablehq.com/d/c338d91d84186c00


  partition = data => {
    const root = d3.hierarchy(data)
        .sum(d => d.value)
        .sort((a, b) => b.value - a.value);
    return d3.partition()
        .size([2 * Math.PI, root.height + 1])
      (root);
  };



  color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1));

  arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius * 1.5)
    .innerRadius(d => d.y0 * radius)
    .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))


    const root = partition(data);

    root.each(d => d.current = d);

    const svg = d3.select("#svgBurst");
    const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${width / 2})`);

    const path = g.append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
        .attr("d", d => arc(d.current));




console.log(path.filter(d => d.children));
console.log(path);
console.log();
    path.filter(d => d.children)
        .style("cursor", "pointer")
        .on("click", clicked);

    path.filter(d => {return (d.children == null) ? d : null;})
        .style("cursor", "pointer")
        .on("click", clickedOuter);



    path.append("title")
        .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

    const label = g.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
        .attr("dy", "0.35em")
        .attr("fill-opacity", d => +labelVisible(d.current))
        .attr("transform", d => labelTransform(d.current))
        .text(d => d.data.name);

    const parent = g.append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", clicked);

    function clicked(p) {

      parent.datum(p.parent || root);

      root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      });

      const t = g.transition().duration(750);

      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.
      path.transition(t)
          .tween("data", d => {
            const i = d3.interpolate(d.current, d.target);
            return t => d.current = i(t);
          })
        .filter(function(d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
          .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
          .attrTween("d", d => () => arc(d.current));

      label.filter(function(d) {
          return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        }).transition(t)
          .attr("fill-opacity", d => +labelVisible(d.target))
          .attrTween("transform", d => () => labelTransform(d.current));
    }

    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

    function clickedOuter(p){
      clicked(p.parent);

      var version1 = originalFilestats[p.parent.data.name + p.data.version1];
      var version2 = originalFilestats[p.parent.data.name + p.data.version2];
      showDiffInfo(version1, version2);
    }

    return svg.node();

}
