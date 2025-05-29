document.addEventListener('DOMContentLoaded', function () {
    const data = [
        { id: 1, color: '#2ECC40', radius: 70, text: 'Self-Esteem' },
        { id: 2, color: '#FF4136', radius: 44, text: 'Blood Pressure' },
        { id: 3, color: '#FF4136', radius: 66, text: 'Headache' },
        { id: 4, color: '#2ECC40', radius: 69, text: 'Sleep Quality' },
        { id: 5, color: '#2ECC40', radius: 62, text: 'Social Support' },
        { id: 6, color: '#FF4136', radius: 67, text: 'Bullying' },
        { id: 7, color: '#FF4136', radius: 73, text: 'Stress Level' },
        { id: 8, color: '#2ECC40', radius: 69, text: 'Safety' },
        { id: 9, color: '#FF4136', radius: 71, text: 'Career Concerns' },
        { id: 10, color: '#FF4136', radius: 53, text: 'Noise Level' },
        { id: 11, color: '#FF4136', radius: 64, text: 'Peer Pressure' },
        { id: 12, color: '#2ECC40', radius: 63, text: 'Work Performance' },
        { id: 13, color: '#FF4136', radius: 64, text: 'Work Load' },
      ];
      
    const width = window.innerWidth;
    const height = 600;
  
    const svg = d3.select('#correlation1')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .style('background-color', '#15161e');
  
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
        .attr('stroke-width', 2)
        .on('click', function (event, d) {
        alert(`Clicked: ${d.text}`);
      });
  
    node.append('text')
      .text(d => d.text)
      .attr('text-anchor', 'middle')
      .attr('dy', '.3em')
      .attr('fill', 'white')
      .style('pointer-events', 'none');
  
    function ticked() {
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
  