Promise.all([
    d3.json("assets/models/model_anxiety.json"),
    d3.json("assets/models/model_depression.json")
]).then(([modelAnxiety, modelDepression]) => {

    const svgPred = d3.select("#prediction-chart");
    const marginP = { top: 20, right: 20, bottom: 40, left: 50 };
    const widthP = +svgPred.attr("width") - marginP.left - marginP.right;
    const heightP = +svgPred.attr("height") - marginP.top - marginP.bottom;

    const chartP = svgPred.append("g").attr("transform", `translate(${marginP.left},${marginP.top})`);
    const xP = d3.scaleBand().domain(["Anxiety", "Depression"]).range([0, widthP]).padding(0.4);
    const yP = d3.scaleLinear().domain([0, 1]).range([heightP, 0]);

    chartP.append("g").attr("transform", `translate(0,${heightP})`).call(d3.axisBottom(xP));
    const yAxisP = chartP.append("g").call(d3.axisLeft(yP).ticks(5).tickFormat(d3.format(".0%")));

    const featureNames = ["danceability", "energy", "key", "loudness", "speechiness", "tempo"];
    const sliders = d3.select("#sliders");

    const featureValues = {};

    featureNames.forEach(name => {
        featureValues[name] = 0;

        const wrapper = sliders.append("div")
            .style("display", "flex")
            .style("align-items", "center")
            .style("margin-bottom", "1rem");

        // Label (feature name)
        wrapper.append("div")
            .style("width", "100px")
            .style("text-align", "left")
            .text(name);

        // Current value
        const valueDisplay = wrapper.append("div")
            .style("width", "30px")
            .style("text-align", "right")
            .style("margin-right", "10px")
            .style("font-weight", "bold")
            .text((featureValues[name]).toFixed(1));

        // Min value
        const minVal = name === "key" ? 0 : -1;
        const maxVal = name === "key" ? 11 : 1;

        wrapper.append("div")
            .style("width", "20px")
            .style("text-align", "right")
            .text(minVal);

        // Slider
        const slider = wrapper.append("input")
            .attr("type", "range")
            .attr("min", minVal)
            .attr("max", maxVal)
            .attr("step", 0.01)
            .attr("value", 0)
            .style("flex", "1")
            .style("margin", "0 10px")
            .style("appearance", "none")
            .style("height", "2px")
            .style("background", "#000")
            .style("border-radius", "1px")
            .on("input", function () {
                featureValues[name] = +this.value;
                valueDisplay.text((+this.value).toFixed(1));
                updatePredictionChart();
            });

        // Max value
        wrapper.append("div")
            .style("width", "20px")
            .style("text-align", "left")
            .text(maxVal);
    });


    updatePredictionChart();

    console.log('Test');

    function predict(features, model) {
        let z = model.intercept;
        for (let i = 0; i < model.coef.length; i++) {
            z += model.coef[i] * features[i];
        }
        return 1 / (1 + Math.exp(-z)); // Sigmoid
    }

    function updatePredictionChart() {
        const features = featureNames.map(f => featureValues[f]);
        const predAnxiety = predict(features, modelAnxiety);
        const predDepression = predict(features, modelDepression);

        const data = [
            { label: "Anxiety", value: predAnxiety },
            { label: "Depression", value: predDepression }
        ];

        const bars = chartP.selectAll(".bar-pred")
            .data(data, d => d.label);

        bars.enter()
            .append("rect")
            .attr("class", "bar-pred")
            .attr("x", d => xP(d.label))
            .attr("width", xP.bandwidth())
            .attr("y", yP(0))
            .attr("height", 0)
            .merge(bars)
            .transition().duration(400)
            .attr("x", d => xP(d.label))
            .attr("width", xP.bandwidth())
            .attr("y", d => yP(d.value))
            .attr("height", d => heightP - yP(d.value))
            .attr("fill", d => d.label === "Anxiety" ? "#be5504" : "#123456");

        bars.exit().remove();
    }



}).catch(error => console.error("Failed to load models", error));