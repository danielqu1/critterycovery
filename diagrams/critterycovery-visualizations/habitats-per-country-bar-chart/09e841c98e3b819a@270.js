// https://observablehq.com/@sahithi-golkonda/habitats-per-country-bar-chart@270
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["habitats.json",new URL("./files/e897851db7e2cbaf5e296cd7621ff45c3e13500caf5e9135131f48571e22425edcf65f0659fb5165a964a628987c0de2df345896bc74d159bca76adff4cefde7",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Habitats Per Country Bar Chart

This chart shows the number of habitats per country there are in the critterycovery database. Data: [critterycovery](http://critterycovery.me/api/habitats)`
)});
  main.variable(observer("chart")).define("chart", ["d3","width","height","data","x","y","format","xAxis","yAxis"], function(d3,width,height,data,x,y,format,xAxis,yAxis)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);
  
  svg.append("g")
      .attr("fill", "steelblue")
    .selectAll("rect")
    .data(data)
    .join("rect")
      .attr("x", x(0))
      .attr("y", (d, i) => y(i))
      .attr("width", d => x(d.value) - x(0))
      .attr("height", y.bandwidth());
  
  svg.append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
    .selectAll("text")
    .data(data)
    .join("text")
      .attr("x", d => x(d.value))
      .attr("y", (d, i) => y(i) + y.bandwidth() / 2)
      .attr("dy", "0.35em")
      .attr("dx", -4)
      .text(d => format(d.value))
    .call(text => text.filter(d => x(d.value) - x(0) < 20) // short bars
      .attr("dx", +4)
      .attr("fill", "black")
      .attr("text-anchor", "start"));

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  return svg.node();
}
);
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
    array.push({
      name: key,
      value: obj[key]
    });
  }
  var sorted = array.sort((a, b) => ((a.name < b.name) ? -1 : ((b.name < a.name) ? 1 : 0)));
  return(sorted)
}
)});
  main.variable(observer("all_data")).define("all_data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("habitats.json").json()
)});
  main.variable(observer("temp_data")).define("temp_data", ["all_data"], function(all_data){return(
all_data.map(function(d) { return d.countries; })
)});
  main.variable(observer("data")).define("data", ["frequency","temp_data"], function(frequency,temp_data){return(
frequency(temp_data)
)});
  main.variable(observer("format")).define("format", ["x","data"], function(x,data){return(
x.tickFormat(20, data.format)
)});
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], function(d3,data,margin,width){return(
d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value)])
    .range([margin.left, width - margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","data","margin","height"], function(d3,data,margin,height){return(
d3.scaleBand()
    .domain(d3.range(data.length))
    .rangeRound([margin.top, height - margin.bottom])
    .padding(0.1)
)});
  main.variable(observer("xAxis")).define("xAxis", ["margin","d3","x","width","data"], function(margin,d3,x,width,data){return(
g => g
    .attr("transform", `translate(0,${margin.top})`)
    .call(d3.axisTop(x).ticks(width / 80, data.format))
    .call(g => g.select(".domain").remove())
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","data"], function(margin,d3,y,data){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y).tickFormat(i => data[i].name).tickSizeOuter(0))
)});
  main.variable(observer("barHeight")).define("barHeight", function(){return(
25
)});
  main.variable(observer("height")).define("height", ["data","barHeight","margin"], function(data,barHeight,margin){return(
Math.ceil((data.length + 0.1) * barHeight) + margin.top + margin.bottom
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 30, right: 0, bottom: 10, left: 30}
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
