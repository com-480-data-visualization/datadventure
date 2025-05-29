// 1) Preload audio clips
const correctAudio = new Audio("assets/sounds/correct.mp3");
const wrongAudio   = new Audio("assets/sounds/wrong.mp3");
correctAudio.volume = 0.1;
wrongAudio.volume   = 0.1;

// 2) Grab the explanation box (hidden by default)
const explanation = document.getElementById("personas-explanation-box");

// 3) When DOM is ready, build the viz
document.addEventListener("DOMContentLoaded", () => {
  const data = window.listeners;
  if (!data) {
    console.error("window.listeners not found");
    return;
  }

  const container = d3.select("#persona-viz");

  // 4) Color map
  const colorMap = {
    country:        "#009688",  // teal
    kpop:           "#3F51B5",  // indigo
    pop:            "#FFC107",  // amber
    rnb:            "#E91E63",  // pink
    videoGameMusic: "#FF5722"   // deep orange
  };

  // 5) Radius scale: frequency 0→3 maps to 8→60px
  const radiusScale = d3.scaleSqrt()
    .domain([0,3])
    .range([10,45]);

  // 6) SVG coordinate system size
  const svgW = 300, svgH = 200;

  // 7) Fixed genre order & “dice‐5” base positions
  const genreOrder = [
    "country",        // top-left
    "kpop",           // top-right
    "pop",            // center
    "rnb",            // bottom-left
    "videoGameMusic"  // bottom-right
  ];

  const basePositions = [
    { x:  40, y:  40 },  // TL
    { x: 240, y:  40 },  // TR
    { x: 150, y: 130 },  // center
    { x:  40, y: 160 },  // BL
    { x: 260, y: 160 }   // BR
  ];

  // 8) Optional “jitter” to avoid perfect symmetry
  function jitter(pos) {
    const amt = 10; // ±10px
    return {
      x: pos.x + (Math.random()*2 - 1)*amt,
      y: pos.y + (Math.random()*2 - 1)*amt
    };
  }

  // 9) Build one card per person
  data.forEach((person, i) => {
    // 9a) Card container
    const card = container.append("div")
      .attr("class","persona-card")
      .on("mouseover", () => card.classed("hovered", true))
      .on("mouseout",  () => card.classed("hovered", false))
      .on("click", function() {
        // clear prior selection
        container.selectAll(".persona-card")
          .classed("selected-wrong", false)
          .classed("selected-correct", false);

        // mark this card
        const correct = (i === 2); // only Person 3 is correct
        d3.select(this)
          .classed(correct ? "selected-correct" : "selected-wrong", true);

        // play sound
        if (correct) {
          correctAudio.currentTime = 0;
          correctAudio.play();
        } else {
          wrongAudio.currentTime = 0;
          wrongAudio.play();
        }

        // show explanation text
        explanation.classList.add("visible");
      });

    // 9b) Label
    card.append("div")
      .attr("class","persona-label")
      .text(`Person ${i+1}`);

    // 9c) Responsive SVG
    const svg = card.append("svg")
      .attr("viewBox", `0 0 ${svgW} ${svgH}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "auto");

    // 9d) Compute nodes with jittered positions
    const nodes = genreOrder.map((genre, idx) => {
      const pos = jitter(basePositions[idx]);
      const val = person.frequencies[genre];
      return {
        genre,
        val,
        r: radiusScale(val),
        x: pos.x,
        y: pos.y
      };
    });

    // 9e) Draw circles
    svg.selectAll("circle")
      .data(nodes)
      .join("circle")
        .attr("cx",           d => d.x)
        .attr("cy",           d => d.y)
        .attr("r",            d => d.r)
        .attr("fill",         d => colorMap[d.genre])
        .attr("fill-opacity", 0.6)
        .attr("stroke",       d => d3.color(colorMap[d.genre]).darker(0.5))
        .attr("stroke-width", 2);
  });
});