// assets/js/personas_viz.js
document.addEventListener("DOMContentLoaded", () => {
  const data = window.listeners;
  if (!data) return console.error("window.listeners not found");

  const container = d3.select("#persona-viz");
  const colorMap = {
    country:         "#F39C12",
    kpop:            "#9B59B6",
    pop:             "#E74C3C",
    rnb:             "#3498DB",
    videoGameMusic: "#2ECC71"
  };
  const radiusScale = d3.scaleSqrt().domain([0,3]).range([8,60]);
  const svgW = 300, svgH = 200;
  const padding = 40;  // distance from edges

  // fixed genre order
  const genreOrder = [
    "country",          // top-left
    "kpop",             // top-right
    "pop",              // center
    "rnb",              // bottom-left
    "videoGameMusic"    // bottom-right
  ];

  // compute the 5 circle positions
  const positions = [
    { x: padding + 20,        y: padding + 20        }, // TL
    { x: svgW - padding,      y: padding             }, // TR
    { x: svgW / 2,            y: (svgH / 2)+30       }, // Center
    { x: padding + 5,         y: svgH - padding + 20 }, // BL
    { x: svgW - padding + 20 ,y: svgH - padding + 20 }  // BR
  ];

  data.forEach((person, i) => {
    // create card + hover/click logic
    const card = container.append("div")
      .attr("class","persona-card")
      .on("mouseover",  () => card.classed("hovered",true))
      .on("mouseout",   () => card.classed("hovered",false))
      .on("click", () => {
        container.selectAll(".persona-card")
          .classed("selected-wrong",false)
          .classed("selected-correct",false);
        const correct = (i===2); // Person 3 is correct, and should be green
        card.classed(correct?"selected-correct":"selected-wrong", true);
      });

    // label
    card.append("div")
      .attr("class","persona-label")
      .text(`Person ${i+1}`)
      .style("text-align","center");

    // svg
    const svg = card.append("svg")
      .attr("width", svgW)
      .attr("height", svgH);

    // build nodes with fixed positions
    const nodes = genreOrder.map((genre, idx) => {
      const val = person.frequencies[genre];
      return {
        genre,
        val,
        r: radiusScale(val),
        x: positions[idx].x,
        y: positions[idx].y
      };
    });

    // draw circles at those positions
    svg.selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r",  d => d.r)
        .attr("fill", d => colorMap[d.genre])
        .attr("opacity", 0.8)
        .attr("stroke", "#333")
        .attr("stroke-width", 1);
  });
});

