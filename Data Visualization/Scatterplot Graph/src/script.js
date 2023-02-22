const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json';

const margin = {
    top: 100,
    right: 20,
    bottom: 30,
    left: 60
  },
  width = 920 - margin.left - margin.right,
  height = 630 - margin.top - margin.bottom;

// Set the tooltip
const tooltip = d3
  .select('body')
  .append('div')
  .attr('class', 'tooltip')
  .attr('id', 'tooltip')
  .style('opacity', 0);

// Set and append the SVG element
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', width + margin.right + margin.left)
  .attr('height', height + margin.top + margin.bottom)
  .attr('class', 'graph')
  .append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

d3.json(url)
  .then(data => {
    data.forEach((d) => {
      d.Place = +d.Place;
      let parsedTime = d.Time.split(':');
      d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
    });
  
    const years = data.map(data => data.Year);
    const times = data.map(data => data.Time);
  
    // Setting the x and y scales and axis
    const xScale = d3.scaleLinear().domain([d3.min(years), d3.max(years)]).range([0, width]);
    const xAxis = d3.axisBottom(xScale).tickFormat(d3.format('d'));
    svg
      .append('g')
      .attr('id', 'x-axis')
      .call(xAxis)
      .attr('transform', 'translate(0,' + height + ')')
      .attr('class', 'x axis')
      .append('text')
      .attr('class', 'x-axis-label')
      .attr('x', width)
      .attr('y', -6)
      .style('text-anchor', 'end')
      .text('Year');
  
    const yScale = d3.scaleTime().domain(d3.extent(times)).range([0, height]);
    const yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat('%M:%S'));
    svg
      .append('g')
      .attr('id', 'y-axis')
      .call(yAxis)
      .attr('class', 'y axis')
      .append('text')
      .attr('class', 'label')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '.71em')
      .style('text-anchor', 'end')
      .text('Best Time (minutes)');
    
    // Add the title
    svg
      .append('text')
      .attr('id', 'title')
      .attr('x', width / 2)
      .attr('y', 0 - margin.top / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '30px')
      .text('Doping in Professional Bicycle Racing');
  
    // Add the y axis vertical title
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -160)
      .attr('y', -44)
      .style('font-size', 18)
      .text('Time in Minutes');
    
    // Manage data and add dots elements
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    svg
      .selectAll('.dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('r', 6)
      .attr('cx', (d) => (xScale(d.Year)))
      .attr('cy', (d) => (yScale(d.Time)))
      .attr('data-xvalue', (d) => (d.Year))
      .attr('data-yvalue', (d) => (d.Time.toISOString()))
      .style('fill', (d) => (color(d.Doping !== '')))
      .on('mouseover', (event, d) => {
        tooltip.style('opacity', 0.9);
        tooltip.attr('data-year', d.Year);
        tooltip
          .html(
            d.Name +
              ': ' +
              d.Nationality +
              '<br/>' +
              'Year: ' +
              d.Year +
              ', Time: ' +
              d3.timeFormat('%M:%S') +
              (d.Doping ? '<br/><br/>' + d.Doping : '')
          )
          .style('left', event.pageX + 'px')
          .style('top', event.pageY - 28 + 'px');
      })
      .on('mouseout', () => {
        tooltip.style('opacity', 0);
      });
  
    // Add the legend element
    svg
      .append('g')
      .attr('id', 'legend')
      .selectAll('#legend')
      .data(color.domain())
      .enter()
      .append('g')
      .attr('class', 'legend-label')
      .attr('transform', (d, i) => ('translate(0,' + (height / 2 - i * 20) + ')'))
      .append('rect')
      .attr('x', width - 18)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', color)
      .append('text')
      .attr('x', width - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text((d) => {
        if (d) {
          return 'Riders with doping allegations';
        } else {
          return 'No doping allegations';
        }
      });
  })
  .catch(error => console.log(error));