// https://observablehq.com/@sahithi-golkonda/regions-subregions-and-countries-by-land-area@263
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["countries.json",new URL("./files/46e6bad065fe078efcbffeac88493a65cf64377450681c6c5433e48b56b43645668d6e34f36dd974c0a6329e805a7fc04aefbf00a188508872d44ec7b82a961d",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Regions, Subregions, and Countries by Land Area

This sunburst chart shows the hierarchy of the regions, subregions, and countries in the critterycovery database. The size of each slice is determined by area (in square kilometers) of the corresponding region/subregion/country. Data: [critterycovery](http://critterycovery.me/api/species)`
)});
  main.variable(observer("chart")).define("chart", ["partition","data","d3","color","arc","format","autoBox"], function(partition,data,d3,color,arc,format,autoBox)
{
  const root = partition(data);

  const svg = d3.create("svg");

  svg.append("g")
      .attr("fill-opacity", 0.6)
    .selectAll("path")
    .data(root.descendants().filter(d => d.depth))
    .join("path")
      .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
      .attr("d", arc)
    .append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

  svg.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
    .selectAll("text")
    .data(root.descendants().filter(d => d.depth && (d.y0 + d.y1) / 2 * (d.x1 - d.x0) > 10))
    .join("text")
      .attr("transform", function(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
      })
      .attr("dy", "0.35em")
      .text(d => d.data.name);

  return svg.attr("viewBox", autoBox).node();
}
);
  main.variable(observer("autoBox")).define("autoBox", function(){return(
function autoBox() {
  document.body.appendChild(this);
  const {x, y, width, height} = this.getBBox();
  document.body.removeChild(this);
  return [x, y, width, height];
}
)});
  main.variable(observer("replaceBlanks")).define("replaceBlanks", function(){return(
function replaceBlanks(input) {
  for (let i=0; i<input.length; i++) {
    var el = input[i];
    if (el["region"] == "") {
      el["region"] = "N/A";
    }
    if (el["subregion"] == "") {
      el["subregion"] = "N/A";
    }
  }
  return input;
}
)});
  main.variable(observer("makeHierarchies")).define("makeHierarchies", ["replaceBlanks"], function(replaceBlanks){return(
function makeHierarchies(input) {
  var cleanedInput = replaceBlanks(input);
  var children = [];
  var obj = {name: "World", children: children};
  // loop through all countries
  for (let i=0; i<cleanedInput.length; i++) {
    var el = cleanedInput[i];
    // find corresponding region
    var regionChildren = -1;
    for (let j=0; j<children.length; j++) {
      var c = children[j];
      if (c["name"] == el["region"]) {
        regionChildren = c["children"];
      }
    }
    if (regionChildren == -1) {
      regionChildren = [];
      children.push({
       name: el["region"],
       children: regionChildren
      });
    }
    // next find corresponding subregion
    var subregionChildren = -1;
    for (let j=0; j<regionChildren.length; j++) {
      var c = regionChildren[j];
      if (c["name"] == el["subregion"]) {
        subregionChildren = c["children"];
      }
    }
    if (subregionChildren == -1) {
      subregionChildren = [];
      regionChildren.push({
       name: el["subregion"],
       children: subregionChildren
      });
    }
    // add this country
    subregionChildren.push({
       name: el["name"],
       value: el["area"]
    });
  }
  return(obj)
}
)});
  main.variable(observer("data_file")).define("data_file", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("countries.json").json()
)});
  main.variable(observer("data")).define("data", ["makeHierarchies","data_file"], function(makeHierarchies,data_file){return(
makeHierarchies(data_file)
)});
  main.variable(observer("partition")).define("partition", ["d3","radius"], function(d3,radius){return(
data => d3.partition()
    .size([2 * Math.PI, radius])
  (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))
)});
  main.variable(observer("color")).define("color", ["d3","data"], function(d3,data){return(
d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
)});
  main.variable(observer("format")).define("format", ["d3"], function(d3){return(
d3.format(",d")
)});
  main.variable(observer("width")).define("width", function(){return(
975
)});
  main.variable(observer("radius")).define("radius", ["width"], function(width){return(
width / 2
)});
  main.variable(observer("arc")).define("arc", ["d3","radius"], function(d3,radius){return(
d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(radius / 2)
    .innerRadius(d => d.y0)
    .outerRadius(d => d.y1 - 1)
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
