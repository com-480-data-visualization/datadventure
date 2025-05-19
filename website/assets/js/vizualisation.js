document.addEventListener('DOMContentLoaded', function () {
  const data = [
    { id: 1, color: '#001f3f', radius: 70, text: 'Self-Esteem' },
    { id: 2, color: '#800020', radius: 44, text: 'Blood Pressure' },
    { id: 3, color: '#800020', radius: 66, text: 'headache' },
    { id: 4, color: '#001f3f', radius: 69, text: 'sleep quality' },
    { id: 5, color: '#001f3f', radius: 62, text: 'social support' },
    { id: 6, color: '#800020', radius: 67, text: 'bullying' },
    { id: 7, color: '#800020', radius: 73, text: 'stress level' },
    { id: 8, color: '#001f3f', radius: 69, text: 'safety' },
    { id: 9, color: '#800020', radius: 71, text: 'future career concerns' },
    { id: 10, color: '#800020', radius: 53, text: 'noise level' },
    { id: 11, color: '#800020', radius: 64, text: 'peer pressure' },
    { id: 12, color: '#001f3f', radius: 63, text: 'work performance' },
    { id: 13, color: '#800020', radius: 64, text: 'work load' },
];


    console.log("vizualisation.js is running");

    const svgWidth = window.innerWidth;
    const bubblePerRow = 7;
    const rowSpacing = 180;
    const colSpacing = 180;
    const svgHeight = Math.ceil(data.length / bubblePerRow) * rowSpacing + 100;

    data.forEach((d, i) => {
        const row = Math.floor(i / bubblePerRow);
        const col = i % bubblePerRow;

        d.cx = (col + 1) * colSpacing;
        d.cy = (row + 1) * rowSpacing;
    });

    const svg = d3.select('#vizualisation')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight)
        .style('background-color', '#333');

    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => d.cx)
        .attr('cy', d => d.cy)
        .attr('r', d => d.radius)
        .attr('fill', d => d.color)
        .on('click', function (event, d) {
            alert(`Clicked: ${d.text}`);
        });

    svg.selectAll('a.link')
        .data(data)
        .enter()
        .append('a')
        .attr('xlink:href', 'elements.html')
        .attr('target', '_self')
        .append('text')
        .attr('x', d => d.cx)
        .attr('y', d => d.cy)
        .attr('text-anchor', 'middle')
        .attr('dy', '.3em')
        .text(d => d.text)
        .attr('fill', 'white')
        .style('cursor', 'pointer');
});
