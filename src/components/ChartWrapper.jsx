import React, { useRef, useEffect } from "react";
import { D3Chart } from "./D3Chart";

const ChartWrapper = ({ chartId }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    new D3Chart(chartRef.current);
  }, []);

  return <div id={chartId} ref={chartRef}></div>;
};

export default ChartWrapper;
