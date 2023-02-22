const DATASETS = {
  videogames: {
    TITLE: 'Video Game Sales',
    DESCRIPTION: 'Top 100 Most Sold Video Games Grouped by Platform',
    FILE_PATH:
      'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json',
  },
  movies: {
    TITLE: 'Movie Sales',
    DESCRIPTION: 'Top 100 Highest Grossing Movies Grouped By Genre',
    FILE_PATH:
      'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/movie-data.json',
  },
  kickstarter: {
    TITLE: 'Kickstarter Pledges',
    DESCRIPTION:
      'Top 100 Most Pledged Kickstarter Campaigns Grouped By Category',
    FILE_PATH:
      'https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/kickstarter-funding-data.json',
  },
};

var selectedDataset = 'videogames';
document.getElementById('title').innerHTML = DATASETS[selectedDataset].TITLE;
document.getElementById('description').innerHTML =
  DATASETS[selectedDataset].DESCRIPTION;

function changeDataset(divElement) {
  selectedDataset = divElement.getAttribute('id');
  document.getElementById('title').innerHTML = DATASETS[selectedDataset].TITLE;
  document.getElementById('description').innerHTML =
    DATASETS[selectedDataset].DESCRIPTION;
}

// Select body
var body = d3.select('body');

// Add tooltip to body
var tooltip = body
  .append('div')
  .attr('class', 'tooltip')
  .attr('id', 'tooltip')
  .style('opacity', 0);

// Select SVG element, width and height
// var svg = d3.select('#tree-map'),
//   width = +svg.attr('width'),
//   height = +svg.attr('height');

// function sumBySize(d) {
//   return d.value;
// }

d3.json(DATASETS[selectedDataset].FILE_PATH)
  .then((data) => {
    console.log(data);
    var treemap = Treemap(data);
    document.getElementById('test').appendChild(treemap);
  })
  .catch((error) => console.log(error));

// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/treemap
function Treemap(
  data,
  {
    // data is either tabular (array of objects) or hierarchy (nested objects)
    path, // as an alternative to id and parentId, returns an array identifier, imputing internal nodes
    id = Array.isArray(data) ? (d) => d.id : null, // if tabular data, given a d in data, returns a unique identifier (string)
    parentId = Array.isArray(data) ? (d) => d.parentId : null, // if tabular data, given a node d, returns its parent’s identifier
    children, // if hierarchical data, given a d in data, returns its children
    value = (d) => d.value, // given a node d, returns a quantitative value (for area encoding; null for count)
    sort = (a, b) => b.height - a.height || b.value - a.value, // how to sort nodes prior to layout
    label = (d) => d.name, // given a leaf node d, returns the name to display on the rectangle
    group = (d) => d.category, // given a leaf node d, returns a categorical value (for color encoding)
    title, // given a leaf node d, returns its hover text
    link, // given a leaf node d, its link (if any)
    linkTarget = '_blank', // the target attribute for links (if any)
    tile = d3.treemapBinary, // treemap strategy
    width = 960, // outer width, in pixels
    height = 570, // outer height, in pixels
    margin = 0, // shorthand for margins
    marginTop = margin, // top margin, in pixels
    marginRight = margin, // right margin, in pixels
    marginBottom = margin, // bottom margin, in pixels
    marginLeft = margin, // left margin, in pixels
    padding = 1, // shorthand for inner and outer padding
    paddingInner = padding, // to separate a node from its adjacent siblings
    paddingOuter = padding, // shorthand for top, right, bottom, and left padding
    paddingTop = paddingOuter, // to separate a node’s top edge from its children
    paddingRight = paddingOuter, // to separate a node’s right edge from its children
    paddingBottom = paddingOuter, // to separate a node’s bottom edge from its children
    paddingLeft = paddingOuter, // to separate a node’s left edge from its children
    round = true, // whether to round to exact pixels
    colors = d3.schemeTableau10, // array of colors
    zDomain, // array of values for the color scale
    fill = '#ccc', // fill for node rects (if no group color encoding)
    fillOpacity = group == null ? null : 0.6, // fill opacity for node rects
    stroke, // stroke for node rects
    strokeWidth, // stroke width for node rects
    strokeOpacity, // stroke opacity for node rects
    strokeLinejoin, // stroke line join for node rects
  } = {}
) {
  // If id and parentId options are specified, or the path option, use d3.stratify
  // to convert tabular data to a hierarchy; otherwise we assume that the data is
  // specified as an object {children} with nested objects (a.k.a. the “flare.json”
  // format), and use d3.hierarchy.
  const root =
    path != null
      ? d3.stratify().path(path)(data)
      : id != null || parentId != null
      ? d3.stratify().id(id).parentId(parentId)(data)
      : d3.hierarchy(data, children);

  // Compute the values of internal nodes by aggregating from the leaves.
  value == null ? root.count() : root.sum((d) => Math.max(0, value(d)));

  // Prior to sorting, if a group channel is specified, construct an ordinal color scale.
  const leaves = root.leaves();
  const G = group == null ? null : leaves.map((d) => group(d.data, d));
  if (zDomain === undefined) zDomain = G;
  zDomain = new d3.InternSet(zDomain);
  const color = group == null ? null : d3.scaleOrdinal(zDomain, colors);

  // Compute labels and titles.
  const L = label == null ? null : leaves.map((d) => label(d.data, d));
  const T =
    title === undefined
      ? L
      : title == null
      ? null
      : leaves.map((d) => title(d.data, d));

  // Sort the leaves (typically by descending value for a pleasing layout).
  if (sort != null) root.sort(sort);

  // Compute the treemap layout.
  d3
    .treemap()
    .tile(tile)
    .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
    .paddingInner(paddingInner)
    .paddingTop(paddingTop)
    .paddingRight(paddingRight)
    .paddingBottom(paddingBottom)
    .paddingLeft(paddingLeft)
    .round(round)(root);

  const svg = d3
    .create('svg')
    .attr('viewBox', [-marginLeft, -marginTop, width, height])
    .attr('width', width)
    .attr('height', height)
    .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
    .attr('font-family', 'sans-serif')
    .attr('font-size', 10);

  const node = svg
    .selectAll('a')
    .data(leaves)
    .join('a')
    .attr('xlink:href', link == null ? null : (d, i) => link(d.data, d))
    .attr('target', link == null ? null : linkTarget)
    .attr('transform', (d) => `translate(${d.x0},${d.y0})`);

  node
    .append('rect')

    .attr('id', (d) => d.data.id)
    .attr('class', 'tile')
    .attr('data-name', (d) => d.data.name)
    .attr('data-category', (d) => d.data.category)
    .attr('data-value', (d) => Math.max(0, value(d)))
    .on('mousemove', (event, d) => {
      tooltip.style('opacity', 0.9);
      tooltip
        .html(
          'Name: ' +
            d.data.name +
            '<br>Category: ' +
            d.data.category +
            '<br>Value: ' +
            d.data.value
        )
        .attr('data-value', d.data.value)
        .style('left', event.pageX + 10 + 'px')
        .style('top', event.pageY - 28 + 'px');
    })
    .on('mouseout', () => {
      tooltip.style('opacity', 0);
    })

    .attr('fill', color ? (d, i) => color(G[i]) : fill)
    .attr('fill-opacity', fillOpacity)
    .attr('stroke', stroke)
    .attr('stroke-width', strokeWidth)
    .attr('stroke-opacity', strokeOpacity)
    .attr('stroke-linejoin', strokeLinejoin)
    .attr('width', (d) => d.x1 - d.x0)
    .attr('height', (d) => d.y1 - d.y0);

  if (T) {
    node.append('title').text((d, i) => T[i]);
  }

  if (L) {
    // A unique identifier for clip paths (to avoid conflicts).
    const uid = `O-${Math.random().toString(16).slice(2)}`;

    node
      .append('clipPath')
      .attr('id', (d, i) => `${uid}-clip-${i}`)
      .append('rect')
      .attr('width', (d) => d.x1 - d.x0)
      .attr('height', (d) => d.y1 - d.y0);

    node
      .append('text')
      .attr(
        'clip-path',
        (d, i) => `url(${new URL(`#${uid}-clip-${i}`, location)})`
      )
      .selectAll('tspan')
      .data((d, i) => `${L[i]}`.split(/\n/g))
      .join('tspan')
      .attr('x', 3)
      .attr('y', (d, i, D) => `${(i === D.length - 1) * 0.3 + 1.1 + i * 0.9}em`)
      .attr('fill-opacity', (d, i, D) => (i === D.length - 1 ? 0.7 : null))
      .text((d) => d);
  }

  var categories = root.leaves().map(function (nodes) {
    return nodes.data.category;
  });
  categories = categories.filter(function (category, index, self) {
    return self.indexOf(category) === index;
  });
  var legend = d3.select('#legend');
  var legendWidth = +legend.attr('width');
  const LEGEND_OFFSET = 10;
  const LEGEND_RECT_SIZE = 15;
  const LEGEND_H_SPACING = 150;
  const LEGEND_V_SPACING = 10;
  const LEGEND_TEXT_X_OFFSET = 3;
  const LEGEND_TEXT_Y_OFFSET = -2;
  var legendElemsPerRow = Math.floor(legendWidth / LEGEND_H_SPACING);

  var legendElem = legend
    .append('g')
    .attr('transform', 'translate(60,' + LEGEND_OFFSET + ')')
    .selectAll('g')
    .data(categories)
    .enter()
    .append('g')
    .attr('transform', function (d, i) {
      return (
        'translate(' +
        (i % legendElemsPerRow) * LEGEND_H_SPACING +
        ',' +
        (Math.floor(i / legendElemsPerRow) * LEGEND_RECT_SIZE +
          LEGEND_V_SPACING * Math.floor(i / legendElemsPerRow)) +
        ')'
      );
    });

  legendElem
    .append('rect')
    .attr('width', LEGEND_RECT_SIZE)
    .attr('height', LEGEND_RECT_SIZE)
    .attr('class', 'legend-item')
    .attr('fill', function (d) {
      return color(d);
    });

  legendElem
    .append('text')
    .attr('x', LEGEND_RECT_SIZE + LEGEND_TEXT_X_OFFSET)
    .attr('y', LEGEND_RECT_SIZE + LEGEND_TEXT_Y_OFFSET)
    .text(function (d) {
      return d;
    });

  return Object.assign(svg.node(), { scales: { color } });
}
