// https://observablehq.com/@sahithi-golkonda/types-of-restaurants-in-austin@218
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["aroundatx-restaurants.json",new URL("./files/aroundatx-restaurants.json",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Types of Restaurants in Austin

This bubble chart shows the distribution of types of restaurants in the Around ATX database. Data: [Around ATX](https://aroundatx.live/api/incidents)`
)});
  main.variable(observer("chart")).define("chart", ["pack","data","d3","width","height","DOM","format"], function(pack,data,d3,width,height,DOM,format)
{
  const root = pack(data);
  
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height])
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle");

  const leaf = svg.selectAll("g")
    .data(root.leaves())
    .join("g")
      .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

  leaf.append("circle")
      .attr("id", d => (d.leafUid = DOM.uid("leaf")).id)
      .attr("r", d => d.r)
      .attr("fill-opacity", 0.7)
      .attr("fill", "#cc7927")
      // .attr("fill", d => color(d.data.group));

  leaf.append("clipPath")
      .attr("id", d => (d.clipUid = DOM.uid("clip")).id)
    .append("use")
      .attr("xlink:href", d => d.leafUid.href);

  leaf.append("text")
      .attr("clip-path", d => d.clipUid)
    .selectAll("tspan")
    .data(d => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
    .join("tspan")
      .attr("x", 0)
      .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
      .text(d => d);

  leaf.append("title")
      .text(d => `${d.data.name === undefined ? "" : `${d.data.name}
`}${format(d.value)}`);
    
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
  return(array)
}
)});
  main.variable(observer("all_data")).define("all_data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("aroundatx-restaurants.json").json()
)});
  main.variable(observer("temp_data")).define("temp_data", ["all_data"], function(all_data){return(
all_data.map(function(d) { return d.type; })
)});
  main.variable(observer("data")).define("data", ["frequency","temp_data"], function(frequency,temp_data){return(
frequency(temp_data)
)});
  main.variable(observer("pack")).define("pack", ["d3","width","height"], function(d3,width,height){return(
data => d3.pack()
    .size([width - 2, height - 2])
    .padding(3)
  (d3.hierarchy({children: data})
    .sum(d => d.value))
)});
  main.variable(observer("width")).define("width", function(){return(
932
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width
)});
  main.variable(observer("format")).define("format", ["d3"], function(d3){return(
d3.format(",d")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
