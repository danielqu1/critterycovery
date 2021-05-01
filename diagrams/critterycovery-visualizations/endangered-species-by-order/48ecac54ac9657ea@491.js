// https://observablehq.com/@sahithi-golkonda/endangered-species-by-order@491
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["population-by-age.csv",new URL("./files/bee673b386dd058ab8d2cf353acbedc6aa01ebd1e6f63e2a9ab1b4273c7e6efd1eeea526345e4be7f0012d5db3ec743ef39ad9e6a043c196670bf9658cb02e79",import.meta.url)],["species.json",new URL("./files/f10653dfea62a726ae20969d0f1967c76876626230ac4df9b891ba55dde8d2d5b675bf73b4c5127997c87a9599492cc9246130fbeb597088a82339352f512721",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Endangered Species by Order

This chart shows the breakdown of endangered species in the critterycovery database by species order. Data: [critterycovery](http://critterycovery.me/api/species)`
)});
  main.variable(observer("chart")).define("chart", ["pie","data","d3","width","height","color","arc","arcLabel"], function(pie,data,d3,width,height,color,arc,arcLabel)
{
  const arcs = pie(data);

  const svg = d3.create("svg")
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

  svg.append("g")
      .attr("stroke", "white")
    .selectAll("path")
    .data(arcs)
    .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc)
    .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(arcs)
    .join("text")
      .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
      // filtering solves issue of "other" labelling overlapping on graph
      .call(text => text.filter(d => (d.data.name) != "OTHER").append("tspan")
          .attr("y", "-0.4em")
          .attr("font-weight", "bold")
          .text(d => d.data.name))
      .call(text => text.filter(d => (d.data.name) == "OTHER").append("tspan")
          .attr("y", "-0.9em")
          .attr("font-weight", "bold")
          .text(d => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append("tspan")
          .attr("x", 0)
          .attr("y", "0.7em")
          .attr("fill-opacity", 0.7)
          .text(d => d.data.value.toLocaleString()));

  return svg.node();
}
);
  main.variable(observer("data1")).define("data1", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("population-by-age.csv").text(), d3.autoType)
)});
  main.variable(observer("frequency")).define("frequency", function(){return(
function frequency(input){ 
  //find frequency of each 
  var obj={};
  for (let i=0; i<input.length; i++){
    var el = input[i];
    if(!obj[el]){
      obj[el] = 1;
    } else {
      obj[el]++;
    }
  }
  var array = [];
  var otherCount = 0;
  for (var key in obj) {
    if (obj[key] > 3) {
      array.push({
        name: key,
        value: obj[key]
      });
    } else {
      otherCount += obj[key]
    }
  }
  array.push({
        name: "OTHER",
        value: otherCount
      });
  // var sorted = array.sort((a, b) => ((a.name < b.name) ? -1 : ((b.name < a.name) ? 1 : 0)));
  return(array)
}
)});
  main.variable(observer("all_data")).define("all_data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("species.json").json()
)});
  main.variable(observer("temp_data")).define("temp_data", ["all_data"], function(all_data){return(
all_data.map(function(d) { return d._class; })
)});
  main.variable(observer("data")).define("data", ["frequency","temp_data"], function(frequency,temp_data){return(
frequency(temp_data)
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
d3.scaleOrdinal()
    .domain(data.map(d => d.name))
    .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse())
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
Math.min(width, 500)
)});
  main.variable(observer("arc")).define("arc", ["d3","width","height"], function(d3,width,height){return(
d3.arc()
    .innerRadius(0)
    .outerRadius(Math.min(width, height) / 2 - 1)
)});
  main.variable(observer("arcLabel")).define("arcLabel", ["width","height","d3"], function(width,height,d3)
{
  const radius = Math.min(width, height) / 2 * 0.8;
  return d3.arc().innerRadius(radius).outerRadius(radius);
}
);
  main.variable(observer("pie")).define("pie", ["d3"], function(d3){return(
d3.pie()
    .sort(null)
    .value(d => d.value)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
