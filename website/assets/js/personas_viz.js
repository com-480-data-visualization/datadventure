// preload audio clips
const correctAudio = new Audio("assets/sounds/correct.mp3");
const wrongAudio   = new Audio("assets/sounds/wrong.mp3");
// set volume levels
correctAudio.volume = 0.1;
wrongAudio.volume   = 0.1;

// get explaination text to personas
const explanation = document.getElementById("personas-explanation-box");



document.addEventListener("DOMContentLoaded", () => {
  const data = window.listeners;
  if (!data) return console.error("window.listeners not found");

  const container = d3.select("#persona-viz");
  const colorMap = {
    country:         "#3A5F3E",  // dark olive green
    kpop:            "#DC8C78",  // soft peach
    pop:             "#B6572C",  // burnt red
    rnb:             "#AFC07A",  // pale olive
    videoGameMusic:  "#A67A3F"   // warm mustard brown
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
      .on("click", function() {
        // clear prior
        container.selectAll(".persona-card")
          .classed("selected-wrong", false)
          .classed("selected-correct", false);

        // mark this one
        const correct = (i === 2); // Person 3 is correct
        d3.select(this)
          .classed(correct ? "selected-correct" : "selected-wrong", true);

        // play the appropriate sound
        if (correct) {
          correctAudio.currentTime = 0;
          correctAudio.play();
        } else {
          wrongAudio.currentTime = 0;
          wrongAudio.play();
        }

        // make text visible
        explanation.classList.add("visible");
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
        r:   radiusScale(val),
        x:   positions[idx].x,
        y:   positions[idx].y
      };
    });

    // draw circles at those positions
    svg.selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("cx",           d => d.x)
        .attr("cy",           d => d.y)
        .attr("r",            d => d.r)
        .attr("fill",         d => colorMap[d.genre])
        .attr("fill-opacity", 0.6)                  
        .attr("stroke",       d => d3.color(colorMap[d.genre]).darker(1))
        .attr("stroke-width", 2);
  });
});

