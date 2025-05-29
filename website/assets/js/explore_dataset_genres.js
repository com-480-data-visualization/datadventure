d3.csv("data/mxmh_survey_results.csv", d => ({
  genre: d["Fav genre"],
  anxiety: +d["Anxiety"],
  depression: +d["Depression"],
})).then(data => {
  const svg = d3.select("#mental-health-chart");
  const width = parseInt(svg.style("width"));
  const height = +svg.attr("height");
  const margin = { top: 40, right: 20, bottom: 50, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const chart = svg.append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const genres = Array.from(new Set(data.map(d => d.genre)));

  let genreLock = null; // So the genre doesn't change after having clicked on one

  // Display list of genres
  const genreList = d3.select("#genre-list")
    .selectAll("div")
    .data(genres)
    .enter()
    .append("div")
    .attr("class", "genre-item")
    .text(d => d)
    .on("mouseover", function (event, genre) {
      if (genreLock === null) {
        updateChart(genre);
        d3.selectAll(".genre-item").classed("selected", false);
        d3.select(this).classed("selected", true);
      }
    })
    .on("click", function (event, genre) {
      genreLock = genre;
      updateChart(genre);
      d3.selectAll(".genre-item").classed("selected", false);
      d3.select(this).classed("selected", true);
    });

  // Reset the lock when mouse leaves the whole genre list
  d3.select("#genre-list").on("mouseleave", () => {
    genreLock = null;
  });

  // Precompute the average anxiety and depression scores for each genre
  const avgByGenre = new Map();
  genres.forEach(genre => {
    const filtered = data.filter(d => d.genre === genre);
    avgByGenre.set(genre, {
      anxiety: d3.mean(filtered, d => d.anxiety) ?? 0,
      depression: d3.mean(filtered, d => d.depression) ?? 0
    });
  });

  const x = d3.scaleBand().domain(["Anxiety", "Depression"]).range([0, chartWidth]).padding(0.4);
  const y = d3.scaleLinear().range([chartHeight, 0]).domain([0, 10]);

  const xAxis = chart.append("g").attr("transform", `translate(0,${chartHeight})`);
  xAxis.call(d3.axisBottom(x));
  const yAxis = chart.append("g");
  yAxis.call(d3.axisLeft(y).tickFormat(d3.format("d")));

  const avgAnxiety = d3.mean(Array.from(avgByGenre.values()), d => d.anxiety);
  const avgDepression = d3.mean(Array.from(avgByGenre.values(), d => d.depression));

  function updateChart(selectedGenre) {

    const avgs = avgByGenre.get(selectedGenre);

    const dataset = [
      { metric: "Anxiety", value: avgs.anxiety },
      { metric: "Depression", value: avgs.depression }
    ];

    const bars = chart.selectAll(".bar")
      .data(dataset, d => d.metric);

    bars.enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", d => x(d.metric))
      .attr("width", x.bandwidth())
      .attr("y", chartHeight)
      .attr("height", 0)
      .merge(bars)
      .transition().duration(700)
      .attr("x", d => x(d.metric))
      .attr("width", x.bandwidth())
      .attr("y", d => y(d.value))
      .attr("height", d => chartHeight - y(d.value))
      .attr("fill-opacity", 0.6)
      .attr("stroke", d => d.metric === "Anxiety" ? "#be5504" : "#123456")
      .attr("stroke-width", 2)
      .attr("fill", d => d.metric === "Anxiety" ? "#be5504" : "#123456");

    // Avg anxiety bar
    chart.append("line")
      .attr("x1", x("Anxiety") - x.bandwidth() * 0.2)
      .attr("x2", x("Anxiety") + x.bandwidth() * 1.2)
      .attr("y1", y(avgAnxiety))
      .attr("y2", y(avgAnxiety))
      .attr("stroke", "orange")
      .attr("stroke-width", 2);

    // Avg depression bar
    chart.append("line")
      .attr("x1", x("Depression") - x.bandwidth() * 0.2)
      .attr("x2", x("Depression") + x.bandwidth() * 1.2)
      .attr("y1", y(avgDepression))
      .attr("y2", y(avgDepression))
      .attr("stroke", "blue")
      .attr("stroke-width", 2);

    bars.exit().remove();
  }

  // Initializes the graph with the first genre
  updateChart(genres[0]);
  d3.selectAll(".genre-item")
    .filter(d => d === genres[0])
    .classed("selected", true);


  // Legend
  const legendData = [
    { label: "overall mean anxiety", color: "orange" },
    { label: "mean anxiety", color: "#be5504" },
    { label: "overall mean depression", color: "blue" },
    { label: "mean depression", color: "#123456" }
  ];

  const legend = d3.select("#legend-overlay");

  legend.selectAll(".legend-item")
    .data(legendData)
    .enter()
    .append("div")
    .attr("class", "legend-item")
    .style("display", "flex")
    .style("align-items", "center")
    .style("margin-bottom", "4px")
    .html(d => `
      <div style="width: 12px; height: 12px; background:${d.color}; border: 1px solid black; margin-right: 6px;"></div>
      <span>${d.label}</span>
    `);

});