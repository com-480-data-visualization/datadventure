document.addEventListener('DOMContentLoaded', function () {

  // at the top of your DOMContentLoaded handler:
  const containerEl = document.getElementById("correlation-container");
  const { width, height } = containerEl.getBoundingClientRect();

  const data = [
    { id: 1, color: '#2ECC40', corr_factor: 67, text: 'Self-Esteem' },
    { id: 2, color: '#FF4136', corr_factor: 33, text: 'Blood Pressure' },
    { id: 3, color: '#FF4136', corr_factor: 63, text: 'Headache' },
    { id: 4, color: '#2ECC40', corr_factor: 71, text: 'Sleep Quality' },
    { id: 5, color: '#2ECC40', corr_factor: 57, text: 'Social Support' },
    { id: 6, color: '#FF4136', corr_factor: 71, text: 'Bullying' },
    { id: 7, color: '#FF4136', corr_factor: 74, text: 'Stress Level' },
    { id: 8, color: '#2ECC40', corr_factor: 65, text: 'Safety' },
    { id: 9, color: '#FF4136', corr_factor: 71, text: 'Career Concerns' },
    { id: 10, color: '#FF4136', corr_factor: 53, text: 'Noise Level' },
    { id: 11, color: '#FF4136', corr_factor: 64, text: 'Peer Pressure' },
    { id: 12, color: '#2ECC40', corr_factor: 65, text: 'Work Performance' },
    { id: 13, color: '#FF4136', corr_factor: 59, text: 'Work Load' },
  ];

  // Calculate radius based on correlation factor
  data.forEach(d => {
    d.radius = Math.sqrt(d.corr_factor / Math.PI) * 12;
  });


  const svg = d3.select('#correlation2')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

  const simulation = d3.forceSimulation(data)
    .force('charge', d3.forceManyBody().strength(5))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(d => d.radius + 4))
    .on('tick', ticked);

  const node = svg.selectAll('g')
    .data(data)
    .enter()
    .append('g')
    .call(d3.drag()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded));

  node.append('circle')
    .attr('r', d => d.radius)
    .attr('fill', d => d.color)
    .attr('fill-opacity', 0.6)
    .attr('stroke', d => d.color)
    .attr('stroke-width', 2);

  node.append('text')
    .text(d => d.text)
    .attr('text-anchor', 'middle')
    .attr('dy', '.3em')
    .attr('fill', 'white')
    .style('pointer-events', 'none')
    .style('font-size', d => {
      if (d.text === "Blood Pressure") {
        return '10px';
      }
      return '14px';
    });


  function ticked() {
    node.each(d => {
      // Clamp x/y positions so bubbles stay inside the bounds
      d.x = Math.max(d.radius, Math.min(width - d.radius, d.x));
      d.y = Math.max(d.radius, Math.min(height - d.radius, d.y));
    });

    node.attr('transform', d => `translate(${d.x},${d.y})`);
  }

  function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
});
