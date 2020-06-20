import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { D3Chart } from "./D3Chart";

const ChartWrapper = ({ chartId }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    new D3Chart(chartRef.current);
  }, []);

  return <div id={chartId} ref={chartRef}></div>;
};

ChartWrapper.propTypes = {
  chartId: PropTypes.string.isRequired,
};

export default ChartWrapper;
