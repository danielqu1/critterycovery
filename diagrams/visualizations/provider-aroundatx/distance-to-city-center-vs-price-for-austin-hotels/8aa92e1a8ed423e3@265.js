// https://observablehq.com/@sahithi-golkonda/distance-to-city-center-vs-price-for-austin-hotels@265
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["aroundatx-hotels.json",new URL("./files/1b8c4e0478f2c35561524e02ff1e34c36a19a80c2f3a4ba2b6d2a11c387ecbd4293908df0141d9ab54e85c6d9ca25f28a0f5e988a5a9437a613fbda8e6400232",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md","data"], function(md,data){return(
md`# Distance to City Center vs Price for Austin Hotels

This chart shows the relationship between the distance to the center of Austin (*y*-axis) and the price (*x*-axis) in ${data.length} hotels in the Austin area. Data: [Around ATX](https://aroundatx.live/api/incidents)

Brushing this scatterplot will show the selected data points.`
)});
  main.variable(observer("viewof selection")).define("viewof selection", ["d3","width","height","xAxis","yAxis","data","x","y"], function(d3,width,height,xAxis,yAxis,data,x,y)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .property("value", []);

  const brush = d3.brush()
      .on("start brush end", brushed);

  svg.append("g")
      .call(xAxis);

  svg.append("g")
      .call(yAxis);

  const dot = svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "#cc7927")
      .attr("stroke-width", 1.5)
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("transform", d => `translate(${x(d.x)},${y(d.y)})`)
      .attr("r", 3);

  svg.call(brush);

  function brushed({selection}) {
    let value = [];
    if (selection) {
      const [[x0, y0], [x1, y1]] = selection;
      value = dot
        .style("stroke", "gray")
        .filter(d => x0 <= x(d.x) && x(d.x) < x1 && y0 <= y(d.y) && y(d.y) < y1)
        .style("stroke", "#cc7927")
        .data();
    } else {
      dot.style("stroke", "#cc7927");
    }
    svg.property("value", value).dispatch("input");
  }

  return svg.node();
}
);
  main.variable(observer("selection")).define("selection", ["Generators", "viewof selection"], (G, _) => G.input(_));
  main.variable(observer()).define(["selection"], function(selection){return(
selection
)});
  main.variable(observer("height")).define("height", function(){return(
600
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 30, bottom: 30, left: 40}
)});
  main.variable(observer("x")).define("x", ["d3","data","margin","width"], function(d3,data,margin,width){return(
d3.scaleLinear()
    .domain(d3.extent(data, d => d.x)).nice()
    .range([margin.left, width - margin.right])
)});
  main.variable(observer("y")).define("y", ["d3","data","height","margin"], function(d3,data,height,margin){return(
d3.scaleLinear()
   .domain(d3.extent(data, d => d.y)).nice()
   .range([height - margin.bottom, margin.top])
)});
  main.variable(observer("xAxis")).define("xAxis", ["height","margin","d3","x","width","data"], function(height,margin,d3,x,width,data){return(
g => g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .call(g => g.select(".domain").remove())
    .call(g => g.append("text")
        .attr("x", width - margin.right)
        .attr("y", -4)
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(data.x))
)});
  main.variable(observer("yAxis")).define("yAxis", ["margin","d3","y","data"], function(margin,d3,y,data){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 4)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y))
)});
  main.variable(observer("all_data")).define("all_data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("aroundatx-hotels.json").json()
)});
  main.variable(observer("temp_data")).define("temp_data", ["all_data"], function(all_data){return(
all_data.map(function(d) { return {name: d.name, x: d.distance_to_city_center, y: d.price}; })
)});
  main.variable(observer("data")).define("data", ["temp_data"], function(temp_data){return(
Object.assign(temp_data, {x: "Distance to City Center", y: "Price"})
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
