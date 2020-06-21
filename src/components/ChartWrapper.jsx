import React, { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { D3Chart } from "./D3Chart";

const style = {
  margin: "1rem auto",
};

const ChartWrapper = ({ chartId }) => {
  const chartRef = useRef(null);
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const [D3Instance, setD3Instance] = useState(null);

  const createUpdateD3Instance = useCallback(() => {
    if (!D3Instance) {
      let instance = new D3Chart(chartRef.current, windowWidth, windowHeight);
      setD3Instance(instance);
    } else {
      D3Instance.updateDimensions(windowWidth, windowHeight);
    }
  }, [D3Instance, windowWidth, windowHeight]);

  useEffect(() => {
    createUpdateD3Instance();
  }, [createUpdateD3Instance]);

  return (
    <>
      <div id={chartId} ref={chartRef} style={{ ...style }}></div>
      <div>
        W: {windowWidth} H: {windowHeight}{" "}
      </div>
    </>
  );
};

ChartWrapper.propTypes = {
  chartId: PropTypes.string.isRequired,
};

function useWindowDimensions() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return {
    width,
    height,
  };
}

export default ChartWrapper;
