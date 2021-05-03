// https://observablehq.com/@sahithi-golkonda/countries-distribution@56
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["land-50m.json",new URL("./files/7b6ff41e373e01d7b5b95773e297d40625bd9ccc1936a023a066a7edd8da5eaadec4ab7a565303539e41e001f2e6730f3ee1e259fae4f19dc59e8d6b2f2ec22b",import.meta.url)],["countries.json",new URL("./files/a87cd6e000d37fe81d928482b7418e2595c395045301f410c98acc4d0acbb1ffcda29e8773aa7a8c927d32b18322ec720e6fe57f0e94167d914e3adf3a2c23c7",import.meta.url)]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Countries Distribution

This map shows the spread of the countries in the critterycovery database. Data: [critterycovery](http://critterycovery.me/api/countries)`
)});
  main.variable(observer("map")).define("map", ["d3","width","height","path","outline","location","graticule","land","data","projection"], function(d3,width,height,path,outline,location,graticule,land,data,projection)
{
  const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

  const defs = svg.append("defs");

  defs.append("path")
      .attr("id", "outline")
      .attr("d", path(outline));

  defs.append("clipPath")
      .attr("id", "clip")
    .append("use")
      .attr("xlink:href", new URL("#outline", location));

  const g = svg.append("g")
      .attr("clip-path", `url(${new URL("#clip", location)})`);

  g.append("use")
      .attr("xlink:href", new URL("#outline", location))
      .attr("fill", "#fff");

  g.append("path")
      .attr("d", path(graticule))
      .attr("stroke", "#ddd")
      .attr("fill", "none");

  g.append("path")
      .attr("d", path(land))
      .attr("fill", "#ddd");

  svg.append("use")
      .attr("xlink:href", new URL("#outline", location))
      .attr("stroke", "#000")
      .attr("fill", "none");

  svg.append("g")
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("transform", d => `translate(${projection([d.longitude, d.latitude])})`)
      .attr("r", 1.5)
    .append("title")
      .text(d => d.name);

  return svg.node();
}
);
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("countries.json").json()
)});
  main.variable(observer("path")).define("path", ["d3","projection"], function(d3,projection){return(
d3.geoPath(projection)
)});
  main.variable(observer("projection")).define("projection", ["d3"], function(d3){return(
d3.geoNaturalEarth1()
)});
  main.variable(observer("height")).define("height", ["d3","projection","width","outline"], function(d3,projection,width,outline)
{
  const [[x0, y0], [x1, y1]] = d3.geoPath(projection.fitWidth(width, outline)).bounds(outline);
  const dy = Math.ceil(y1 - y0), l = Math.min(Math.ceil(x1 - x0), dy);
  projection.scale(projection.scale() * (l - 1) / l).precision(0.2);
  return dy;
}
);
  main.variable(observer("outline")).define("outline", function(){return(
{type: "Sphere"}
)});
  main.variable(observer("graticule")).define("graticule", ["d3"], function(d3){return(
d3.geoGraticule10()
)});
  main.variable(observer("land")).define("land", ["topojson","world"], function(topojson,world){return(
topojson.feature(world, world.objects.land)
)});
  main.variable(observer("world")).define("world", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("land-50m.json").json()
)});
  main.variable(observer("topojson")).define("topojson", ["require"], function(require){return(
require("topojson-client@3")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
