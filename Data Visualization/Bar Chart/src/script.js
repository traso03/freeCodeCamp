fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
  .then(response => response.json())
  .then(json => {
    const width = 800,
          height = 400,
          barWidth = width / json.data.length;
  
    var tooltip = d3
      .select('.visHolder')
      .append('div')
      .attr('id', 'tooltip')
      .style('opacity', 0);

    var overlay = d3
      .select('.visHolder')
      .append('div')
      .attr('class', 'overlay')
      .style('opacity', 0);
  
    const svg = d3
      .select('.visHolder')
      .append('svg')
      .attr('width', width + 100)
      .attr('height', height + 60);
  
    svg
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -200)
      .attr('y', 80)
      .text('Gross Domestic Product');

    svg
      .append('text')
      .attr('x', width / 2 + 120)
      .attr('y', height + 50)
      .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf')
      .attr('class', 'info');
  
  
    const xScale = d3
      .scaleTime()
      .domain([new Date(json.from_date), new Date(json.to_date)])
      .range([0, width]);
    const xAxis = d3
      .axisBottom()
      .scale(xScale);
  
    svg
      .append('g')
      .call(xAxis)
      .attr('id', 'x-axis')
      .attr('transform', 'translate(60,' + height + ')');
  
    const GDP = json.data.map((item) => (item[1]));
    const gdpMax = d3.max(GDP);
    const yScale = d3
      .scaleLinear()
      .domain([0, gdpMax])
      .range([height, 0]);
    const yAxis = d3.axisLeft(yScale);
  
    svg
      .append('g')
      .call(yAxis)
      .attr('id', 'y-axis')
      .attr('transform', 'translate(60, 0)');
  
    var linearScale = d3.scaleLinear().domain([0, gdpMax]).range([0, height]);
    var scaledGDP = GDP.map((item) => (linearScale(item)));
    
    d3
      .select('svg')
      .selectAll('rect')
      .data(scaledGDP)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .style('fill', 'darkorange')
      .attr('data-date', (d, i) =>(json.data[i][0]))
      .attr('data-gdp', (d, i) =>(json.data[i][1]))
      .attr('class', 'bar')
      .attr('x', (d, i) => (xScale(json.data.map((item) => (new Date(item[0])))[i])))
      .attr('y', (d) => (height - d))
      .attr('width', barWidth)
      .attr('height', (d) => d)
      .attr('index', (d, i) => i)
      .attr('transform', 'translate(60, 0)')
      .on('mouseover', (event, d) => {
        var i = event.target.getAttribute('index');
        overlay
          .transition()
          .duration(0)
          .style('height', d + 'px')
          .style('width', barWidth + 'px')
          .style('opacity', 0.9)
          .style('left', i * barWidth + 0 + 'px')
          .style('top', height - d + 'px')
          .style('transform', 'translateX(60px)');
        tooltip.transition().duration(200).style('opacity', 0.9);
        tooltip
          .html(
            json.data[i][0] +
              '<br>' +
              '$' +
              GDP[i].toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, '$1,') +
              ' Billion'
          )
          .attr('data-date', json.data[i][0])
          .style('left', i * barWidth + 30 + 'px')
          .style('top', height - 100 + 'px')
          .style('transform', 'translateX(60px)');
      })
      .on('mouseout', () => {
        tooltip.transition().duration(200).style('opacity', 0);
        overlay.transition().duration(200).style('opacity', 0);
      });
  })
  .catch(error => console.log(error));