import * as d3 from "d3";

const dataUrl = new Promise((resolve) => {
  const data = JSON.parse(
    '{"Aunt Lydia": { "height": 164, "rgb": "#672113" },"Moira": { "height": 179, "rgb": "#885421" }, "Offred": { "height": 175, "rgb": "#986745" }, "Ofglen": { "height": 170, "rgb": "#326590" }}'
  );
  resolve(data);
});
//"https://d3hobby-20431.firebaseio.com/data.json";

const MARGIN = { top: 20, bottom: 50, left: 70, right: 20 };

const _initSVG = ({ element, width, height }) => {
  return d3
    .select(element)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${MARGIN.left},${MARGIN.top})`);
};

const _parseData = (rawData) => {
  const processedData = [];
  const keys = Object.keys(rawData);
  keys.forEach((key) => {
    processedData.push({
      name: key,
      height: rawData[key]["height"],
      rgb: rawData[key]["rgb"],
    });
  });
  return processedData;
};

const _calcSvgWidth = (width) => {
  return width - MARGIN.left - MARGIN.right;
};

const _calcSvgHeight = (height) => {
  return height - MARGIN.top - MARGIN.bottom;
};
export class D3Chart {
  constructor(element, width, height) {
    this.element = element;
    this.scaleDimension(width, height);
    this.render();
  }

  scaleDimension(width, height) {
    this.width = _calcSvgWidth(width);
    this.height = height * 0.55;
    this.WIDTH = _calcSvgWidth(this.width);
    this.HEIGHT = _calcSvgHeight(this.height);
  }

  initSVGCanvas() {
    this.svg = _initSVG({
      element: this.element,
      width: this.WIDTH + MARGIN.left + MARGIN.right,
      height: this.HEIGHT + MARGIN.top + MARGIN.bottom,
    });
  }

  render() {
    this.initSVGCanvas();
    //d3.json(dataUrl).then((rawData) => {
    dataUrl.then((rawData) => {
      const data = _parseData(rawData);
      const names = data.map((datum) => datum.name);

      const y = d3
        .scaleLinear()
        .domain([
          d3.min(data, (datum) => datum.height) * 0.95,
          d3.max(data, (datum) => datum.height) + MARGIN.top / 2,
        ])
        .range([this.HEIGHT, 0]);

      const x = d3
        .scaleBand()
        .domain(names)
        .range([0, this.WIDTH])
        .padding(0.4);

      const xAxisCall = d3.axisBottom(x);
      const yAxisCall = d3.axisLeft(y);

      this.svg
        .append("g")
        .attr("transform", `translate(0,${this.HEIGHT})`)
        .call(xAxisCall);
      this.svg.append("g").call(yAxisCall);

      this.svg
        .append("text")
        .attr("x", this.WIDTH / 2)
        .attr("y", 0)
        .attr("text-anchor", "middle")
        .attr("font-weight", "bold")
        .text("Character Heights");

      this.svg
        .append("text")
        .attr("x", this.WIDTH / 2)
        .attr("y", this.HEIGHT + MARGIN.bottom)
        .attr("text-anchor", "middle")
        .text("Character Names");

      this.svg
        .append("text")
        .attr("x", -this.HEIGHT / 2)
        .attr("y", -MARGIN.left / 2)
        .attr("transform", "rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Height In cm");

      const rectangles = this.svg.selectAll("rect").data(data);
      rectangles
        .enter()
        .append("rect")
        .attr("x", (datum) => x(datum.name))
        .attr("y", (datum) => y(datum.height))
        .attr("height", (datum) => this.HEIGHT - y(datum.height))
        .attr("width", x.bandwidth)
        .attr("fill", (datum) => datum.rgb);
    });
  }

  updateDimensions(width, height) {
    this.width = width;
    this.height = height;
    d3.select(this.element).selectAll("*").remove();
    this.scaleDimension(width, height);
    this.render();
  }
}
