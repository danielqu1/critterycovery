// https://observablehq.com/@sahithi-golkonda/countries-distribution@80
export default function define(runtime, observer) {
  const main = runtime.module();
  // hello team! 
  // when y'all copy this file to the frontend directory remember to copy land-50m.json and countries.json
  // and then update the relative paths in the line below, which would be "./files/land-50m.json"
  // please don't change the name before new URL though, because that's the alias of the filename that's used within the code
  const fileAttachments = new Map([["land-50m.json",new URL("./files/land-50m.json",import.meta.url)],["countries.json",new URL("./files/countries.json",import.meta.url)]]);
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
      .attr("fill", "#aecae6");

  g.append("path")
      .attr("d", path(graticule))
      .attr("stroke", "#ddd")
      .attr("fill", "none");

  g.append("path")
      .attr("d", path(land))
      .attr("fill", "#95cc87");

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
      // .attr("stroke", "#000")
      .attr("fill", "#000")
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
